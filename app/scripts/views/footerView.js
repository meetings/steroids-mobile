app.footerView = Backbone.View.extend({

    initialize: function(options) {
        this.menu_active = options.active;
    },

    render: function() {
        if( ! app.options.appmode ) this.$el.append( templatizer.footer( { active : this.menu_active } ) );
    }
});
