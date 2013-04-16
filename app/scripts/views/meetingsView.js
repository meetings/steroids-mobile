app.meetingsView = Backbone.View.extend({

    initialize: function( options ) {
        this.model.on('change', function() { this.render() }, this );
    },

    render: function() {
        var that = this;

        var connected = localStorage.getItem('phoneCalendarConnected');
        if ( connected == "0" ) connected = false;

        if ( app.options.build !== 'web' && connected && window.plugins.calendarPlugin ) {
            window.plugins.calendarPlugin.initialize(function() {
                that._render( { showPhoneConnect : 0 } );
            },function() {
                that._render( { showPhoneConnect : 1 } );
            });
        }
        else {
            that._render( { showPhoneConnect : ( ( app.options.build !== 'web' && window.plugins.calendarPlugin ) ? 1 : 0 ) } );
        }        
    },
    _render : function(params) {
        params.model = this.model.toJSON();
        $('#meetings-buttons').html(templatizer.noMeetingsView( params ));
        $('#meetings-buttons').trigger("create");
    },

    events: {
        "click .phone-connect-meeting-view" : "phoneConnect",
        "click .google-connect-meeting-view" : "googleConnect"
    },

    phoneConnect : function(e){
        e.preventDefault();
        if ( app.options.build !== 'web' ) {
            localStorage.setItem('phoneCalendarConnected', '1');
        }
        window.plugins.calendarPlugin.initialize(function() {
            AppGyver.refreshContext('meetingsPage');
        },function() {
            AppGyver.switchContext('connectCalendarPage');
        });
    },
    googleConnect : function(e){
        e.preventDefault();
        AppGyver.switchContext('connectAccountsPage', { google_calendar : 1 } );
    }
});
