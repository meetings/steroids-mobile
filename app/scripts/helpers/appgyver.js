// Function to send AG API -messages
(function(){

    window.AppGyver = {
        contexts : [
            { file : 'index.html', id : 'meetingsPage', load_before_init : true },
            { file : 'login.html', id : 'loginPage', load_before_init : true, open_in_modal : false },
            { file : 'profile.html', id : 'profilePage', load_before_init : true },
            { file : 'meeting.html', id : 'meetingPage' },
            { file : 'participants.html', id : 'participantsPage' },
            { file : 'participant.html', id : 'participantPage', open_in_modal : false },
            { file : 'materials.html', id : 'materialsPage' },
            { file : 'material.html', id : 'materialPage' },
            { file : 'scheduling.html', id : 'schedulingPage', open_in_modal : false },
            { file : 'addParticipant.html', id : 'addParticipantPage' },
            { file : 'edit.html', id : 'editPage' },
            { file : 'editMaterial.html', id : 'editMaterialPage', open_in_modal : false },
            { file : 'signup.html', id : 'signupPage' }
        ],

        init: function(){
            var path = app.options.build === 'ios' ? 'http://localhost:13101' : '';

            // open target blank links, material contents and profile linkedn  in safari
            $(document).on("click", "a[target='_blank'], li#material_content > a, p.mtngs-linkedin > a", function(e){
                e.preventDefault();
                steroids.openURL(encodeURI($(this).attr("href")));
            });

            // handle preloading on app start
            if (/index\.html/.test(window.location.href)) {
                steroids.on("ready", function(){
                    var before_init_deferreds = [];

                    for ( var i in AppGyver.contexts ) {
                        var context = AppGyver.contexts[i];
                        if( context.id === 'meetingsPage' ) continue;
                        var deferred = context.load_before_init ? $.Deferred() : false;
                        if ( deferred ) before_init_deferreds.push( deferred );
                        AppGyver.preload( path + "/" + context.file, context.id, deferred );
                    }

                  //  $.when.apply( $, before_init_deferreds ).then(function(){
                        setTimeout(function(){
                            app.init();
                        }, 1000);
                   // });
                });
            }
            for ( var i in AppGyver.contexts ) {
                this.initMatchingContext( window.location.href + "", path, AppGyver.contexts[i] );
            }
        },

        initMatchingContext: function( href, path, context ) {
            if ( href == path + '/' + context.file ) {
                window.addEventListener("message", function(event) {
                    if ( event.data.preloadId !== context.id ) return;
                    app.current_context = context;
                    AppGyver.refreshPreload( context, event.data.urlParams );
                } );
            }

        },

        preload: function(url, id, deferred ){
            (new steroids.views.WebView(url)).preload({id: id}, { onSuccess : function(){
                if( deferred ) deferred.resolve();
            }});
        },

        // TODO: support different animations
        openPreload: function(preloadId, urlParams, openInModal, animation ){

            window.postMessage({urlParams: urlParams, preloadId: preloadId}, "*");

            var removeActive = function() {
                $(".ui-btn-active").removeClass("ui-btn-active");
                $("#left-panel").panel('close');
                $("#edit-meeting-panel").panel('close');
                $("#edit-material-panel").panel('close');
            };

            var options = {
                view: {
                    id: preloadId,
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

                if( preloadId === 'meetingsPage' ){
                    steroids.layers.popAll();
                }
                else{
                    steroids.layers.push(options, {onSuccess: removeActive});
                }
            }
        },
        // this could actually be implemented using backbone model changing etc.
        refreshPreload: function( context, params ){
            var url = this.formContextURL( context, params );
            console.log("change to url: ", url);

            if (typeof window.router === "undefined") {
                history.replaceState({}, document.title, url);
                app.init();
            }
            else {
                AppGyver.hideContent();

                if ( "" + window.location.pathname + window.location.search == url) {
                    url = url + ( ( url.indexOf('?') > -1 ) ? '&' : '?' );
                    url = url + 'random=1';
                }
                console.log("real url: ", url );

                history.replaceState({}, document.title, url);
                Backbone.history.checkUrl();

                //router.navigate( url, { trigger : true, replace : true } );
                /*Backbone.history.navigate(pathname+"?id="+id, {trigger: true, replace: true});*/
                // not working as expected, pollutes window.location.search with duplicate parameters
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

        switchContext: function( context_id, params, options ) {
            params = params || {};

            var context = this.getContextForID( context_id );
            if ( ! context ) {
                alert( "unknown context switch: " + context_id );
            }

            if ( app.options.build !== 'web' ) {
                AppGyver.openPreload( context_id, params, context.open_in_modal, context.animation );
            }
            else {
                window.location = this.formContextURL( context, params );
            }
        },
        popContext : function() {
            if ( app.options.build !== 'web' ) {
                if ( app.current_context && app.current_context.open_in_modal ) {
                    steroids.modal.hide();
                }
                else {
                    steroids.layers.pop();
                }
            }
            else if ( $('.back-button').attr('href') !== '#' ){
                window.location = $('.back-button').attr('href');
            }
            else {
                history.go(-1);
            }
        },
        formContextURL : function( context, params ) {
            params = params || {};
            var query_options=[];
            var param;
            for ( param in params ) {
                query_options.push( encodeURIComponent(param) + '=' + encodeURIComponent( params[param] ) );
            }
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
