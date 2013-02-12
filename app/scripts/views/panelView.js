app.panelView = Backbone.View.extend({

    initialize: function(options) {
        this.menu_active = options.active;
    },

    render: function() {
        this.$el.append( templatizer.panel( { active : this.menu_active } ) );
    }
});
