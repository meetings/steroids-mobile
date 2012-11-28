$(document).bind("mobileinit", function(){
    $.mobile.ajaxEnabled = false;
    $.mobile.buttonMarkup.hoverDelay = 10;
    $.mobile.defaultPageTransition = 'none';
    $.mobile.touchOverflowEnabled = true;
    $.mobile.hashListeningEnabled = false;
    $.mobile.ajaxLinksEnabled = false;
});

window.app = {
    auth : {
        user : 3028,
        token : 'v1_e_3028_0_0_IGsCa471H9O2lj4RQLGyIoD_ya4',
        cookiename : 'mtngs_mobile_auth',
        cookievalid : 14 // in days
    },
    defaults : {
        api_host : (location.host.indexOf('dev') !== -1 || location.host.indexOf('localhost') !== -1) ? 'https://api-dev.meetin.gs' : 'https://api.meetin.gs',
        desktop_link : (location.host.indexOf('dev') !== -1 || location.host.indexOf('localhost') !== -1) ? 'https://dev.meetin.gs/meetings_global/detect' : 'https://meetin.gs/meetings_global/detect',
        return_host : 'http://' + location.host
    },
    options: {
        appmode : true
    },
    models : {},
    collections : {},
    views : {},
    router : null,
    init : function() {

        // Check login
        /*if( this._requireLogin() ){
            // Check meeting redirect
            this._doRedirects();
        }*/

        // Remove navigation bar on IOS
        //this._removeIosNav();

        // Add sending of auth token in headers
        Backbone.sync = _.wrap(Backbone.sync, function(originalSync, method, model, options) {
            var new_options =  _.extend({
                beforeSend: function(xhr) {
                    var token = app.auth.token;
                    var user = app.auth.user;
                    if (token) xhr.setRequestHeader('dic', token);
                    if (user) xhr.setRequestHeader('user_id', user);
                }
            }, options);
            return originalSync(method, model, new_options);
        });

        // Start router
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

        // Url has auth & user query params
        if( this._readAuthUrlParams() ){
            return true;
        }
        else if( auth_cookie ){
            var user_and_token = auth_cookie.split(/_(.+)?/,2);
            app.auth.user = user_and_token[0];
            app.auth.token = user_and_token[1];
            return true;
        }
        else{
            // Throw the user out if no credentials
            if( window.location.toString().indexOf( 'login.html') === -1 ){
                window.location = '/login.html';
                return false;
            }
        }
    },
    _doRedirects : function(){
        var redirect_meeting = this._getUrlParamByName( 'redirect_to_meeting' );
        var clear = this._getUrlParamByName( 'clear' );
        if ( clear == 'true'){
            app.auth.user = '';
            app.auth.token = '';
            return;
        }
        if( redirect_meeting && redirect_meeting !== 0 && redirect_meeting !== '0' ){
            window.location = '/meeting.html?id=' + redirect_meeting;
        }
        else if( window.location.toString().indexOf( 'login.html') !== -1 ){
            window.location = '/index.html';
        }
    },
    _readAuthUrlParams : function(){
        var user = this._getUrlParamByName( 'user_id' );
        var token = this._getUrlParamByName( 'dic' );
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
            return true;
        }
        else{
            return false;
        }
    },
    _getUrlParamByName : function( name ){
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
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
        document.cookie = app.auth.cookiename + "=; expires=-1; path=/";
    },
    _getLocalStorage : function() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    },
    _removeIosNav : function(){
        /mobile/i.test(navigator.userAgent) && !location.hash &&
            setTimeout(function () { window.scrollBy(0, 1); console.log('fix ios ') }, 3000);
    }
};

$(document).ready(function(){
    app.init();
});

