app.editView = Backbone.View.extend({
    startStep : null,

    initialize: function(options) {
        var me = this;

        // Bind error and success handlers
        this.model.bind('error', this.errorHandler, this);
        this.model.bind('success', this.successHandler, this);
        this.model.bind('change', this.render, this);

        // Add custom handler for back button to return to previous edit state.
        $(".back-button").click(function(e) {
            me.navigateBack(e);
        });

        if(options.startStep) {
            this.startStep = options.startStep;
        }

        this.viewStack = new Array();
    },

    render: function() {
        if(this.startStep == 'location') {
            this.renderEditStepLocation();
        }
        else if(this.startStep == 'time') {
            this.renderEditStepDateAndTimeSetup();
        }
        else {
            this.renderEditStepTitle();
        }

        return this;
    },

    renderEditStepTitle: function() {
        $('#headerTitle').text('Meeting title');

        this.$el.html( templatizer.editStepTitleView( this.model.toJSON() ) );
        this.$el.trigger("create");
    },

    saveEditStepTitle: function(e) {
        e.preventDefault();

        var title = $('#meeting-title').val();

        this.model.set('title', title);
        this.model.set('title_value', title);

        if(this.startStep == 'title') {
            this.finalizeMeetingCreation();
        }
        else {
            this.viewStack.push("renderEditStepTitle");
            this.renderEditStepLocation();
        }
    },

    renderEditStepLocation: function() {
        $('#headerTitle').text('Meeting location');

        this.$el.html( templatizer.editStepLocationView( this.model.toJSON() ) );
        this.$el.trigger("create");
    },

    saveEditStepLocation: function(e) {
        e.preventDefault();

        var location = $('#meeting-location').val();

        this.model.set('location', location);
        this.model.set('location_value', location);

        if(this.startStep == 'location') {
            this.finalizeMeetingCreation();
        }
        else {
            this.viewStack.push("renderEditStepLocation");
            this.renderEditStepDateAndTime();
        }
    },

    saveEditStepLocationOnline: function(e) {
        e.preventDefault();

        this.model.set('location', '');
        this.model.set('location_value', 'Online');

        this.viewStack.push("renderEditStepLocation");
        this.renderEditStepCommunications();
    },

    renderEditStepCommunications: function() {
        $('#headerTitle').text('Meeting communications');

        this.$el.html( templatizer.editStepCommunicationsView( this.model.toJSON() ) );
        this.$el.trigger("create");
    },

    saveEditStepCommunications: function(e) {
        e.preventDefault();

        if(!this.model.get('id')) {
            this.model.set('online_conferencing_option', '');
            this.model.set('skype_account', '');
        }

        if(this.startStep == 'location') {
            this.finalizeMeetingCreation();
        }
        else {
            this.viewStack.push("renderEditStepCommunications");
            this.renderEditStepDateAndTime();
        }
    },

    saveEditStepCommunicationsSkype: function(e) {
        e.preventDefault();

        this.model.set('online_conferencing_option', 'skype');

        this.viewStack.push("renderEditStepCommunications");
        this.renderEditStepSkypeName();
    },

    renderEditStepSkypeName: function() {
        $('#headerTitle').text('Skype');

        this.$el.html( templatizer.editStepSkypeNameView( this.model.toJSON() ) );
        this.$el.trigger("create");
    },

    saveEditStepSkypeName: function(e) {
        e.preventDefault();

        var skype_account = $('#meeting-skype-account').val();

        this.model.set('skype_account', skype_account);

        if(this.startStep == 'location') {
            this.finalizeMeetingCreation();
        }
        else {
            this.viewStack.push("renderEditStepSkypeName");
            this.renderEditStepDateAndTime();
        }
    },

    renderEditStepDateAndTime: function() {
        $('#headerTitle').text('Meeting date & time');

        this.$el.html( templatizer.editStepDateAndTimeView( this.model.toJSON() ) );
        this.$el.trigger("create");
    },

    saveEditStepDateAndTime: function(e) {
        e.preventDefault();

        if(!this.model.get('id')) {
            this.model.set('begin_date', '');
            this.model.set('begin_time', '');
        }

        this.finalizeMeetingCreation();
    },

    saveEditStepDateAndTimeSetup: function(e) {
        e.preventDefault();

        this.viewStack.push("renderEditStepDateAndTime");
        this.renderEditStepDateAndTimeSetup();
    },

    renderEditStepDateAndTimeSetup: function() {
        $('#headerTitle').text('Set date & time');

        if(!this.model.get('id')) {
            var now = moment();
            this.model.set('begin_date', now.format('YYYY-MM-DD'));
            this.model.set('begin_time', now.format('HH:00'));

            this.model.set('end_date', now.format('YYYY-MM-DD'));
            this.model.set('end_time', now.add('hours', 1).format('HH:00'));
        }

        this.$el.html( templatizer.editStepDateAndTimeSetupView( this.model.toJSON() ) );
        this.$el.trigger("create");
    },

    saveEditStepDateAndTimeFinish: function(e) {
        e.preventDefault();

        var begin_date = moment($('#meeting-begin-date').val());
        var end_date = moment($('#meeting-end-date').val());

        this.model.set('begin_date', begin_date.format('YYYY-MM-DD'));
        this.model.set('begin_time', begin_date.format('HH:mm'));
        this.model.set('end_date', end_date.format('YYYY-MM-DD'));
        this.model.set('end_time', end_date.format('HH:mm'));

        this.finalizeMeetingCreation();
    },

    finalizeMeetingCreation: function() {
        if(this.model.get('id')) {
            $('#headerTitle').text('Saving meeting...');
        }
        else {
            $('#headerTitle').text('Creating meeting...');
        }

        // empty views stack and send the meeting to server
        this.viewStack = [];

        AppGyver.hideContent();

        // after saving, move to meeting view to finish the draft
        var me = this;

        me.model.save({}, {
            success : function() {
                me.openMeetingView();
            },
            error: function() {
                alert('meeting creation failed.');
            }
        });
    },

    openMeetingView : function(){
        if ( app.options.build !== 'web' ) {
            AppGyver.openPreload("meetingPage", {id: this.model.get('id')});
        } else {
            window.location = 'meeting.html?id=' + this.model.get('id');
        }
    },

    navigateBack: function(e) {
        // remove current view
        //this.viewStack.pop();

        // If we are past the first creation step, prevent the default action
        // and call the previous render step.
        if(this.viewStack.length > 0) {
            var prevStepFn = this.viewStack.pop();

            if(typeof this[prevStepFn] == 'function') {
                e.preventDefault();
                e.stopPropagation();

                this[prevStepFn]();
            }
        }
    },

    events: {
        'click #submitStepTitle' : 'saveEditStepTitle',
        'click #submitStepLocation' : 'saveEditStepLocation',
        'click #submitStepLocationOnline' : 'saveEditStepLocationOnline',
        'click #submitStepCommunications' : 'saveEditStepCommunications',
        'click #submitStepCommunicationsSkype' : 'saveEditStepCommunicationsSkype',
        'click #submitStepSkypeName' : 'saveEditStepSkypeName',
        'click #submitStepDateAndTime' : 'saveEditStepDateAndTime',
        'click #submitStepDateAndTimeSetup' : 'saveEditStepDateAndTimeSetup',
        'click #submitStepDateAndTimeFinish' : 'saveEditStepDateAndTimeFinish'
    }
});
_.extend(app.editView.prototype, app.mixins.connectivity);
