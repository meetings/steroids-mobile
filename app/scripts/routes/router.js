app.router = Backbone.Router.extend({
    initialize : function(){
        // Check login for all but login page
        this.bind('all:before', function (trigger, args) {
            var routeData = trigger.split(":");
            if (routeData[0] === "route" && routeData[1] !== "login") {
            }
        });
    },
    routes: {
        "" : "meetings",
        "login.html" : "login",
        "index.html" : "meetings",
        "settings.html" : "settings",
        "meeting.html" : "meeting",
        "participants.html" : "participants",
        "materials.html" : "materials",
        "participant.html" : "participant",
        "material.html" : "material"
    },
    meetings: function() {

        // Set nav active
        $('ul.meeting-navbar li a').removeClass('ui-btn-active ui-state-persist');
        $('#nav-meetings').addClass('ui-btn-active ui-state-persist');

        // Get times
        // var future_begin = Math.floor ( moment().utc().add('days',-7).sod() / 1000 );
        var today = Math.floor ( moment().utc().sod() / 1000 );

        // Function to set scroll after both are rendered or show message
        var afterRender = _.after(2, function(){
            if( app.collections.future_meetings.length > 0 || app.collections.past_meetings.length > 0){
                document.getElementById('future').scrollIntoView();
                window.scrollBy(0,-50);
            }
            else{
                $('.main-div').html('<h2>Sorry</h2><p>Our mobile application doesn\'t yet support adding meetings.</p><p>You can create new meetings from the desktop!</p><p class="sorry"><span class="sorry-squrre"></span></p>');
            }
        });

        app.collections.future_meetings = new app.meetingCollection();
        app.collections.future_meetings.fetch({ success : function(){
            app.views.future = new app.upcomingMeetingsView({
                collection : app.collections.future_meetings,
                childViewConstructor : app.meetingInListView,
                childViewTagName : 'li',
                el : $('#future'),
                emptyString : '<li class="end">No more upcoming meetings.</li>',
                infiniScroll : true,
                infiniScrollDirection : 'down',
                infiniScrollExtraParams : { start_min : today, sort : "asc" }
            });
            $('.loader').hide();
            app.views.future.render();
            afterRender();
        },  data : { start_min : today, limit : 10, sort : "asc"} } );

        app.collections.past_meetings = new app.meetingCollection();
        app.collections.past_meetings.fetch({ success : function(){
            app.views.past = new app.genericCollectionView({
                collection : app.collections.past_meetings,
                childViewConstructor : app.meetingInListView,
                childViewTagName : 'li',
                el : $('#past'),
                emptyString : '<li class="end">No more past meetings.</li>',
                infiniScroll : true,
                infiniScrollDirection : 'up',
                infiniScrollExtraParams : { start_max : today, sort : "desc" },
                mode : "addtotop"
            });
            $('.loader').hide();
            app.views.past.render();
            afterRender();
        },  data : { start_max : today, limit : 10, sort : "desc" } } );
    },
    login : function() {
        app.views.login = new app.loginView({
            el : $('#login-page')
        });
        app.views.login.render();
    },
    settings: function() {
        // Set nav active
        $('ul.meeting-navbar li a').removeClass('ui-btn-active ui-state-persist');
        $('#nav-settings').addClass('ui-btn-active ui-state-persist');

        app.views.settings = new app.settingsView({
            el : $('#settings')
        });
        app.views.settings.render();
    },
    meeting: function(params) {
        // Set nav active
        $('ul.meeting-navbar li a').removeClass('ui-btn-active ui-state-persist');
        $('#nav-meetings').addClass('ui-btn-active ui-state-persist');

        var id = params.id || 0;
        app.models.meeting = new app.meetingModel({ id : id });
        app.views.meeting = new app.meetingView({
            el : $('#meeting'),
            model : app.models.meeting
        });
        app.models.meeting.fetch({ success : function(){
            app.views.meeting.render();

            // Init current meeting user
            var data = app.models.meeting.getMeetingUserByID( app.auth.user );
            app.models.meeting_user = new app.participantModel( data, { meeting_id : id } );

            // Show next action bar for the user
            app.views.next_action_view = new app.nextActionView({ el : $('#next-action-bar'), model : app.models.meeting_user });
            app.views.next_action_view.render();

        }, timeout : 5000 });
    },
    participants: function(params) {
        // Set nav active
        $('ul.meeting-navbar li a').removeClass('ui-btn-active ui-state-persist');
        $('#nav-meetings').addClass('ui-btn-active ui-state-persist');

        var id = params.id || 0;

        app.collections.participants = new app.participantCollection( [], { meeting_id : id } );
        app.collections.participants.fetch({ success : function(){
            app.views.materials = new app.genericCollectionView({
                el : $('#participants'),
                collection : app.collections.participants,
                childViewTagName : 'li',
                childViewConstructor : app.participantInListView
            });
            app.views.materials.render();
        }
        });
    },
    materials: function(params) {
        // Set nav active
        $('ul.meeting-navbar li a').removeClass('ui-btn-active ui-state-persist');
        $('#nav-meetings').addClass('ui-btn-active ui-state-persist');

        var id = params.id || 0;

        app.collections.materials = new app.materialCollection( [], { meeting_id : id } );
        app.collections.materials.url = app.defaults.api_host + '/v1/meetings/' + id + '/materials';
        app.collections.materials.fetch({ success : function(){
            app.views.materials = new app.genericCollectionView({
                el : $('#materials'),
                collection : app.collections.materials,
                childViewTagName : 'li',
                childViewConstructor : app.materialInListView
            });
            app.views.materials.render();
        }});
    },
    participant: function(params) {
        // Set nav active
        $('ul.meeting-navbar li a').removeClass('ui-btn-active ui-state-persist');
        $('#nav-meetings').addClass('ui-btn-active ui-state-persist');

        var mid = params.mid || 0;
        var id = params.id || 0;
        app.models.participant = new app.participantModel();
        app.models.participant.url = app.defaults.api_host + '/v1/meetings/' + mid + '/participants/'+id;
        app.models.participant.fetch({ success : function(){
            app.views.user = new app.participantView({
                model : app.models.participant,
                el : $('#participant')
            });
            app.views.user.render();
        }});
    },
    material: function(params) {
        var id = params.id || 0;
        app.models.material = new app.materialModel();
        app.models.material.url = app.defaults.api_host + '/v1/materials/' + id;
        app.models.material.fetch({ success : function(){
            app.views.material = new app.materialView({
                model : app.models.material,
                el : $('#material')
            });
            app.views.material.render();
        }});
        app.collections.comments = new app.commentCollection();
        app.collections.comments.url = app.defaults.api_host + '/v1/materials/' + id + '/comments';
        app.collections.comments.fetch({ success : function(){
            app.views.comments = new app.commentListView({
                el : $('#comments'),
                collection : app.collections.comments,
                childViewTagName : 'li',
                childViewConstructor : app.commentInListView
            });
            app.views.comments.render();
        }});
    }
});
