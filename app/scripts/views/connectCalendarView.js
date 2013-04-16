app.connectCalendarView = Backbone.View.extend({
    initialize: function(options) {
        var that = this;

        setTimeout( function() {
            that.header = new app.headerView({ el : options.el }); // hooks pre-load back button for now
            that.render();
        }, 200 );
    },

    render: function() {
        this.$el.html( templatizer.calendarAllowAccessView( {  } ) );
        this.$el.parent().trigger('pagecreate');
        app.showContent();

        return this;
    },

    events: {
        "click .allow-access-done" : "openMeetingsPage"
    },

    openMeetingsPage : function(e){
        var that = this;
        e.preventDefault();
        AppGyver.switchContext('meetingsPage');
    }
});
