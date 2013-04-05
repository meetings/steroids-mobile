app.router = Backbone.Router.extend({
    initialize : function(){
    },
    routes : {
        "" : "meetings",
        "login.html" : "login",
        "index.html" : "meetings",
        "settings.html" : "settings",
        "meeting.html" : "meeting",
        "participants.html" : "participants",
        "materials.html" : "materials",
        "participant.html" : "participant",
        "material.html" : "material",
        "scheduling.html" : "scheduling",
        "edit.html" : "edit",
        "addParticipant.html" : "addParticipant",
        "invite.html" : "sendInvites"
    },
    meetings : function() {

        // Render panel & setup header
        app.views.panel = new app.panelView({ active : "meetings", el : '#left-panel' });
        app.views.header = new app.headerView({ el : '#meetings' });
        app.views.panel.render();

        // Get times
        var today = Math.floor( moment().sod() / 1000 );

        // Deferreds for fetches
        var futureFetch = $.Deferred(),
        pastFetch = $.Deferred(),
        unscheduledFetch = $.Deferred();

        // wait for ajax requests to succeed, defer show content until that
        $.when(futureFetch, unscheduledFetch, pastFetch).then(function(){
            app.showContent();
            if( app.collections.future_meetings.length > 0 || app.collections.past_meetings.length > 0){
                var offset;
                if( $('#today').length > 0 ){
                    offset = $('#today').offset();
                    window.scrollTo(0, offset.top - 50);
                }
                else if( $('#future').length > 0 ){
                    offset = $('#future').offset();
                    window.scrollTo(0, offset.top - 50);
                }
                else if( $('#unscheduled').length > 0 ){
                    offset = $('#unscheduled').offset();
                    window.scrollTo(0, offset.top - 50);
                }
                else{
                    offset = $('#past').offset();
                    window.scrollTo(0, offset.bottom);
                }
            }
            else{
                $('.main-div').html('<h2>Sorry</h2><p>Our mobile app doesn\'t yet support creating meetings.</p><p>Open the login link in your email with a desktop browser to get started!</p><p class="sorry"><span class="sorry-squrre"></span></p>');
            }
        });

        // Fetch all future meetings & split them to collections
        app.collections.future_meetings = new app.meetingCollection();
        app.collections.future_meetings.fetch({ success : function(col,res){
            // Get times
            var today = Math.floor ( moment().utc().sod() / 1000 );
            var today_end = Math.floor ( moment().utc().eod() / 1000 );

            // Create a new collection of todays meetings
            var today_meetings = _.filter( app.collections.future_meetings.toJSON(), function(o){
                return ( o['begin_epoch'] >= today && o['begin_epoch'] <= today_end );
            });
            app.collections.today = new app.meetingCollection( today_meetings );

            // Create new collection of upcoming meetings
            var upcoming_meetings = _.filter( app.collections.future_meetings.toJSON(), function(o){
                return ( o['begin_epoch'] > today_end );
            });
            app.collections.upcoming = new app.meetingCollection( upcoming_meetings );

            // Create view for upcoming meetings and render or remove if empty
            app.views.future = new app.upcomingMeetingsView({
                collection : app.collections.upcoming,
                childViewConstructor : app.meetingInListView,
                childViewTagName : 'li',
                el : '#future',
                emptyString : '<li class="end">No more upcoming meetings.</li>',
                infiniScroll : true,
                infiniScrollDirection : 'down',
                infiniScrollExtraParams : { start_min : today, sort : "asc" }
            });
            if( app.collections.future_meetings.length === 0 ) app.views.future.remove();
            else app.views.future.render();

            // Create a view for todays meetings and render or remove if empty
            app.views.today = new app.todayMeetingsView({
                collection : app.collections.today,
                childViewConstructor : app.meetingInListView,
                childViewTagName : 'li',
                el : $('#today'),
                infiniScroll : false
            });
            if( app.collections.today.length === 0 ) app.views.today.remove();
            else app.views.today.render();

            futureFetch.resolve(); // Resolve the deferred

        },  data : { include_draft : 1, start_min : today, limit : 10, sort : "asc"} } );

        // Get the unscheduled meetings
        app.collections.unscheduled_meetings = new app.meetingCollection({},{ override_endpoint : 'unscheduled_meetings' });
        app.views.unscheduled = new app.unscheduledMeetingsView({
            collection : app.collections.unscheduled_meetings,
            childViewConstructor : app.meetingInListView,
            childViewTagName : 'li',
            el : '#unscheduled',
            infiniScroll : false
        });
        app.collections.unscheduled_meetings.fetch({ success : function(col,res){
            if( app.collections.unscheduled_meetings.length === 0 ) app.views.unscheduled.remove();
            unscheduledFetch.resolve();
        }, data : { include_draft : 1 }});

        // Fetch past meetings
        app.collections.past_meetings = new app.meetingCollection();
        app.collections.past_meetings.comparator = function(meeting){
            return meeting.get('begin_epoch');
        };
        app.views.past = new app.genericCollectionView({
            collection : app.collections.past_meetings,
            childViewConstructor : app.meetingInListView,
            childViewTagName : 'li',
            el : '#past',
            emptyString : '<li class="end">No more past meetings.</li>',
            infiniScroll : true,
            infiniScrollDirection : 'up',
            infiniScrollExtraParams : { start_max : today, sort : "desc" },
            mode : "addtotop"
        });
        app.collections.past_meetings.fetch({ success : function(col,res){
            if( app.collections.past_meetings.length === 0 ) app.views.past.remove();
            pastFetch.resolve();
        },  data : { include_draft : 1, start_max : today, limit : 10, sort : "desc" } } );
    },

    login : function(params) {
        if ( params && params.fb_login ) {
            var params = { fb_code : params.code, fb_redirect_uri : params.redirect_uri };
            $.post( app.defaults.api_host + '/v1/login', params, function( response ){
                if( response.result ){
                    app._loginWithParams( response.result.user_id, response.result.token );
                    window.location = '/index.html';
                    return;
                }
            }, 'json' );
        }
        app.views.login = new app.loginView({ el : $('#login-page') });
        app.views.login.render();
    },

    meeting : function(params) {
        var meetingFetch = $.Deferred(),
        materialsFetch = $.Deferred();

        // wait for ajax requests to succeed, defer show content until that
        $.when(meetingFetch, materialsFetch).then(function(){
            app.showContent();
        });

        if (app.options.build !== 'web') {
            AppGyver.cleanBackboneZombieEvents();
        }

        app.views.panel = new app.panelView({ active : "meetings", el : '#left-panel' });
        app.views.header = new app.headerView({ el : '#meetings' });
        app.views.panel.render();

        // Get url params
        var id = params.id || 0;

        app.views.editPanel = new app.editMeetingPanelView({ el : '#edit-meeting-panel', meetingId : id });
        app.views.editPanel.render();

        // Fetch and show meeting
        app.models.meeting = new app.meetingModel({ id : id });
        app.views.meeting = new app.meetingView({
            el : $('#meeting'),
            model : app.models.meeting
        });
        app.models.meeting.fetch({ success : function(){

            // Init current meeting user
            var data = app.models.meeting.getMeetingUserByID( app.auth.user );
            app.models.meeting_user = new app.participantModel( data, { meeting_id : id } );

            // Show next action bar for the user
            app.views.next_action_view = new app.nextActionView({ el : $('#next-action-bar'), model : app.models.meeting_user });
            app.views.next_action_view.render();

            // Resolve deferred
            meetingFetch.resolve();

        }, timeout : 5000 });

        // Setup materials col & view
        app.collections.materials = new app.materialCollection( [], { meeting_id : id } );
        app.collections.materials.url = app.defaults.api_host + '/v1/meetings/' + id + '/materials';
        app.views.materials = new app.genericCollectionView({
            el : $('#materials_list'),
            collection : app.collections.materials,
            childViewTagName : 'li',
            childViewConstructor : app.materialInListView
        });

        app.collections.materials.fetch({ success : function(){
            materialsFetch.resolve(); // Resolve deferred
        }});
    },

    scheduling : function(params) {
        if (app.options.build !== 'web') {
            AppGyver.cleanBackboneZombieEvents();
        }

        // Get url params
        var id = params.id || 0;
        var mode = params.mode || 'answer';

        // Start header
        app.views.header = new app.headerView({ el : '#meetings' });

        // Get meeting
        app.models.meeting = new app.meetingModel({ id : id });
        app.views.scheduling = new app.schedulingView({
            el : $('#scheduling'),
            model : app.models.meeting,
            mode : mode
        } );
        app.models.meeting.fetch({ success : function(){
            // Init current meeting user
            var data = app.models.meeting.getMeetingUserByID( app.auth.user );
            app.models.meeting_user = new app.participantModel( data, { meeting_id : id } );

            app.views.scheduling.render();

            app.showContent();
        }, timeout : 5000 });

    },

    participants : function(params) {
        if (app.options.build !== 'web') {
            AppGyver.cleanBackboneZombieEvents();
        }

        // Render panel
        app.views.panel = new app.panelView({ active : "meetings", el : '#left-panel' });
        app.views.header = new app.headerView({ el : '#participants' });
        app.views.panel.render();

        var id = params.id || 0;

        app.collections.participants = new app.participantCollection( [], { meeting_id : id } );
        app.views.materials = new app.genericCollectionView({
            el : $('#participants_list'),
            collection : app.collections.participants,
            childViewTagName : 'li',
            childViewConstructor : app.participantInListView
        });
        app.collections.participants.fetch({ success : function(){
            // Setup links to add participants
            $('a.addParticipant').click(function(e) {
                e.preventDefault();
                window.location = 'addParticipant.html?mid=' + id;
            });

            app.showContent();
        }});
    },

    participant : function(params) {

        if (app.options.build !== 'web') {
          // Cleanup zombie events
          AppGyver.cleanBackboneZombieEvents();
        }

        // Render footer
        app.views.panel = new app.panelView({ active : "meetings", el : '#left-panel' });
        app.views.header = new app.headerView({ el : '#participant' });
        app.views.panel.render();

        var mid = params.mid || 0;
        var id = params.id || 0;
        app.models.participant = new app.participantModel();
        app.models.participant.url = app.defaults.api_host + '/v1/meetings/' + mid + '/participants/'+id;
        app.views.user = new app.participantView({
            model : app.models.participant,
            el : $('#participant_info')
        });

        app.models.participant.fetch({ success : function(){
            app.showContent();
        }});
    },

    material : function(params) {
        var commentsFetch = $.Deferred(),
        materialFetch = $.Deferred();

        $.when(commentsFetch, materialFetch).then(function(){
            app.showContent();
        });

        if (app.options.build !== 'web') {
            // Cleanup zombie events
            AppGyver.cleanBackboneZombieEvents();
        }

        // Setup header
        app.views.header = new app.headerView({ el : '#material' });

        var id = params.id || 0;
        app.models.material = new app.materialModel();
        app.models.material.url = app.defaults.api_host + '/v1/materials/' + id;
        app.views.material = new app.materialView({
            model : app.models.material,
            el : $('#material_content')
        });

        app.models.material.fetch({ success : function(){
            materialFetch.resolve();
        }});

        app.collections.comments = new app.commentCollection();
        app.collections.comments.url = app.defaults.api_host + '/v1/materials/' + id + '/comments';
        app.views.comments = new app.commentListView({
            el : $('#comments'),
            collection : app.collections.comments,
            childViewTagName : 'li',
            childViewConstructor : app.commentInListView
        });

        app.collections.comments.fetch({ success : function(){
            commentsFetch.resolve();
        }});
    },

    edit : function(params) {
        if (app.options.build !== 'web') {
            AppGyver.cleanBackboneZombieEvents();
        }

        // Render panel
        app.views.panel = new app.panelView({ active : "meetings", el : '#left-panel' });
        app.views.header = new app.headerView({ el : '#meetings' });
        app.views.panel.render();

        // Get url params
        var id = params && params.id || null;

        var new_meeting = (id == null);

        app.models.meeting = new app.meetingModel({ id : id});

        app.views.editMeeting = new app.editView({
            model : app.models.meeting,
            el : $('#edit')
        });

        if(new_meeting) {
            app.views.editMeeting.render();
            app.showContent();
        }
        else {
            app.models.meeting.fetch({ success : function() {
                app.showContent();
            }, timeout : 5000 });
        }
    },

    addParticipant : function(params) {
        if (app.options.build !== 'web') {
            AppGyver.cleanBackboneZombieEvents();
        }

        // Render panel
        app.views.panel = new app.panelView({ active : "meetings", el : '#left-panel' });
        app.views.header = new app.headerView({ el : '#meetings' });
        app.views.panel.render();

        // Get url params
        var mid = params && params.mid || null;

        app.models.participant = new app.participantModel({ id : null, meeting_id : mid});
        app.models.participant.url = app.defaults.api_host + '/v1/meetings/' + mid + '/participants/';

        app.views.addParticipant = new app.addParticipantView({
            model : app.models.participant,
            el : $('#add-participant')
        });

        app.views.addParticipant.render();
        app.showContent();
    },

    sendInvites : function(params) {
        if (app.options.build !== 'web') {
            AppGyver.cleanBackboneZombieEvents();
        }

        // Render panel
        app.views.panel = new app.panelView({ active : "meetings", el : '#left-panel' });
        app.views.header = new app.headerView({ el : '#invite' });
        app.views.panel.render();

        // Get url params
        var id = params && params.id || null;

        app.views.sendInvites = new app.sendInvitesView({
            el : $('#invite_form')
        });

        app.views.sendInvites.render();
        app.showContent();
    }
});
