// Function to send AG API -messages
(function(){

    window.AppGyver = {

        views : [
            { file : 'index.html', id : 'meetingsPage' },
            { file : 'login.html', id : 'loginPage' },
            { file : 'meeting.html', id : 'meetingPage' },
            { file : 'participants.html', id : 'participantsPage' }
        ],

        init: function(){
            var path = app.options.build === 'ios' ? 'http://localhost:13101' : '';

            // open target blank links, material contents and profile linkedn  in safari
            $(document).on("click", "a[target='_blank'], li#material_content > a, p.mtngs-linkedin > a", function(e){
                e.preventDefault();
                steroids.openURL(encodeURI($(this).attr("href")));
            });

            // handle preloading on app start
            if (/appstart\.html/.test(window.location.href)) {
                steroids.on("ready", function(){
                    var loginPage = $.Deferred();
                    var meetingsPage = $.Deferred();
                    $.when( loginPage, meetingsPage).then(function(){
                        setTimeout(function(){
                            app.init();
                        }, 750);
                    });
                    AppGyver.preload(path + "/index.html", "meetingsPage", meetingsPage);
                    AppGyver.preload(path + "/login.html", "loginPage", loginPage);
                    AppGyver.preload(path + "/meeting.html", "meetingPage");
                    AppGyver.preload(path + "/participants.html", "participantsPage");
                    AppGyver.preload(path + "/participant.html", "participantPage");
                    AppGyver.preload(path + "/materials.html", "materialsPage");
                    AppGyver.preload(path + "/material.html", "materialPage");
                    AppGyver.preload(path + "/scheduling.html", "schedulingPage");
                    AppGyver.preload(path + "/addParticipant.html", "addParticipantPage");
                    AppGyver.preload(path + "/edit.html", "editPage");
                    AppGyver.preload(path + "/editMaterial.html", "editMaterialPage");
                    AppGyver.preload(path + "/profile.html", "profilePage");
                    AppGyver.preload(path + "/signup.html", "signupPage");
                });
            }
            else {
                // add listeners for triggering updates to preloaded views
                switch (window.location.href){
                    case path + "/index.html":
                        window.addEventListener("message", function(event) {
                        if (event.data.preloadId === "meetingsPage") AppGyver.refreshPreload(event.data.urlParams);
                    });
                    break;
                    case path + "/login.html":
                        window.addEventListener("message", function(event) {
                        if (event.data.preloadId === "loginPage") AppGyver.refreshPreload(event.data.urlParams);
                    });
                    break;
                    case path + "/signup.html":
                        window.addEventListener("message", function(event) {
                        if (event.data.preloadId === "signupPage") AppGyver.refreshPreload(event.data.urlParams);
                    });
                    break;
                    case path + "/meeting.html":
                        window.addEventListener("message", function(event) {
                        if (event.data.preloadId === "meetingPage") AppGyver.refreshPreload(event.data.urlParams);
                    });
                    break;
                    case path + "/addParticipant.html":
                        window.addEventListener("message", function(event) {
                        if (event.data.preloadId === "addParticipantPage") AppGyver.refreshPreload(event.data.urlParams);
                    });
                    break;
                    case path + "/edit.html":
                        window.addEventListener("message", function(event) {
                        if (event.data.preloadId === "editPage") AppGyver.refreshPreload(event.data.urlParams);
                    });
                    break;
                    case path + "/participants.html":
                        window.addEventListener("message", function(event) {
                        if (event.data.preloadId === "participantsPage") AppGyver.refreshPreload(event.data.urlParams);
                    });
                    break;
                    case path + "/participant.html":
                        window.addEventListener("message", function(event) {
                        if (event.data.preloadId === "participantPage") AppGyver.refreshPreload(event.data.urlParams, true);
                    });
                    break;
                    case path + "/materials.html":
                        window.addEventListener("message", function(event) {
                        if (event.data.preloadId === "materialsPage") AppGyver.refreshPreload(event.data.urlParams);
                    });
                    break;
                    case path + "/material.html":
                        // override 'close' to close modal, not go back popping layer
                        $(".back-button ").off().on("click", function(e){
                        e.preventDefault();
                        steroids.modal.hide();
                    });
                    window.addEventListener("message", function(event) {
                        if (event.data.preloadId === "materialPage") AppGyver.refreshPreload(event.data.urlParams, true);
                    });
                    break;
                    case path + "/editMaterial.html":
                        window.addEventListener("message", function(event) {
                        if (event.data.preloadId === "editMaterialPage") AppGyver.refreshPreload(event.data.urlParams, true);
                    });
                    break;
                    case path + "/profile.html":
                        window.addEventListener("message", function(event) {
                            if (event.data.preloadId === "profilePage") AppGyver.refreshPreload(event.data.urlParams, true);
                        });
                    break;
                    case path + "/scheduling.html":
                        window.addEventListener("message", function(event) {
                        if (event.data.preloadId === "schedulingPage") AppGyver.refreshPreload(event.data.urlParams, true);
                    });
                    break;
                }
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
                steroids.layers.push(options, {onSuccess: removeActive});
            }
        },

        // this could actually be implemented using backbone model changing etc.
        refreshPreload: function(urlParams, isPath){

            // TODO: Make handling if url params & stuff sane here
            var id = urlParams.id || urlParams.path;
            var url;

            if (isPath) {
                url = window.location.origin + id;
            }
            else {
                url = window.location.origin + window.location.pathname + "?id="+id;
            }


            if( urlParams.field ) url += '&field=' + urlParams.field;
            if( urlParams.url_after ) url += '&url_after=' + urlParams.url_after;

            console.log("change to url: ", url);

            if (typeof window.router === "undefined") {

                history.replaceState({}, document.title, url);

                app.init();

            }
            else {

                //router.navigate( url, { trigger : true, replace : true } );
                if (window.location.href === url) {

                    app.showContent();

                }
                else {

                    history.replaceState({}, document.title, url);

                    Backbone.history.checkUrl();

                }

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

        // Return preload id for a given url
        getPreloadIdFromUrl : function(url){
            for (var i = 0; i < this.views.length; i++) {
                if( url.indexOf( this.views[i].file ) !== 0 ) return this.views[i].id;
            }
            return false;
        }
    }
})(window);
