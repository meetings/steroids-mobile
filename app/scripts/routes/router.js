app.router = Backbone.Router.extend({
    initialize : function(){
    },
    routes : {
        "" : "meetings",
        "login.html" : "login",
        "profile.html" : "profile",
        "index.html" : "meetings",
        "settings.html" : "settings",
        "meeting.html" : "meeting",
        "participants.html" : "participants",
        "materials.html" : "materials",
        "editMaterial.html" : "editMaterial",
        "renameMaterial.html" : "renameMaterial",
        "participant.html" : "participant",
        "material.html" : "material",
        "scheduling.html" : "scheduling",
        "edit.html" : "edit",
        "addParticipant.html" : "addParticipant"
    },
    meetings : function() {

        // Render panel & setup header
        if( ! app.views.panel ) {
            app.views.panel = new app.panelView({ active : "meetings", el : '#left-panel' });
            app.views.panel.render();
        }
        if( ! app.views.header ) app.views.header = new app.headerView({ el : '#meetings' });

        // Get times
        var today = Math.floor( moment().sod() / 1000 );

        // Deferreds for fetches
        var futureFetch = $.Deferred(),
        pastFetch = $.Deferred(),
        unscheduledFetch = $.Deferred(),
        highlightsFetch = $.Deferred();

        // wait for ajax requests to succeed, defer show content until that
        $.when(futureFetch, unscheduledFetch, pastFetch, highlightsFetch).then(function(){
            app.showContent();
            if( app.collections.future_meetings.length > 0 || app.collections.past_meetings.length > 0 || app.collections.unscheduled_meetings.length > 0){
                var offset;
                if( $('#today').is(":visible") ){
                    offset = $('#today').offset();
                    window.scrollTo(0, offset.top - 50);
                }
                else if( $('#highlights').is(":visible") ){
                    offset = $('#highlights').offset();
                    window.scrollTo(0, offset.top - 50);
                }
                else if( $('#future').is(":visible") ){
                    offset = $('#future').offset();
                    window.scrollTo(0, offset.top - 50);
                }
                else if( $('#unscheduled').is(":visible") ){
                    offset = $('#unscheduled').offset();
                    window.scrollTo(0, offset.top - 50);
                }
                else{
                    offset = $('#past').offset();
                    window.scrollTo(0, offset.bottom);
                }
            }
            else{
                $('.main-div').html(templatizer.noMeetingsView());
                $('.main-div').trigger("create");
            }
        });


        // Create collections && set urls
        if( ! app.collections.future_meetings ) app.collections.future_meetings = new app.meetingCollection();
        app.collections.future_meetings.url = app.defaults.api_host + '/v1/users/' + app.auth.user + '/meetings';

        if( ! app.collections.unscheduled_meetings ) app.collections.unscheduled_meetings = new app.meetingCollection({},{ override_endpoint : 'unscheduled_meetings' });
        app.collections.unscheduled_meetings.url = app.defaults.api_host + '/v1/users/' + app.auth.user + '/unscheduled_meetings';

        if( ! app.collections.upcoming ) app.collections.upcoming = new app.meetingCollection();
        if( ! app.collections.today ) app.collections.today = new app.meetingCollection();

        if( ! app.collections.past_meetings ) {
            app.collections.past_meetings = new app.meetingCollection();
            app.collections.past_meetings.comparator = function(meeting){
                return meeting.get('begin_epoch');
            };
        }
        app.collections.past_meetings.url = app.defaults.api_host + '/v1/users/' + app.auth.user + '/meetings';

        if( ! app.collections.highlights ) app.collections.highlights = new app.meetingCollection({},{ override_endpoint : 'highlighted_meetings' });
        app.collections.highlights.url = app.defaults.api_host + '/v1/users/' + app.auth.user + '/highlighted_meetings';

        // Create views
        if( ! app.views.future ) app.views.future = new app.upcomingMeetingsView({
            collection : app.collections.upcoming,
            childViewConstructor : app.meetingInListView,
            childViewTagName : 'li',
            el : '#future',
            emptyString : '<li class="end">No more upcoming meetings.</li>',
            infiniScroll : true,
            infiniScrollDirection : 'down',
            infiniScrollExtraParams : { start_min : today, sort : "asc" },
            hideIfEmpty : true
        });

        if( ! app.views.today ) app.views.today = new app.todayMeetingsView({
            collection : app.collections.today,
            childViewConstructor : app.meetingInListView,
            childViewTagName : 'li',
            el : $('#today'),
            infiniScroll : false,
            hideIfEmpty : true
        });

        if( ! app.views.unscheduled ) app.views.unscheduled = new app.unscheduledMeetingsView({
            collection : app.collections.unscheduled_meetings,
            childViewConstructor : app.meetingInListView,
            childViewTagName : 'li',
            el : '#unscheduled',
            infiniScroll : false,
            hideIfEmpty : true
        });

        if( ! app.views.past ) app.views.past = new app.genericCollectionView({
            collection : app.collections.past_meetings,
            childViewConstructor : app.meetingInListView,
            childViewTagName : 'li',
            el : '#past',
            emptyString : '<li class="end">No more past meetings.</li>',
            infiniScroll : true,
            infiniScrollDirection : 'up',
            infiniScrollExtraParams : { start_max : today, sort : "desc" },
            mode : "addtotop",
            hideIfEmpty : true
        });

        if( ! app.views.highlights ) app.views.highlights = new app.highlightedMeetingsView({
            collection : app.collections.highlights,
            childViewConstructor : app.highlightedMeetingInListView,
            childViewTagName : 'li',
            el : '#highlights',
            infiniScroll : false,
            hideIfEmpty : true
        });

        // Fetch things

        app.collections.future_meetings.fetch({ success : function(col,res){
            // Get times
            var today = Math.floor ( moment().utc().sod() / 1000 );
            var today_end = Math.floor ( moment().utc().eod() / 1000 );

            // Create a new collection of todays meetings
            var today_meetings = _.filter( app.collections.future_meetings.toJSON(), function(o){
                return ( o['begin_epoch'] >= today && o['begin_epoch'] <= today_end );
            });
            app.collections.today.reset( today_meetings );

            // Create new collection of upcoming meetings
            var upcoming_meetings = _.filter( app.collections.future_meetings.toJSON(), function(o){
                return ( o['begin_epoch'] > today_end );
            });
            app.collections.upcoming.reset( upcoming_meetings );

            futureFetch.resolve(); // Resolve the deferred

        },  data : { include_draft : 1, start_min : today, limit : 10, sort : "asc"} } );

        app.collections.unscheduled_meetings.fetch({ success : function(col,res){
            unscheduledFetch.resolve();
        }, data : { include_draft : 1 }});

        app.collections.past_meetings.fetch({ success : function(col,res){
            pastFetch.resolve();
        },  data : { include_draft : 1, start_max : today, limit : 10, sort : "desc" } } );

        app.collections.highlights.fetch({ success : function(col,res){
            highlightsFetch.resolve();
        }});
    },

    login : function() {
        if ( ! app.views.login ) {
            app.views.login = new app.loginView({ el : $('#login-page') });
        }
        app.views.login.render();
        app.showContent();
    },

    profile : function( params ) {
        // Start header
        if( ! app.views.header ) app.views.header = new app.headerView({ el : '#profile' });

        if( ! app.models.currentUser ) app.models.currentUser = new app.userModel( { id : 'me' } );

        var context = params && params.context_after_tos_accept || null;

        // TODO: remove and recreate
        app.views.profile = new app.profileView({
            el : $('#profile-page'),
            context_after_tos_accept : context,
            model : app.models.currentUser
        });

        app.models.currentUser.fetch({ success : function() {
            app.showContent();
        }});
    },

    meeting : function(params) {
        // Get url params
        var id = params.id || 0;

        // Setup deferreds
        var meetingFetch = $.Deferred(),
        materialsFetch = $.Deferred();

        // wait for ajax requests to succeed, defer show content until that
        $.when(meetingFetch, materialsFetch).then(function(){
            app.views.meeting.render();
            app.showContent();
        });

        // Setup models & collections
        if( ! app.collections.materials ) app.collections.materials = new app.materialCollection( [], { meeting_id : id } );
        app.collections.materials.url = app.defaults.api_host + '/v1/meetings/' + id + '/materials';

        if( ! app.models.meeting ) app.models.meeting = new app.meetingModel();
        app.models.meeting.url = app.defaults.api_host + '/v1/meetings/' + id;

        // Setup views
        if( ! app.views.panel ) {
            app.views.panel = new app.panelView({ active : "meetings", el : '#left-panel' });
            app.views.panel.render();
        }

        if (! app.views.header ) app.views.header = new app.headerView({ el : '#meetings' });

        if( ! app.views.editPanel ){
            app.views.editPanel = new app.editMeetingPanelView({ el : '#edit-meeting-panel', model : app.models.meeting });
            app.views.editPanel.render();
        }

        if( ! app.views.meeting ) app.views.meeting = new app.meetingView({
            el : $('#meeting'),
            model : app.models.meeting
        });

        // TODO: Think how data could  be fetched in parallel here. Probably by creating top level view meeting
        // with subviews for info and materials
        app.models.meeting.fetch({ success : function(){
            meetingFetch.resolve();
            app.collections.materials.fetch({ success : function(){
                materialsFetch.resolve(); // Resolve deferred
            }, silent : true }); // Silent as we wan't to render when both fetches are done
        }, timeout : 5000, silent : true });
    },

    scheduling : function(params) {
        if (app.options.build !== 'web') {
            //AppGyver.cleanBackboneZombieEvents();
        }

        // Get url params
        var id = params.id || 0;
        var mode = params.mode || 'answer';

        // Start header
        app.views.header = app.views.header || new app.headerView({ el : '#meetings' });

        // Get meeting
        app.models.meeting = app.models.meeting || new app.meetingModel();
        app.models.meeting.url = app.defaults.api_host + '/v1/meetings/' + id;

        app.views.scheduling = app.views.scheduling || new app.schedulingView({
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
        if( ! app.views.panel ){
            app.views.panel = new app.panelView({ active : "meetings", el : '#left-panel' });
            app.views.panel.render();
        }
        if( ! app.views.header ) app.views.header = new app.headerView({ el : '#participants' });

        var id = params.id || 0;

        if( ! app.collections.participants ) app.collections.participants = new app.participantCollection();
        app.collections.participants.url = app.defaults.api_host + '/v1/meetings/' + id + '/participants';
        app.collections.participants.meeting_id = id;

        if( ! app.views.participants ) app.views.participants = new app.genericCollectionView({
            el : $('#participants_list'),
            collection : app.collections.participants,
            childViewTagName : 'li',
            childViewConstructor : app.participantInListView
        });

        app.collections.participants.fetch({ success : function(){
            // Setup links to add participants
            $('a.addParticipant').click(function(e) {
                e.preventDefault();
                AppGyver.switchContext("addParticipantPage", { id : id } );
            });

            app.showContent();
        }});
    },

    participant : function(params) {
        var id = params.id || 0;

        if( ! app.views.panel ){
            app.views.panel = new app.panelView({ active : "meetings", el : '#left-panel' });
            app.views.panel.render();
        }
        if( ! app.views.header ) app.views.header = new app.headerView({ el : '#participant' });

        if( ! app.models.participant ) app.models.participant = new app.participantModel();
        app.models.participant.url = app.defaults.api_host + '/v1/meeting_participants/'+id;

        if( ! app.views.user ) app.views.user = new app.participantView({
            model : app.models.participant,
            el : $('#participant_info')
        });

        app.models.participant.fetch({ success : function(){
            app.showContent();
        }});
    },

    material : function(params) {
        var commentsFetched = $.Deferred();
        var materialFetched = $.Deferred();

        $.when(commentsFetched, materialFetched).then(function(){
            app.showContent();
        });

        var id = params.id;

        app.models.material = app.models.material || new app.materialModel();
        app.models.material.url = app.defaults.api_host + '/v1/meeting_materials/' + id;

        app.collections.comments = app.collections.comments || new app.commentCollection();
        app.collections.comments.url = app.defaults.api_host + '/v1/meeting_materials/' + id + '/comments';

        app.models.material_edits = new app.materialEditCollection( [], { material_id : id } );

        app.views.comments = app.views.comments || new app.commentListView({
            el : $('#comments'),
            collection : app.collections.comments,
            childViewTagName : 'li',
            childViewConstructor : app.commentInListView
        });

        app.views.material = app.views.material || new app.materialView({
            el : $('#material_content'),
            model : app.models.material
        });

        app.views.material.set_material_edits( app.models.material_edits );

        if ( ! app.views.edit_material_panel ) {
            app.views.edit_material_panel = new app.editMaterialPanelView({
                el : $('#edit-material-panel'),
                model : app.models.material
            });

            $('div.main-div').swipeleft(function(){
                $('#edit-material-panel').panel( "open" );
            });

            $('div.ui-panel-content-wrap,div.ui-panel-dismiss').on('click', function(){
                $('#edit-material-panel').panel( "close" );
            });
        }

        app.models.material.fetch({ success : function(){
            materialFetched.resolve();
        }});

        app.collections.comments.fetch({ success : function(){
            commentsFetched.resolve();
        }});
    },

    editMaterial : function(params) {
        if ( app.views.editMaterial ) app.views.editMaterial.close();

        app.views.editMaterial = new app.materialEditView({
            el : $('#page .view-container'),
            material_id : params.id,
            continue_edit : params.continue_edit
        });
    },
    renameMaterial : function(params) {
        if ( app.views.renameMaterial ) app.views.renameMaterial.close();

        app.views.renameMaterial = new app.materialRenameView({
            el : $('#page .view-container'),
            material_id : params.id
        });
    },
    edit : function(params) {

        // Render panel
        if( ! app.views.panel ){
            app.views.panel = new app.panelView({ active : "meetings", el : '#left-panel' });
            app.views.panel.render();
        }
        if( ! app.views.header ) app.views.header = new app.headerView({ el : '#meetings' });

        if( ! app.models.meeting ) app.models.meeting = new app.meetingModel();

        if( ! app.views.editMeeting ) app.views.editMeeting = new app.editView({
            model : app.models.meeting,
            el : $('#edit'),
            startStep : field
        });

        // Get url params
        var id = params && params.id || null;
        var field = params && params.field || null;
        var new_meeting = (id === null);

        // If this is new meeting or editing an existing
        if(new_meeting) {
            app.models.meeting.clear().set(app.models.meeting.defaults);
            app.views.editMeeting.render(false);
            app.showContent();
        }
        else {
            app.models.meeting.url = app.defaults.api_host + '/v1/meetings/' + id;
            app.models.meeting.fetch({ success : function() {
                app.views.editMeeting.render(field);
                app.showContent();
            }, timeout : 5000 });
        }
    },

    addParticipant : function(params) {
        // Get url params
        var mid = params && params.id || null;
        var return_context = params && params.override_return_context || 'participantsPage';

        // Render panel
        if( ! app.views.panel ) {
            app.views.panel = new app.panelView({ active : "meetings", el : '#left-panel' });
            app.views.panel.render();
        }
        if( ! app.views.header ) app.views.header = new app.headerView({ el : '#meetings' });

        var new_user = new app.participantModel();
        new_user.url = app.defaults.api_host + '/v1/meetings/' + mid + '/participants/';

        // Meeting model is needed for the invitation texts
        if( ! app.models.meeting ) app.models.meeting = new app.meetingModel();
        app.models.meeting.url = app.defaults.api_host + '/v1/meetings/' + mid;

        // TODO: Fix this to be more intelligent
        if( app.views.addParticipant ) app.views.addParticipant.undelegateEvents();
        app.views.addParticipant = new app.addParticipantView({
            model : new_user,
            meetingModel : app.models.meeting,
            returnContext : return_context,
            el : $('#add-participant')
        });

        app.models.meeting.fetch({ success : function() {
            app.showContent();
            app.views.addParticipant.render();
        }});
    }
});
