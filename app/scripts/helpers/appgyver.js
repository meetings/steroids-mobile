// Function to send AG API -messages
(function(){

  window.AppGyver = {

    open: function(url){

      var parameters = {
        hidesNavigationBar: true,
        url: url
      }

      steroids.nativeBridge.nativeCall({
        method: "openLayer",
        parameters: parameters,
        successCallbacks: [],
        failureCallbacks: []
      });

    },

    preload: function(url, id){

      var parameters = {
        id: id,
        url: url
      }

      steroids.nativeBridge.nativeCall({
        method: "preloadLayer",
        parameters: parameters,
        successCallbacks: [],
        failureCallbacks: []
      });

    },

    openPreload: function(preloadId, urlParams){

      window.postMessage({urlParams: urlParams, preloadId: preloadId}, "*")

      var parameters = {
        id: preloadId,
        hidesNavigationBar: true
      }

      steroids.nativeBridge.nativeCall({
        method: "openLayer",
        parameters: parameters,
        successCallbacks: [],
        failureCallbacks: []
      });

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