app.headerView = Backbone.View.extend({

    initialize: function( options ) {
    },

    render: function() {
        console.log(this.$el);
    },

    events: {
        "click .back-button" : "navigateBack"
    },

    navigateBack : function(e){
      e.preventDefault();

      if ( app.options.appmode ) {

        setTimeout(function(){ AppGyver.hideContent() }, 100)

        steroids.layers.pop();

      } else if ( $('.back-button').attr('href') !== '#' ){
        window.location = $('.back-button').attr('href');

      } else {
        history.go(-1);

      }
    }
});
