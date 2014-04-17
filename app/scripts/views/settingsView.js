app.settingsView = Backbone.View.extend({
    initialize: function(options) {
    },
    render: function() {
        this.$el.html( templatizer.settingsView({ desktop_link : app.defaults.desktop_link }) ); // Render template
        this.$el.trigger('create');
        return this;
    },
    events: {
        'click .logout' : 'logout',
        'click .open-native' : 'openNative'
    },
    openNative : function(e){
        e.preventDefault();
        window.location = 'meetings://?dic=' + app.auth.token + '&user_id=' + app.auth.user;
    },
    logout : function(e){
        e.preventDefault();
        app._removeAuthCookie();
        window.location = '/login.html';
    }
});
