app.router = Backbone.Router.extend({
    initialize : function(){
        // Check internet on mobile device
        if( app.options.build !== 'web' ){
            this.bind('all', function (trigger, args) {
                var routeData = trigger.split(":");
                if (routeData[0] === "route") { // routeData[1] has route name
                    app.hasInternet();
                }
            });
        }
    },
    routes : {
        "" : "meetings",
        "contextRedirect.html" : "contextRedirect",
        "login.html" : "login",
        "profile.html" : "profile",
        "index.html" : "meetings",
        "settings.html" : "settings",
        "meeting.html" : "meeting",
        "participants.html" : "participants",
        "materials.html" : "materials",
        "editMaterial.html" : "editMaterial",
        "renameMaterial.html" : "renameMaterial",
        "connectAccounts.html" : "connectAccounts",
        "connectCalendar.html" : "connectCalendar",
        "participant.html" : "participant",
        "material.html" : "material",
        "scheduling.html" : "scheduling",
        "edit.html" : "edit",
        "addParticipant.html" : "addParticipant"
    },
    contextRedirect : function( params ) {
        var redirect_info_json = params.redirect_info;
        var redirect_info = JSON.parse( redirect_info_json );

        delete params['redirect_info'];
        redirect_info[1].redirect_params = JSON.stringify( params );

        AppGyver.reloadContext( redirect_info[0], redirect_info[1] );
    },
    meetings : function() {
        var that = this;

        // Render panel & setup header
        if( ! app.views.panel ) {
            app.views.panel = new app.panelView({ active : "meetings", el : '#left-panel' });
            app.views.panel.render();
        }
        if( ! app.views.header ) app.views.header = new app.headerView({ el : '#meetings' });

        // Get times
        var today = Math.floor( moment().sod() / 1000 );

        // Deferreds for fetches
        var futureFetch = $.Deferred();
        var pastFetch = $.Deferred();
        var unscheduledFetch = $.Deferred();
        var highlightsFetch = $.Deferred();
        var userFetch = $.Deferred();

        // wait for ajax requests to succeed, defer show content until that
        $.when(futureFetch, unscheduledFetch, pastFetch, highlightsFetch, userFetch).then(function(){

            app.views.meetingsView.render();
            app.showContent();

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
                offset = $('#meetings-buttons').offset();
                window.scrollTo(0, offset.bottom);
            }
        });


        // Create collections && set urls
        if( ! app.collections.future_meetings ) app.collections.future_meetings = new app.meetingCollection();
        app.collections.future_meetings.url = app.defaults.api_host + '/v1/users/' + app.auth.user + '/meetings_and_suggestions';

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

        app.models.user = app.models.user || new app.userModel();
        app.models.user.set( 'id', app.auth.user );

        // Create views
        app.views.meetingsView = app.views.meetingsView || new app.meetingsView({
            el : '#meetings-buttons',
            model : app.models.user
        });

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

        app.models.user.fetch({ success : function() {
            userFetch.resolve();
        }});

        var fetchFutureMeetings = function() {
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

            },  data : { include_draft : 1, start_min : today, limit : 50, sort : "asc"} } );
        };

        if ( app.options.build !== 'web' && localStorage.getItem('phoneCalendarConnected') && localStorage.getItem('phoneCalendarConnected') !== "0" && window.plugins.calendarPlugin ) {
            var now = new Date();
            var nextMonth = new Date(now.getTime() + (32 * 24 * 60 * 60 * 1000));
            var start = "" + now.getFullYear() + "-" + (now.getMonth()+1) + "-" + now.getDate() + " 00:00:00";
            var end = "" + nextMonth.getFullYear() + "-" + (nextMonth.getMonth()+1) + "-" + nextMonth.getDate() + " 00:00:00";
            var now, nextMonth, start, end;
            window.plugins.calendarPlugin.initialize(function() {
                window.plugins.calendarPlugin.findEvent(null,null,null,start, end, function(result) {
                    var batch = that._formSuggestionBatchFromCalendarResult( result );
                    if ( batch.length ) {
                        var params = {
                            user_id : app.auth.user,
                            dic : app.auth.token,
                            batch : JSON.stringify( batch )
                        };
                        $.post( app.defaults.api_host + '/v1/users/'+ app.auth.user +'/suggested_meetings/batch_insert', params )
                            .done( fetchFutureMeetings )
                            .fail( fetchFutureMeetings );
                    }
                    else {
                        fetchFutureMeetings();
                    }
                }, function( err ) {
                    localStorage.setItem('phoneCalendarConnected', "0");
                    fetchFutureMeetings();
                });
            }, function( err ) { fetchFutureMeetings(); });
        }
        else {
            fetchFutureMeetings();
        }

        app.collections.unscheduled_meetings.fetch({ success : function(col,res){
            unscheduledFetch.resolve();
        }, data : { include_draft : 1 }});

        app.collections.past_meetings.fetch({ success : function(col,res){
            pastFetch.resolve();
        }, data : { include_draft : 1, start_max : today, limit : 10, sort : "desc" } } );

        app.collections.highlights.fetch({ success : function(col,res){
            highlightsFetch.resolve();
        }});
    },
    _sentSuggestions : {},
    _formSuggestionBatchFromCalendarResult : function( result ) {
        var that = this;
        var results = _.map( result, function( r ) {
            if ( r.allDay == 'true' ) return {};

            var begin_epoch = r.startDateEpoch || '0';
            var end_epoch = r.endDateEpoch || '0';

            begin_epoch = begin_epoch.replace(/\.0+$/,'');
            end_epoch = end_epoch.replace(/\.0+$/,'');

            if ( ! begin_epoch ) return {};

            var participant_list = _.map( r.attendees || [], function( p ) {
                var name = p.name ? "" + p.name : '';
                var email = p.email ? "" + p.email : '';
                if ( p.url && ! email ) {
                    var u = p.url ? "" + p.url : '';
                    email = u.replace(/mailto\:/, '');
                }
                if ( ! email ) return '';
                if ( ! name ) return email;

                name = name.replace( /\"/g, '' );

                return '"' + name + '" <' + email + '>';
            } );

            participant_list = _.filter( participant_list, function(p) { return p ? true : false } );

            var UUID = r.UUID || '';
            if ( /^'.*'$/.test(UUID)) {
                UUID = UUID.replace(/^'.*'$/, UUID);
            }

            var suggestion = {
                title : r.title,
                begin_epoch : begin_epoch,
                end_epoch : end_epoch,
                uid : UUID,
                description : r.message,
                "location" : r["location"],
                source : 'phone:' + ( r.calendar || ''),
                participant_list : participant_list.join(", "),
//                organizer : ''
            };

            var stamp = JSON.stringify( suggestion );

            if ( this._sentSuggestions[ stamp ] ) return {};
            this._sentSuggestions[ stamp ] = 1;

            return suggestion;
        }, this );

        return _.filter( results, function( item ) { return item.begin_epoch ? true : false } );
    },

    login : function(params) {
        var that = this;
        if ( params && params.fb_login ) {
            var params = { fb_code : params.code, fb_redirect_uri : params.redirect_uri };
            $.post( app.defaults.api_host + '/v1/login', params, function( response ){
                if( response.result && response.result.user_id ){
                    app._loginWithParams( response.result.user_id, response.result.token );
                    AppGyver.switchContext('meetingsPage');
                }
                else {
                    that._render_login( 'Failed to connect with Facebook' );
                }
            }, 'json' );
        }
        else if ( params && params.google_login ) {
            var params = { google_code : params.code, google_redirect_uri : params.redirect_uri };
            $.post( app.defaults.api_host + '/v1/login', params, function( response ){
                if( response.result ){
                    if ( response.result.user_id ) {
                        app._loginWithParams( response.result.user_id, response.result.token );
                        AppGyver.switchContext('meetingsPage');
                    }
                    else if ( response.result.google_uid ) {
                        app.views.login = new app.loginView({ el : $('#login-page'), google_uid : google_uid, google_rt : google_rt });
                        app.views.login.render();
                        app.showContent();
                    }
                    else {
                        that._render_login( 'Failed to connect with Google' );
                    }
                }
            }, 'json' );
        }
        else {
            that._render_login();
        }
    },
    _render_login : function( error ) {
        app.views.login = app.views.login || new app.loginView({ el : $('#login-page'), error : error });
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
            app.views.profile.render();
            app.showContent();

        }, data : { image_size : 70 }});
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
        // TODO: Panel view needs to know what rights the user has
        if( ! app.views.panel ) {
            app.views.panel = new app.panelView({ active : "meetings", el : '#left-panel' });
            app.views.panel.render();
        }

        if (! app.views.header ) app.views.header = new app.headerView({ el : '#meetings' });

        if( ! app.views.editPanel ){
            app.views.editPanel = new app.editMeetingPanelView({ el : '#edit-meeting-panel', model : app.models.meeting });
        }

        if( ! app.views.meeting ) app.views.meeting = new app.meetingView({
            el : $('#meeting'),
            model : app.models.meeting
        });

        // TODO: Think how data could  be fetched in parallel here. Probably by creating top level view meeting
        // with subviews for info and materials
        app.models.meeting.fetch({ success : function(){
            meetingFetch.resolve();
            app.views.editPanel.render();
            app.collections.materials.fetch({ success : function(){
                materialsFetch.resolve(); // Resolve deferred
            }, silent : true }); // Silent as we want to render when both fetches are done
        }, timeout : 5000, silent : true });
    },

    scheduling : function(params) {

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
        app.views.scheduling.mode = mode;

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
                AppGyver.back_context = ["meetingPage", { id : id } ];
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
            if( app.models.material.get('fetch_type') === 'chat' ) $('#open-right-panel').hide();
            else $('#open-right-panel').show();
            app.showContent();
        });

        var id = params.id;

        app.models.material = app.models.material || new app.materialModel();
        app.models.material.clear();
        app.models.material.set( "id", id );

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
    connectAccounts : function(params) {
        app.views.header = new app.headerView({ el : '#page .view-container' });
        if ( params.google_calendar ) {
            return app.startGoogleConnecting( 'connectAccountsPage', { google_connected : 1 } );
        }
        else if ( params.google_connected ) {
            var redirect_params = JSON.parse( params.redirect_params );
            var user = new app.userModel( { id : app.auth.user } );
            user.fetch( { success : function() {
                user.save( {
                    google_code : redirect_params.code,
                    google_redirect_uri : redirect_params.redirect_uri
                }, { success : function() {
                    AppGyver.switchContext('meetingsPage');
                } } );
            } } );
        }
        else {
            setTimeout( function() {
                alert( "you should not be here.. :(" );
                AppGyver.popContext();
            }, 1000 );
        }

    },
    connectCalendar : function(params) {
        if ( app.views.connectCalendar ) app.views.connectCalendar.close();

        app.views.connectCalendar = new app.connectCalendarView({
            el : $('#page .view-container')
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
