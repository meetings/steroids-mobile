app.sendInvitesView = Backbone.View.extend({
    initialize: function(options) {
    },

    render: function() {
        this.$el.html( templatizer.sendInvitesView() ); // Render template

        return this;
    },
    
    events: {
    },

    openMeetingView : function(){
        if ( app.options.build !== 'web' ) {
            e.preventDefault();
            AppGyver.openPreload("meetingPage", {id: this.model.get('meeting_id')});
        } else {
            window.location = 'meeting.html?id=' + this.model.get('meeting_id');
        }
    }
});
