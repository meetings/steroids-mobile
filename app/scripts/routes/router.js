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
        "" : "upcoming",
        "login.html" : "login",
        "index.html" : "upcoming",
        "past.html" : "past",
        "settings.html" : "settings",
        "meeting.html" : "meeting",
        "participants.html" : "participants",
        "materials.html" : "materials",
        "participant.html" : "participant",
        "material.html" : "material"
    },
    upcoming: function() {
        app.collections.meetings_today = new app.meetingCollection();
        app.collections.meetings_today.fetch({ success : function(){
            app.views.today = new app.genericCollectionView({
                collection : app.collections.meetings_today,
                childViewConstructor : app.meetingInListView,
                childViewTagName : 'li',
                el : $('#today')
            });
            app.views.today.render();
        }});

        app.collections.meetings_upcoming = new app.meetingCollection();
        app.collections.meetings_upcoming.fetch({ success : function(){
            app.views.upcoming = new app.genericCollectionView({
                collection : app.collections.meetings_upcoming,
                childViewConstructor : app.meetingInListView,
                childViewTagName : 'li',
                el : $('#upcoming')
            });
            app.views.upcoming.render();
        }});
    },
    login : function() {
        app.views.login = new app.loginView({
            el : $('#login-page')
        });
        app.views.login.render();
    },
    past : function() {
        app.collections.meetings = new app.meetingCollection();
        app.collections.meetings.fetch({ success : function(){
            app.views.past = new app.genericCollectionView({
                collection : app.collections.meetings,
                childViewConstructor : app.meetingInListView,
                childViewTagName : 'li',
                el : $('#past')
            });
            app.views.past.render();
        }});
    },
    settings: function() {
        app.views.settings = new app.settingsView({
            el : $('#settings')
        });
        app.views.settings.render();
    },
    meeting: function(params) {
        var id = params.id || 0;
        app.models.meeting = new app.meetingModel({ id : id });
        app.views.meeting = new app.meetingView({
            el : $('#meeting'),
            model : app.models.meeting
        });
        app.models.meeting.fetch({ success : function(){
            app.views.meeting.render();
        }, timeout : 5000 });
    },
    participants: function(params) {
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
        var id = params.id || 0;

        app.collections.materials = new app.materialCollection( [], { meeting_id : id } );
        app.collections.materials.url = 'http://api-dev.meetin.gs/v1/meetings/' + id + '/materials';
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
        var mid = params.mid || 0;
        var id = params.id || 0;
        app.models.participant = new app.participantModel();
        app.models.participant.url = 'http://api-dev.meetin.gs/v1/meetings/' + mid + '/participants/'+id;
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
        app.models.material.url = 'http://api-dev.meetin.gs/v1/materials/' + id;
        app.models.material.fetch({ success : function(){
            app.views.material = new app.materialView({
                model : app.models.material,
                el : $('#material')
            });
            app.views.material.render();
        }});
        app.collections.comments = new app.commentCollection();
        app.collections.comments.url = 'http://api-dev.meetin.gs/v1/materials/' + id + '/comments';
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
