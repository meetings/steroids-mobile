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

    openPreload: function(preloadId, evaluatedJS){

      var parameters = {
        id: preloadId,
        eval_js: evaluatedJS,
        hidesNavigationBar: true
      }

      steroids.nativeBridge.nativeCall({
        method: "openLayer",
        parameters: parameters,
        successCallbacks: [],
        failureCallbacks: []
      });

    },

    back: function(){

      steroids.nativeBridge.nativeCall({
        method: "popLayer",
        successCallbacks: [],
        failureCallbacks: []
      });

    },

    onFocus: function(recurringCallback){
      steroids.nativeBridge.nativeCall({
        method: "addEventListener",
        parameters: {
          event: "focus"
        },
        successCallbacks: [],
        recurringCallbacks: [recurringCallback],
        failureCallbacks: []
      });
    },

    onLostFocus: function(recurringCallback){
      steroids.nativeBridge.nativeCall({
        method: "addEventListener",
        parameters: {
          event: "lostFocus"
        },
        successCallbacks: [],
        recurringCallbacks: [recurringCallback],
        failureCallbacks: []
      });
    },

    replaceIdinURL: function(id){
      if (typeof window.router === "undefined") {
        var url = window.location.href+"?id="+id;

        history.replaceState({}, document.title, url);

        app.init();

      } else {
        var url = window.location.href.replace(/id=\d*/, "id="+id);

        history.replaceState({}, document.title, url);

        Backbone.history.checkUrl();
      }
    }

  }

})(window);