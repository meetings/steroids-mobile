app.meetmeCoverView = Backbone.View.extend({

    initialize : function(options) {
        _(this).bindAll('render','openCalendar','openCalendarPreview');

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

        if( ! this.active_matchmaker ) {
            var i, l = this.matchmaker_collection.length;
            for( i = 0; i < l; i++ ) {
                var n = this.matchmaker_collection.at(i).get('vanity_url_path') || '';
                if( n === this.selected_matchmaker_path || ( this.selected_matchmaker_path === 'default' && ( ! n || n === 'default' ) ) ) {
                    this.active_matchmaker = this.matchmaker_collection.at(i);
                }
            }
        }

        // Setup template
        this.$el.html( templatizer.meetmeCover( { user : this.user_model.toJSON(), matchmaker : this.active_matchmaker.toJSON() }) );

        this.$el.trigger('create');

        $("[data-position='fixed']").fixedtoolbar('hide');

        // Set the background
        var bg_image = '';
        if( this.active_matchmaker.get('background_theme') == 'c' ||  this.active_matchmaker.get('background_theme') == 'u' ) {
            bg_image = this.active_matchmaker.get('background_preview_url') || this.active_matchmaker.get('background_image_url');
        }
        else{
            bg_image = app.meetme_themes[this.active_matchmaker.get('background_theme')];
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
        AppGyver.switchContext("meetmeCalendar", { user : this.user_fragment, cal : this.selected_matchmaker_path });
    },

    beforeClose : function(){
        this.user_model.unbind();
        this.matchmaker_collection.unbind();
    }
});


