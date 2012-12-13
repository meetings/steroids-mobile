app.headerView = Backbone.View.extend({

    initialize: function() {
    },

    render: function() {
        console.log(this.$el);
    },

    events: {
        "click .back-button" : "navigateBack"
    },

    navigateBack : function(e){
        e.preventDefault();
        if( app.options.appmode ) AGPopLayer();
        else if( $('.back-button').attr('href') !== '#' ){
            window.location = $('.back-button').attr('href');
        }
        else history.go(-1);
    }
});
