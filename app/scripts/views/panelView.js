app.panelView = Backbone.View.extend({

    initialize : function(options) {
        this.menu_active = options.active;
    },

    render : function() {
        this.$el.append( templatizer.panel( { active : this.menu_active } ) );
    },

    events : {
        'click #nav-meetings' : 'openMeetings',
        'click #nav-facebook' : 'redirectFacebook',
        'click #nav-twitter' : 'redirectTwitter',
        'click #nav-tos' : 'openTos',
        'click #nav-logout' : 'logout'
    },

    openMeetings : function(e){
        e.preventDefault();
        window.location = '/meetings.html';
    },
    redirectFacebook : function(e){
        e.preventDefault();
    },
    redirectTwitter : function(e){
        e.preventDefault();
    },
    openTos : function(e){
        e.preventDefault();
    },
    logout : function(e){
        e.preventDefault();
        app._removeAuthCookie();
        window.location = '/login.html';
    }
});
