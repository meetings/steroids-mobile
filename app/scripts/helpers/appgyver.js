// Function to send AG API -messages
(function(){

    window.AppGyver = {
        contexts : [
            { file : 'index.html', id : 'meetingsPage', no_preload : true },
            { file : 'login.html', id : 'loginPage', load_before_init : true },
            { file : 'profile.html', id : 'profilePage', load_before_init : true },
            { file : 'meeting.html', id : 'meetingPage' },
            { file : 'participants.html', id : 'participantsPage' },
            { file : 'participant.html', id : 'participantPage' },
            { file : 'materials.html', id : 'materialsPage' },
            { file : 'material.html', id : 'materialPage' },
            { file : 'scheduling.html', id : 'schedulingPage' },
            { file : 'addParticipant.html', id : 'addParticipantPage' },
            { file : 'edit.html', id : 'editPage' },
            { file : 'edit.html', id : 'singleEditPage' },
            { file : 'editMaterial.html', id : 'editMaterialPage', shared_file : 'init.html', shared_id : 'init' },
            { file : 'renameMaterial.html', id : 'renameMaterialPage', shared_file : 'init.html', shared_id : 'init' },
            { file : 'signup.html', id : 'signupPage' }
        ],

        init: function(){
            var that = this;

            // open target blank links, material contents and profile linkedn  in safari
            $(document).on("click", "a[target='_blank'], li#material_content > a, p.mtngs-linkedin > a", function(e){
                e.preventDefault();
                steroids.openURL(encodeURI($(this).attr("href")));
            });

            // handle preloading on app start
            if (/index\.html/.test(window.location.href)) {

                steroids.on("ready", function(){
                    that.ensure_preloads('only_preloads_before_init');
                    setTimeout(function(){
                        app.init();
                        that.ensure_preloads();
                    }, 2000 );
                });

                AppGyver.current_context_id = 'meetingsPage';
                AppGyver.current_context = this.getContextForID( 'meetingsPage' );
            }
            else {
                var id_parts = /[\?\&]steroids_preload_id=([^\&]*)/.exec( window.location.href );
                if ( id_parts[1] ) {
                    AppGyver.current_context_id = id_parts[1];
                    AppGyver.current_context = this.getContextForID( id_parts[1] );
                }
                else {
                    alert("AppGyver init called without preload_id outside index.html!");
                }
            }

            window.addEventListener("message", function(event) {
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
        },

        preloaded_ids : {},

        ensure_preloads : function( only_preloads_before_init ) {
            var path = app.options.build === 'ios' ? 'http://localhost:13101' : '';

            var context, preload_path, i, id, file;

            for ( i in AppGyver.contexts ) {
                context = AppGyver.contexts[i];

                if ( context.no_preload ) continue;
                if ( only_preloads_before_init && ! context.load_before_init ) continue;

                id = context.shared_id || context.id;
                file = context.shared_id ? context.shared_file : context.file;

                if ( this.preloaded_ids[id] ) continue;

                this.preloaded_ids[ id ] = true;
                preload_path = "/" + file + '?steroids_preload_id=' + id;
                AppGyver.preload( path + preload_path, id );
            }
        },
        preload: function(url, id, deferred ){
            (new steroids.views.WebView(url)).preload({id: id}, { onSuccess : function(){
                if( deferred ) deferred.resolve();
            }});
        },

        // TODO: support different animations
        openPreload: function(context, params, opts ) {
            var openInModal = context.open_in_modal;
            var animation = context.animation;

            console.log("requesting refresh for preload " + context.id);
            window.postMessage( { urlParams: params, preloadId: context.id }, "*");

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
                else if( context.id === 'meetingsPage' ){
                    steroids.layers.popAll();
                }
                else{
                    steroids.layers.push(options, {onSuccess: removeActive});
                }
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
            }, 500 );
        },

        switchContext: function( context_id, params, options ) {
            params = params || {};

            var context = this.getContextForID( context_id );
            if ( ! context ) {
                alert( "unknown context switch: " + context_id );
            }

            if ( app.options.build !== 'web' ) {
                AppGyver.openPreload( context, params, options );
                this.scheduleCleaning();
             }
            else {
                window.location = this.formContextURL( context, params );
            }
        },
        popContext : function() {
            if ( app.options.build !== 'web' ) {
                steroids.layers.pop();
                this.scheduleCleaning();
            }
            else if ( $('.back-button').length && $('.back-button').attr('href') !== '#' ){
                window.location = $('.back-button').attr('href');
            }
            else {
                history.go(-1);
            }
        },
        formContextURL : function( context, params, randomize, preload_id ) {
            params = params || {};

            var query_options=[];
            var param;

            for ( param in params ) {
                query_options.push( encodeURIComponent(param) + '=' + encodeURIComponent( params[param] ) );
            }
            
            if ( randomize ) query_options.push( 'm_rand=' + Math.random() );
            if ( preload_id ) query_options.push( 'steroids_preload_id=' + context.id );

            var query_string = query_options.length ? '?' : '';
            query_string = query_string + query_options.join('&');

            return '/' + context.file + query_string;
        },
        getContextForID : function( id ){
            for (var i = 0; i < this.contexts.length; i++) {
                if ( id == this.contexts[i].id ) return this.contexts[i];
            }
            return false;
        }
    }
})(window);
