app.meetingInListView = Backbone.View.extend({

    initialize: function(options) {
    },

    render: function() {
        this.$el.html( templatizer.meetingInListView( this.model.toJSON() ) ); // Render template
        this.$el.attr('id', this.model.id ); // Set id
        return this;
    },

    events: {
        'click' : 'openMeeting'
    },

    openMeeting : function(e){

        if ( app.options.appmode ) {
          e.preventDefault();
          //AppGyver.open("http://localhost:13101/meeting.html?id="+this.model.id);
          AppGyver.openPreload("meetingPage", "AppGyver.replaceIdinURL("+this.model.id+");"); // when preload is fixed
        }


    }
});
