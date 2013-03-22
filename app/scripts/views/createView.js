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
        
        this.meeting = new app.meetingModel();    
        this.meeting.set('id', null);
        this.viewStack = new Array();
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

        if(title.length > 0) {
            this.meeting.set('title', title);
        }
        else {
            this.meeting.set('title', 'Untitled meeting');
        }

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

        if(location.length > 0) {
            this.meeting.set('location', location);
        }
        else {
            this.meeting.set('location', 'Location not known');
        }

        this.renderCreateStepDateAndTime();
    },

    saveCreateStepLocationOnline: function(e) {
        e.preventDefault();

        this.meeting.set('location', 'online');

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

        this.renderCreateStepDateAndTime();
    },
    
    saveCreateStepCommunicationsSkype: function(e) {
        e.preventDefault();

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

        var skype_address = $('#meeting-skype-address').val();

        this.meeting.set('skype_address', skype_address);

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

        this.finalizeMeetingCreation();
    },

    finalizeMeetingCreation: function() {
        $('#headerTitle').text('Creating meeting...');

        // empty views stack and send the meeting to server
        this.viewStack = [];

        AppGyver.hideContent();

        // after saving, move to meeting view to finish the draft
        var me = this;
        
        me.meeting.save({
            title : this.meeting.get('title'),
            date_string : this.meeting.get('date_string'),
            time_string : this.meeting.get('time_string'),
            location: this.meeting.get('location'),
            skype_address : this.meeting.get('skype_address')
        }, {
            success : function() {
                window.location = 'meeting.html?id=' + me.meeting.id;
            },
            error: function() {
                console.log('meeting creation failed.');
            }
        });
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
