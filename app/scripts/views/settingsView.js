app.settingsView = Backbone.View.extend({
    initialize: function(options) {
    },
    render: function() {
        this.$el.html( templatizer.settingsView() ); // Render template
        this.$el.trigger('create');
        return this;
    },
    events: {
        'click .logout' : 'logout'
    },
    logout : function(e){
        e.preventDefault();
        app._removeAuthCookie();
        // TODO: Redirect where?
    }
});
