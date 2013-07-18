app.meetmeConfirmedView = Backbone.View.extend({

    initialize : function(options) {
        _(this).bindAll('render');

        this.lock = options.lock;
        this.matchmaker = options.matchmaker;
    },

    events : {
    },

    render : function() {

        // Setup template
        this.$el.html( templatizer.meetmeConfirmed( _.merge( this.matchmaker.toJSON(), this.lock.toJSON() ) ) );

        $('.header .back-button').hide();
        $('.header .title').text("We've sent the request");

        this.$el.trigger('create');


        // Set the background
        var bg_image = (this.matchmaker.get('background_theme') == 'c' || this.matchmaker.get('background_theme') == 'u') ? this.matchmaker.get('background_image_url') : app.meetme_themes[this.matchmaker.get('background_theme')];
        $('.ui-body-a').css({
            'background-image' : 'url('+bg_image+')',
            'background-size' : 'cover',
            'background-position' : '50% 50%',
            'background-attachment' : 'fixed'
        });

        //$('.header').show();

        app.showContent();
    },

    beforeClose : function(){
        this.model.unbind();
    }
});


