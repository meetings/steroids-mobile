// Function to send AG API -messages
(function(){

  window.AppGyver = {

    init: function(){
        var path = app.options.build === 'ios' ? 'http://localhost:13101' : '';

      // open target blank links, material contents and profile linkedn  in safari
      $(document).on("click", "a[target='_blank'], li#material_content > a, p.mtngs-linkedin > a", function(e){
        e.preventDefault();
        steroids.openURL(encodeURI($(this).attr("href")));
      });

      // handle preload views
      // and init index.html,
      // preloads are initted when used the first time by AppGyver.refreshPreload function
      if (/index\.html/.test(window.location.href)) {

        // wait for steroids to be ready (api bridge)
        steroids.on("ready", function(){
          AppGyver.preload(path + "/meeting.html", "meetingPage");
          AppGyver.preload(path + "/participants.html", "participantsPage");
          AppGyver.preload(path + "/participant.html", "participantPage");
          AppGyver.preload(path + "/materials.html", "materialsPage");
          AppGyver.preload(path + "/material.html", "materialPage");
          AppGyver.preload(path + "/scheduling.html", "schedulingPage");
        });

        app.init();

      } else if (/settings\.html/.test(window.location.href)) {
        app.init();

        $("#open-left-panel").on("click", function(e){
          e.preventDefault();
          e.stopPropagation();
          steroids.modal.hide();
        });

      } else if (/login\.html/.test(window.location.href)) {
        app.init();
      } else {

        // add listeners for triggering updates to preloaded views
        switch (window.location.href)
        {
          case path + "/meeting.html":
            window.addEventListener("message", function(event) {
              if (event.data.preloadId === "meetingPage") AppGyver.refreshPreload(event.data.urlParams.id);
            });
            break;
          case path + "/meeting.html":
            window.addEventListener("message", function(event) {
              if (event.data.preloadId === "meetingPage") AppGyver.refreshPreload(event.data.urlParams.id);
            });
            break;
          case path + "/participants.html":
            window.addEventListener("message", function(event) {
              if (event.data.preloadId === "participantsPage") AppGyver.refreshPreload(event.data.urlParams.id);
            });
            break;
          case path + "/participant.html":
            window.addEventListener("message", function(event) {
              if (event.data.preloadId === "participantPage") AppGyver.refreshPreload(event.data.urlParams.path, true);
            });
            break;
          case path + "/materials.html":
            window.addEventListener("message", function(event) {
              if (event.data.preloadId === "materialsPage") AppGyver.refreshPreload(event.data.urlParams.id);
            });
            break;
          case path + "/material.html":
            // override 'close' to close modal, not go back popping layer
            $(".back-button ").off().on("click", function(e){
              e.preventDefault();
              steroids.modal.hide();
            });
            window.addEventListener("message", function(event) {
              if (event.data.preloadId === "materialPage") AppGyver.refreshPreload(event.data.urlParams.path, true);
            });
            break;
          case path + "/scheduling.html":
            window.addEventListener("message", function(event) {
              if (event.data.preloadId === "schedulingPage") AppGyver.refreshPreload(event.data.urlParams.path, true);
            });
            break;
        }
      }
    },

    preload: function(url, id){

      (new steroids.views.WebView(url)).preload({id: id});

    },

    openPreload: function(preloadId, urlParams, openInModal){

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
    refreshPreload: function(id, isPath){
      if (isPath) {
        var url = window.location.origin + id;
      } else {
        var url = window.location.origin + window.location.pathname + "?id="+id;
      }
      console.log("change to url: ", url)

      if (typeof window.router === "undefined") {

        history.replaceState({}, document.title, url);

        app.init();

      } else {

          //router.navigate( url, { trigger : true, replace : true } );
        if (window.location.href === url) {

          app.showContent();

        } else {

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
    }


  }

})(window);
