// Function to send AG API -messages
(function(){

    window.AppGyver = {
        contexts : [
            { file : 'index.html', id : 'meetingsPage', no_preload : true },
            { file : 'login.html', id : 'loginPage', load_before_init : true },
            { file : 'profile.html', id : 'profilePage' },
            { file : 'meeting.html', id : 'meetingPage' },
            { file : 'participants.html', id : 'participantsPage' },
            { file : 'participant.html', id : 'participantPage' },
            { file : 'material.html', id : 'materialPage' },
            { file : 'scheduling.html', id : 'schedulingPage' },
            { file : 'addParticipant.html', id : 'addParticipantPage' },
            { file : 'calconfig.html', id : 'calconfigPage' },
            { file : 'meetme.html', id : 'meetmeCover', no_preload : true },
            { file : 'meetmeCalendar.html', id : 'meetmeCalendar', no_preload : true },
            { file : 'meetmeConfig.html', id : 'meetmeConfig', no_preload : true },
            { file : 'edit.html', id : 'editPage' },
            { file : 'edit.html', id : 'singleEditPage' },
            { file : 'editMaterial.html', id : 'editMaterialPage', shared_file : 'init.html', shared_id : 'init' },
            { file : 'renameMaterial.html', id : 'renameMaterialPage', shared_file : 'init.html', shared_id : 'init' },
            { file : 'connectAccounts.html', id : 'connectAccountsPage', shared_file : 'init.html', shared_id : 'init' },
            { file : 'connectCalendar.html', id : 'connectCalendarPage', shared_file : 'init.html', shared_id : 'init' },
            { file : 'signup.html', id : 'signupPage' },
            { file : 'underConstruction.html', id : 'underConstruction', no_preload : true }
        ],

        init: function(){
            var that = this;

            if (/contextRedirect\.html/.test(window.location.href)) {
                return app.init();
            }

            // open target blank links, material contents and profile linkedn  in safari
            $(document).on("click", "a[target='_blank'], li#material_content > a, p.mtngs-linkedin > a", function(e){
                e.preventDefault();
                steroids.openURL(encodeURI($(this).attr("href")));
            });

            // handle preloading on app start
            if (/index\.html/.test(window.location.href)) {

                steroids.on("ready", function(){
                    that.ensure_preloads( function(){
                            app.init();
                            that.ensure_preloads( function() {
                                console.log('all preloads done');
                            });
                    }, 'first' );
                });

                AppGyver.current_context_id = 'meetingsPage';
                AppGyver.current_context = this.getContextForID( 'meetingsPage' );

                // Check version
                setTimeout( function(){
                    app._versionCheck();
                }, 5000);
            }
            else {
                var id_parts = /[\?\&]steroids_preload_id=([^\&]*)/.exec( window.location.href );
                if ( id_parts[1] ) {
                    AppGyver.current_context_id = id_parts[1];
                    AppGyver.current_context = this.getContextForID( id_parts[1] );
                }
                else {
                    console.log('AppGyver init called without preload_id outside index.html!');
                }
            }

            window.addEventListener("message", function(event) {
                if ( event.data.type != 'refreshPreload' ) return;
                if ( AppGyver.current_context ) {
                    if ( event.data.preloadId == AppGyver.current_context_id ) {
                        AppGyver.refreshPreload( AppGyver.current_context, event.data.urlParams );
                    }
                }
                else {
                    var context = that.getContextForID( event.data.preloadId );
                    if ( context && context.shared_id == AppGyver.current_context_id ) {
                        AppGyver.refreshPreload( context, event.data.urlParams );
                    }
                }
            } );

            // TODO: Make sure we have sent the message
            window.postMessage( { type : 'preloadReady', readyPreloadId : AppGyver.current_context_id }, "*");

            var start_parts = /[\?\&]start_refresh=([^\&]*)/.exec( window.location.href );

            if ( start_parts && start_parts[1] ) {
                var start = JSON.parse( decodeURIComponent( start_parts[1] ) );
                var context = that.getContextForID( start[0] );
                AppGyver.refreshPreload( context, start[1] );
            }

        },

        preloaded_ids : {},
        ready_view_ids : {},

        ensure_preloads : function( all_ready_handler, before_load ) {
            var path = app.options.build === 'ios' ? 'http://localhost:13101' : '';

            var that = this;

            var deferreds = [];

            _.each( AppGyver.contexts, function( context ) {
                if ( context.no_preload ) return;

                var id = context.shared_id || context.id;

                if ( before_load && ! context.load_before_init ) return;

                if ( this.preloaded_ids[id] ) return;
                this.preloaded_ids[ id ] = true;

                var readyDeferred = $.Deferred();
                var readyListener = function( event ) {
                    if ( event.data.type != 'preloadReady' ) return;
                    if ( event.data.readyPreloadId != id ) return;
                    readyDeferred.resolve();
                    that.ready_view_ids[id] = true;
                    window.removeEventListener("message", readyListener );
                };

                window.addEventListener("message", readyListener );

                deferreds.push( readyDeferred );

                AppGyver.preload( path + this.formSharedContextURL( context ), id );
            }, this );

            if ( all_ready_handler ) {
                $.when.apply( $, deferreds ).then( all_ready_handler );
            }
        },
        preload: function(url, id, deferred ){
            (new steroids.views.WebView(url)).preload({id: id}, { onSuccess : function(){
                if( deferred ) deferred.resolve();
            }, onFailure : function() { console.log('preload failed for : ' + id ); } });
        },

        // TODO: support different animations
        openPreload: function(context, params, opts ) {
            var openInModal = context.open_in_modal;
            var animation = context.animation;

            var doOpen = function() {
                window.postMessage( { type : 'refreshPreload', urlParams: params, preloadId: context.id }, "*");

                var removeActive = function() {
                    $(".ui-btn-active").removeClass("ui-btn-active");
                    $("#left-panel").panel('close');
                    $("#edit-meeting-panel").panel('close');
                    $("#edit-material-panel").panel('close');
                };

                var options = {
                    view: {
                        id: context.shared_id || context.id,
                        keepLoading: true
                    },
                    navigationBar: false
                };

                if( animation == 'login'){
                    options.animation = {
                        transition: "slideFromBottom",
                        duration: 0.4,
                        curve: "easeInOut",
                        reversedTransition: "slideFromTop",
                        reversedDuration: 0.4
                    };
                }

                if (openInModal) {
                    var modal = new steroids.views.WebView("");
                    modal.id = preloadId;
                    steroids.modal.show({
                        view: modal,
                        keepLoading: false
                    },{
                        onSuccess: removeActive
                    });
                } else {
                    if ( opts && opts.pop ) {
                        steroids.layers.pop();
                    }
                    else if( context.id === 'meetingsPage' ) {
                        steroids.layers.popAll();
                    }
                    else{
                        steroids.layers.push(options, {onSuccess: removeActive});
                    }
                }
            };

            // TODO: Ready_view_ids is does not actually yet guarantee reloads
            // any more than preloaded_ids.
            if( /index\.html/.test(window.location.href) && (! this.preloaded_ids[(context.shared_id || context.id)] || ! this.ready_view_ids[(context.shared_id || context.id)] ) ) {
                this.ensure_preloads( function() {
                    doOpen();
                });
            }
            else{
                doOpen();
            }

        },

        previous_refresh_date : false,

        refreshPreload: function( context, params ){
            if ( this.previous_refresh_date && this.previous_refresh_date.getTime() + 500 > new Date().getTime() ) {
                console.log("skipped duplicate reload request for " + context.id );
                return;
            }

            this.previous_refresh_date = new Date();

            if ( app.options.build === 'web' ) {
                alert("unexpectedly ran refreshPreload in web!");
            }

            var url = this.formContextURL( context, params, 'randomize' );
            console.log("change to url: ", url);

            history.replaceState({}, document.title, url);

            if (typeof window.router === "undefined") {
                app.init();
            }
            else {
                AppGyver.hideContent();
                app.initializeAuthFromCookie();
                Backbone.history.checkUrl();
            }
        },

        // Changed the implementation everywhere so that all the views have .content and .loader divs
        // .content is hidden by default and .loader is shown. Also moved show content to app.helpers
        hideContent: function(){
            $('div.content').hide();
            $('div.loader').show();
        },

        // clear events from preloaded views to prevent previous render events triggering
        cleanBackboneZombieEvents: function(){
            Object.keys(app.views).forEach(function(viewName){
                app.views[viewName].undelegateEvents();
            });
        },

        scheduleCleaning: function() {
            var path = app.options.build === 'ios' ? 'http://localhost:13101' : '';
            var that = this;
            setTimeout( function() {
                if ( AppGyver.current_context_id == 'init' ) {
                    window.location = path + '/init.html?steroids_preload_id=init';
                }
                else {
                    AppGyver.hideContent();
                }
            }, 500 );
        },

        switchContext: function( context_id, params, options ) {
            console.log('switch context to ' + context_id);
            params = params || {};

            var context = this.getContextForID( context_id );
            if ( ! context ) {
                alert( "unknown context switch: " + context_id );
            }

            if ( app.options.build !== 'web' ) {
                AppGyver.openPreload( context, params, options );
                if ( ( context_id == 'meetingsPage' || ( options && options.pop ) ) && AppGyver.current_context_id != 'meetingsPage' ) {
                    this.scheduleCleaning();
                }
             }
            else {
                window.location = this.formContextURL( context, params );
            }
        },

        refreshContext: function() {
            AppGyver.hideContent();
            Backbone.history.loadUrl();
        },

        reloadContext: function( context_id, params, options ) {
            params = params || {};

            var context = this.getContextForID( context_id );
            if ( ! context ) {
                alert( "unknown context refresh: " + context_id );
            }

            if ( app.options.build !== 'web' ) {
                var start_refresh = JSON.stringify( [ context_id, params ] );

                window.location = this.formSharedContextURL( context, { start_refresh : start_refresh } );
             }
            else {
                window.location = this.formContextURL( context, params );
            }
        },

        popContext : function() {
            if ( app.options.build !== 'web' ) {
                if ( AppGyver.back_context ) {
                    AppGyver.switchContext( AppGyver.back_context[0], AppGyver.back_context[1], { pop : 1 } );
                    AppGyver.back_context = false;
                }
                else {
                    steroids.layers.pop();
                }

                this.scheduleCleaning();
            }
            else if ( $('.back-button').length && $('.back-button').attr('href') !== '#' ){
                window.location = $('.back-button').attr('href');
            }
            else {
                history.go(-1);
            }
        },
        formSharedContextURL : function( context, params, randomize ) {
            params = params || {};
            params.steroids_preload_id = context.shared_id || context.id;
            var query_string = this._formQueryString( params, randomize );
            var file = context.shared_file || context.file;
            return '/' + file + query_string;
        },
        formContextURL : function( context, params, randomize ) {
            params = params || {};
            params.steroids_preload_id = context.id;
            var query_string = this._formQueryString( params, randomize );

            return '/' + context.file + query_string;
        },
        formContextRedirectUrl : function( context, params ) {
            var redirect_info = [ context, params ];

            return '/contextRedirect.html?redirect_info=' + encodeURIComponent( JSON.stringify( redirect_info ) );
        },
        _formQueryString : function( params, randomize ) {
            if ( randomize ) params.m_rand = Math.random();

            var query_options=[];
            var param;

            for ( param in params ) {
                query_options.push( encodeURIComponent(param) + '=' + encodeURIComponent( params[param] ) );
            }

            var query_string = query_options.length ? '?' : '';
            query_string = query_string + query_options.join('&');

            return query_string;
        },
        getContextForID : function( id ){
            for (var i = 0; i < this.contexts.length; i++) {
                if ( id == this.contexts[i].id ) return this.contexts[i];
            }
            return false;
        }
    }
})(window);
