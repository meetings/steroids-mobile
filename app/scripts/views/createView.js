app.createView = Backbone.View.extend({
    currentStep : 0,
    meeting : null,
    viewStack : null,

    initialize: function(options) {
        var me = this;
        // Add custom handler for back button to return to previous create state.
        $(".back-button").click(function(e) {
            me.navigateBack(e);
        });

        this.meeting = new app.meetingModel({}, { override_endpoint : true });    
        this.meeting.set('id', null);
        this.viewStack = new Array();
        
        // Bind error and success handlers
        this.meeting.bind('error', this.errorHandler, this);
        this.meeting.bind('success', this.successHandler, this);
        this.meeting.bind('change', this.render, this);
    },

    render: function() {
        this.renderCreateStepTitle();
        return this;
    },

    renderCreateStepTitle: function() {
        this.viewStack.push("renderCreateStepTitle");

        $('#headerTitle').text('Meeting title');

        this.$el.html( templatizer.createStepTitleView( this.meeting.toJSON() ) );
        this.$el.trigger("create");
    },

    saveCreateStepTitle: function(e) {
        e.preventDefault();

        var title = $('#meeting-title').val();

        this.meeting.set('title', title);
        this.meeting.set('title_value', title);

        this.renderCreateStepLocation();
    },

    renderCreateStepLocation: function() {
        this.viewStack.push("renderCreateStepLocation");

        $('#headerTitle').text('Meeting location');
        
        this.$el.html( templatizer.createStepLocationView( this.meeting.toJSON() ) );
        this.$el.trigger("create");
    },

    saveCreateStepLocation: function(e) {
        e.preventDefault();

        var location = $('#meeting-location').val();

        this.meeting.set('location', location);
        this.meeting.set('location_value', location);

        this.renderCreateStepDateAndTime();
    },

    saveCreateStepLocationOnline: function(e) {
        e.preventDefault();

        this.meeting.set('location', '');
        this.meeting.set('location_value', 'Online');

        this.renderCreateStepCommunications();
    },

    renderCreateStepCommunications: function() {
        this.viewStack.push("renderCreateStepCommunications");

        $('#headerTitle').text('Meeting communications');

        this.$el.html( templatizer.createStepCommunicationsView( this.meeting.toJSON() ) );
        this.$el.trigger("create");
    },

    saveCreateStepCommunications: function(e) {
        e.preventDefault();

        this.meeting.set('online_conferencing_option', '');
        this.meeting.set('skype_account', '');

        this.renderCreateStepDateAndTime();
    },
    
    saveCreateStepCommunicationsSkype: function(e) {
        e.preventDefault();

        this.meeting.set('online_conferencing_option', 'skype');
        this.meeting.set('skype_account', '');

        this.renderCreateStepSkypeName();
    },
    
    renderCreateStepSkypeName: function() {
        this.viewStack.push("renderCreateStepSkypeName");

        $('#headerTitle').text('Skype');

        this.$el.html( templatizer.createStepSkypeNameView( this.meeting.toJSON() ) );
        this.$el.trigger("create");
    },

    saveCreateStepSkypeName: function(e) {
        e.preventDefault();

        var skype_account = $('#meeting-skype-address').val();

        this.meeting.set('skype_account', skype_account);

        this.renderCreateStepDateAndTime();
    },

    renderCreateStepDateAndTime: function() {
        this.viewStack.push("renderCreateStepDateAndTime");

        $('#headerTitle').text('Meeting date & time');

        this.$el.html( templatizer.createStepDateAndTimeView( this.meeting.toJSON() ) );
        this.$el.trigger("create");
    },

    saveCreateStepDateAndTime: function(e) {
        e.preventDefault();

        this.meeting.set('begin_date', '');
        this.meeting.set('begin_time', '');

        this.finalizeMeetingCreation();
    },

    saveCreateStepDateAndTimeSetup: function(e) {
        e.preventDefault();

        this.renderCreateStepDateAndTimeSetup();
    },

    renderCreateStepDateAndTimeSetup: function() {
        this.viewStack.push("renderCreateStepDateAndTimeSetup");

        $('#headerTitle').text('Set date & time');

        this.$el.html( templatizer.createStepDateAndTimeSetupView( this.meeting.toJSON() ) );
        this.$el.trigger("create");
    },

    saveCreateStepDateAndTimeFinish: function(e) {
        e.preventDefault();

        var begin_date = moment($('#meeting-begin-date').val());
        var end_date = moment($('#meeting-end-date').val());

        this.meeting.set('begin_date', begin_date.format('YYYY-MM-DD'));
        this.meeting.set('begin_time', begin_date.format('HH:MM'));
        this.meeting.set('end_date', end_date.format('YYYY-MM-DD'));
        this.meeting.set('end_time', end_date.format('HH:MM'));

        this.finalizeMeetingCreation();
    },

    finalizeMeetingCreation: function() {
        $('#headerTitle').text('Creating meeting...');

        // empty views stack and send the meeting to server
        this.viewStack = [];

        AppGyver.hideContent();

        // after saving, move to meeting view to finish the draft
        var me = this;
        
        me.meeting.save({}, {
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
            e.preventDefault();
            AppGyver.openPreload("meetingPage", {id: this.meeting.get('id')});
        } else {
            window.location = 'meeting.html?id=' + this.meeting.get('id');
        }
    },

    navigateBack: function(e) {
        // remove current view
        this.viewStack.pop();

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
        'click #submitStepTitle' : 'saveCreateStepTitle',
        'click #submitStepLocation' : 'saveCreateStepLocation',
        'click #submitStepLocationOnline' : 'saveCreateStepLocationOnline',
        'click #submitStepCommunications' : 'saveCreateStepCommunications',
        'click #submitStepCommunicationsSkype' : 'saveCreateStepCommunicationsSkype',
        'click #submitStepSkypeName' : 'saveCreateStepSkypeName',
        'click #submitStepDateAndTime' : 'saveCreateStepDateAndTime',
        'click #submitStepDateAndTimeSetup' : 'saveCreateStepDateAndTimeSetup',
        'click #submitStepDateAndTimeFinish' : 'saveCreateStepDateAndTimeFinish'
    }
});
_.extend(app.createView.prototype, app.mixins.connectivity);
