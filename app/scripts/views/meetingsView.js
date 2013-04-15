app.meetingsView = Backbone.View.extend({

    initialize: function( options ) {
        this.model.on('change', function() { this.render() }, this );
    },

    render: function() {
        $('#meetings-buttons').html(templatizer.noMeetingsView({ model : this.model.toJSON() }));
        $('#meetings-buttons').trigger("create");
    },

    events: {
        "click .phone-connect-meeting-view" : "phoneConnect",
        "click .google-connect-meeting-view" : "googleConnect"
    },

    phoneConnect : function(e){
        e.preventDefault();
        alert("somebody needs to implement this :P");
    },
    googleConnect : function(e){
        e.preventDefault();
        AppGyver.switchContext('connectAccountsPage', { google_calendar : 1 } );
    }
});
