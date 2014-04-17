app.panelView = Backbone.View.extend({

    initialize : function(options) {
        this.menu_active = options.active;
    },

    render : function() {
        if( this.$el.hasClass('rendered') ) return;
        this.$el.html( templatizer.panel( { active : this.menu_active } ) );
        this.$el.addClass('rendered');

        // Hack to get panel working in subviews on the mobile side
        this.$el.page();
        this.$el.removeClass('ui-page');
        $('.ui-btn-active',this.el).removeClass('ui-btn-active');
    },

    events : {
        'click #nav-meetings' : 'openMeetings',
        'click #nav-facebook' : 'redirectFacebook',
        'click #nav-twitter' : 'redirectTwitter',
        'click #nav-support' : 'openSupport',
        'click #nav-tos' : 'openTos',
        'click #nav-edit-profile' : 'openProfile',
        'click #nav-logout' : 'logout',
        'click #nav-meetme' : 'openMeetmeConfig',
        'click #nav-calconfig' : 'openCalconfig',
        'click .no-mobile' : 'switchNormal'
    },

    openMeetings : function(e){
        e.preventDefault();
        window.location = '/index.html';
    },

    redirectFacebook : function(e){
        e.preventDefault();
            var win=window.open('https://www.facebook.com/www.meetin.gs', '_blank');
            win.focus();
    },

    redirectTwitter : function(e){
        e.preventDefault();
        var win=window.open('https://twitter.com/meetin_gs', '_blank');
        win.focus();
    },

    openSupport : function(e){
        e.preventDefault();
        var win=window.open('https://getsatisfaction.com/meetings', '_blank');
        win.focus();
    },

    openTos : function(e){
        e.preventDefault();
        var win=window.open('http://meetin.gs/meetings/terms_of_service', '_blank');
        win.focus();
    },

    openProfile : function(e) {
        e.preventDefault();
        app.helpers.switchContext('profilePage');
    },

    openMeetmeConfig : function(e) {
        e.preventDefault();
        app.helpers.switchContext('meetmeConfig');
    },

    openCalconfig : function(e) {
        e.preventDefault();
        app.helpers.switchContext('calconfigPage');
    },

    logout : function(e){
        e.preventDefault();
        app._removeAuthCookie();
        app.helpers.switchContext("loginPage", { reset : 1 });
    },

    switchNormal : function(e){
        e.preventDefault();
        window.location = app.defaults.desktop_link;
    }
});
