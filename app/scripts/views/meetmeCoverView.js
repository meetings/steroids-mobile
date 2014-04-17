app.meetmeCoverView = Backbone.View.extend({

    initialize : function(options) {
        _(this).bindAll('render', 'showOptions');

        // Setup models & state
        this.user_model = options.user_model;
        this.matchmaker_collection = options.matchmakers_collection;
        this.user_fragment = options.user_fragment;
        this.mode = options.mode || "normal";
        this.selected_matchmaker_path = options.selected_matchmaker_path || 'default';

    },

    events : {
        'click .meet-me' : 'showOptions'
    },

    render : function() {

        // Setup template
        this.$el.html( templatizer.meetmeCover( { user : this.user_model.toJSON(), matchmakers : this.matchmaker_collection.toJSON() }) );

        this.$el.trigger('create');

        $("[data-position='fixed']").fixedtoolbar('hide');

        // Set the background
        var bg_image = '';
        if( this.user_model.get('meetme_background_theme') == 'c' ||  this.user_model.get('meetme_background_theme') == 'u' ) {
            bg_image = this.user_model.get('meetme_background_preview_url') || this.user_model.get('meetme_background_image_url');
        }
        else{
            bg_image = app.meetme_themes[this.user_model.get('meetme_background_theme')];
        }

        $('.ui-body-a').css({
            'background-image' : 'url('+bg_image+')',
            'background-size' : 'cover',
            'background-position' : '50% 50%',
            'background-attachment' : 'fixed'
        });

    },

    showOptions : function(e){
        e.preventDefault();
        var mm = $(e.currentTarget).attr('data-mm') || 'default';
        app.helpers.switchContext("meetmeCalendar", { user : this.user_fragment, cal : mm });
    },

    beforeClose : function(){
        this.user_model.unbind();
        this.matchmaker_collection.unbind();
    }
});




