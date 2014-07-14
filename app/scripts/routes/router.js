app.router = Backbone.Router.extend({
    initialize : function() {
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
        "connectAccounts.html" : "connectAccounts",
        "connectCalendar.html" : "connectCalendar",
        "participant.html" : "participant",
        "material.html" : "material",
        "scheduling.html" : "scheduling",
        "meetme.html" : "meetmeCover",
        "meetmeConfig.html" : "meetmeConfig",
        "meetmeCalendar.html" : "meetmeCalendar",
        "meetmeConfirm.html" : "meetmeConfirm",
        "underConstruction.html" : "underConstruction",
        "apps.html" : "apps",
        "addParticipant.html" : "addParticipant"
    },

    apps : function( params ) {
        app.views.current = new app.appsView({
            el : '.content'
        });
        app.views.current.render();
        app.showContent();
    },

    underConstruction : function( params ) {

        app.views.current = new app.underConstructionView({
            el : '.content',
            message : params.message || 'The feature you are trying to access is not yet fully completed on the mobile side.',
            url : params.url

        });
        app.views.current.render();
        app.showContent();
    },

    meetmeCover : function( params ) {
        var user = params.user || '';
        var cal = params.cal || '';
        var quickmeet_key = params.quickmeet_key || '';
        var open_calendar = params.open_calendar || false;

        if( open_calendar ) {
            app.helpers.switchContext("meetmeCalendar", { user : user, cal : cal, quickmeet_key : quickmeet_key } );
        }

        // TODO: why some params are arrays?!

        if( ! app.collections.matchmakers ) {
            app.collections.matchmakers = new app.matchmakerCollection();
            app.collections.matchmakers.url = app.defaults.api_host + '/v1/matchmakers/';
        }
        if( ! app.models.user ){
            app.models.user = new app.userModel();
            app.models.user.url = app.defaults.api_host + '/v1/users/';
        }

        app.models.user.set('matchmaker_fragment', user );

        app.views.current = new app.meetmeCoverView({
            el : '.content',
            matchmakers_collection : app.collections.matchmakers,
            user_model : app.models.user,
            user_fragment : user,
            calendar : cal
        });

        if( app.collections.matchmakers.length === 0) {
            var watcher = new app.helpers.fetchTimeoutWatcher(app.options.fetchTimeout, '.loader');
            app.collections.matchmakers.fetch({
                data : { user_fragment : user, matchmaker_fragment : cal},
                success: function() {

                    app.models.user.fetch({ data : { user_fragment : user, image_size : 140 }, success : function() {
                        app.views.current.render();
                        watcher.fetchComplete = true;
                        app.showContent();
                    }});
                },
                error : function() {
                    return;
                    window.location = '404.html';
                }
            });
        }
        else {
            app.views.current.render();
            app.showContent();
        }
    },

    meetmeConfig : function( params ) {
        // Check and create models & cols where needed
        if( ! app.collections.matchmakers ) app.collections.matchmakers = new app.matchmakerCollection();
        if( ! app.models.user ) app.models.user = new app.userModel();

        // Set urls
        app.collections.matchmakers.url = app.defaults.api_host + '/v1/users/' + app.auth.user + '/matchmakers';
        app.models.user.url = app.defaults.api_host + '/v1/users/me';
        var suggestion_sources_url = app.defaults.api_host + '/v1/users/' + app.auth.user + '/suggestion_sources';

        // Create view
        app.views.current = new app.meetmeConfigView({  el : '.content', matchmaker_collection : app.collections.matchmakers, user_model : app.models.user });

        // Check if we want to fetch data
        if( app.collections.matchmakers.length === 0){
            var watcher = new app.helpers.fetchTimeoutWatcher(app.options.fetchTimeout, '.loader');

            // Setup deferreds
            var userFetch = $.Deferred(),
            //suggestionSourcesFetch = $.Deferred(),
            matchmakerFetch = $.Deferred();

            // wait for ajax requests to succeed, defer show content until that
            $.when(userFetch, /* suggestionSourcesFetch,*/ matchmakerFetch).then(function() {
                app.views.current.render();
                watcher.fetchComplete = true;
                app.showContent();
            });

            // Get user data
            app.models.user.fetch({ data : { image_size : 140 } , success : function() {
                userFetch.resolve();
            }});

            // Get matchmaker data
            app.collections.matchmakers.fetch({ success : function() {
                matchmakerFetch.resolve();
            }});

            // Get suggestion sources data
            /*$.get(suggestion_sources_url, function(res){
                app.models.user.set('suggestion_sources', res);
                suggestionSourcesFetch.resolve();
            });*/
        }
        else{
            app.views.current.render();
        }
    },

    meetmeCalendar : function( params ) {
        var user = params.user || '';
        var cal = params.cal || 'default';
        var quickmeet_key = params.quickmeet_key || '';
        var confirmed_lock = params.confirmed_lock_id || false;

        app.views.header = app.views.header || new app.headerView({ 'el' : '#meetings' });

        // Handle case when we are coming back from the email
        if(confirmed_lock) {
            app.models.lock = new app.matchmakerLockModel();
            app.models.lock.id = confirmed_lock;
            app.models.matchmaker = new app.matchmakerModel();
            var watcher = new app.helpers.fetchTimeoutWatcher(app.options.fetchTimeout, '.loader');
            app.models.lock.fetch({
                success : function(){
                    app.models.matchmaker.url = app.defaults.api_host + '/v1/matchmakers/' + app.models.lock.get('matchmaker_id');
                    app.models.matchmaker.fetch({ success : function() {
                        app.views.current = new app.meetmeConfirmedView({ el : '.content', lock : app.models.lock, matchmaker: app.models.matchmaker });
                        watcher.fetchComplete = true;
                        app.views.current.render();
                    }});
                }
            });
            return;
        }

        if( ! app.collections.matchmakers ) {
            app.collections.matchmakers = new app.matchmakerCollection();
            app.collections.matchmakers.url = app.defaults.api_host + '/v1/matchmakers/';
        }
        if( ! app.models.user ){
            app.models.user = new app.userModel();
            app.models.user.url = app.defaults.api_host + '/v1/users/';
        }

        // Hack the fragment into user model
        app.models.user.set('matchmaker_fragment', user);

        app.views.current = new app.meetmeCalendarView({
            el : '.content',
            matchmakers_collection : app.collections.matchmakers,
            selected_matchmaker_path : cal,
            quickmeet_key : quickmeet_key,
            user_model : app.models.user
        });

        if( app.collections.matchmakers.length === 0 ){

            // Setup deferreds
            var userFetch = $.Deferred(),
            matchmakerFetch = $.Deferred();
            var watcher = new app.helpers.fetchTimeoutWatcher(app.options.fetchTimeout, '.loader');

            // wait for ajax requests to succeed, defer show content until that
            $.when(userFetch, matchmakerFetch).then(function() {
                app.views.current.render();
                watcher.fetchComplete = true;
                app.showContent();
            });

            app.collections.matchmakers.fetch({
                data : { user_fragment : user, matchmaker_fragment : cal },
                success : function(col) {
                    matchmakerFetch.resolve();
                },
                error : function() {
                    window.location = '404.html';
                }
            });

            app.models.user.fetch({ data : { user_fragment : user, image_size : 140 }, success : function() {
                userFetch.resolve();
            }});
        }
        else{
            app.views.current.render();
            app.showContent();
        }
    },

    contextRedirect : function( params ) {
        var redirect_info_json = params.redirect_info;
        var redirect_info = JSON.parse( redirect_info_json );

        delete params.redirect_info;
        redirect_info[1].redirect_params = JSON.stringify( params );

        app.helpers.switchContext( redirect_info[0], redirect_info[1] );
    },

    meetings : function() {
        var that = this;

        // Prevent loading if not loggeding as it breaks app
        if(! app.auth.user ) {
            return;
        }

        app.helpers.tryToSellApps();

        // Render panel & setup header
        if( ! app.views.panel ) {
            app.views.panel = new app.panelView({ active : "meetings", el : '#left-panel' });
            app.views.panel.render();
        }
        if( ! app.views.header ) app.views.header = new app.headerView({ el : '#meetings' });

        // Get times
        var today = Math.floor( moment().startOf('day') / 1000 );

        // Deferreds for fetches
        var futureFetch = $.Deferred();
        var pastFetch = $.Deferred();
        var unscheduledFetch = $.Deferred();
        var userFetch = $.Deferred();

        var watcher = new app.helpers.fetchTimeoutWatcher(app.options.fetchTimeout, '.loader');

        // wait for ajax requests to succeed, defer show content until that
        $.when(futureFetch, unscheduledFetch, pastFetch, userFetch).then(function(){

            app.views.meetingsView.render();
            watcher.fetchComplete = true;
            app.showContent();
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

        app.models.user = app.models.user || new app.userModel();
        app.models.user.set( 'id', app.auth.user );

        // Create views
        app.views.meetingsView = app.views.meetingsView || new app.meetingsView({
            el : '.main-div',
            model : app.models.user
        });

        // Fetch things

        app.models.user.fetch({ success : function() {
            userFetch.resolve();
        }});

        var fetchFutureMeetings = function() {
            app.collections.future_meetings.fetch({ success : function(col,res){
                // Get times
                var today = Math.floor ( moment().utc().startOf('day') / 1000 );
                var today_end = Math.floor ( moment().utc().endOf('day') / 1000 );

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

        fetchFutureMeetings();

        app.collections.unscheduled_meetings.fetch({ success : function(col,res){
            unscheduledFetch.resolve();
        }, data : { include_draft : 1 }});

        app.collections.past_meetings.fetch({ success : function(col,res){
            pastFetch.resolve();
        }, data : { include_draft : 1, start_max : today, limit : 10, sort : "desc" } } );
    },

    _sentSuggestions : {},
    _formSuggestionBatchFromCalendarResult : function( result ) {
        var that = this;
        var count = 0;
        var results = _.map( result, function( r ) {
            if ( r.allDay == 'true' ) return {};

            var begin_epoch = r.startDateEpoch || '0';
            var end_epoch = r.endDateEpoch || '0';

            begin_epoch = begin_epoch.replace(/\.0+$/,'');
            end_epoch = end_epoch.replace(/\.0+$/,'');

            if ( ! begin_epoch ) return {};

            if ( count > 50 ) return {};

            var participant_list = _.map( r.attendees || [], function( p ) {
                var name = p.name ? "" + p.name : '';
                var email = p.email ? "" + p.email : '';
                if ( p.url && ! email ) {
                    var u = p.url ? "" + p.url : '';
                    email = u.replace(/mailto\:/, '');
                }
                if ( ! email ) return '';
                if ( ! name ) return email;

                name = name.replace( /\"/g, '' ); // " fix vim syntax higlight

                return '"' + name + '" <' + email + '>';
            } );

            participant_list = _.filter( participant_list, function(p) { return p ? true : false; } );

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
                location : r.location,
                source : 'phone:' + ( r.calendar || ''),
                participant_list : participant_list.join(", ")
//                organizer : ''
            };

            var stamp = JSON.stringify( suggestion );

            if ( this._sentSuggestions[ stamp ] ) return {};
            this._sentSuggestions[ stamp ] = 1;

            count++;

            return suggestion;
        }, this );

        return _.filter( results, function( item ) { return item.begin_epoch ? true : false; } );
    },

    login : function(params) {

        // Go to the new site for login stuff
        if( window.location.href.indexOf('localhost') === -1 && ( app.helpers.isMobile.Android() || app.helpers.isMobile.iOS() || app.helpers.isMobile.Windows() ) ) {
            window.location = app.defaults.new_mobile_redirect_url;
            return;
        }

        var that = this;
        if ( params && params.fb_login ) {
            params = { fb_code : params.code, fb_redirect_uri : params.redirect_uri };
            $.post( app.defaults.api_host + '/v1/login', params, function( response ){
                if( response.result && response.result.user_id ){
                    app._loginWithParams( response.result.user_id, response.result.token );
                    app.helpers.switchContext('meetingsPage');
                }
                else {
                    that._render_login( 'Failed to connect with Facebook' );
                }
            }, 'json' );
        }
        else if ( params && params.google_login ) {
            params = { google_code : params.code, google_redirect_uri : params.redirect_uri };
            $.post( app.defaults.api_host + '/v1/login', params, function( response ){
                if( response.result ){
                    if ( response.result.user_id ) {
                        app._loginWithParams( response.result.user_id, response.result.token );
                        app.helpers.switchContext('meetingsPage');
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

        var watcher = new app.helpers.fetchTimeoutWatcher(app.options.fetchTimeout, '.loader');

        // TODO: remove and recreate
        app.views.profile = new app.profileView({
            el : $('#profile-page'),
            context_after_tos_accept : context,
            model : app.models.currentUser
        });

        app.models.currentUser.fetch({ success : function() {
            watcher.fetchComplete = true;
            app.views.profile.render();
            app.showContent();

        }, data : { image_size : 70 }});
    },

    meeting : function(params) {
        app.helpers.tryToSellApps();

        // Get url params
        var id = params.id || 0;
        var mm_mode = params.matchmaking_response || false;

        var watcher = new app.helpers.fetchTimeoutWatcher(app.options.fetchTimeout, '.loader');

        // Setup deferreds
        var meetingFetch = $.Deferred(),
        materialsFetch = $.Deferred(),
        participantsFetch = $.Deferred();

        // wait for ajax requests to succeed, defer show content until that
        $.when(meetingFetch, materialsFetch, participantsFetch).then(function(){
            watcher.fetchComplete = true;
            app.views.meeting.render();
            app.showContent();
        });

        // Setup models & collections
        if( ! app.collections.materials ) app.collections.materials = new app.materialCollection( [], { meeting_id : id } );
        app.collections.materials.url = app.defaults.api_host + '/v1/meetings/' + id + '/materials';

        // Setup models & collections
        if( ! app.collections.participants ) app.collections.participants = new app.participantCollection( [], { meeting_id : id } );
        app.collections.participants.url = app.defaults.api_host + '/v1/meetings/' + id + '/participants';

        if( ! app.models.meeting ) app.models.meeting = new app.meetingModel();
        app.models.meeting.url = app.defaults.api_host + '/v1/meetings/' + id;

        // Setup views
        // TODO: Panel view needs to know what rights the user has
        if( ! app.views.panel ) {
            app.views.panel = new app.panelView({ active : "meetings", el : '#left-panel' });
            app.views.panel.render();
        }

        if (! app.views.header ) app.views.header = new app.headerView({ el : '#meetings' });

        if( ! app.views.meeting ) app.views.meeting = new app.meetingView({
            el : $('#meeting'),
            model : app.models.meeting,
            mm_mode : mm_mode
        });

        // TODO: Think how data could  be fetched in parallel here. Probably by creating top level view meeting
        // with subviews for info and materials
        app.models.meeting.fetch({ success : function(){
            meetingFetch.resolve();
        }, timeout : 5000, silent : true });

        app.collections.materials.fetch({ success : function(){
            materialsFetch.resolve(); // Resolve deferred
        }, timeout : 5000, silent : true }); // Silent as we want to render when both fetches are done

        app.collections.participants.fetch({ success : function(){
            participantsFetch.resolve(); // Resolve deferred
        }, timeout : 5000, silent : true }); // Silent as we want to render when both fetches are done
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

        var watcher = new app.helpers.fetchTimeoutWatcher(app.options.fetchTimeout, '.loader');
        app.models.meeting.fetch({ success : function(){
            // Init current meeting user
            var data = app.models.meeting.getMeetingUserByID( app.auth.user );
            app.models.meeting_user = new app.participantModel( data, { meeting_id : id } );
            app.views.scheduling.render();
            watcher.fetchComplete = true;
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

        var watcher = new app.helpers.fetchTimeoutWatcher(app.options.fetchTimeout, '.loader');
        app.collections.participants.fetch({ success : function(){
            $('a.addParticipant').click(function(e) {
                e.preventDefault();
                app.helpers.switchContext("addParticipantPage", { id : id } );
            });
            watcher.fetchComplete = true;
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

        var watcher = new app.helpers.fetchTimeoutWatcher(app.options.fetchTimeout, '.loader');
        app.models.participant.fetch({ success : function(){
            watcher.fetchComplete = true;
            app.showContent();
        }});
    },

    material : function(params) {
        var commentsFetched = $.Deferred();
        var materialFetched = $.Deferred();
        var watcher = new app.helpers.fetchTimeoutWatcher(app.options.fetchTimeout, '.loader');

        $.when(commentsFetched, materialFetched).then(function(){
            if( app.models.material.get('fetch_type') === 'chat' ) $('#open-right-panel').hide();
            else $('#open-right-panel').show();
            watcher.fetchComplete = true;
            app.showContent();
        });

        var id = params.id;

        app.models.material = app.models.material || new app.materialModel();
        app.models.material.clear();
        app.models.material.set( "id", id );

        app.collections.comments = app.collections.comments || new app.commentCollection();
        app.collections.comments.url = app.defaults.api_host + '/v1/meeting_materials/' + id + '/comments';

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

        app.models.material.fetch({ success : function(){
            materialFetched.resolve();
        }});

        app.collections.comments.fetch({ success : function(){
            commentsFetched.resolve();
        }});
    },

    connectAccounts : function(params) {
        app.views.header = new app.headerView({ el : '#page .view-container' });
        if ( params.google_calendar ) {
            return app.startGoogleConnecting( 'connectAccountsPage', { google_connected : 1 } );
        }
        else if ( params.google_connected ) {
            var redirect_params = JSON.parse( params.redirect_params );
            var user = new app.userModel( { id : app.auth.user } );
            var watcher = new app.helpers.fetchTimeoutWatcher(app.options.fetchTimeout, '.loader');
            user.fetch( { success : function() {
                user.save( {
                    google_code : redirect_params.code,
                    google_redirect_uri : redirect_params.redirect_uri
                }, { success : function() {
                    watcher.fetchComplete = true;
                    app.helpers.switchContext('meetingsPage');
                } } );
            } } );
        }
        else {
            setTimeout( function() {
                alert( "you should not be here.. :(" );
                app.helpers.popContext();
            }, 1000 );
        }

    },
    connectCalendar : function(params) {
        if ( app.views.connectCalendar ) app.views.connectCalendar.close();

        app.views.connectCalendar = new app.connectCalendarView({
            el : $('#page .view-container')
        });
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

        var watcher = new app.helpers.fetchTimeoutWatcher(app.options.fetchTimeout, '.loader');
        app.models.meeting.fetch({ success : function() {
            app.showContent();
            watcher.fetchComplete = true;
            app.views.addParticipant.render();
        }});
    }
});
