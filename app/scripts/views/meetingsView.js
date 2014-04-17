app.meetingsView = Backbone.View.extend({

    initialize: function( options ) {
        this.model.on('change', function() { this.render(); }, this );
    },

    render: function() {
        var that = this;
            that._render( { showPhoneConnect : 0 } );
    },
    _render : function(params) {
        params.model = this.model.toJSON();
        $('#meetings-buttons').html(templatizer.noMeetingsView( params ));
        $('#meetings-buttons').trigger("create");
    },

    events: {
        "click .google-connect-meeting-view" : "googleConnect"
    },

    googleConnect : function(e){
        e.preventDefault();
        app.helpers.switchContext('connectAccountsPage', { google_calendar : 1 } );
    }
});
