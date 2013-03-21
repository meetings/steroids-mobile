app.createView = Backbone.View.extend({
    currentStep : 0,
    meeting : null,

    initialize: function(options) {
        var me = this;
        // Add custom handler for back button to return to previous create state.
        $(".back-button").click(function(e) {
            me.navigateBack(e);
        });
        
        this.meeting = new app.meetingModel();    
    },

    render: function() {
        this.renderCreateStep1();
        return this;
    },

    renderCreateStep1: function() {
        this.currentStep = 1;

        $('#headerTitle').text('Meeting title');

        this.$el.html( templatizer.createStep1View( this.meeting.toJSON() ) );
        this.$el.trigger("create");
    },

    saveCreateStep1: function(e) {
        e.preventDefault();

        var title = $('#meeting-title').val();

        if(title.length > 0) {
            this.meeting.set('title', title);

            this.renderCreateStep2();
        }
        else {
            $('#errors').html('<li>too short</li>');
        }
    },

    renderCreateStep2: function() {
        this.currentStep = 2;

        $('#headerTitle').text('Meeting location');

        this.$el.html( templatizer.createStep2View( this.meeting.toJSON() ) );
        this.$el.trigger("create");
    },

    navigateBack: function(e) {
        // If we are past the first creation step, prevent the default action 
        // and call the previous render step.
        if(this.currentStep > 1) {
            var prevStepFn = 'renderCreateStep' + (this.currentStep - 1);

            if(typeof this[prevStepFn] == 'function') {
                e.preventDefault();
                e.stopPropagation();

                this[prevStepFn]();
            }
        }
    },

    events: {
        'click #submitStep1' : 'saveCreateStep1'
    }
});
