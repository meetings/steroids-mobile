// Function to send AG API -messages
(function(){

  window.AppGyver = {

    init: function(){
      // open target blank links, material contents and profile linkedn  in safari
      $(document).on("click", "a[target='_blank'], li#material_content > a, p.mtngs-linkedin > a", function(e){
        e.preventDefault();
        steroids.openURL(encodeURI($(this).attr("href")));
      });

      // hijack panel links
      $(document).on("click", "ul#side-bar a", function(e){
        e.preventDefault();
        // should these open to browser or to modal or what?
        var view = new steroids.views.WebView(window.location.origin+"/"+$(this).attr("href"))
        // for now open modal
        steroids.modal.show(view);
      });

      // handle preload views
      // and init index.html,
      // preloads are initted when used the first time by AppGyver.refreshPreload function
      if (/index\.html/.test(window.location.href)) {

        $( document ).on( "swipeleft swiperight", function( e ) {
            // We check if there is no open panel on the page because otherwise
            // a swipe to close the left panel would also open the right panel (and v.v.).
            // We do this by checking the data that the framework stores on the page element (panel: open).
            if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
                if ( e.type === "swipeleft"  ) {
                    $( "#right-panel" ).panel( "open" );
                } else if ( e.type === "swiperight" ) {
                    $( "#left-panel" ).panel( "open" );
                }
            }
        });

        // wait for steroids to be ready (api bridge)
        steroids.on("ready", function(){
          AppGyver.preload("http://localhost:13101/meeting.html", "meetingPage");
          AppGyver.preload("http://localhost:13101/participants.html", "participantsPage");
          AppGyver.preload("http://localhost:13101/participant.html", "participantPage");
          AppGyver.preload("http://localhost:13101/materials.html", "materialsPage");
          AppGyver.preload("http://localhost:13101/material.html", "materialPage");
          AppGyver.preload("http://localhost:13101/scheduling.html", "schedulingPage");
        });

        app.init();

      } else if (/settings\.html/.test(window.location.href)) {
        app.init();

        $("#open-left-panel").on("click", function(e){
          e.preventDefault();
          e.stopPropagation();
          steroids.modal.hide();
        });

      } else {

        // add listeners for triggering updates to preloaded views
        switch (window.location.href)
        {
          case "http://localhost:13101/meeting.html":
            window.addEventListener("message", function(event) {
              if (event.data.preloadId === "meetingPage") AppGyver.refreshPreload(event.data.urlParams.id);
            });
            break;
          case "http://localhost:13101/participants.html":
            window.addEventListener("message", function(event) {
              if (event.data.preloadId === "participantsPage") AppGyver.refreshPreload(event.data.urlParams.id);
            });
            break;
          case "http://localhost:13101/participant.html":
            window.addEventListener("message", function(event) {
              if (event.data.preloadId === "participantPage") AppGyver.refreshPreload(event.data.urlParams.path, true);
            });
            break;
          case "http://localhost:13101/materials.html":
            window.addEventListener("message", function(event) {
              if (event.data.preloadId === "materialsPage") AppGyver.refreshPreload(event.data.urlParams.id);
            });
            break;
          case "http://localhost:13101/material.html":
            // override 'close' to close modal, not go back popping layer
            $(".back-button ").off().on("click", function(e){
              e.preventDefault();
              steroids.modal.hide();
            })
            window.addEventListener("message", function(event) {
              if (event.data.preloadId === "materialPage") AppGyver.refreshPreload(event.data.urlParams.path, true);
            });
            break;
          case "http://localhost:13101/scheduling.html":
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

      window.postMessage({urlParams: urlParams, preloadId: preloadId}, "*")

      var options = {
        view: {
          id: preloadId
        },
        navigationBar: false
      }

      if (openInModal) {
        var modal = new steroids.views.WebView("");
        modal.id = preloadId;
        steroids.modal.show(modal);
      } else {
        steroids.layers.push(options);
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

        if (window.location.href === url) {

          AppGyver.showContent();

        } else {

          history.replaceState({}, document.title, url);

          Backbone.history.checkUrl();

        }

        /*Backbone.history.navigate(pathname+"?id="+id, {trigger: true, replace: true});*/
        // not working as expected, pollutes window.location.search with duplicate parameters
      }
    },

    hideContent: function(){
      $("div.ui-content").hide();
      $.mobile.showPageLoadingMsg();
    },

    showContent: function(){
      if ($("div.ui-content").is(":hidden")) $("div.ui-content").show();
      $.mobile.hidePageLoadingMsg();
    },

    // clear events from preloaded views to prevent previous render events triggering
    cleanBackboneZombieEvents: function(){
      Object.keys(app.views).forEach(function(viewName){
        app.views[viewName].undelegateEvents();
      });
    }


  }

})(window);