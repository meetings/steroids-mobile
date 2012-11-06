$(document).bind("mobileinit", function(){
    $.mobile.ajaxEnabled = false;
    $.mobile.buttonMarkup.hoverDelay = 10;
    $.mobile.defaultPageTransition = 'none';
    $.mobile.touchOverflowEnabled = true;
    $.mobile.ajaxLinksEnabled = false;
});

window.app = {
    auth : {
        user : null,
        token : null,
        cookiename : 'mtngs_mobile_auth',
        cookievalid : 14 // in days
    },
    defaults : {
        user_image : 'http://dev.meetin.gs/images/theme/default/default-user-avatar-22px.png'
    },
    options: {
        appmode : false
    },
    models : {},
    collections : {},
    views : {},
    router : null,
    init : function() {
        this._requireLogin();
        window.router = new app.router();
        Backbone.history.start({pushState: true});
    },
    _requireLogin : function(){
        // Local storage available
        /*var storage = this._getLocalStorage();
        if ( storage && storage.auth && storage.auth.user && storage.auth.cookie ){
            app.auth.user = storage.auth.user;
            app.auth.token = storage.auth.token;
        }*/

        // Cookie available
        var auth_cookie = this._readAuthCookie();
        if( auth_cookie ){
            var user_and_token = auth_cookie.split( '_', 2 );
            app.auth.user = user_and_token[0];
            app.auth.token = user_and_token[1];
        }

        // Url has auth & user query params
        else if( this._readAuthUrlParams() ){
            // Url params already saved above
        }
        else{
            //window.location = 'http://google.com';
        }
    },
    _readAuthUrlParams : function(){
        var user = this._getUrlParamByName( 'user' );
        var token = this._getUrlParamByName( 'token' );
        if( user && token ){
            app.auth.user = user;
            app.auth.token = token;
            this._createAuthCookie();
            /*var storage = this._getLocalStorage();
            if ( storage ){
                storage.setItem( "auth", { user : user, token : token } );
                storage.auth.user = user;
                storage.auth.token = token;
            }*/
        }
        else{
            return false;
        }
    },
    _getUrlParamByName : function( name ){
        var match = RegExp('[?&]' + name + '=([^&]*)')
        .exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    },
    _readAuthCookie : function(){
        var nameEQ = app.auth.cookiename + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    },
    _createAuthCookie : function(){
        var date = new Date();
        date.setTime( date.getTime() + ( app.auth.cookievalid * 24 * 60 * 60 * 1000 ));
        var expires = "; expires=" + date.toGMTString();
        var value = app.auth.user + '_' + app.auth.token;
        document.cookie = app.auth.cookiename + "=" + value + expires + "; path=/";
    },
    _removeAuthCookie : function(){
        createCookie( app.auth.cookiename, "", -1 );
    },
    _getLocalStorage : function supports_html5_storage() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    }
};

$(document).ready(function(){
    app.init();
});

