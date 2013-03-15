app.headerView = Backbone.View.extend({

    initialize: function( options ) {
    },

    render: function() {
    },

    events: {
        "click .back-button" : "navigateBack"
    },

    navigateBack : function(e){
      e.preventDefault();

      if ( app.options.build !== 'web' ) {
          setTimeout(function(){ AppGyver.hideContent(); }, 100);
          steroids.layers.pop();
      } else if ( $('.back-button').attr('href') !== '#' ){
          window.location = $('.back-button').attr('href');
      } else {
          history.go(-1);
      }
    }
});
