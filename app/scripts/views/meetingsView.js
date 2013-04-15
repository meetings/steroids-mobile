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
        /*
        window.plugins.calendarPlugin.initialize(function() {

                today = new Date();
                nextWeek = new Date(today.getTime() + (7 * 24 * 60 * 60 * 1000));
                start = "" + today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                end = "" + nextWeek.getFullYear() + "-" + (nextWeek.getMonth()+1) + "-" + nextWeek.getDate() + " " + nextWeek.getHours() + ":" + nextWeek.getMinutes() + ":" + nextWeek.getSeconds();

                console.log('calendar inited, tryinh to fetch shits');
                window.plugins.calendarPlugin.findEvent(null,null,null,start, end, function(result) {
                    alert("Found " + result.length + " events!");
                }, function(err) {
                    if( err === 'No results') console.log('no results');
                    else console.log('User did not give permiszion');
                });
        },function() {
            console.log('User did not give permiszion');
        });
        */
        AppGyver.switchContext('connectCalendarPage', {} );
    },
    googleConnect : function(e){
        e.preventDefault();
        AppGyver.switchContext('connectAccountsPage', { google_calendar : 1 } );
    }
});
