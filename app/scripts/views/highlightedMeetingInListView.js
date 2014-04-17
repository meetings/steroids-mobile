app.highlightedMeetingInListView = Backbone.View.extend({

    initialize: function(options) {
    },

    render: function() {
        this.$el.html( templatizer.highlightedMeetingInListView( this.model.toJSON() ) ); // Render template
        this.$el.attr('id', this.model.id ); // Set id
        return this;
    },

    events: {
        'click' : 'openMeeting'
    },

    openMeeting : function(e){
        e.preventDefault();
        app.helpers.switchContext("meetingPage", {id: this.model.id});
    }
});
