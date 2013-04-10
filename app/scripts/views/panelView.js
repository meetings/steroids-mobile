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
        'click #nav-logout' : 'logout',
        'click #no-mobile' : 'switchNormal'
    },

    openMeetings : function(e){
        e.preventDefault();
        if( app.options.build !== 'web' ){
            $('#left-panel').panel('close');
            AppGyver.hideContent();
            AppGyver.switchContext('meetingsPage');
        }
        else{
            window.location = '/index.html';
        }
    },
    redirectFacebook : function(e){
        e.preventDefault();
        if( app.options.build !== 'web' ) {
            app.openUrlSchemeLink('fb://profile/182909251746386','https://www.facebook.com/www.meetin.gs', 'Facebook' );
        }
        else{
            var win=window.open('https://www.facebook.com/www.meetin.gs', '_blank');
            win.focus();
        }
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
    logout : function(e){
        e.preventDefault();
        app._removeAuthCookie();
        if( app.options.build !== 'web' ) {
            AppGyver.openPreload("loginPage", { reset : true });
        }
        else{
            window.location = '/login.html';
        }
    },
    switchNormal : function(e){
        e.preventDefault();
        window.location = app.defaults.desktop_link;
    }
});
