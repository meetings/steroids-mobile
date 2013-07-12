app.editView = Backbone.View.extend({
    startStep : null,

    initialize: function(options) {
        var me = this;

        // Bind error and success handlers
        //this.model.bind('error', this.errorHandler, this);
        //this.model.bind('success', this.successHandler, this);
        //this.model.bind('change', this.render, this);

        // Add custom handler for back button to return to previous edit state.
        $(".back-button").click(function(e) {
            me.navigateBack(e);
        });

        this.viewStack = new Array();
    },

    render: function(field) {
        this.startStep = field;
        if(this.startStep == 'location') {
            this.renderEditStepLocation();
        }
        else if(this.startStep == 'time') {
            if(parseInt(this.model.get('begin_epoch'))) {
                this.renderEditStepDateAndTimeSetup();
            }
            else {
                this.renderEditStepDateAndTime();
            }
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

        //Disabled because this totally craps create new meeting
        //setTimeout(function(){
            //$('#meeting-title').focus();
        //}, 200);

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
        $('#headerTitle').text('Communication');

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

        this.$el.html( templatizer.editStepSkypeNameView( { meeting : this.model.toJSON(), user : app.models.currentUser.toJSON() } ) );
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
        $('#headerTitle').text('Date & time');

        this.$el.html( templatizer.editStepDateAndTimeView( this.model.toJSON() ) );
        this.$el.trigger("create");
    },

    saveEditStepDateAndTime: function(e) {
        e.preventDefault();

        this.finalizeMeetingCreation();
    },

    saveEditStepDateAndTimeSetup: function(e) {
        e.preventDefault();

        this.viewStack.push("renderEditStepDateAndTime");
        this.renderEditStepDateAndTimeSetup();
    },

    renderEditStepDateAndTimeSetup: function() {
        $('#headerTitle').text('Set date & time');

        var newMeeting = this.model.get('id') == null;

        if(newMeeting || !newMeeting && parseInt(this.model.get('begin_epoch')) == 0) {
            // default start time is the next starting hour, end time = start + 1h
            var now = moment().add('hours', 1).minutes(0).seconds(0);

            this.model.set('begin_epoch', now.unix());
            this.model.set('end_epoch', now.add('hours', 1).unix());
        }

        this.$el.html( templatizer.editStepDateAndTimeSetupView( this.model.toJSON() ) );
        this.$el.trigger("create");
    },

    saveEditStepDateAndTimeFinish: function(e) {
        e.preventDefault();

        var begin_date = moment($('#meeting-begin-date').val());
        var end_date = moment($('#meeting-end-date').val());

        // Check that the end time is after the begin time
        if(end_date < begin_date) {
            alert('End time cannot be before the start time.');

            $('#meeting-end-date').val(begin_date.format('YYYY-MM-DDTHH:mm'));
        }
        else {
            this.model.set('begin_epoch', begin_date.unix());
            this.model.set('end_epoch', end_date.unix());

            this.finalizeMeetingCreation();
        }
    },

    finalizeMeetingCreation: function() {
        if(this.model.get('id')) {
            $('#headerTitle').text('Saving..');
        }
        else {
            $('#headerTitle').text('Creating..');
        }

        // empty views stack and send the meeting to server
        this.viewStack = [];

        AppGyver.hideContent();

        // after saving, move to meeting view to finish the draft
        var that = this;
        var is_old = this.model.get('id') ? true : false;

        that.model.save({}, {
            success : function() {
                that.openMeetingView(is_old);
            },
            error: function() {
                alert('meeting creation failed.');
            }
        });
    },

    openMeetingView : function(is_old){
        this.viewStack = [];
        AppGyver.switchContext("meetingPage", {id: this.model.get('id')}, { pop : is_old });
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

    adjustEndTime : function(){

        // If begin time changed
        var begin_date = moment($('#meeting-begin-date').val());
        var $end = $('#meeting-end-date');
        var end_date = moment( $end.val() );
        if( this.model.get('begin_epoch') !== begin_date.unix() ){

            // Get the difference in millis
            var change =  begin_date.unix() - this.model.get('begin_epoch');

            // New end epoch
            var new_end_epoch = end_date.unix() + change;

            // New end date
            var new_end_date = moment( new_end_epoch * 1000 );

            // Set both
            this.model.set('begin_epoch', begin_date.unix());
            this.model.set('end_epoch', new_end_date.unix());

            // Set end field value
            $end.val(new_end_date.format('YYYY-MM-DDTHH:mm'));
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
        'click #submitStepDateAndTimeFinish' : 'saveEditStepDateAndTimeFinish',
        'blur #meeting-begin-date' : 'adjustEndTime'
    }
});
//_.extend(app.editView.prototype, app.mixins.connectivity);
