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
        user : null,
        token : null,
        cookiename : 'mtngs_mobile_auth',
        cookievalid : 14 // in days
    },
    defaults : {
        api_host : 'https://api.meetin.gs',
        //api_host : (location.host.indexOf('dev') !== -1 || location.host.indexOf('localhost') !== -1) ? 'https://api-dev.meetin.gs' : 'https://api.meetin.gs',
        desktop_link : (location.host.indexOf('dev') !== -1 || location.host.indexOf('localhost') !== -1) ? 'https://dev.meetin.gs/meetings_global/detect' : 'https://meetin.gs/meetings_global/detect',
        return_host : 'http://' + location.host
    },
    options: {
        // Appmode will be true if we are building as an app
        appmode : window.normal_app_version ? false : true
    },
    models : {},
    collections : {},
    views : {},
    router : null,
    mixins : {},
    init : function() {

        // Check that history is supported
        if( ! Modernizr.history ){
            $('body').html( templatizer.updateBrowser() );
            return;
        }

        // Check login
        if( this._requireLogin() ){
            // Check meeting redirect
            this._doRedirects();
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
    _requireLogin : function(){
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
        // TODO: opening of the page stacks
        var redirect_meeting = this._getUrlParamByName( 'redirect_to_meeting' );
        var proposals = this._getUrlParamByName( 'proposals' );
        var clear = this._getUrlParamByName( 'clear' );
        if ( clear == 'true'){
            app.auth.user = '';
            app.auth.token = '';
            return;
        }
        else if( proposals === 'answer' && redirect_meeting ){
            window.location = '/scheduling.html?mode=answer&id=' + redirect_meeting;
        }
        else if( proposals === 'choose' && redirect_meeting ){
            window.location = '/scheduling.html?mode=choose&id=' + redirect_meeting;
        }
        else if( redirect_meeting && redirect_meeting !== 0 && redirect_meeting !== '0' ){
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
            return true;
        }
        else{
            return false;
        }
    },
    _loginWithParams : function( user, token ){
        if( user && token ){
            app.auth.user = user;
            app.auth.token = token;
            this._createAuthCookie();
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
    showContent: function(){
        $('div.content').show();
        $('div.loader').hide();
    }
};

$(document).ready(function(){

  // mobile app, do preloads & app inits etc.
  if (app.options.appmode) {

    AppGyver.init();

  // web based app, no preloads or such magick required
  } else {
    app.init();

    // TODO: Fix swipes
    $( document ).on( "swipeleft swiperight", function( e ) {
        // We check if there is no open panel on the page because otherwise
        // a swipe to close the left panel would also open the right panel (and v.v.).
        // We do this by checking the data that the framework stores on the page element (panel: open).
        if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swipeleft"  ) {
                $( "#right-panel" ).panel( "open" );
            } else if ( e.type === "swiperight" ) {
                $( "#left-panel" ).panel( "open" );
            }
        }
    });
  }
});

