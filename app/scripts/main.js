$(document).bind("mobileinit", function(){
    $.mobile.ajaxEnabled = false;
    $.mobile.buttonMarkup.hoverDelay = 10;
    $.mobile.defaultPageTransition = 'none';
    $.mobile.touchOverflowEnabled = true;
    $.mobile.hashListeningEnabled = false;
    $.mobile.ajaxLinksEnabled = false;
});

window.production_mode = false;

window.app = {
    auth : {
        user : null,
        token : null,
        tos_verify_required : false,
        cookiename : 'mtngs_mobile_auth',
        cookievalid : 3 * 365 // in days
    },
    defaults : {
        url_scheme : /^1\./.test( window.AG_CLIENT_VERSION || '1.0.0' ) ? 'meetings://' : 'steroids-scanner://',
        api_host : window.production_mode ? 'https://api.meetin.gs' : 'https://api-dev.meetin.gs',
        //api_host : (location.host.indexOf('dev') !== -1 || location.host.indexOf('localhost') !== -1) ? 'https://api-dev.meetin.gs' : 'https://api.meetin.gs',
        desktop_link : window.production_mode ? 'https://meetin.gs/meetings_global/detect' : 'https://dev.meetin.gs/meetings_global/detect',
        return_host : 'http://' + location.host,
        version : 2,
        version_check_url : window.production_mode ? 'http://versions.meetin.gs/'+ window.build_mode +'/current.json' : 'http://versions.meetin.gs/'+ window.build_mode +'/current-dev.json' // affected build_modes: ios & android
    },
    options: {
        // Appmode will be web, ios or android
        build : window.build_mode
    },
    models : {},
    collections : {},
    views : {},
    router : null,
    mixins : {},
    helpers : {
        validEmail : function(emailAddress) {
            var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
            emailAddress = emailAddress.replace(/\".*\" \<(.*)\>|(.*)/, '$1$2');
            return pattern.test(emailAddress);
        }
    },
    init : function() {
        // Check that history is supported
        if( ! Modernizr.history ){
            $('body').html( templatizer.updateBrowser() );
            return;
        }

        // Login & redirects
        if ( ! ( /contextRedirect\.html/.test( window.location.href ) ) ) {
            if( this._requireLogin() ){
                this._doRedirects();
            }
        }

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

        // Add click tracking to backbone
        /*Backbone.View.prototype.delegateEvents = function(events) {
            var delegateEventSplitter = /^(\S+)\s*(.*)$/;
            if (!(events || (events = _.result(this, 'events')))) return;
            this.undelegateEvents();
            for (var key in events) {
                var method = events[key];
                if (!_.isFunction(method)) method = this[events[key]];
                if (!method) throw new Error('Method "' + events[key] + '" does not exist');
                var match = key.match(delegateEventSplitter);
                var eventName = match[1], selector = match[2];
                // Wrap method to add tracking
                if( eventName == 'click'){
                    method = _.wrap( method, function(method, e){
                        meetings_tracker.track(e.currentTarget);
                        method(e);
                    });
                }
                eventName += '.delegateEvents' + this.cid;
                if (selector === '') {
                    this.$el.on(eventName, method);
                } else {
                    this.$el.on(eventName, selector, method );
                }
            }
        };*/

        // Use fast clicks
        new FastClick(document.body);

        // Start router
        window.router = new app.router();
        Backbone.history.start({pushState: true});
    },
    initializeAuthFromCookie : function() {
        var auth_cookie = this._readAuthCookie() || '';
        var user_and_token = auth_cookie.split(/_(.+)?/,2);
        app.auth.user = user_and_token[0];
        app.auth.token = user_and_token[1];

        return user_and_token[1] ? true : false;
    },

    _requireLogin : function(){
        // Url has auth & user query params
        if( this._readAuthUrlParams() ){
            return true;
        }
        else if( this.initializeAuthFromCookie() ){
            return true;
        }
        else{
            // Throw the user out if no credentials
            if( window.location.toString().indexOf( 'login.html') === -1 ){
                AppGyver.switchContext("loginPage", {id : ''} );
                return false;
            }
        }
    },
    _doRedirects : function() {
        // TODO: opening of the page stacks
        var redirect_meeting = this._getUrlParamByName( 'redirect_to_meeting' );
        var proposals = this._getUrlParamByName( 'proposals' );
        var clear = this._getUrlParamByName( 'clear' );

        var chosen_redirect = false;

        if ( clear == 'true'){
            app.auth.user = '';
            app.auth.token = '';
            return;
        }
        else if( proposals === 'answer' && redirect_meeting ){
            chosen_redirect = [ 'schedulingPage', { mode : 'answer', id : redirect_meeting } ];
        }
        else if( proposals === 'choose' && redirect_meeting ){
            chosen_redirect = [ 'schedulingPage', { mode : 'choose', id : redirect_meeting } ];
        }
        else if( redirect_meeting && redirect_meeting !== 0 && redirect_meeting !== '0' ){
            chosen_redirect = [ 'meetingPage', { id : redirect_meeting } ];
        }
        else if( window.location.toString().indexOf( 'login.html') !== -1 ){
            chosen_redirect = [ 'meetingsPage' ];
        }

        if ( app.auth.tos_verify_required || window.location.toString().indexOf( 'login.html') !== -1 ) {
            chosen_redirect = chosen_redirect || [ 'meetingsPage' ];
            new app.userModel({ id : 'me' }).fetch( function( response ) {
                if ( ! ( response && response.tos_accepted ) ) {
                    AppGyver.switchContext( 'profilePage', { context_after_tos_accept : JSON.stringify( chosen_redirect ) } );
                };
            } );
        }

        if ( chosen_redirect ) {
            AppGyver.switchContext.apply( AppGyver, chosen_redirect );
        }
    },
    _readAuthUrlParams : function(){
        return this._loginWithParams( this._getUrlParamByName( 'user_id' ), this._getUrlParamByName( 'dic' ) );
    },
    _loginWithParams : function( user, token ){
        if( user && token ){
            app.auth.user = user;
            app.auth.token = token;
            this._createAuthCookie();
            this.auth.tos_verify_required = 1;
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
            setTimeout(function () { window.scrollBy(0, 1); }, 3000);
    },
    _versionCheck : function(){
        $.getJSON( app.defaults.version_check_url , function(response){
            // Force update if the current.json value is larger than client version
            if( parseInt(response.version, 10) > app.defaults.version ){
                app._redirectToUpdate(response.url);
            }
        });
    },
    _redirectToUpdate : function(url){
        setTimeout(function(){
            alert('You have an old version of the app. You need to update!');
            setTimeout( function(){
                steroids.openURL(url);
            },100);
            app._redirectToUpdate(url);
        },1000);
    },
    openUrlSchemeLink : function(appurl, normurl){
        if( app.options.build === 'web' ) {
            var win=window.open(normurl, '_blank');
            win.focus();
            return;
        }
        
        steroids.openURL({
          url: appurl
        },{
          onSuccess: function(parameters) {
            // do nothing, hooray!
          },
          onFailure: function(error) {
            steroids.openURL(normurl); // normurl is always http(s):// so always succeeds
          }
        });
    },

    launchURLForwarder : function() {
        document.removeEventListener("resume", app.launchURLForwarder, false);

        var redirect_uri = "" + steroids.app.getLaunchURL();
        var inapp_url =  redirect_uri.replace( /^[^\:]+\:\/\//, '' );

        if ( inapp_url ) {
            window.location = inapp_url;
        }
    },

    startGoogleConnecting: function( context, redirect_params ) {
        var redirect_uri = 'https://dev.meetin.gs/meetings_global/redirect_mobile/0';
        var host = window.location.protocol + '//' + window.location.host;

        if ( app.options.build !== 'web' ) {
            host = app.defaults.url_scheme;
        }

        var to_url = host + AppGyver.formContextRedirectUrl( context, redirect_params );
        var params = [
            { key : "client_id", "value" : "584216729178.apps.googleusercontent.com" },
            { key : "response_type", "value" : "code" },
            { key : "access_type", "value" : "offline" },
            { key : "scope", value : "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.google.com/calendar/feeds/ https://www.google.com/m8/feeds" },
            { key : "state", value : JSON.stringify( { to : to_url, redirect_uri : redirect_uri } ) },
            { key : "approval_prompt", "value" : "force" },
            { key : "redirect_uri", "value" : redirect_uri }
        ];

        var string_params = _.map( params,
            function( p ) { return encodeURIComponent( p.key ) + '=' + encodeURIComponent( p.value ); }
        );

        var url = "https://accounts.google.com/o/oauth2/auth?" + string_params.join("&");

        if( app.options.build === 'web' ) {
            window.location = url;
        }
        else {
            document.addEventListener("resume", app.launchURLForwarder, false);
            steroids.openURL( url );
        }
    },
    showContent: function(){
        $('div.content').show();
        $('div.connectivity').hide();
        $('div.loader').hide();
    },

    hasInternet : function(){
        if( app.options.build !== 'web' ){
            if(navigator.connection.type === Connection.NONE ){
                app.showConnectivityError('nointernet');
                return false;
            }
        }
        return true;
    },

    showConnectivityError : function(type){
        var $el = $('.connectivity').html( templatizer.connectivityError({ type : type }) ).show();
        $('div.content').hide();
        $('div.loader').hide();
        $el.trigger('create');
        $el.on('click', '.reconnect', function(e){
            e.preventDefault();
            $el.off('click');
            $el.html('');
            AppGyver.hideContent();
            Backbone.history.loadUrl();
        });
    }
};

$(document).ready(function(){
    // Open panel
    $('div.main-div').swiperight(function(){
        $( "#left-panel" ).panel( "open" );
    });

    // Close panel with click
    $('div.ui-panel-content-wrap,div.ui-panel-dismiss').live('click', function(){
        $( "#left-panel" ).panel( "close" );
    });

    // Make swiping a bit harder
    $.event.special.swipe.horizontalDistanceThreshold = 75;

    // mobile app, do preloads & app inits etc.
    if (app.options.build === 'web') {
        app.init();
    } else {
        AppGyver.init();
    }
});

