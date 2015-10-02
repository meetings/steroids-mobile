// JQM configs
$(document).bind("mobileinit", function(){
    $.mobile.ajaxEnabled = false;
    $.mobile.buttonMarkup.hoverDelay = 10;
    $.mobile.defaultPageTransition = 'none';
    $.mobile.touchOverflowEnabled = true;
    $.mobile.hashListeningEnabled = false;
    $.mobile.ajaxLinksEnabled = false;
});

var api_urls = {
    dev : 'https://api-dev.meetin.gs',
    beta : 'https://api-beta.meetin.gs',
    live : 'https://api.meetin.gs'
};

var desktop_links = {
    dev : 'https://dev.meetin.gs/meetings_global/detect',
    beta : 'https://beta.meetin.gs/meetings_global/detect',
    live : 'https://meetin.gs/meetings_global/detect'
};

var mobile_redirect_urls = {
    dev : 'https://mobiledev.meetin.gs',
    beta : 'https://mobilebeta.meetin.gs',
    live : 'https://mobile.meetin.gs'
};

var version_check_urls = {
    dev : 'http://versions.meetin.gs/'+window.build_mode+'/current-dev.json',
    beta : 'http://versions.meetin.gs/'+window.build_mode+'/current-beta.json',
    live : 'http://versions.meetin.gs/'+window.build_mode+'/current.json'
};

var app_mode = (function(){
    var mode;
    if(window.location.href.indexOf('mdev') !== -1) mode = 'dev';
    else if(window.location.href.indexOf('localhost') !== -1) mode = 'dev';
    else if(window.location.href.indexOf('mbeta') !== -1) mode = 'beta';
    else mode = 'live';
    return mode;
})();

window.app = {
    auth : {
        user : null,
        token : null,
        tos_verify_required : false,
        cookiename : 'mtngs_mobile_auth',
        cookievalid : 3 * 365
    },

    meetme_themes : [
        '/static/meetme_themes/theme1.jpg',
        '/static/meetme_themes/theme2.jpg',
        '/static/meetme_themes/theme3.jpg',
        '/static/meetme_themes/theme4.jpg',
        '/static/meetme_themes/theme5.jpg',
        '/static/meetme_themes/theme6.jpg',
        '/static/meetme_themes/theme7.jpg',
        '/static/meetme_themes/theme8.jpg',
        '/static/meetme_themes/theme9.jpg',
        '/static/meetme_themes/theme10.jpg',
        '/static/meetme_themes/theme11.jpg',
        '/static/meetme_themes/theme12.jpg'
    ],

        meetme_types : [
        {
            icon_class : 'icon-meetings',
            name : 'Generic'
        },
        {
            icon_class : 'icon-coffee',
            name : 'Coffee'
        },
        {
            icon_class : 'icon-dinner',
            name : 'Dinner'
        },
        {
            icon_class : 'icon-drinks',
            name : 'Drinks'
        },
        {
            icon_class : 'icon-workshop',
            name : 'Workshop'
        },
        {
            icon_class : 'icon-sports',
            name : 'Sports'
        },
        {
            icon_class : 'icon-team',
            name : 'Team'
        },
        {
            icon_class : 'icon-idea',
            name : 'Idea'
        },
        {
            icon_class : 'icon-material_presentation',
            name : 'Board'
        },
        {
            icon_class : 'icon-date_picker',
            name : 'Event'
        },
        {
            icon_class : 'icon-handshake',
            name : 'Business'
        },
        {
            icon_class : 'icon-call',
            name : 'Call'
        },
        {
            icon_class : 'icon-tablet',
            name : 'Tablet'
        },
        {
            icon_class : 'icon-teleconf',
            name : 'Telco'
        },
        {
            icon_class : 'icon-onlineconf',
            name : 'Skype'
        }
    ],

    no_login_pages : [
        'meetme',
        'matchmaker_fragment',
        'user_fragment',
        'underConstruction',
        'under_construction_url'
    ],

    defaults : {
        url_scheme : /^1\./.test( window.AG_CLIENT_VERSION || '1.0.0' ) ? 'meetings://' : 'steroids-scanner://',
        api_host : api_urls[app_mode],
        desktop_link : desktop_links[app_mode],
        new_mobile_redirect_url : mobile_redirect_urls[app_mode],
        return_host : 'http://' + location.host,
        version : 3,
        version_check_url : version_check_urls[app_mode]
    },

    options : {
        build : window.build_mode,
        fetchTimeout : 10000
    },

    contexts : [
            { file : 'index.html', id : 'meetingsPage', no_preload : true },
            { file : 'login.html', id : 'loginPage', load_before_init : true },
            { file : 'profile.html', id : 'profilePage' },
            { file : 'meeting.html', id : 'meetingPage' },
            { file : 'participants.html', id : 'participantsPage' },
            { file : 'participant.html', id : 'participantPage' },
            { file : 'material.html', id : 'materialPage' },
            { file : 'scheduling.html', id : 'schedulingPage' },
            { file : 'addParticipant.html', id : 'addParticipantPage' },
            { file : 'meetme.html', id : 'meetmeCover', no_preload : true },
            { file : 'meetmeCalendar.html', id : 'meetmeCalendar', no_preload : true },
            { file : 'meetmeConfig.html', id : 'meetmeConfig', no_preload : true },
            { file : 'connectAccounts.html', id : 'connectAccountsPage', shared_file : 'init.html', shared_id : 'init' },
            { file : 'connectCalendar.html', id : 'connectCalendarPage', shared_file : 'init.html', shared_id : 'init' },
            { file : 'signup.html', id : 'signupPage' },
            { file : 'apps.html', id : 'apps', no_preload : true },
            { file : 'underConstruction.html', id : 'underConstruction', no_preload : true }
        ],


    models : {},
    collections : {},
    views : {},
    router : null,
    helpers : {
        formQueryString : function( params, randomize ) {
            if ( randomize ) params.m_rand = Math.random();

            var query_options=[];
            var param;

            for ( param in params ) {
                query_options.push( encodeURIComponent(param) + '=' + encodeURIComponent( params[param] ) );
            }

            var query_string = query_options.length ? '?' : '';
            query_string = query_string + query_options.join('&');

            return query_string;
        },

        formContextURL : function( context, params, randomize ) {
            params = params || {};
            // NOTE: this is not used anymore but if you remove it, you need to fix ajaxPrefilter, which does not seem to work if the displayed page url contains only one url parameter. This accidentally fixes it
            params.context_id = context.id;

            var query_string = app.helpers.formQueryString( params, randomize );

            return '/' + context.file + query_string;
        },


        getContextForID : function( id ){
            for (var i = 0; i < app.contexts.length; i++) {
                if ( id == app.contexts[i].id ) return app.contexts[i];
            }
            return false;
        },

        popContext : function() {
            if ( $('.back-button').length && $('.back-button').attr('href') !== '#' ){
                window.location = $('.back-button').attr('href');
            }
            else {
                history.go(-1);
            }
        },

        switchContext: function( context_id, params, options ) {

            if( context_id instanceof Array ) {
                params = context_id[1];
                context_id = context_id[0];
            }

            params = params || {};

            var context = app.helpers.getContextForID( context_id );
            if ( ! context ) {
                alert( "unknown context switch: " + context_id );
            }
            window.location = app.helpers.formContextURL( context, params );
        },

        formContextRedirectUrl : function( context, params ) {
            var redirect_info = [ context, params ];

            return '/contextRedirect.html?redirect_info=' + encodeURIComponent( JSON.stringify( redirect_info ) );
        },

        hideContent: function(){
            $('div.content').hide();
            $('div.loader').show();
        },

        tryToSellApps : function() {
            // Check cookie & check param from user??!
            if( ! navigator.userAgent.match(/iPhone/i)  ) return;
            if( app.helpers.getCookie('app_install_shown') ) return;

            // Set the cookie
            var date = new Date();
            date.setTime( date.getTime() + ( 3 * 365 * 24 * 60 * 60 * 1000 ));
            var expires = "; expires=" + date.toGMTString();
            document.cookie = "app_install_shown=1" + expires + "; path=/";

            // Redirect to app page
            localStorage.setItem('apps_return_url', window.location.href);
            window.location.href = '/apps.html';
        },

        isMobile : {
            Android: function() {
                return /Android/i.test(navigator.userAgent);
            },
            BlackBerry: function() {
                return /BlackBerry/i.test(navigator.userAgent);
            },
            iOS: function() {
                return /iPhone|iPad|iPod/i.test(navigator.userAgent);
            },
            Windows: function() {
                return /IEMobile/i.test(navigator.userAgent);
            }
        },

        getCookie : function(name) {
            var parts = document.cookie.split(name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift();
            else return false;
        },

        validEmail : function(emailAddress) {
            var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
            emailAddress = emailAddress.replace(/\".*\" \<(.*)\>|(.*)/, '$1$2'); // '" fix syntax hl
            return pattern.test(emailAddress);
        },

        fetchTimeoutWatcher : function(timeout, el) {
            var $el = $(el);
            var _this = this;
            this.fetchComplete = false;
            setTimeout( function() {
                if( ! _this.fetchComplete ) {
                    $el.html( templatizer.connectivityError({}) ).trigger('create');
                    $el.one('click', '.reconnect', function(e) {
                        e.preventDefault();
                        $($el).html('<span class="loader"></span>');
                        app.helpers.hideContent();
                        Backbone.history.loadUrl();
                    });
                }
            }, timeout);
            return this;
        },

        dateString : function(time, offset) {
            var o = offset || 0;
            return moment.utc(time + o * 1000).format('ddd, MMM DD');
        },

        dayString : function(time, offset) {
            var o = offset || 0;
            return moment.utc(time + o * 1000).format('dddd');
        },

        hourSpanString : function( start, end, offset ) {
            var o = offset || 0;
            return moment.utc(start + o * 1000).format('h:mm A') + ' - ' + moment.utc(end + o * 1000).format('h:mm A');
        },

        // NOTE: Expects the times to be inside the same day
        fullTimeSpanString : function( start, end, timezone, offset ) {
            var tz = timezone || '';
            var o = offset || 0;
            return app.helpers.hourSpanString( start * 1000 , end * 1000, o ) + ' ' +
                app.helpers.dateString(start * 1000, o) + ' ' + tz;
        }
    },
    init : function() {

        // Login & redirects
        if( ! ( /contextRedirect\.html/.test( window.location.href ) ) ) {
            if( this._requireLogin() ){
                this._doRedirects();
            }
        }

        // Add login details to desktop_link
        if( app.auth.token ) app.defaults.desktop_link += '?dic='+app.auth.token;

        // Remove navigation bar on IOS
        //this._removeIosNav();

        $.ajaxSetup( { dataType : 'jsonp'} );

        // NOTE: this expects the callback to be the first url parameter. there is probably also something else wrong with this as it breaks if there is only one url parameter in the page which is being displayed
        $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
            options.dataType = 'jsonp';
            options.url = app.defaults.api_host + '/jsonp' + options.url.slice(options.url.indexOf('?callback'));
            var jsonp_url = originalOptions.url.replace(app.defaults.api_host,'');
            if( typeof originalOptions.data !== 'object' ) {
                originalOptions.data = $.parseJSON(originalOptions.data);
            }
            options.data = $.param($.extend(originalOptions.data, { dic : app.auth.token, user_id : app.auth.user, jsonp_method : originalOptions.type, jsonp_url : jsonp_url } ));
        });

        // Add auth token headers to Backbone sync
        Backbone.sync = _.wrap(Backbone.sync, function(originalSync, method, model, options) {
            options.dataType = 'jsonp';
            return originalSync(method, model, options);
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

        // Hack to get fragments working on non history supporting devices
        Backbone.history.start({pushState: Modernizr.history, silent: true});
        if(!Modernizr.history) {
            Backbone.history.navigate( window.location.pathname.substr(Backbone.history.options.root.length), { trigger: true } );
            window.location.hash = "";
        } else {
            Backbone.history.loadUrl(Backbone.history.getFragment());
        }
    },
    initializeAuthFromCookie : function() {
        var auth_cookie = this._readAuthCookie() || '';
        var user_and_token = auth_cookie.split(/_(.+)?/,2);
        app.auth.user = user_and_token[0];
        app.auth.token = user_and_token[1];

        return user_and_token[1] ? true : false;
    },

    _requireLogin : function() {

        // Skip if page does not require login
        var i, l = app.no_login_pages.length;
        var noLoginRequired = false;
        for(i=0; i < l; i++) {
            if( window.location.toString().indexOf( app.no_login_pages[i] ) !== -1 ) {
                noLoginRequired = true;
            }
        }

        // Url has auth & user query params
        if( this._readAuthUrlParams() ) {
            return true;
        }
        else if( this.initializeAuthFromCookie() ) {
            return true;
        }
        else if( noLoginRequired ){
            return true;
        }
        else{
            // Throw the user out if no credentials
            if( window.location.toString().indexOf('login.html') === -1 ) {
                app.helpers.switchContext("loginPage", {id : ''} );
                return false;
            }
        }
    },

    _doRedirects : function() {
        var redirect_meeting = this._getUrlParamByName('redirect_to_meeting');
        var redirect_matchmaking_confirmed = this._getUrlParamByName('confirmed_matchmaker_lock_id');
        var matchmaking_response = this._getUrlParamByName('matchmaking_response');
        var matchmaker_fragment = this._getUrlParamByName('matchmaker_fragment') || '';
        var open_calendar = this._getUrlParamByName('open_calendar') || '';
        var quickmeet_key = this._getUrlParamByName('quickmeet_key') || '';
        var ensure_user_id = this._getUrlParamByName('ensure_user_id') || false;
        var user_fragment = this._getUrlParamByName('user_fragment');
        var under_construction_url = this._getUrlParamByName('under_construction_url');
        var under_construction_message = this._getUrlParamByName('under_construction_message') || '';
        //var redirect_matcmaking_expired = this._getUrlParamByName('expired_matchmaker_lock_id');
        //var redirect_matchmaking_limit = this._getUrlParamByName('limit_reached_for_matchmaking_event_id');

        var proposals = this._getUrlParamByName('proposals');
        var clear = this._getUrlParamByName('clear');

        var chosen_redirect = false;

        // Clear user tokens
        if ( clear == 'true' ) {
            app.auth.user = '';
            app.auth.token = '';
            return;
        }

        if( ensure_user_id && ensure_user_id !== app.auth.user ) {
            this._removeAuthCookie();
            app.auth.user = '';
            app.auth.token = '';
        }

        // Show scheduling answering
        else if( under_construction_url ) {
            chosen_redirect = [ 'underConstruction', { url : under_construction_url, message : under_construction_message } ];
        }

        // Show scheduling answering
        else if( proposals === 'answer' && redirect_meeting ) {
            chosen_redirect = [ 'schedulingPage', { mode : 'answer', id : redirect_meeting } ];
        }

        // Show scheduling choosing
        else if( proposals === 'choose' && redirect_meeting ) {
            chosen_redirect = [ 'schedulingPage', { mode : 'choose', id : redirect_meeting } ];
        }

        // Show matchmaking calendar
        else if( user_fragment ) {
            chosen_redirect = ['meetmeCover', { user : user_fragment, cal : matchmaker_fragment, open_calendar : open_calendar, quickmeet_key : quickmeet_key  } ];
        }

        // Show matchmaking accept / decline
        else if( matchmaking_response && redirect_meeting ) {
            chosen_redirect = [ 'meetingPage', { matchmaking_response : matchmaking_response, id : redirect_meeting } ];
        }

        // Show meeting
        else if( redirect_meeting && redirect_meeting !== 0 && redirect_meeting !== '0' ) {
            chosen_redirect = [ 'meetingPage', { id : redirect_meeting } ];
        }

        // Show matchmaking confirmed after coming from email
        else if( parseInt(redirect_matchmaking_confirmed,10) ) {
            chosen_redirect = [ 'meetmeCalendar', { confirmed_lock_id : redirect_matchmaking_confirmed  } ];
        }

        // Go to meeting page if not on login page
        else if( window.location.toString().indexOf( 'login.html') !== -1 ) {
            chosen_redirect = [ 'meetingsPage' ];
        }

        if ( app.auth.tos_verify_required || window.location.toString().indexOf( 'login.html') !== -1 ) {
            chosen_redirect = chosen_redirect || [ 'meetingsPage' ];
            new app.userModel({ id : 'me' }).fetch( function( response ) {
                if ( ! ( response && response.tos_accepted ) ) {
                    app.helpers.switchContext( 'profilePage', { context_after_tos_accept : JSON.stringify( chosen_redirect ) } );
                }
            } );
        }

        if ( chosen_redirect ) {
            app.helpers.switchContext( chosen_redirect );
        }
    },

    _readAuthUrlParams : function() {
        return this._loginWithParams( this._getUrlParamByName( 'user_id' ), this._getUrlParamByName( 'dic' ) );
    },

    _loginWithParams : function( user, token ) {
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

    _getUrlParamByName : function( name ) {
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    },

    _readAuthCookie : function(){
        var nameEQ = app.auth.cookiename + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    },

    _createAuthCookie : function() {
        var date = new Date();
        date.setTime( date.getTime() + ( app.auth.cookievalid * 24 * 60 * 60 * 1000 ));
        var expires = "; expires=" + date.toGMTString();
        var value = app.auth.user + '_' + app.auth.token;
        document.cookie = app.auth.cookiename + "=" + value + expires + "; path=/";
    },
    _removeAuthCookie : function() {
        document.cookie = app.auth.cookiename + "=; expires=-1; path=/";
    },
    _getLocalStorage : function() {
        try {
            return 'localStorage' in window && window.localStorage !== null;
        } catch (e) {
            return false;
        }
    },

    _removeIosNav : function() {
        /mobile/i.test(navigator.userAgent) && !location.hash &&
            setTimeout(function () { window.scrollBy(0, 1); }, 3000);
    },

    _versionCheck : function(){
        $.getJSON( app.defaults.version_check_url , function(response) {
            // Force update if the current.json value is larger than client version
            if( parseInt(response.version, 10) > app.defaults.version ) {
                app._redirectToUpdate(response.url);
            }
        });
    },
    _redirectToUpdate : function(url) {
        setTimeout(function(){
            alert('You have an old version of the app. You need to update!');
            setTimeout( function(){
                steroids.openURL(url);
            },100);
            app._redirectToUpdate(url);
        },1000);
    },
    openUrlSchemeLink : function(appurl,normurl) {
        var win=window.open(normurl, '_blank');
        win.focus();
        return;
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

        var to_url = host + app.helpers.formContextRedirectUrl( context, redirect_params );
        var params = [
            { "key" : "client_id", "value" : "584216729178.apps.googleusercontent.com" },
            { "key" : "response_type", "value" : "code" },
            { "key" : "access_type", "value" : "offline" },
            { "key" : "scope", "value" : 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.google.com/calendar/feeds/ https://www.google.com/m8/feeds' },
            { "key" : "state", "value" : JSON.stringify( { to : to_url, redirect_uri : redirect_uri } ) },
            { "key" : "approval_prompt", "value" : "force" },
            { "key" : "redirect_uri", "value" : redirect_uri }
        ];

        var string_params = _.map( params,
            function( p ) { return encodeURIComponent( p.key ) + '=' + encodeURIComponent( p.value ); }
        );

        var url = "https://accounts.google.com/o/oauth2/auth?" + string_params.join("&");

        window.location = url;
    },
    showContent: function() {
        $('div.content').show();
        $('div.connectivity').hide();
        $('div.loader').hide().html('<span class="loader"></span>');
    },

    hasInternet : function() {
        return true;
    },

    showConnectivityError : function(type) {
        var $el = $('.connectivity').html( templatizer.connectivityError({ type : type }) ).show();
        $('div.content').hide();
        $('div.loader').hide();
        $el.trigger('create');
        $el.on('click', '.reconnect', function(e) {
            e.preventDefault();
            $el.off('click');
            $el.html('');
            app.helpers.hideContent();
            Backbone.history.loadUrl();
        });
    },
    // Value of this is the result from:
    // curl -s https://meetin.gs/meetings_json/timezone_data_export/ | python -m json.tool
    timezones : {
        "choices": [
            "Pacific/Niue",
            "Pacific/Pago_Pago",
            "HST",
            "Pacific/Honolulu",
            "Pacific/Rarotonga",
            "Pacific/Tahiti",
            "Pacific/Marquesas",
            "America/Adak",
            "Pacific/Gambier",
            "America/Anchorage",
            "America/Juneau",
            "America/Metlakatla",
            "America/Nome",
            "America/Sitka",
            "America/Yakutat",
            "Pacific/Pitcairn",
            "America/Creston",
            "America/Dawson",
            "America/Dawson_Creek",
            "America/Hermosillo",
            "America/Los_Angeles",
            "America/Phoenix",
            "America/Santa_Isabel",
            "America/Tijuana",
            "America/Vancouver",
            "America/Whitehorse",
            "MST",
            "PST8PDT",
            "America/Belize",
            "America/Boise",
            "America/Cambridge_Bay",
            "America/Chihuahua",
            "America/Costa_Rica",
            "America/Denver",
            "America/Edmonton",
            "America/El_Salvador",
            "America/Guatemala",
            "America/Inuvik",
            "America/Managua",
            "America/Mazatlan",
            "America/Ojinaga",
            "America/Regina",
            "America/Swift_Current",
            "America/Tegucigalpa",
            "America/Yellowknife",
            "MST7MDT",
            "Pacific/Galapagos",
            "America/Atikokan",
            "America/Bahia_Banderas",
            "America/Bogota",
            "America/Cancun",
            "America/Cayman",
            "America/Chicago",
            "America/Eirunepe",
            "America/Guayaquil",
            "America/Indiana/Knox",
            "America/Indiana/Tell_City",
            "America/Jamaica",
            "America/Lima",
            "America/Matamoros",
            "America/Menominee",
            "America/Merida",
            "America/Mexico_City",
            "America/Monterrey",
            "America/North_Dakota/Beulah",
            "America/North_Dakota/Center",
            "America/North_Dakota/New_Salem",
            "America/Panama",
            "America/Rainy_River",
            "America/Rankin_Inlet",
            "America/Resolute",
            "America/Rio_Branco",
            "America/Winnipeg",
            "CST6CDT",
            "EST",
            "Pacific/Easter",
            "America/Caracas",
            "America/Asuncion",
            "America/Barbados",
            "America/Blanc-Sablon",
            "America/Boa_Vista",
            "America/Campo_Grande",
            "America/Cuiaba",
            "America/Curacao",
            "America/Detroit",
            "America/Grand_Turk",
            "America/Guyana",
            "America/Havana",
            "America/Indiana/Indianapolis",
            "America/Indiana/Marengo",
            "America/Indiana/Petersburg",
            "America/Indiana/Vevay",
            "America/Indiana/Vincennes",
            "America/Indiana/Winamac",
            "America/Iqaluit",
            "America/Kentucky/Louisville",
            "America/Kentucky/Monticello",
            "America/La_Paz",
            "America/Manaus",
            "America/Martinique",
            "America/Nassau",
            "America/New_York",
            "America/Nipigon",
            "America/Pangnirtung",
            "America/Port-au-Prince",
            "America/Port_of_Spain",
            "America/Porto_Velho",
            "America/Puerto_Rico",
            "America/Santo_Domingo",
            "America/Thunder_Bay",
            "America/Toronto",
            "EST5EDT",
            "America/Araguaina",
            "America/Argentina/Buenos_Aires",
            "America/Argentina/Catamarca",
            "America/Argentina/Cordoba",
            "America/Argentina/Jujuy",
            "America/Argentina/La_Rioja",
            "America/Argentina/Mendoza",
            "America/Argentina/Rio_Gallegos",
            "America/Argentina/Salta",
            "America/Argentina/San_Juan",
            "America/Argentina/San_Luis",
            "America/Argentina/Tucuman",
            "America/Argentina/Ushuaia",
            "America/Bahia",
            "America/Belem",
            "America/Cayenne",
            "America/Fortaleza",
            "America/Glace_Bay",
            "America/Goose_Bay",
            "America/Halifax",
            "America/Maceio",
            "America/Moncton",
            "America/Montevideo",
            "America/Paramaribo",
            "America/Recife",
            "America/Santarem",
            "America/Santiago",
            "America/Sao_Paulo",
            "America/Thule",
            "Antarctica/Palmer",
            "Antarctica/Rothera",
            "Atlantic/Bermuda",
            "Atlantic/Stanley",
            "America/St_Johns",
            "America/Godthab",
            "America/Miquelon",
            "America/Noronha",
            "Atlantic/South_Georgia",
            "Atlantic/Cape_Verde",
            "Africa/Abidjan",
            "Africa/Accra",
            "Africa/Bissau",
            "Africa/Monrovia",
            "America/Danmarkshavn",
            "America/Scoresbysund",
            "Atlantic/Azores",
            "Atlantic/Reykjavik",
            "UTC",
            "UTC",
            "Africa/Algiers",
            "Africa/Casablanca",
            "Africa/El_Aaiun",
            "Africa/Lagos",
            "Africa/Ndjamena",
            "Africa/Tunis",
            "Atlantic/Canary",
            "Atlantic/Faroe",
            "Atlantic/Madeira",
            "Europe/Dublin",
            "Europe/Lisbon",
            "Europe/London",
            "WET",
            "Africa/Cairo",
            "Africa/Ceuta",
            "Africa/Johannesburg",
            "Africa/Maputo",
            "Africa/Tripoli",
            "Africa/Windhoek",
            "Antarctica/Troll",
            "CET",
            "Europe/Amsterdam",
            "Europe/Andorra",
            "Europe/Belgrade",
            "Europe/Berlin",
            "Europe/Brussels",
            "Europe/Budapest",
            "Europe/Copenhagen",
            "Europe/Gibraltar",
            "Europe/Kaliningrad",
            "Europe/Luxembourg",
            "Europe/Madrid",
            "Europe/Malta",
            "Europe/Monaco",
            "Europe/Oslo",
            "Europe/Paris",
            "Europe/Prague",
            "Europe/Rome",
            "Europe/Stockholm",
            "Europe/Tirane",
            "Europe/Vienna",
            "Europe/Warsaw",
            "Europe/Zurich",
            "MET",
            "Africa/Khartoum",
            "Africa/Nairobi",
            "Antarctica/Syowa",
            "Asia/Amman",
            "Asia/Baghdad",
            "Asia/Beirut",
            "Asia/Damascus",
            "Asia/Gaza",
            "Asia/Hebron",
            "Asia/Jerusalem",
            "Asia/Nicosia",
            "Asia/Qatar",
            "Asia/Riyadh",
            "EET",
            "Europe/Athens",
            "Europe/Bucharest",
            "Europe/Chisinau",
            "Europe/Helsinki",
            "Europe/Istanbul",
            "Europe/Kiev",
            "Europe/Minsk",
            "Europe/Moscow",
            "Europe/Riga",
            "Europe/Simferopol",
            "Europe/Sofia",
            "Europe/Tallinn",
            "Europe/Uzhgorod",
            "Europe/Vilnius",
            "Europe/Volgograd",
            "Europe/Zaporozhye",
            "Asia/Tehran",
            "Asia/Dubai",
            "Asia/Tbilisi",
            "Asia/Yerevan",
            "Europe/Samara",
            "Indian/Mahe",
            "Indian/Mauritius",
            "Indian/Reunion",
            "Asia/Kabul",
            "Antarctica/Mawson",
            "Asia/Aqtau",
            "Asia/Aqtobe",
            "Asia/Ashgabat",
            "Asia/Baku",
            "Asia/Dushanbe",
            "Asia/Karachi",
            "Asia/Oral",
            "Asia/Samarkand",
            "Asia/Tashkent",
            "Asia/Yekaterinburg",
            "Indian/Kerguelen",
            "Indian/Maldives",
            "Asia/Colombo",
            "Asia/Kolkata",
            "Asia/Kathmandu",
            "Antarctica/Vostok",
            "Asia/Almaty",
            "Asia/Bishkek",
            "Asia/Dhaka",
            "Asia/Novosibirsk",
            "Asia/Omsk",
            "Asia/Qyzylorda",
            "Asia/Thimphu",
            "Asia/Urumqi",
            "Indian/Chagos",
            "Asia/Rangoon",
            "Indian/Cocos",
            "Antarctica/Davis",
            "Asia/Bangkok",
            "Asia/Ho_Chi_Minh",
            "Asia/Hovd",
            "Asia/Jakarta",
            "Asia/Krasnoyarsk",
            "Asia/Novokuznetsk",
            "Asia/Pontianak",
            "Indian/Christmas",
            "Antarctica/Casey",
            "Asia/Brunei",
            "Asia/Chita",
            "Asia/Choibalsan",
            "Asia/Hong_Kong",
            "Asia/Irkutsk",
            "Asia/Kuala_Lumpur",
            "Asia/Kuching",
            "Asia/Macau",
            "Asia/Makassar",
            "Asia/Manila",
            "Asia/Shanghai",
            "Asia/Singapore",
            "Asia/Taipei",
            "Asia/Ulaanbaatar",
            "Australia/Perth",
            "Asia/Pyongyang",
            "Australia/Eucla",
            "Asia/Dili",
            "Asia/Jayapura",
            "Asia/Khandyga",
            "Asia/Seoul",
            "Asia/Tokyo",
            "Asia/Yakutsk",
            "Pacific/Palau",
            "Australia/Adelaide",
            "Australia/Broken_Hill",
            "Australia/Darwin",
            "Antarctica/DumontDUrville",
            "Asia/Magadan",
            "Asia/Sakhalin",
            "Asia/Ust-Nera",
            "Asia/Vladivostok",
            "Australia/Brisbane",
            "Australia/Currie",
            "Australia/Hobart",
            "Australia/Lindeman",
            "Australia/Melbourne",
            "Australia/Sydney",
            "Pacific/Chuuk",
            "Pacific/Guam",
            "Pacific/Port_Moresby",
            "Australia/Lord_Howe",
            "Antarctica/Macquarie",
            "Asia/Srednekolymsk",
            "Pacific/Bougainville",
            "Pacific/Efate",
            "Pacific/Guadalcanal",
            "Pacific/Kosrae",
            "Pacific/Noumea",
            "Pacific/Pohnpei",
            "Pacific/Norfolk",
            "Asia/Anadyr",
            "Asia/Kamchatka",
            "Pacific/Fiji",
            "Pacific/Funafuti",
            "Pacific/Kwajalein",
            "Pacific/Majuro",
            "Pacific/Nauru",
            "Pacific/Tarawa",
            "Pacific/Wake",
            "Pacific/Wallis",
            "Pacific/Auckland",
            "Pacific/Enderbury",
            "Pacific/Fakaofo",
            "Pacific/Tongatapu",
            "Pacific/Chatham",
            "Pacific/Apia",
            "Pacific/Kiritimati"
        ],
        "data": {
            "Africa/Abidjan": {
                "name": "Africa/Abidjan",
                "offset_string": "UTC",
                "offset_value": 0,
                "readable_name": "+0:00 Abidjan ( Africa )"
            },
            "Africa/Accra": {
                "name": "Africa/Accra",
                "offset_string": "UTC",
                "offset_value": 0,
                "readable_name": "+0:00 Accra ( Africa )"
            },
            "Africa/Algiers": {
                "name": "Africa/Algiers",
                "offset_string": "UTC+1",
                "offset_value": 3600,
                "readable_name": "+1:00 Algiers ( Africa )"
            },
            "Africa/Bissau": {
                "name": "Africa/Bissau",
                "offset_string": "UTC",
                "offset_value": 0,
                "readable_name": "+0:00 Bissau ( Africa )"
            },
            "Africa/Cairo": {
                "name": "Africa/Cairo",
                "offset_string": "UTC+2",
                "offset_value": 7200,
                "readable_name": "+2:00 Cairo ( Africa )"
            },
            "Africa/Casablanca": {
                "changed_offset_string": "UTC",
                "changed_offset_value": 0,
                "changed_readable_name": "+0:00 Casablanca ( Africa )",
                "dst_change_epoch": 1445739731,
                "name": "Africa/Casablanca",
                "offset_string": "UTC+1",
                "offset_value": 3600,
                "readable_name": "+1:00 Casablanca ( Africa )"
            },
            "Africa/Ceuta": {
                "changed_offset_string": "UTC+1",
                "changed_offset_value": 3600,
                "changed_readable_name": "+1:00 Ceuta ( Africa )",
                "dst_change_epoch": 1445735934,
                "name": "Africa/Ceuta",
                "offset_string": "UTC+2",
                "offset_value": 7200,
                "readable_name": "+2:00 Ceuta ( Africa )"
            },
            "Africa/El_Aaiun": {
                "changed_offset_string": "UTC",
                "changed_offset_value": 0,
                "changed_readable_name": "+0:00 El Aaiun ( Africa )",
                "dst_change_epoch": 1445739731,
                "name": "Africa/El_Aaiun",
                "offset_string": "UTC+1",
                "offset_value": 3600,
                "readable_name": "+1:00 El Aaiun ( Africa )"
            },
            "Africa/Johannesburg": {
                "name": "Africa/Johannesburg",
                "offset_string": "UTC+2",
                "offset_value": 7200,
                "readable_name": "+2:00 Johannesburg ( Africa )"
            },
            "Africa/Khartoum": {
                "name": "Africa/Khartoum",
                "offset_string": "UTC+3",
                "offset_value": 10800,
                "readable_name": "+3:00 Khartoum ( Africa )"
            },
            "Africa/Lagos": {
                "name": "Africa/Lagos",
                "offset_string": "UTC+1",
                "offset_value": 3600,
                "readable_name": "+1:00 Lagos ( Africa )"
            },
            "Africa/Maputo": {
                "name": "Africa/Maputo",
                "offset_string": "UTC+2",
                "offset_value": 7200,
                "readable_name": "+2:00 Maputo ( Africa )"
            },
            "Africa/Monrovia": {
                "name": "Africa/Monrovia",
                "offset_string": "UTC",
                "offset_value": 0,
                "readable_name": "+0:00 Monrovia ( Africa )"
            },
            "Africa/Nairobi": {
                "name": "Africa/Nairobi",
                "offset_string": "UTC+3",
                "offset_value": 10800,
                "readable_name": "+3:00 Nairobi ( Africa )"
            },
            "Africa/Ndjamena": {
                "name": "Africa/Ndjamena",
                "offset_string": "UTC+1",
                "offset_value": 3600,
                "readable_name": "+1:00 Ndjamena ( Africa )"
            },
            "Africa/Tripoli": {
                "name": "Africa/Tripoli",
                "offset_string": "UTC+2",
                "offset_value": 7200,
                "readable_name": "+2:00 Tripoli ( Africa )"
            },
            "Africa/Tunis": {
                "name": "Africa/Tunis",
                "offset_string": "UTC+1",
                "offset_value": 3600,
                "readable_name": "+1:00 Tunis ( Africa )"
            },
            "Africa/Windhoek": {
                "changed_offset_string": "UTC+1",
                "changed_offset_value": 3600,
                "changed_readable_name": "+1:00 Windhoek ( Africa )",
                "dst_change_epoch": 1459641989,
                "name": "Africa/Windhoek",
                "offset_string": "UTC+2",
                "offset_value": 7200,
                "readable_name": "+2:00 Windhoek ( Africa )"
            },
            "America/Adak": {
                "changed_offset_string": "UTC-10",
                "changed_offset_value": -36000,
                "changed_readable_name": "-10:00 Adak ( America )",
                "dst_change_epoch": 1446375708,
                "name": "America/Adak",
                "offset_string": "UTC-9",
                "offset_value": -32400,
                "readable_name": "-9:00 Adak ( America )"
            },
            "America/Anchorage": {
                "changed_offset_string": "UTC-9",
                "changed_offset_value": -32400,
                "changed_readable_name": "-9:00 Anchorage ( America )",
                "dst_change_epoch": 1446373809,
                "name": "America/Anchorage",
                "offset_string": "UTC-8",
                "offset_value": -28800,
                "readable_name": "-8:00 Anchorage ( America )"
            },
            "America/Araguaina": {
                "name": "America/Araguaina",
                "offset_string": "UTC-3",
                "offset_value": -10800,
                "readable_name": "-3:00 Araguaina ( America )"
            },
            "America/Argentina/Buenos_Aires": {
                "name": "America/Argentina/Buenos_Aires",
                "offset_string": "UTC-3",
                "offset_value": -10800,
                "readable_name": "-3:00 Buenos Aires ( America/Argentina )"
            },
            "America/Argentina/Catamarca": {
                "name": "America/Argentina/Catamarca",
                "offset_string": "UTC-3",
                "offset_value": -10800,
                "readable_name": "-3:00 Catamarca ( America/Argentina )"
            },
            "America/Argentina/Cordoba": {
                "name": "America/Argentina/Cordoba",
                "offset_string": "UTC-3",
                "offset_value": -10800,
                "readable_name": "-3:00 Cordoba ( America/Argentina )"
            },
            "America/Argentina/Jujuy": {
                "name": "America/Argentina/Jujuy",
                "offset_string": "UTC-3",
                "offset_value": -10800,
                "readable_name": "-3:00 Jujuy ( America/Argentina )"
            },
            "America/Argentina/La_Rioja": {
                "name": "America/Argentina/La_Rioja",
                "offset_string": "UTC-3",
                "offset_value": -10800,
                "readable_name": "-3:00 La Rioja ( America/Argentina )"
            },
            "America/Argentina/Mendoza": {
                "name": "America/Argentina/Mendoza",
                "offset_string": "UTC-3",
                "offset_value": -10800,
                "readable_name": "-3:00 Mendoza ( America/Argentina )"
            },
            "America/Argentina/Rio_Gallegos": {
                "name": "America/Argentina/Rio_Gallegos",
                "offset_string": "UTC-3",
                "offset_value": -10800,
                "readable_name": "-3:00 Rio Gallegos ( America/Argentina )"
            },
            "America/Argentina/Salta": {
                "name": "America/Argentina/Salta",
                "offset_string": "UTC-3",
                "offset_value": -10800,
                "readable_name": "-3:00 Salta ( America/Argentina )"
            },
            "America/Argentina/San_Juan": {
                "name": "America/Argentina/San_Juan",
                "offset_string": "UTC-3",
                "offset_value": -10800,
                "readable_name": "-3:00 San Juan ( America/Argentina )"
            },
            "America/Argentina/San_Luis": {
                "name": "America/Argentina/San_Luis",
                "offset_string": "UTC-3",
                "offset_value": -10800,
                "readable_name": "-3:00 San Luis ( America/Argentina )"
            },
            "America/Argentina/Tucuman": {
                "name": "America/Argentina/Tucuman",
                "offset_string": "UTC-3",
                "offset_value": -10800,
                "readable_name": "-3:00 Tucuman ( America/Argentina )"
            },
            "America/Argentina/Ushuaia": {
                "name": "America/Argentina/Ushuaia",
                "offset_string": "UTC-3",
                "offset_value": -10800,
                "readable_name": "-3:00 Ushuaia ( America/Argentina )"
            },
            "America/Asuncion": {
                "changed_offset_string": "UTC-3",
                "changed_offset_value": -10800,
                "changed_readable_name": "-3:00 Asuncion ( America )",
                "dst_change_epoch": 1443932418,
                "name": "America/Asuncion",
                "offset_string": "UTC-4",
                "offset_value": -14400,
                "readable_name": "-4:00 Asuncion ( America )"
            },
            "America/Atikokan": {
                "name": "America/Atikokan",
                "offset_string": "UTC-5",
                "offset_value": -18000,
                "readable_name": "-5:00 Atikokan ( America )"
            },
            "America/Bahia": {
                "name": "America/Bahia",
                "offset_string": "UTC-3",
                "offset_value": -10800,
                "readable_name": "-3:00 Bahia ( America )"
            },
            "America/Bahia_Banderas": {
                "changed_offset_string": "UTC-6",
                "changed_offset_value": -21600,
                "changed_readable_name": "-6:00 Bahia Banderas ( America )",
                "dst_change_epoch": 1445756817,
                "name": "America/Bahia_Banderas",
                "offset_string": "UTC-5",
                "offset_value": -18000,
                "readable_name": "-5:00 Bahia Banderas ( America )"
            },
            "America/Barbados": {
                "name": "America/Barbados",
                "offset_string": "UTC-4",
                "offset_value": -14400,
                "readable_name": "-4:00 Barbados ( America )"
            },
            "America/Belem": {
                "name": "America/Belem",
                "offset_string": "UTC-3",
                "offset_value": -10800,
                "readable_name": "-3:00 Belem ( America )"
            },
            "America/Belize": {
                "name": "America/Belize",
                "offset_string": "UTC-6",
                "offset_value": -21600,
                "readable_name": "-6:00 Belize ( America )"
            },
            "America/Blanc-Sablon": {
                "name": "America/Blanc-Sablon",
                "offset_string": "UTC-4",
                "offset_value": -14400,
                "readable_name": "-4:00 Blanc-Sablon ( America )"
            },
            "America/Boa_Vista": {
                "name": "America/Boa_Vista",
                "offset_string": "UTC-4",
                "offset_value": -14400,
                "readable_name": "-4:00 Boa Vista ( America )"
            },
            "America/Bogota": {
                "name": "America/Bogota",
                "offset_string": "UTC-5",
                "offset_value": -18000,
                "readable_name": "-5:00 Bogota ( America )"
            },
            "America/Boise": {
                "changed_offset_string": "UTC-7",
                "changed_offset_value": -25200,
                "changed_readable_name": "-7:00 Boise ( America )",
                "dst_change_epoch": 1446366215,
                "name": "America/Boise",
                "offset_string": "UTC-6",
                "offset_value": -21600,
                "readable_name": "-6:00 Boise ( America )"
            },
            "America/Cambridge_Bay": {
                "changed_offset_string": "UTC-7",
                "changed_offset_value": -25200,
                "changed_readable_name": "-7:00 Cambridge Bay ( America )",
                "dst_change_epoch": 1446366215,
                "name": "America/Cambridge_Bay",
                "offset_string": "UTC-6",
                "offset_value": -21600,
                "readable_name": "-6:00 Cambridge Bay ( America )"
            },
            "America/Campo_Grande": {
                "changed_offset_string": "UTC-3",
                "changed_offset_value": -10800,
                "changed_readable_name": "-3:00 Campo Grande ( America )",
                "dst_change_epoch": 1445141724,
                "name": "America/Campo_Grande",
                "offset_string": "UTC-4",
                "offset_value": -14400,
                "readable_name": "-4:00 Campo Grande ( America )"
            },
            "America/Cancun": {
                "name": "America/Cancun",
                "offset_string": "UTC-5",
                "offset_value": -18000,
                "readable_name": "-5:00 Cancun ( America )"
            },
            "America/Caracas": {
                "name": "America/Caracas",
                "offset_string": "UTC-4:30",
                "offset_value": -16200,
                "readable_name": "-4:30 Caracas ( America )"
            },
            "America/Cayenne": {
                "name": "America/Cayenne",
                "offset_string": "UTC-3",
                "offset_value": -10800,
                "readable_name": "-3:00 Cayenne ( America )"
            },
            "America/Cayman": {
                "changed_offset_string": "UTC-4",
                "changed_offset_value": -14400,
                "changed_readable_name": "-4:00 Cayman ( America )",
                "dst_change_epoch": 1457853661,
                "name": "America/Cayman",
                "offset_string": "UTC-5",
                "offset_value": -18000,
                "readable_name": "-5:00 Cayman ( America )"
            },
            "America/Chicago": {
                "changed_offset_string": "UTC-6",
                "changed_offset_value": -21600,
                "changed_readable_name": "-6:00 Chicago ( America )",
                "dst_change_epoch": 1446362418,
                "name": "America/Chicago",
                "offset_string": "UTC-5",
                "offset_value": -18000,
                "readable_name": "-5:00 Chicago ( America )"
            },
            "America/Chihuahua": {
                "changed_offset_string": "UTC-7",
                "changed_offset_value": -25200,
                "changed_readable_name": "-7:00 Chihuahua ( America )",
                "dst_change_epoch": 1445760614,
                "name": "America/Chihuahua",
                "offset_string": "UTC-6",
                "offset_value": -21600,
                "readable_name": "-6:00 Chihuahua ( America )"
            },
            "America/Costa_Rica": {
                "name": "America/Costa_Rica",
                "offset_string": "UTC-6",
                "offset_value": -21600,
                "readable_name": "-6:00 Costa Rica ( America )"
            },
            "America/Creston": {
                "name": "America/Creston",
                "offset_string": "UTC-7",
                "offset_value": -25200,
                "readable_name": "-7:00 Creston ( America )"
            },
            "America/Cuiaba": {
                "changed_offset_string": "UTC-3",
                "changed_offset_value": -10800,
                "changed_readable_name": "-3:00 Cuiaba ( America )",
                "dst_change_epoch": 1445141724,
                "name": "America/Cuiaba",
                "offset_string": "UTC-4",
                "offset_value": -14400,
                "readable_name": "-4:00 Cuiaba ( America )"
            },
            "America/Curacao": {
                "name": "America/Curacao",
                "offset_string": "UTC-4",
                "offset_value": -14400,
                "readable_name": "-4:00 Curacao ( America )"
            },
            "America/Danmarkshavn": {
                "name": "America/Danmarkshavn",
                "offset_string": "UTC",
                "offset_value": 0,
                "readable_name": "+0:00 Danmarkshavn ( America )"
            },
            "America/Dawson": {
                "changed_offset_string": "UTC-8",
                "changed_offset_value": -28800,
                "changed_readable_name": "-8:00 Dawson ( America )",
                "dst_change_epoch": 1446370012,
                "name": "America/Dawson",
                "offset_string": "UTC-7",
                "offset_value": -25200,
                "readable_name": "-7:00 Dawson ( America )"
            },
            "America/Dawson_Creek": {
                "name": "America/Dawson_Creek",
                "offset_string": "UTC-7",
                "offset_value": -25200,
                "readable_name": "-7:00 Dawson Creek ( America )"
            },
            "America/Denver": {
                "changed_offset_string": "UTC-7",
                "changed_offset_value": -25200,
                "changed_readable_name": "-7:00 Denver ( America )",
                "dst_change_epoch": 1446366215,
                "name": "America/Denver",
                "offset_string": "UTC-6",
                "offset_value": -21600,
                "readable_name": "-6:00 Denver ( America )"
            },
            "America/Detroit": {
                "changed_offset_string": "UTC-5",
                "changed_offset_value": -18000,
                "changed_readable_name": "-5:00 Detroit ( America )",
                "dst_change_epoch": 1446358622,
                "name": "America/Detroit",
                "offset_string": "UTC-4",
                "offset_value": -14400,
                "readable_name": "-4:00 Detroit ( America )"
            },
            "America/Edmonton": {
                "changed_offset_string": "UTC-7",
                "changed_offset_value": -25200,
                "changed_readable_name": "-7:00 Edmonton ( America )",
                "dst_change_epoch": 1446366215,
                "name": "America/Edmonton",
                "offset_string": "UTC-6",
                "offset_value": -21600,
                "readable_name": "-6:00 Edmonton ( America )"
            },
            "America/Eirunepe": {
                "name": "America/Eirunepe",
                "offset_string": "UTC-5",
                "offset_value": -18000,
                "readable_name": "-5:00 Eirunepe ( America )"
            },
            "America/El_Salvador": {
                "name": "America/El_Salvador",
                "offset_string": "UTC-6",
                "offset_value": -21600,
                "readable_name": "-6:00 El Salvador ( America )"
            },
            "America/Fortaleza": {
                "name": "America/Fortaleza",
                "offset_string": "UTC-3",
                "offset_value": -10800,
                "readable_name": "-3:00 Fortaleza ( America )"
            },
            "America/Glace_Bay": {
                "changed_offset_string": "UTC-4",
                "changed_offset_value": -14400,
                "changed_readable_name": "-4:00 Glace Bay ( America )",
                "dst_change_epoch": 1446354825,
                "name": "America/Glace_Bay",
                "offset_string": "UTC-3",
                "offset_value": -10800,
                "readable_name": "-3:00 Glace Bay ( America )"
            },
            "America/Godthab": {
                "changed_offset_string": "UTC-3",
                "changed_offset_value": -10800,
                "changed_readable_name": "-3:00 Godthab ( America )",
                "dst_change_epoch": 1445735934,
                "name": "America/Godthab",
                "offset_string": "UTC-2",
                "offset_value": -7200,
                "readable_name": "-2:00 Godthab ( America )"
            },
            "America/Goose_Bay": {
                "changed_offset_string": "UTC-4",
                "changed_offset_value": -14400,
                "changed_readable_name": "-4:00 Goose Bay ( America )",
                "dst_change_epoch": 1446354825,
                "name": "America/Goose_Bay",
                "offset_string": "UTC-3",
                "offset_value": -10800,
                "readable_name": "-3:00 Goose Bay ( America )"
            },
            "America/Grand_Turk": {
                "name": "America/Grand_Turk",
                "offset_string": "UTC-4",
                "offset_value": -14400,
                "readable_name": "-4:00 Grand Turk ( America )"
            },
            "America/Guatemala": {
                "name": "America/Guatemala",
                "offset_string": "UTC-6",
                "offset_value": -21600,
                "readable_name": "-6:00 Guatemala ( America )"
            },
            "America/Guayaquil": {
                "name": "America/Guayaquil",
                "offset_string": "UTC-5",
                "offset_value": -18000,
                "readable_name": "-5:00 Guayaquil ( America )"
            },
            "America/Guyana": {
                "name": "America/Guyana",
                "offset_string": "UTC-4",
                "offset_value": -14400,
                "readable_name": "-4:00 Guyana ( America )"
            },
            "America/Halifax": {
                "changed_offset_string": "UTC-4",
                "changed_offset_value": -14400,
                "changed_readable_name": "-4:00 Halifax ( America )",
                "dst_change_epoch": 1446354825,
                "name": "America/Halifax",
                "offset_string": "UTC-3",
                "offset_value": -10800,
                "readable_name": "-3:00 Halifax ( America )"
            },
            "America/Havana": {
                "changed_offset_string": "UTC-5",
                "changed_offset_value": -18000,
                "changed_readable_name": "-5:00 Havana ( America )",
                "dst_change_epoch": 1446354825,
                "name": "America/Havana",
                "offset_string": "UTC-4",
                "offset_value": -14400,
                "readable_name": "-4:00 Havana ( America )"
            },
            "America/Hermosillo": {
                "name": "America/Hermosillo",
                "offset_string": "UTC-7",
                "offset_value": -25200,
                "readable_name": "-7:00 Hermosillo ( America )"
            },
            "America/Indiana/Indianapolis": {
                "changed_offset_string": "UTC-5",
                "changed_offset_value": -18000,
                "changed_readable_name": "-5:00 Indianapolis ( America/Indiana )",
                "dst_change_epoch": 1446358622,
                "name": "America/Indiana/Indianapolis",
                "offset_string": "UTC-4",
                "offset_value": -14400,
                "readable_name": "-4:00 Indianapolis ( America/Indiana )"
            },
            "America/Indiana/Knox": {
                "changed_offset_string": "UTC-6",
                "changed_offset_value": -21600,
                "changed_readable_name": "-6:00 Knox ( America/Indiana )",
                "dst_change_epoch": 1446362418,
                "name": "America/Indiana/Knox",
                "offset_string": "UTC-5",
                "offset_value": -18000,
                "readable_name": "-5:00 Knox ( America/Indiana )"
            },
            "America/Indiana/Marengo": {
                "changed_offset_string": "UTC-5",
                "changed_offset_value": -18000,
                "changed_readable_name": "-5:00 Marengo ( America/Indiana )",
                "dst_change_epoch": 1446358622,
                "name": "America/Indiana/Marengo",
                "offset_string": "UTC-4",
                "offset_value": -14400,
                "readable_name": "-4:00 Marengo ( America/Indiana )"
            },
            "America/Indiana/Petersburg": {
                "changed_offset_string": "UTC-5",
                "changed_offset_value": -18000,
                "changed_readable_name": "-5:00 Petersburg ( America/Indiana )",
                "dst_change_epoch": 1446358622,
                "name": "America/Indiana/Petersburg",
                "offset_string": "UTC-4",
                "offset_value": -14400,
                "readable_name": "-4:00 Petersburg ( America/Indiana )"
            },
            "America/Indiana/Tell_City": {
                "changed_offset_string": "UTC-6",
                "changed_offset_value": -21600,
                "changed_readable_name": "-6:00 Tell City ( America/Indiana )",
                "dst_change_epoch": 1446362418,
                "name": "America/Indiana/Tell_City",
                "offset_string": "UTC-5",
                "offset_value": -18000,
                "readable_name": "-5:00 Tell City ( America/Indiana )"
            },
            "America/Indiana/Vevay": {
                "changed_offset_string": "UTC-5",
                "changed_offset_value": -18000,
                "changed_readable_name": "-5:00 Vevay ( America/Indiana )",
                "dst_change_epoch": 1446358622,
                "name": "America/Indiana/Vevay",
                "offset_string": "UTC-4",
                "offset_value": -14400,
                "readable_name": "-4:00 Vevay ( America/Indiana )"
            },
            "America/Indiana/Vincennes": {
                "changed_offset_string": "UTC-5",
                "changed_offset_value": -18000,
                "changed_readable_name": "-5:00 Vincennes ( America/Indiana )",
                "dst_change_epoch": 1446358622,
                "name": "America/Indiana/Vincennes",
                "offset_string": "UTC-4",
                "offset_value": -14400,
                "readable_name": "-4:00 Vincennes ( America/Indiana )"
            },
            "America/Indiana/Winamac": {
                "changed_offset_string": "UTC-5",
                "changed_offset_value": -18000,
                "changed_readable_name": "-5:00 Winamac ( America/Indiana )",
                "dst_change_epoch": 1446358622,
                "name": "America/Indiana/Winamac",
                "offset_string": "UTC-4",
                "offset_value": -14400,
                "readable_name": "-4:00 Winamac ( America/Indiana )"
            },
            "America/Inuvik": {
                "changed_offset_string": "UTC-7",
                "changed_offset_value": -25200,
                "changed_readable_name": "-7:00 Inuvik ( America )",
                "dst_change_epoch": 1446366215,
                "name": "America/Inuvik",
                "offset_string": "UTC-6",
                "offset_value": -21600,
                "readable_name": "-6:00 Inuvik ( America )"
            },
            "America/Iqaluit": {
                "changed_offset_string": "UTC-5",
                "changed_offset_value": -18000,
                "changed_readable_name": "-5:00 Iqaluit ( America )",
                "dst_change_epoch": 1446358622,
                "name": "America/Iqaluit",
                "offset_string": "UTC-4",
                "offset_value": -14400,
                "readable_name": "-4:00 Iqaluit ( America )"
            },
            "America/Jamaica": {
                "name": "America/Jamaica",
                "offset_string": "UTC-5",
                "offset_value": -18000,
                "readable_name": "-5:00 Jamaica ( America )"
            },
            "America/Juneau": {
                "changed_offset_string": "UTC-9",
                "changed_offset_value": -32400,
                "changed_readable_name": "-9:00 Juneau ( America )",
                "dst_change_epoch": 1446373809,
                "name": "America/Juneau",
                "offset_string": "UTC-8",
                "offset_value": -28800,
                "readable_name": "-8:00 Juneau ( America )"
            },
            "America/Kentucky/Louisville": {
                "changed_offset_string": "UTC-5",
                "changed_offset_value": -18000,
                "changed_readable_name": "-5:00 Louisville ( America/Kentucky )",
                "dst_change_epoch": 1446358622,
                "name": "America/Kentucky/Louisville",
                "offset_string": "UTC-4",
                "offset_value": -14400,
                "readable_name": "-4:00 Louisville ( America/Kentucky )"
            },
            "America/Kentucky/Monticello": {
                "changed_offset_string": "UTC-5",
                "changed_offset_value": -18000,
                "changed_readable_name": "-5:00 Monticello ( America/Kentucky )",
                "dst_change_epoch": 1446358622,
                "name": "America/Kentucky/Monticello",
                "offset_string": "UTC-4",
                "offset_value": -14400,
                "readable_name": "-4:00 Monticello ( America/Kentucky )"
            },
            "America/La_Paz": {
                "name": "America/La_Paz",
                "offset_string": "UTC-4",
                "offset_value": -14400,
                "readable_name": "-4:00 La Paz ( America )"
            },
            "America/Lima": {
                "name": "America/Lima",
                "offset_string": "UTC-5",
                "offset_value": -18000,
                "readable_name": "-5:00 Lima ( America )"
            },
            "America/Los_Angeles": {
                "changed_offset_string": "UTC-8",
                "changed_offset_value": -28800,
                "changed_readable_name": "-8:00 Los Angeles ( America )",
                "dst_change_epoch": 1446370012,
                "name": "America/Los_Angeles",
                "offset_string": "UTC-7",
                "offset_value": -25200,
                "readable_name": "-7:00 Los Angeles ( America )"
            },
            "America/Maceio": {
                "name": "America/Maceio",
                "offset_string": "UTC-3",
                "offset_value": -10800,
                "readable_name": "-3:00 Maceio ( America )"
            },
            "America/Managua": {
                "name": "America/Managua",
                "offset_string": "UTC-6",
                "offset_value": -21600,
                "readable_name": "-6:00 Managua ( America )"
            },
            "America/Manaus": {
                "name": "America/Manaus",
                "offset_string": "UTC-4",
                "offset_value": -14400,
                "readable_name": "-4:00 Manaus ( America )"
            },
            "America/Martinique": {
                "name": "America/Martinique",
                "offset_string": "UTC-4",
                "offset_value": -14400,
                "readable_name": "-4:00 Martinique ( America )"
            },
            "America/Matamoros": {
                "changed_offset_string": "UTC-6",
                "changed_offset_value": -21600,
                "changed_readable_name": "-6:00 Matamoros ( America )",
                "dst_change_epoch": 1446362418,
                "name": "America/Matamoros",
                "offset_string": "UTC-5",
                "offset_value": -18000,
                "readable_name": "-5:00 Matamoros ( America )"
            },
            "America/Mazatlan": {
                "changed_offset_string": "UTC-7",
                "changed_offset_value": -25200,
                "changed_readable_name": "-7:00 Mazatlan ( America )",
                "dst_change_epoch": 1445760614,
                "name": "America/Mazatlan",
                "offset_string": "UTC-6",
                "offset_value": -21600,
                "readable_name": "-6:00 Mazatlan ( America )"
            },
            "America/Menominee": {
                "changed_offset_string": "UTC-6",
                "changed_offset_value": -21600,
                "changed_readable_name": "-6:00 Menominee ( America )",
                "dst_change_epoch": 1446362418,
                "name": "America/Menominee",
                "offset_string": "UTC-5",
                "offset_value": -18000,
                "readable_name": "-5:00 Menominee ( America )"
            },
            "America/Merida": {
                "changed_offset_string": "UTC-6",
                "changed_offset_value": -21600,
                "changed_readable_name": "-6:00 Merida ( America )",
                "dst_change_epoch": 1445756817,
                "name": "America/Merida",
                "offset_string": "UTC-5",
                "offset_value": -18000,
                "readable_name": "-5:00 Merida ( America )"
            },
            "America/Metlakatla": {
                "name": "America/Metlakatla",
                "offset_string": "UTC-8",
                "offset_value": -28800,
                "readable_name": "-8:00 Metlakatla ( America )"
            },
            "America/Mexico_City": {
                "changed_offset_string": "UTC-6",
                "changed_offset_value": -21600,
                "changed_readable_name": "-6:00 Mexico City ( America )",
                "dst_change_epoch": 1445756817,
                "name": "America/Mexico_City",
                "offset_string": "UTC-5",
                "offset_value": -18000,
                "readable_name": "-5:00 Mexico City ( America )"
            },
            "America/Miquelon": {
                "changed_offset_string": "UTC-3",
                "changed_offset_value": -10800,
                "changed_readable_name": "-3:00 Miquelon ( America )",
                "dst_change_epoch": 1446351028,
                "name": "America/Miquelon",
                "offset_string": "UTC-2",
                "offset_value": -7200,
                "readable_name": "-2:00 Miquelon ( America )"
            },
            "America/Moncton": {
                "changed_offset_string": "UTC-4",
                "changed_offset_value": -14400,
                "changed_readable_name": "-4:00 Moncton ( America )",
                "dst_change_epoch": 1446354825,
                "name": "America/Moncton",
                "offset_string": "UTC-3",
                "offset_value": -10800,
                "readable_name": "-3:00 Moncton ( America )"
            },
            "America/Monterrey": {
                "changed_offset_string": "UTC-6",
                "changed_offset_value": -21600,
                "changed_readable_name": "-6:00 Monterrey ( America )",
                "dst_change_epoch": 1445756817,
                "name": "America/Monterrey",
                "offset_string": "UTC-5",
                "offset_value": -18000,
                "readable_name": "-5:00 Monterrey ( America )"
            },
            "America/Montevideo": {
                "name": "America/Montevideo",
                "offset_string": "UTC-3",
                "offset_value": -10800,
                "readable_name": "-3:00 Montevideo ( America )"
            },
            "America/Nassau": {
                "changed_offset_string": "UTC-5",
                "changed_offset_value": -18000,
                "changed_readable_name": "-5:00 Nassau ( America )",
                "dst_change_epoch": 1446358622,
                "name": "America/Nassau",
                "offset_string": "UTC-4",
                "offset_value": -14400,
                "readable_name": "-4:00 Nassau ( America )"
            },
            "America/New_York": {
                "changed_offset_string": "UTC-5",
                "changed_offset_value": -18000,
                "changed_readable_name": "-5:00 New York ( America )",
                "dst_change_epoch": 1446358622,
                "name": "America/New_York",
                "offset_string": "UTC-4",
                "offset_value": -14400,
                "readable_name": "-4:00 New York ( America )"
            },
            "America/Nipigon": {
                "changed_offset_string": "UTC-5",
                "changed_offset_value": -18000,
                "changed_readable_name": "-5:00 Nipigon ( America )",
                "dst_change_epoch": 1446358622,
                "name": "America/Nipigon",
                "offset_string": "UTC-4",
                "offset_value": -14400,
                "readable_name": "-4:00 Nipigon ( America )"
            },
            "America/Nome": {
                "changed_offset_string": "UTC-9",
                "changed_offset_value": -32400,
                "changed_readable_name": "-9:00 Nome ( America )",
                "dst_change_epoch": 1446373809,
                "name": "America/Nome",
                "offset_string": "UTC-8",
                "offset_value": -28800,
                "readable_name": "-8:00 Nome ( America )"
            },
            "America/Noronha": {
                "name": "America/Noronha",
                "offset_string": "UTC-2",
                "offset_value": -7200,
                "readable_name": "-2:00 Noronha ( America )"
            },
            "America/North_Dakota/Beulah": {
                "changed_offset_string": "UTC-6",
                "changed_offset_value": -21600,
                "changed_readable_name": "-6:00 Beulah ( America/North Dakota )",
                "dst_change_epoch": 1446362418,
                "name": "America/North_Dakota/Beulah",
                "offset_string": "UTC-5",
                "offset_value": -18000,
                "readable_name": "-5:00 Beulah ( America/North Dakota )"
            },
            "America/North_Dakota/Center": {
                "changed_offset_string": "UTC-6",
                "changed_offset_value": -21600,
                "changed_readable_name": "-6:00 Center ( America/North Dakota )",
                "dst_change_epoch": 1446362418,
                "name": "America/North_Dakota/Center",
                "offset_string": "UTC-5",
                "offset_value": -18000,
                "readable_name": "-5:00 Center ( America/North Dakota )"
            },
            "America/North_Dakota/New_Salem": {
                "changed_offset_string": "UTC-6",
                "changed_offset_value": -21600,
                "changed_readable_name": "-6:00 New Salem ( America/North Dakota )",
                "dst_change_epoch": 1446362418,
                "name": "America/North_Dakota/New_Salem",
                "offset_string": "UTC-5",
                "offset_value": -18000,
                "readable_name": "-5:00 New Salem ( America/North Dakota )"
            },
            "America/Ojinaga": {
                "changed_offset_string": "UTC-7",
                "changed_offset_value": -25200,
                "changed_readable_name": "-7:00 Ojinaga ( America )",
                "dst_change_epoch": 1446366215,
                "name": "America/Ojinaga",
                "offset_string": "UTC-6",
                "offset_value": -21600,
                "readable_name": "-6:00 Ojinaga ( America )"
            },
            "America/Panama": {
                "name": "America/Panama",
                "offset_string": "UTC-5",
                "offset_value": -18000,
                "readable_name": "-5:00 Panama ( America )"
            },
            "America/Pangnirtung": {
                "changed_offset_string": "UTC-5",
                "changed_offset_value": -18000,
                "changed_readable_name": "-5:00 Pangnirtung ( America )",
                "dst_change_epoch": 1446358622,
                "name": "America/Pangnirtung",
                "offset_string": "UTC-4",
                "offset_value": -14400,
                "readable_name": "-4:00 Pangnirtung ( America )"
            },
            "America/Paramaribo": {
                "name": "America/Paramaribo",
                "offset_string": "UTC-3",
                "offset_value": -10800,
                "readable_name": "-3:00 Paramaribo ( America )"
            },
            "America/Phoenix": {
                "name": "America/Phoenix",
                "offset_string": "UTC-7",
                "offset_value": -25200,
                "readable_name": "-7:00 Phoenix ( America )"
            },
            "America/Port-au-Prince": {
                "changed_offset_string": "UTC-5",
                "changed_offset_value": -18000,
                "changed_readable_name": "-5:00 Port-au-Prince ( America )",
                "dst_change_epoch": 1446358622,
                "name": "America/Port-au-Prince",
                "offset_string": "UTC-4",
                "offset_value": -14400,
                "readable_name": "-4:00 Port-au-Prince ( America )"
            },
            "America/Port_of_Spain": {
                "name": "America/Port_of_Spain",
                "offset_string": "UTC-4",
                "offset_value": -14400,
                "readable_name": "-4:00 Port of Spain ( America )"
            },
            "America/Porto_Velho": {
                "name": "America/Porto_Velho",
                "offset_string": "UTC-4",
                "offset_value": -14400,
                "readable_name": "-4:00 Porto Velho ( America )"
            },
            "America/Puerto_Rico": {
                "name": "America/Puerto_Rico",
                "offset_string": "UTC-4",
                "offset_value": -14400,
                "readable_name": "-4:00 Puerto Rico ( America )"
            },
            "America/Rainy_River": {
                "changed_offset_string": "UTC-6",
                "changed_offset_value": -21600,
                "changed_readable_name": "-6:00 Rainy River ( America )",
                "dst_change_epoch": 1446362418,
                "name": "America/Rainy_River",
                "offset_string": "UTC-5",
                "offset_value": -18000,
                "readable_name": "-5:00 Rainy River ( America )"
            },
            "America/Rankin_Inlet": {
                "changed_offset_string": "UTC-6",
                "changed_offset_value": -21600,
                "changed_readable_name": "-6:00 Rankin Inlet ( America )",
                "dst_change_epoch": 1446362418,
                "name": "America/Rankin_Inlet",
                "offset_string": "UTC-5",
                "offset_value": -18000,
                "readable_name": "-5:00 Rankin Inlet ( America )"
            },
            "America/Recife": {
                "name": "America/Recife",
                "offset_string": "UTC-3",
                "offset_value": -10800,
                "readable_name": "-3:00 Recife ( America )"
            },
            "America/Regina": {
                "name": "America/Regina",
                "offset_string": "UTC-6",
                "offset_value": -21600,
                "readable_name": "-6:00 Regina ( America )"
            },
            "America/Resolute": {
                "changed_offset_string": "UTC-6",
                "changed_offset_value": -21600,
                "changed_readable_name": "-6:00 Resolute ( America )",
                "dst_change_epoch": 1446362418,
                "name": "America/Resolute",
                "offset_string": "UTC-5",
                "offset_value": -18000,
                "readable_name": "-5:00 Resolute ( America )"
            },
            "America/Rio_Branco": {
                "name": "America/Rio_Branco",
                "offset_string": "UTC-5",
                "offset_value": -18000,
                "readable_name": "-5:00 Rio Branco ( America )"
            },
            "America/Santa_Isabel": {
                "changed_offset_string": "UTC-8",
                "changed_offset_value": -28800,
                "changed_readable_name": "-8:00 Santa Isabel ( America )",
                "dst_change_epoch": 1445764411,
                "name": "America/Santa_Isabel",
                "offset_string": "UTC-7",
                "offset_value": -25200,
                "readable_name": "-7:00 Santa Isabel ( America )"
            },
            "America/Santarem": {
                "name": "America/Santarem",
                "offset_string": "UTC-3",
                "offset_value": -10800,
                "readable_name": "-3:00 Santarem ( America )"
            },
            "America/Santiago": {
                "name": "America/Santiago",
                "offset_string": "UTC-3",
                "offset_value": -10800,
                "readable_name": "-3:00 Santiago ( America )"
            },
            "America/Santo_Domingo": {
                "name": "America/Santo_Domingo",
                "offset_string": "UTC-4",
                "offset_value": -14400,
                "readable_name": "-4:00 Santo Domingo ( America )"
            },
            "America/Sao_Paulo": {
                "changed_offset_string": "UTC-2",
                "changed_offset_value": -7200,
                "changed_readable_name": "-2:00 Sao Paulo ( America )",
                "dst_change_epoch": 1445137927,
                "name": "America/Sao_Paulo",
                "offset_string": "UTC-3",
                "offset_value": -10800,
                "readable_name": "-3:00 Sao Paulo ( America )"
            },
            "America/Scoresbysund": {
                "changed_offset_string": "UTC-1",
                "changed_offset_value": -3600,
                "changed_readable_name": "-1:00 Scoresbysund ( America )",
                "dst_change_epoch": 1445735934,
                "name": "America/Scoresbysund",
                "offset_string": "UTC",
                "offset_value": 0,
                "readable_name": "+0:00 Scoresbysund ( America )"
            },
            "America/Sitka": {
                "changed_offset_string": "UTC-9",
                "changed_offset_value": -32400,
                "changed_readable_name": "-9:00 Sitka ( America )",
                "dst_change_epoch": 1446373809,
                "name": "America/Sitka",
                "offset_string": "UTC-8",
                "offset_value": -28800,
                "readable_name": "-8:00 Sitka ( America )"
            },
            "America/St_Johns": {
                "changed_offset_string": "UTC-3:30",
                "changed_offset_value": -12600,
                "changed_readable_name": "-3:30 St Johns ( America )",
                "dst_change_epoch": 1446352927,
                "name": "America/St_Johns",
                "offset_string": "UTC-2:30",
                "offset_value": -9000,
                "readable_name": "-2:30 St Johns ( America )"
            },
            "America/Swift_Current": {
                "name": "America/Swift_Current",
                "offset_string": "UTC-6",
                "offset_value": -21600,
                "readable_name": "-6:00 Swift Current ( America )"
            },
            "America/Tegucigalpa": {
                "name": "America/Tegucigalpa",
                "offset_string": "UTC-6",
                "offset_value": -21600,
                "readable_name": "-6:00 Tegucigalpa ( America )"
            },
            "America/Thule": {
                "changed_offset_string": "UTC-4",
                "changed_offset_value": -14400,
                "changed_readable_name": "-4:00 Thule ( America )",
                "dst_change_epoch": 1446354825,
                "name": "America/Thule",
                "offset_string": "UTC-3",
                "offset_value": -10800,
                "readable_name": "-3:00 Thule ( America )"
            },
            "America/Thunder_Bay": {
                "changed_offset_string": "UTC-5",
                "changed_offset_value": -18000,
                "changed_readable_name": "-5:00 Thunder Bay ( America )",
                "dst_change_epoch": 1446358622,
                "name": "America/Thunder_Bay",
                "offset_string": "UTC-4",
                "offset_value": -14400,
                "readable_name": "-4:00 Thunder Bay ( America )"
            },
            "America/Tijuana": {
                "changed_offset_string": "UTC-8",
                "changed_offset_value": -28800,
                "changed_readable_name": "-8:00 Tijuana ( America )",
                "dst_change_epoch": 1446370012,
                "name": "America/Tijuana",
                "offset_string": "UTC-7",
                "offset_value": -25200,
                "readable_name": "-7:00 Tijuana ( America )"
            },
            "America/Toronto": {
                "changed_offset_string": "UTC-5",
                "changed_offset_value": -18000,
                "changed_readable_name": "-5:00 Toronto ( America )",
                "dst_change_epoch": 1446358622,
                "name": "America/Toronto",
                "offset_string": "UTC-4",
                "offset_value": -14400,
                "readable_name": "-4:00 Toronto ( America )"
            },
            "America/Vancouver": {
                "changed_offset_string": "UTC-8",
                "changed_offset_value": -28800,
                "changed_readable_name": "-8:00 Vancouver ( America )",
                "dst_change_epoch": 1446370012,
                "name": "America/Vancouver",
                "offset_string": "UTC-7",
                "offset_value": -25200,
                "readable_name": "-7:00 Vancouver ( America )"
            },
            "America/Whitehorse": {
                "changed_offset_string": "UTC-8",
                "changed_offset_value": -28800,
                "changed_readable_name": "-8:00 Whitehorse ( America )",
                "dst_change_epoch": 1446370012,
                "name": "America/Whitehorse",
                "offset_string": "UTC-7",
                "offset_value": -25200,
                "readable_name": "-7:00 Whitehorse ( America )"
            },
            "America/Winnipeg": {
                "changed_offset_string": "UTC-6",
                "changed_offset_value": -21600,
                "changed_readable_name": "-6:00 Winnipeg ( America )",
                "dst_change_epoch": 1446362418,
                "name": "America/Winnipeg",
                "offset_string": "UTC-5",
                "offset_value": -18000,
                "readable_name": "-5:00 Winnipeg ( America )"
            },
            "America/Yakutat": {
                "changed_offset_string": "UTC-9",
                "changed_offset_value": -32400,
                "changed_readable_name": "-9:00 Yakutat ( America )",
                "dst_change_epoch": 1446373809,
                "name": "America/Yakutat",
                "offset_string": "UTC-8",
                "offset_value": -28800,
                "readable_name": "-8:00 Yakutat ( America )"
            },
            "America/Yellowknife": {
                "changed_offset_string": "UTC-7",
                "changed_offset_value": -25200,
                "changed_readable_name": "-7:00 Yellowknife ( America )",
                "dst_change_epoch": 1446366215,
                "name": "America/Yellowknife",
                "offset_string": "UTC-6",
                "offset_value": -21600,
                "readable_name": "-6:00 Yellowknife ( America )"
            },
            "Antarctica/Casey": {
                "name": "Antarctica/Casey",
                "offset_string": "UTC+8",
                "offset_value": 28800,
                "readable_name": "+8:00 Casey ( Antarctica )"
            },
            "Antarctica/Davis": {
                "name": "Antarctica/Davis",
                "offset_string": "UTC+7",
                "offset_value": 25200,
                "readable_name": "+7:00 Davis ( Antarctica )"
            },
            "Antarctica/DumontDUrville": {
                "name": "Antarctica/DumontDUrville",
                "offset_string": "UTC+10",
                "offset_value": 36000,
                "readable_name": "+10:00 DumontDUrville ( Antarctica )"
            },
            "Antarctica/Macquarie": {
                "name": "Antarctica/Macquarie",
                "offset_string": "UTC+11",
                "offset_value": 39600,
                "readable_name": "+11:00 Macquarie ( Antarctica )"
            },
            "Antarctica/Mawson": {
                "name": "Antarctica/Mawson",
                "offset_string": "UTC+5",
                "offset_value": 18000,
                "readable_name": "+5:00 Mawson ( Antarctica )"
            },
            "Antarctica/Palmer": {
                "name": "Antarctica/Palmer",
                "offset_string": "UTC-3",
                "offset_value": -10800,
                "readable_name": "-3:00 Palmer ( Antarctica )"
            },
            "Antarctica/Rothera": {
                "name": "Antarctica/Rothera",
                "offset_string": "UTC-3",
                "offset_value": -10800,
                "readable_name": "-3:00 Rothera ( Antarctica )"
            },
            "Antarctica/Syowa": {
                "name": "Antarctica/Syowa",
                "offset_string": "UTC+3",
                "offset_value": 10800,
                "readable_name": "+3:00 Syowa ( Antarctica )"
            },
            "Antarctica/Troll": {
                "changed_offset_string": "UTC",
                "changed_offset_value": 0,
                "changed_readable_name": "+0:00 Troll ( Antarctica )",
                "dst_change_epoch": 1445735934,
                "name": "Antarctica/Troll",
                "offset_string": "UTC+2",
                "offset_value": 7200,
                "readable_name": "+2:00 Troll ( Antarctica )"
            },
            "Antarctica/Vostok": {
                "name": "Antarctica/Vostok",
                "offset_string": "UTC+6",
                "offset_value": 21600,
                "readable_name": "+6:00 Vostok ( Antarctica )"
            },
            "Asia/Almaty": {
                "name": "Asia/Almaty",
                "offset_string": "UTC+6",
                "offset_value": 21600,
                "readable_name": "+6:00 Almaty ( Asia )"
            },
            "Asia/Amman": {
                "changed_offset_string": "UTC+2",
                "changed_offset_value": 7200,
                "changed_readable_name": "+2:00 Amman ( Asia )",
                "dst_change_epoch": 1446157387,
                "name": "Asia/Amman",
                "offset_string": "UTC+3",
                "offset_value": 10800,
                "readable_name": "+3:00 Amman ( Asia )"
            },
            "Asia/Anadyr": {
                "name": "Asia/Anadyr",
                "offset_string": "UTC+12",
                "offset_value": 43200,
                "readable_name": "+12:00 Anadyr ( Asia )"
            },
            "Asia/Aqtau": {
                "name": "Asia/Aqtau",
                "offset_string": "UTC+5",
                "offset_value": 18000,
                "readable_name": "+5:00 Aqtau ( Asia )"
            },
            "Asia/Aqtobe": {
                "name": "Asia/Aqtobe",
                "offset_string": "UTC+5",
                "offset_value": 18000,
                "readable_name": "+5:00 Aqtobe ( Asia )"
            },
            "Asia/Ashgabat": {
                "name": "Asia/Ashgabat",
                "offset_string": "UTC+5",
                "offset_value": 18000,
                "readable_name": "+5:00 Ashgabat ( Asia )"
            },
            "Asia/Baghdad": {
                "name": "Asia/Baghdad",
                "offset_string": "UTC+3",
                "offset_value": 10800,
                "readable_name": "+3:00 Baghdad ( Asia )"
            },
            "Asia/Baku": {
                "changed_offset_string": "UTC+4",
                "changed_offset_value": 14400,
                "changed_readable_name": "+4:00 Baku ( Asia )",
                "dst_change_epoch": 1445732137,
                "name": "Asia/Baku",
                "offset_string": "UTC+5",
                "offset_value": 18000,
                "readable_name": "+5:00 Baku ( Asia )"
            },
            "Asia/Bangkok": {
                "name": "Asia/Bangkok",
                "offset_string": "UTC+7",
                "offset_value": 25200,
                "readable_name": "+7:00 Bangkok ( Asia )"
            },
            "Asia/Beirut": {
                "changed_offset_string": "UTC+2",
                "changed_offset_value": 7200,
                "changed_readable_name": "+2:00 Beirut ( Asia )",
                "dst_change_epoch": 1445720747,
                "name": "Asia/Beirut",
                "offset_string": "UTC+3",
                "offset_value": 10800,
                "readable_name": "+3:00 Beirut ( Asia )"
            },
            "Asia/Bishkek": {
                "name": "Asia/Bishkek",
                "offset_string": "UTC+6",
                "offset_value": 21600,
                "readable_name": "+6:00 Bishkek ( Asia )"
            },
            "Asia/Brunei": {
                "name": "Asia/Brunei",
                "offset_string": "UTC+8",
                "offset_value": 28800,
                "readable_name": "+8:00 Brunei ( Asia )"
            },
            "Asia/Chita": {
                "name": "Asia/Chita",
                "offset_string": "UTC+8",
                "offset_value": 28800,
                "readable_name": "+8:00 Chita ( Asia )"
            },
            "Asia/Choibalsan": {
                "changed_offset_string": "UTC+9",
                "changed_offset_value": 32400,
                "changed_readable_name": "+9:00 Choibalsan ( Asia )",
                "dst_change_epoch": 1458930075,
                "name": "Asia/Choibalsan",
                "offset_string": "UTC+8",
                "offset_value": 28800,
                "readable_name": "+8:00 Choibalsan ( Asia )"
            },
            "Asia/Colombo": {
                "name": "Asia/Colombo",
                "offset_string": "UTC+5:30",
                "offset_value": 19800,
                "readable_name": "+5:30 Colombo ( Asia )"
            },
            "Asia/Damascus": {
                "changed_offset_string": "UTC+2",
                "changed_offset_value": 7200,
                "changed_readable_name": "+2:00 Damascus ( Asia )",
                "dst_change_epoch": 1446153590,
                "name": "Asia/Damascus",
                "offset_string": "UTC+3",
                "offset_value": 10800,
                "readable_name": "+3:00 Damascus ( Asia )"
            },
            "Asia/Dhaka": {
                "name": "Asia/Dhaka",
                "offset_string": "UTC+6",
                "offset_value": 21600,
                "readable_name": "+6:00 Dhaka ( Asia )"
            },
            "Asia/Dili": {
                "name": "Asia/Dili",
                "offset_string": "UTC+9",
                "offset_value": 32400,
                "readable_name": "+9:00 Dili ( Asia )"
            },
            "Asia/Dubai": {
                "name": "Asia/Dubai",
                "offset_string": "UTC+4",
                "offset_value": 14400,
                "readable_name": "+4:00 Dubai ( Asia )"
            },
            "Asia/Dushanbe": {
                "name": "Asia/Dushanbe",
                "offset_string": "UTC+5",
                "offset_value": 18000,
                "readable_name": "+5:00 Dushanbe ( Asia )"
            },
            "Asia/Gaza": {
                "changed_offset_string": "UTC+2",
                "changed_offset_value": 7200,
                "changed_readable_name": "+2:00 Gaza ( Asia )",
                "dst_change_epoch": 1445547989,
                "name": "Asia/Gaza",
                "offset_string": "UTC+3",
                "offset_value": 10800,
                "readable_name": "+3:00 Gaza ( Asia )"
            },
            "Asia/Hebron": {
                "changed_offset_string": "UTC+2",
                "changed_offset_value": 7200,
                "changed_readable_name": "+2:00 Hebron ( Asia )",
                "dst_change_epoch": 1445547989,
                "name": "Asia/Hebron",
                "offset_string": "UTC+3",
                "offset_value": 10800,
                "readable_name": "+3:00 Hebron ( Asia )"
            },
            "Asia/Ho_Chi_Minh": {
                "name": "Asia/Ho_Chi_Minh",
                "offset_string": "UTC+7",
                "offset_value": 25200,
                "readable_name": "+7:00 Ho Chi Minh ( Asia )"
            },
            "Asia/Hong_Kong": {
                "name": "Asia/Hong_Kong",
                "offset_string": "UTC+8",
                "offset_value": 28800,
                "readable_name": "+8:00 Hong Kong ( Asia )"
            },
            "Asia/Hovd": {
                "changed_offset_string": "UTC+8",
                "changed_offset_value": 28800,
                "changed_readable_name": "+8:00 Hovd ( Asia )",
                "dst_change_epoch": 1458933872,
                "name": "Asia/Hovd",
                "offset_string": "UTC+7",
                "offset_value": 25200,
                "readable_name": "+7:00 Hovd ( Asia )"
            },
            "Asia/Irkutsk": {
                "name": "Asia/Irkutsk",
                "offset_string": "UTC+8",
                "offset_value": 28800,
                "readable_name": "+8:00 Irkutsk ( Asia )"
            },
            "Asia/Jakarta": {
                "name": "Asia/Jakarta",
                "offset_string": "UTC+7",
                "offset_value": 25200,
                "readable_name": "+7:00 Jakarta ( Asia )"
            },
            "Asia/Jayapura": {
                "name": "Asia/Jayapura",
                "offset_string": "UTC+9",
                "offset_value": 32400,
                "readable_name": "+9:00 Jayapura ( Asia )"
            },
            "Asia/Jerusalem": {
                "changed_offset_string": "UTC+2",
                "changed_offset_value": 7200,
                "changed_readable_name": "+2:00 Jerusalem ( Asia )",
                "dst_change_epoch": 1445728340,
                "name": "Asia/Jerusalem",
                "offset_string": "UTC+3",
                "offset_value": 10800,
                "readable_name": "+3:00 Jerusalem ( Asia )"
            },
            "Asia/Kabul": {
                "name": "Asia/Kabul",
                "offset_string": "UTC+4:30",
                "offset_value": 16200,
                "readable_name": "+4:30 Kabul ( Asia )"
            },
            "Asia/Kamchatka": {
                "name": "Asia/Kamchatka",
                "offset_string": "UTC+12",
                "offset_value": 43200,
                "readable_name": "+12:00 Kamchatka ( Asia )"
            },
            "Asia/Karachi": {
                "name": "Asia/Karachi",
                "offset_string": "UTC+5",
                "offset_value": 18000,
                "readable_name": "+5:00 Karachi ( Asia )"
            },
            "Asia/Kathmandu": {
                "name": "Asia/Kathmandu",
                "offset_string": "UTC+5:45",
                "offset_value": 20700,
                "readable_name": "+5:45 Kathmandu ( Asia )"
            },
            "Asia/Khandyga": {
                "name": "Asia/Khandyga",
                "offset_string": "UTC+9",
                "offset_value": 32400,
                "readable_name": "+9:00 Khandyga ( Asia )"
            },
            "Asia/Kolkata": {
                "name": "Asia/Kolkata",
                "offset_string": "UTC+5:30",
                "offset_value": 19800,
                "readable_name": "+5:30 Kolkata ( Asia )"
            },
            "Asia/Krasnoyarsk": {
                "name": "Asia/Krasnoyarsk",
                "offset_string": "UTC+7",
                "offset_value": 25200,
                "readable_name": "+7:00 Krasnoyarsk ( Asia )"
            },
            "Asia/Kuala_Lumpur": {
                "name": "Asia/Kuala_Lumpur",
                "offset_string": "UTC+8",
                "offset_value": 28800,
                "readable_name": "+8:00 Kuala Lumpur ( Asia )"
            },
            "Asia/Kuching": {
                "name": "Asia/Kuching",
                "offset_string": "UTC+8",
                "offset_value": 28800,
                "readable_name": "+8:00 Kuching ( Asia )"
            },
            "Asia/Macau": {
                "name": "Asia/Macau",
                "offset_string": "UTC+8",
                "offset_value": 28800,
                "readable_name": "+8:00 Macau ( Asia )"
            },
            "Asia/Magadan": {
                "name": "Asia/Magadan",
                "offset_string": "UTC+10",
                "offset_value": 36000,
                "readable_name": "+10:00 Magadan ( Asia )"
            },
            "Asia/Makassar": {
                "name": "Asia/Makassar",
                "offset_string": "UTC+8",
                "offset_value": 28800,
                "readable_name": "+8:00 Makassar ( Asia )"
            },
            "Asia/Manila": {
                "name": "Asia/Manila",
                "offset_string": "UTC+8",
                "offset_value": 28800,
                "readable_name": "+8:00 Manila ( Asia )"
            },
            "Asia/Nicosia": {
                "changed_offset_string": "UTC+2",
                "changed_offset_value": 7200,
                "changed_readable_name": "+2:00 Nicosia ( Asia )",
                "dst_change_epoch": 1445735934,
                "name": "Asia/Nicosia",
                "offset_string": "UTC+3",
                "offset_value": 10800,
                "readable_name": "+3:00 Nicosia ( Asia )"
            },
            "Asia/Novokuznetsk": {
                "name": "Asia/Novokuznetsk",
                "offset_string": "UTC+7",
                "offset_value": 25200,
                "readable_name": "+7:00 Novokuznetsk ( Asia )"
            },
            "Asia/Novosibirsk": {
                "name": "Asia/Novosibirsk",
                "offset_string": "UTC+6",
                "offset_value": 21600,
                "readable_name": "+6:00 Novosibirsk ( Asia )"
            },
            "Asia/Omsk": {
                "name": "Asia/Omsk",
                "offset_string": "UTC+6",
                "offset_value": 21600,
                "readable_name": "+6:00 Omsk ( Asia )"
            },
            "Asia/Oral": {
                "name": "Asia/Oral",
                "offset_string": "UTC+5",
                "offset_value": 18000,
                "readable_name": "+5:00 Oral ( Asia )"
            },
            "Asia/Pontianak": {
                "name": "Asia/Pontianak",
                "offset_string": "UTC+7",
                "offset_value": 25200,
                "readable_name": "+7:00 Pontianak ( Asia )"
            },
            "Asia/Pyongyang": {
                "name": "Asia/Pyongyang",
                "offset_string": "UTC+8:30",
                "offset_value": 30600,
                "readable_name": "+8:30 Pyongyang ( Asia )"
            },
            "Asia/Qatar": {
                "name": "Asia/Qatar",
                "offset_string": "UTC+3",
                "offset_value": 10800,
                "readable_name": "+3:00 Qatar ( Asia )"
            },
            "Asia/Qyzylorda": {
                "name": "Asia/Qyzylorda",
                "offset_string": "UTC+6",
                "offset_value": 21600,
                "readable_name": "+6:00 Qyzylorda ( Asia )"
            },
            "Asia/Rangoon": {
                "name": "Asia/Rangoon",
                "offset_string": "UTC+6:30",
                "offset_value": 23400,
                "readable_name": "+6:30 Rangoon ( Asia )"
            },
            "Asia/Riyadh": {
                "name": "Asia/Riyadh",
                "offset_string": "UTC+3",
                "offset_value": 10800,
                "readable_name": "+3:00 Riyadh ( Asia )"
            },
            "Asia/Sakhalin": {
                "name": "Asia/Sakhalin",
                "offset_string": "UTC+10",
                "offset_value": 36000,
                "readable_name": "+10:00 Sakhalin ( Asia )"
            },
            "Asia/Samarkand": {
                "name": "Asia/Samarkand",
                "offset_string": "UTC+5",
                "offset_value": 18000,
                "readable_name": "+5:00 Samarkand ( Asia )"
            },
            "Asia/Seoul": {
                "name": "Asia/Seoul",
                "offset_string": "UTC+9",
                "offset_value": 32400,
                "readable_name": "+9:00 Seoul ( Asia )"
            },
            "Asia/Shanghai": {
                "name": "Asia/Shanghai",
                "offset_string": "UTC+8",
                "offset_value": 28800,
                "readable_name": "+8:00 Shanghai ( Asia )"
            },
            "Asia/Singapore": {
                "name": "Asia/Singapore",
                "offset_string": "UTC+8",
                "offset_value": 28800,
                "readable_name": "+8:00 Singapore ( Asia )"
            },
            "Asia/Srednekolymsk": {
                "name": "Asia/Srednekolymsk",
                "offset_string": "UTC+11",
                "offset_value": 39600,
                "readable_name": "+11:00 Srednekolymsk ( Asia )"
            },
            "Asia/Taipei": {
                "name": "Asia/Taipei",
                "offset_string": "UTC+8",
                "offset_value": 28800,
                "readable_name": "+8:00 Taipei ( Asia )"
            },
            "Asia/Tashkent": {
                "name": "Asia/Tashkent",
                "offset_string": "UTC+5",
                "offset_value": 18000,
                "readable_name": "+5:00 Tashkent ( Asia )"
            },
            "Asia/Tbilisi": {
                "name": "Asia/Tbilisi",
                "offset_string": "UTC+4",
                "offset_value": 14400,
                "readable_name": "+4:00 Tbilisi ( Asia )"
            },
            "Asia/Tehran": {
                "changed_offset_string": "UTC+4:30",
                "changed_offset_value": 16200,
                "changed_readable_name": "+4:30 Tehran ( Asia )",
                "dst_change_epoch": 1458506724,
                "name": "Asia/Tehran",
                "offset_string": "UTC+3:30",
                "offset_value": 12600,
                "readable_name": "+3:30 Tehran ( Asia )"
            },
            "Asia/Thimphu": {
                "name": "Asia/Thimphu",
                "offset_string": "UTC+6",
                "offset_value": 21600,
                "readable_name": "+6:00 Thimphu ( Asia )"
            },
            "Asia/Tokyo": {
                "name": "Asia/Tokyo",
                "offset_string": "UTC+9",
                "offset_value": 32400,
                "readable_name": "+9:00 Tokyo ( Asia )"
            },
            "Asia/Ulaanbaatar": {
                "changed_offset_string": "UTC+9",
                "changed_offset_value": 32400,
                "changed_readable_name": "+9:00 Ulaanbaatar ( Asia )",
                "dst_change_epoch": 1458930075,
                "name": "Asia/Ulaanbaatar",
                "offset_string": "UTC+8",
                "offset_value": 28800,
                "readable_name": "+8:00 Ulaanbaatar ( Asia )"
            },
            "Asia/Urumqi": {
                "name": "Asia/Urumqi",
                "offset_string": "UTC+6",
                "offset_value": 21600,
                "readable_name": "+6:00 Urumqi ( Asia )"
            },
            "Asia/Ust-Nera": {
                "name": "Asia/Ust-Nera",
                "offset_string": "UTC+10",
                "offset_value": 36000,
                "readable_name": "+10:00 Ust-Nera ( Asia )"
            },
            "Asia/Vladivostok": {
                "name": "Asia/Vladivostok",
                "offset_string": "UTC+10",
                "offset_value": 36000,
                "readable_name": "+10:00 Vladivostok ( Asia )"
            },
            "Asia/Yakutsk": {
                "name": "Asia/Yakutsk",
                "offset_string": "UTC+9",
                "offset_value": 32400,
                "readable_name": "+9:00 Yakutsk ( Asia )"
            },
            "Asia/Yekaterinburg": {
                "name": "Asia/Yekaterinburg",
                "offset_string": "UTC+5",
                "offset_value": 18000,
                "readable_name": "+5:00 Yekaterinburg ( Asia )"
            },
            "Asia/Yerevan": {
                "name": "Asia/Yerevan",
                "offset_string": "UTC+4",
                "offset_value": 14400,
                "readable_name": "+4:00 Yerevan ( Asia )"
            },
            "Atlantic/Azores": {
                "changed_offset_string": "UTC-1",
                "changed_offset_value": -3600,
                "changed_readable_name": "-1:00 Azores ( Atlantic )",
                "dst_change_epoch": 1445735934,
                "name": "Atlantic/Azores",
                "offset_string": "UTC",
                "offset_value": 0,
                "readable_name": "+0:00 Azores ( Atlantic )"
            },
            "Atlantic/Bermuda": {
                "changed_offset_string": "UTC-4",
                "changed_offset_value": -14400,
                "changed_readable_name": "-4:00 Bermuda ( Atlantic )",
                "dst_change_epoch": 1446354825,
                "name": "Atlantic/Bermuda",
                "offset_string": "UTC-3",
                "offset_value": -10800,
                "readable_name": "-3:00 Bermuda ( Atlantic )"
            },
            "Atlantic/Canary": {
                "changed_offset_string": "UTC",
                "changed_offset_value": 0,
                "changed_readable_name": "+0:00 Canary ( Atlantic )",
                "dst_change_epoch": 1445735934,
                "name": "Atlantic/Canary",
                "offset_string": "UTC+1",
                "offset_value": 3600,
                "readable_name": "+1:00 Canary ( Atlantic )"
            },
            "Atlantic/Cape_Verde": {
                "name": "Atlantic/Cape_Verde",
                "offset_string": "UTC-1",
                "offset_value": -3600,
                "readable_name": "-1:00 Cape Verde ( Atlantic )"
            },
            "Atlantic/Faroe": {
                "changed_offset_string": "UTC",
                "changed_offset_value": 0,
                "changed_readable_name": "+0:00 Faroe ( Atlantic )",
                "dst_change_epoch": 1445735934,
                "name": "Atlantic/Faroe",
                "offset_string": "UTC+1",
                "offset_value": 3600,
                "readable_name": "+1:00 Faroe ( Atlantic )"
            },
            "Atlantic/Madeira": {
                "changed_offset_string": "UTC",
                "changed_offset_value": 0,
                "changed_readable_name": "+0:00 Madeira ( Atlantic )",
                "dst_change_epoch": 1445735934,
                "name": "Atlantic/Madeira",
                "offset_string": "UTC+1",
                "offset_value": 3600,
                "readable_name": "+1:00 Madeira ( Atlantic )"
            },
            "Atlantic/Reykjavik": {
                "name": "Atlantic/Reykjavik",
                "offset_string": "UTC",
                "offset_value": 0,
                "readable_name": "+0:00 Reykjavik ( Atlantic )"
            },
            "Atlantic/South_Georgia": {
                "name": "Atlantic/South_Georgia",
                "offset_string": "UTC-2",
                "offset_value": -7200,
                "readable_name": "-2:00 South Georgia ( Atlantic )"
            },
            "Atlantic/Stanley": {
                "name": "Atlantic/Stanley",
                "offset_string": "UTC-3",
                "offset_value": -10800,
                "readable_name": "-3:00 Stanley ( Atlantic )"
            },
            "Australia/Adelaide": {
                "changed_offset_string": "UTC+10:30",
                "changed_offset_value": 37800,
                "changed_readable_name": "+10:30 Adelaide ( Australia )",
                "dst_change_epoch": 1443890653,
                "name": "Australia/Adelaide",
                "offset_string": "UTC+9:30",
                "offset_value": 34200,
                "readable_name": "+9:30 Adelaide ( Australia )"
            },
            "Australia/Brisbane": {
                "name": "Australia/Brisbane",
                "offset_string": "UTC+10",
                "offset_value": 36000,
                "readable_name": "+10:00 Brisbane ( Australia )"
            },
            "Australia/Broken_Hill": {
                "changed_offset_string": "UTC+10:30",
                "changed_offset_value": 37800,
                "changed_readable_name": "+10:30 Broken Hill ( Australia )",
                "dst_change_epoch": 1443890653,
                "name": "Australia/Broken_Hill",
                "offset_string": "UTC+9:30",
                "offset_value": 34200,
                "readable_name": "+9:30 Broken Hill ( Australia )"
            },
            "Australia/Currie": {
                "changed_offset_string": "UTC+11",
                "changed_offset_value": 39600,
                "changed_readable_name": "+11:00 Currie ( Australia )",
                "dst_change_epoch": 1443888755,
                "name": "Australia/Currie",
                "offset_string": "UTC+10",
                "offset_value": 36000,
                "readable_name": "+10:00 Currie ( Australia )"
            },
            "Australia/Darwin": {
                "name": "Australia/Darwin",
                "offset_string": "UTC+9:30",
                "offset_value": 34200,
                "readable_name": "+9:30 Darwin ( Australia )"
            },
            "Australia/Eucla": {
                "name": "Australia/Eucla",
                "offset_string": "UTC+8:45",
                "offset_value": 31500,
                "readable_name": "+8:45 Eucla ( Australia )"
            },
            "Australia/Hobart": {
                "changed_offset_string": "UTC+11",
                "changed_offset_value": 39600,
                "changed_readable_name": "+11:00 Hobart ( Australia )",
                "dst_change_epoch": 1443888755,
                "name": "Australia/Hobart",
                "offset_string": "UTC+10",
                "offset_value": 36000,
                "readable_name": "+10:00 Hobart ( Australia )"
            },
            "Australia/Lindeman": {
                "name": "Australia/Lindeman",
                "offset_string": "UTC+10",
                "offset_value": 36000,
                "readable_name": "+10:00 Lindeman ( Australia )"
            },
            "Australia/Lord_Howe": {
                "changed_offset_string": "UTC+11",
                "changed_offset_value": 39600,
                "changed_readable_name": "+11:00 Lord Howe ( Australia )",
                "dst_change_epoch": 1443886856,
                "name": "Australia/Lord_Howe",
                "offset_string": "UTC+10:30",
                "offset_value": 37800,
                "readable_name": "+10:30 Lord Howe ( Australia )"
            },
            "Australia/Melbourne": {
                "changed_offset_string": "UTC+11",
                "changed_offset_value": 39600,
                "changed_readable_name": "+11:00 Melbourne ( Australia )",
                "dst_change_epoch": 1443888755,
                "name": "Australia/Melbourne",
                "offset_string": "UTC+10",
                "offset_value": 36000,
                "readable_name": "+10:00 Melbourne ( Australia )"
            },
            "Australia/Perth": {
                "name": "Australia/Perth",
                "offset_string": "UTC+8",
                "offset_value": 28800,
                "readable_name": "+8:00 Perth ( Australia )"
            },
            "Australia/Sydney": {
                "changed_offset_string": "UTC+11",
                "changed_offset_value": 39600,
                "changed_readable_name": "+11:00 Sydney ( Australia )",
                "dst_change_epoch": 1443888755,
                "name": "Australia/Sydney",
                "offset_string": "UTC+10",
                "offset_value": 36000,
                "readable_name": "+10:00 Sydney ( Australia )"
            },
            "CET": {
                "changed_offset_string": "UTC+1",
                "changed_offset_value": 3600,
                "changed_readable_name": "+1:00 CET",
                "dst_change_epoch": 1445735934,
                "name": "CET",
                "offset_string": "UTC+2",
                "offset_value": 7200,
                "readable_name": "+2:00 CET"
            },
            "CST6CDT": {
                "changed_offset_string": "UTC-6",
                "changed_offset_value": -21600,
                "changed_readable_name": "-6:00 CST6CDT",
                "dst_change_epoch": 1446362418,
                "name": "CST6CDT",
                "offset_string": "UTC-5",
                "offset_value": -18000,
                "readable_name": "-5:00 CST6CDT"
            },
            "EET": {
                "changed_offset_string": "UTC+2",
                "changed_offset_value": 7200,
                "changed_readable_name": "+2:00 EET",
                "dst_change_epoch": 1445735934,
                "name": "EET",
                "offset_string": "UTC+3",
                "offset_value": 10800,
                "readable_name": "+3:00 EET"
            },
            "EST": {
                "name": "EST",
                "offset_string": "UTC-5",
                "offset_value": -18000,
                "readable_name": "-5:00 EST"
            },
            "EST5EDT": {
                "changed_offset_string": "UTC-5",
                "changed_offset_value": -18000,
                "changed_readable_name": "-5:00 EST5EDT",
                "dst_change_epoch": 1446358622,
                "name": "EST5EDT",
                "offset_string": "UTC-4",
                "offset_value": -14400,
                "readable_name": "-4:00 EST5EDT"
            },
            "Europe/Amsterdam": {
                "changed_offset_string": "UTC+1",
                "changed_offset_value": 3600,
                "changed_readable_name": "+1:00 Amsterdam ( Europe )",
                "dst_change_epoch": 1445735934,
                "name": "Europe/Amsterdam",
                "offset_string": "UTC+2",
                "offset_value": 7200,
                "readable_name": "+2:00 Amsterdam ( Europe )"
            },
            "Europe/Andorra": {
                "changed_offset_string": "UTC+1",
                "changed_offset_value": 3600,
                "changed_readable_name": "+1:00 Andorra ( Europe )",
                "dst_change_epoch": 1445735934,
                "name": "Europe/Andorra",
                "offset_string": "UTC+2",
                "offset_value": 7200,
                "readable_name": "+2:00 Andorra ( Europe )"
            },
            "Europe/Athens": {
                "changed_offset_string": "UTC+2",
                "changed_offset_value": 7200,
                "changed_readable_name": "+2:00 Athens ( Europe )",
                "dst_change_epoch": 1445735934,
                "name": "Europe/Athens",
                "offset_string": "UTC+3",
                "offset_value": 10800,
                "readable_name": "+3:00 Athens ( Europe )"
            },
            "Europe/Belgrade": {
                "changed_offset_string": "UTC+1",
                "changed_offset_value": 3600,
                "changed_readable_name": "+1:00 Belgrade ( Europe )",
                "dst_change_epoch": 1445735934,
                "name": "Europe/Belgrade",
                "offset_string": "UTC+2",
                "offset_value": 7200,
                "readable_name": "+2:00 Belgrade ( Europe )"
            },
            "Europe/Berlin": {
                "changed_offset_string": "UTC+1",
                "changed_offset_value": 3600,
                "changed_readable_name": "+1:00 Berlin ( Europe )",
                "dst_change_epoch": 1445735934,
                "name": "Europe/Berlin",
                "offset_string": "UTC+2",
                "offset_value": 7200,
                "readable_name": "+2:00 Berlin ( Europe )"
            },
            "Europe/Brussels": {
                "changed_offset_string": "UTC+1",
                "changed_offset_value": 3600,
                "changed_readable_name": "+1:00 Brussels ( Europe )",
                "dst_change_epoch": 1445735934,
                "name": "Europe/Brussels",
                "offset_string": "UTC+2",
                "offset_value": 7200,
                "readable_name": "+2:00 Brussels ( Europe )"
            },
            "Europe/Bucharest": {
                "changed_offset_string": "UTC+2",
                "changed_offset_value": 7200,
                "changed_readable_name": "+2:00 Bucharest ( Europe )",
                "dst_change_epoch": 1445735934,
                "name": "Europe/Bucharest",
                "offset_string": "UTC+3",
                "offset_value": 10800,
                "readable_name": "+3:00 Bucharest ( Europe )"
            },
            "Europe/Budapest": {
                "changed_offset_string": "UTC+1",
                "changed_offset_value": 3600,
                "changed_readable_name": "+1:00 Budapest ( Europe )",
                "dst_change_epoch": 1445735934,
                "name": "Europe/Budapest",
                "offset_string": "UTC+2",
                "offset_value": 7200,
                "readable_name": "+2:00 Budapest ( Europe )"
            },
            "Europe/Chisinau": {
                "changed_offset_string": "UTC+2",
                "changed_offset_value": 7200,
                "changed_readable_name": "+2:00 Chisinau ( Europe )",
                "dst_change_epoch": 1445732137,
                "name": "Europe/Chisinau",
                "offset_string": "UTC+3",
                "offset_value": 10800,
                "readable_name": "+3:00 Chisinau ( Europe )"
            },
            "Europe/Copenhagen": {
                "changed_offset_string": "UTC+1",
                "changed_offset_value": 3600,
                "changed_readable_name": "+1:00 Copenhagen ( Europe )",
                "dst_change_epoch": 1445735934,
                "name": "Europe/Copenhagen",
                "offset_string": "UTC+2",
                "offset_value": 7200,
                "readable_name": "+2:00 Copenhagen ( Europe )"
            },
            "Europe/Dublin": {
                "changed_offset_string": "UTC",
                "changed_offset_value": 0,
                "changed_readable_name": "+0:00 Dublin ( Europe )",
                "dst_change_epoch": 1445735934,
                "name": "Europe/Dublin",
                "offset_string": "UTC+1",
                "offset_value": 3600,
                "readable_name": "+1:00 Dublin ( Europe )"
            },
            "Europe/Gibraltar": {
                "changed_offset_string": "UTC+1",
                "changed_offset_value": 3600,
                "changed_readable_name": "+1:00 Gibraltar ( Europe )",
                "dst_change_epoch": 1445735934,
                "name": "Europe/Gibraltar",
                "offset_string": "UTC+2",
                "offset_value": 7200,
                "readable_name": "+2:00 Gibraltar ( Europe )"
            },
            "Europe/Helsinki": {
                "changed_offset_string": "UTC+2",
                "changed_offset_value": 7200,
                "changed_readable_name": "+2:00 Helsinki ( Europe )",
                "dst_change_epoch": 1445735934,
                "name": "Europe/Helsinki",
                "offset_string": "UTC+3",
                "offset_value": 10800,
                "readable_name": "+3:00 Helsinki ( Europe )"
            },
            "Europe/Istanbul": {
                "changed_offset_string": "UTC+2",
                "changed_offset_value": 7200,
                "changed_readable_name": "+2:00 Istanbul ( Europe )",
                "dst_change_epoch": 1445735934,
                "name": "Europe/Istanbul",
                "offset_string": "UTC+3",
                "offset_value": 10800,
                "readable_name": "+3:00 Istanbul ( Europe )"
            },
            "Europe/Kaliningrad": {
                "name": "Europe/Kaliningrad",
                "offset_string": "UTC+2",
                "offset_value": 7200,
                "readable_name": "+2:00 Kaliningrad ( Europe )"
            },
            "Europe/Kiev": {
                "changed_offset_string": "UTC+2",
                "changed_offset_value": 7200,
                "changed_readable_name": "+2:00 Kiev ( Europe )",
                "dst_change_epoch": 1445735934,
                "name": "Europe/Kiev",
                "offset_string": "UTC+3",
                "offset_value": 10800,
                "readable_name": "+3:00 Kiev ( Europe )"
            },
            "Europe/Lisbon": {
                "changed_offset_string": "UTC",
                "changed_offset_value": 0,
                "changed_readable_name": "+0:00 Lisbon ( Europe )",
                "dst_change_epoch": 1445735934,
                "name": "Europe/Lisbon",
                "offset_string": "UTC+1",
                "offset_value": 3600,
                "readable_name": "+1:00 Lisbon ( Europe )"
            },
            "Europe/London": {
                "changed_offset_string": "UTC",
                "changed_offset_value": 0,
                "changed_readable_name": "+0:00 London ( Europe )",
                "dst_change_epoch": 1445735934,
                "name": "Europe/London",
                "offset_string": "UTC+1",
                "offset_value": 3600,
                "readable_name": "+1:00 London ( Europe )"
            },
            "Europe/Luxembourg": {
                "changed_offset_string": "UTC+1",
                "changed_offset_value": 3600,
                "changed_readable_name": "+1:00 Luxembourg ( Europe )",
                "dst_change_epoch": 1445735934,
                "name": "Europe/Luxembourg",
                "offset_string": "UTC+2",
                "offset_value": 7200,
                "readable_name": "+2:00 Luxembourg ( Europe )"
            },
            "Europe/Madrid": {
                "changed_offset_string": "UTC+1",
                "changed_offset_value": 3600,
                "changed_readable_name": "+1:00 Madrid ( Europe )",
                "dst_change_epoch": 1445735934,
                "name": "Europe/Madrid",
                "offset_string": "UTC+2",
                "offset_value": 7200,
                "readable_name": "+2:00 Madrid ( Europe )"
            },
            "Europe/Malta": {
                "changed_offset_string": "UTC+1",
                "changed_offset_value": 3600,
                "changed_readable_name": "+1:00 Malta ( Europe )",
                "dst_change_epoch": 1445735934,
                "name": "Europe/Malta",
                "offset_string": "UTC+2",
                "offset_value": 7200,
                "readable_name": "+2:00 Malta ( Europe )"
            },
            "Europe/Minsk": {
                "name": "Europe/Minsk",
                "offset_string": "UTC+3",
                "offset_value": 10800,
                "readable_name": "+3:00 Minsk ( Europe )"
            },
            "Europe/Monaco": {
                "changed_offset_string": "UTC+1",
                "changed_offset_value": 3600,
                "changed_readable_name": "+1:00 Monaco ( Europe )",
                "dst_change_epoch": 1445735935,
                "name": "Europe/Monaco",
                "offset_string": "UTC+2",
                "offset_value": 7200,
                "readable_name": "+2:00 Monaco ( Europe )"
            },
            "Europe/Moscow": {
                "name": "Europe/Moscow",
                "offset_string": "UTC+3",
                "offset_value": 10800,
                "readable_name": "+3:00 Moscow ( Europe )"
            },
            "Europe/Oslo": {
                "changed_offset_string": "UTC+1",
                "changed_offset_value": 3600,
                "changed_readable_name": "+1:00 Oslo ( Europe )",
                "dst_change_epoch": 1445735935,
                "name": "Europe/Oslo",
                "offset_string": "UTC+2",
                "offset_value": 7200,
                "readable_name": "+2:00 Oslo ( Europe )"
            },
            "Europe/Paris": {
                "changed_offset_string": "UTC+1",
                "changed_offset_value": 3600,
                "changed_readable_name": "+1:00 Paris ( Europe )",
                "dst_change_epoch": 1445735935,
                "name": "Europe/Paris",
                "offset_string": "UTC+2",
                "offset_value": 7200,
                "readable_name": "+2:00 Paris ( Europe )"
            },
            "Europe/Prague": {
                "changed_offset_string": "UTC+1",
                "changed_offset_value": 3600,
                "changed_readable_name": "+1:00 Prague ( Europe )",
                "dst_change_epoch": 1445735935,
                "name": "Europe/Prague",
                "offset_string": "UTC+2",
                "offset_value": 7200,
                "readable_name": "+2:00 Prague ( Europe )"
            },
            "Europe/Riga": {
                "changed_offset_string": "UTC+2",
                "changed_offset_value": 7200,
                "changed_readable_name": "+2:00 Riga ( Europe )",
                "dst_change_epoch": 1445735935,
                "name": "Europe/Riga",
                "offset_string": "UTC+3",
                "offset_value": 10800,
                "readable_name": "+3:00 Riga ( Europe )"
            },
            "Europe/Rome": {
                "changed_offset_string": "UTC+1",
                "changed_offset_value": 3600,
                "changed_readable_name": "+1:00 Rome ( Europe )",
                "dst_change_epoch": 1445735935,
                "name": "Europe/Rome",
                "offset_string": "UTC+2",
                "offset_value": 7200,
                "readable_name": "+2:00 Rome ( Europe )"
            },
            "Europe/Samara": {
                "name": "Europe/Samara",
                "offset_string": "UTC+4",
                "offset_value": 14400,
                "readable_name": "+4:00 Samara ( Europe )"
            },
            "Europe/Simferopol": {
                "name": "Europe/Simferopol",
                "offset_string": "UTC+3",
                "offset_value": 10800,
                "readable_name": "+3:00 Simferopol ( Europe )"
            },
            "Europe/Sofia": {
                "changed_offset_string": "UTC+2",
                "changed_offset_value": 7200,
                "changed_readable_name": "+2:00 Sofia ( Europe )",
                "dst_change_epoch": 1445735935,
                "name": "Europe/Sofia",
                "offset_string": "UTC+3",
                "offset_value": 10800,
                "readable_name": "+3:00 Sofia ( Europe )"
            },
            "Europe/Stockholm": {
                "changed_offset_string": "UTC+1",
                "changed_offset_value": 3600,
                "changed_readable_name": "+1:00 Stockholm ( Europe )",
                "dst_change_epoch": 1445735935,
                "name": "Europe/Stockholm",
                "offset_string": "UTC+2",
                "offset_value": 7200,
                "readable_name": "+2:00 Stockholm ( Europe )"
            },
            "Europe/Tallinn": {
                "changed_offset_string": "UTC+2",
                "changed_offset_value": 7200,
                "changed_readable_name": "+2:00 Tallinn ( Europe )",
                "dst_change_epoch": 1445735935,
                "name": "Europe/Tallinn",
                "offset_string": "UTC+3",
                "offset_value": 10800,
                "readable_name": "+3:00 Tallinn ( Europe )"
            },
            "Europe/Tirane": {
                "changed_offset_string": "UTC+1",
                "changed_offset_value": 3600,
                "changed_readable_name": "+1:00 Tirane ( Europe )",
                "dst_change_epoch": 1445735935,
                "name": "Europe/Tirane",
                "offset_string": "UTC+2",
                "offset_value": 7200,
                "readable_name": "+2:00 Tirane ( Europe )"
            },
            "Europe/Uzhgorod": {
                "changed_offset_string": "UTC+2",
                "changed_offset_value": 7200,
                "changed_readable_name": "+2:00 Uzhgorod ( Europe )",
                "dst_change_epoch": 1445735935,
                "name": "Europe/Uzhgorod",
                "offset_string": "UTC+3",
                "offset_value": 10800,
                "readable_name": "+3:00 Uzhgorod ( Europe )"
            },
            "Europe/Vienna": {
                "changed_offset_string": "UTC+1",
                "changed_offset_value": 3600,
                "changed_readable_name": "+1:00 Vienna ( Europe )",
                "dst_change_epoch": 1445735935,
                "name": "Europe/Vienna",
                "offset_string": "UTC+2",
                "offset_value": 7200,
                "readable_name": "+2:00 Vienna ( Europe )"
            },
            "Europe/Vilnius": {
                "changed_offset_string": "UTC+2",
                "changed_offset_value": 7200,
                "changed_readable_name": "+2:00 Vilnius ( Europe )",
                "dst_change_epoch": 1445735935,
                "name": "Europe/Vilnius",
                "offset_string": "UTC+3",
                "offset_value": 10800,
                "readable_name": "+3:00 Vilnius ( Europe )"
            },
            "Europe/Volgograd": {
                "name": "Europe/Volgograd",
                "offset_string": "UTC+3",
                "offset_value": 10800,
                "readable_name": "+3:00 Volgograd ( Europe )"
            },
            "Europe/Warsaw": {
                "changed_offset_string": "UTC+1",
                "changed_offset_value": 3600,
                "changed_readable_name": "+1:00 Warsaw ( Europe )",
                "dst_change_epoch": 1445735935,
                "name": "Europe/Warsaw",
                "offset_string": "UTC+2",
                "offset_value": 7200,
                "readable_name": "+2:00 Warsaw ( Europe )"
            },
            "Europe/Zaporozhye": {
                "changed_offset_string": "UTC+2",
                "changed_offset_value": 7200,
                "changed_readable_name": "+2:00 Zaporozhye ( Europe )",
                "dst_change_epoch": 1445735935,
                "name": "Europe/Zaporozhye",
                "offset_string": "UTC+3",
                "offset_value": 10800,
                "readable_name": "+3:00 Zaporozhye ( Europe )"
            },
            "Europe/Zurich": {
                "changed_offset_string": "UTC+1",
                "changed_offset_value": 3600,
                "changed_readable_name": "+1:00 Zurich ( Europe )",
                "dst_change_epoch": 1445735935,
                "name": "Europe/Zurich",
                "offset_string": "UTC+2",
                "offset_value": 7200,
                "readable_name": "+2:00 Zurich ( Europe )"
            },
            "HST": {
                "name": "HST",
                "offset_string": "UTC-10",
                "offset_value": -36000,
                "readable_name": "-10:00 HST"
            },
            "Indian/Chagos": {
                "name": "Indian/Chagos",
                "offset_string": "UTC+6",
                "offset_value": 21600,
                "readable_name": "+6:00 Chagos ( Indian )"
            },
            "Indian/Christmas": {
                "name": "Indian/Christmas",
                "offset_string": "UTC+7",
                "offset_value": 25200,
                "readable_name": "+7:00 Christmas ( Indian )"
            },
            "Indian/Cocos": {
                "name": "Indian/Cocos",
                "offset_string": "UTC+6:30",
                "offset_value": 23400,
                "readable_name": "+6:30 Cocos ( Indian )"
            },
            "Indian/Kerguelen": {
                "name": "Indian/Kerguelen",
                "offset_string": "UTC+5",
                "offset_value": 18000,
                "readable_name": "+5:00 Kerguelen ( Indian )"
            },
            "Indian/Mahe": {
                "name": "Indian/Mahe",
                "offset_string": "UTC+4",
                "offset_value": 14400,
                "readable_name": "+4:00 Mahe ( Indian )"
            },
            "Indian/Maldives": {
                "name": "Indian/Maldives",
                "offset_string": "UTC+5",
                "offset_value": 18000,
                "readable_name": "+5:00 Maldives ( Indian )"
            },
            "Indian/Mauritius": {
                "name": "Indian/Mauritius",
                "offset_string": "UTC+4",
                "offset_value": 14400,
                "readable_name": "+4:00 Mauritius ( Indian )"
            },
            "Indian/Reunion": {
                "name": "Indian/Reunion",
                "offset_string": "UTC+4",
                "offset_value": 14400,
                "readable_name": "+4:00 Reunion ( Indian )"
            },
            "MET": {
                "changed_offset_string": "UTC+1",
                "changed_offset_value": 3600,
                "changed_readable_name": "+1:00 MET",
                "dst_change_epoch": 1445735935,
                "name": "MET",
                "offset_string": "UTC+2",
                "offset_value": 7200,
                "readable_name": "+2:00 MET"
            },
            "MST": {
                "name": "MST",
                "offset_string": "UTC-7",
                "offset_value": -25200,
                "readable_name": "-7:00 MST"
            },
            "MST7MDT": {
                "changed_offset_string": "UTC-7",
                "changed_offset_value": -25200,
                "changed_readable_name": "-7:00 MST7MDT",
                "dst_change_epoch": 1446366216,
                "name": "MST7MDT",
                "offset_string": "UTC-6",
                "offset_value": -21600,
                "readable_name": "-6:00 MST7MDT"
            },
            "PST8PDT": {
                "changed_offset_string": "UTC-8",
                "changed_offset_value": -28800,
                "changed_readable_name": "-8:00 PST8PDT",
                "dst_change_epoch": 1446370013,
                "name": "PST8PDT",
                "offset_string": "UTC-7",
                "offset_value": -25200,
                "readable_name": "-7:00 PST8PDT"
            },
            "Pacific/Apia": {
                "changed_offset_string": "UTC+13",
                "changed_offset_value": 46800,
                "changed_readable_name": "+13:00 Apia ( Pacific )",
                "dst_change_epoch": 1459605919,
                "name": "Pacific/Apia",
                "offset_string": "UTC+14",
                "offset_value": 50400,
                "readable_name": "+14:00 Apia ( Pacific )"
            },
            "Pacific/Auckland": {
                "changed_offset_string": "UTC+12",
                "changed_offset_value": 43200,
                "changed_readable_name": "+12:00 Auckland ( Pacific )",
                "dst_change_epoch": 1459605919,
                "name": "Pacific/Auckland",
                "offset_string": "UTC+13",
                "offset_value": 46800,
                "readable_name": "+13:00 Auckland ( Pacific )"
            },
            "Pacific/Bougainville": {
                "name": "Pacific/Bougainville",
                "offset_string": "UTC+11",
                "offset_value": 39600,
                "readable_name": "+11:00 Bougainville ( Pacific )"
            },
            "Pacific/Chatham": {
                "changed_offset_string": "UTC+12:45",
                "changed_offset_value": 45900,
                "changed_readable_name": "+12:45 Chatham ( Pacific )",
                "dst_change_epoch": 1459605919,
                "name": "Pacific/Chatham",
                "offset_string": "UTC+13:45",
                "offset_value": 49500,
                "readable_name": "+13:45 Chatham ( Pacific )"
            },
            "Pacific/Chuuk": {
                "name": "Pacific/Chuuk",
                "offset_string": "UTC+10",
                "offset_value": 36000,
                "readable_name": "+10:00 Chuuk ( Pacific )"
            },
            "Pacific/Easter": {
                "name": "Pacific/Easter",
                "offset_string": "UTC-5",
                "offset_value": -18000,
                "readable_name": "-5:00 Easter ( Pacific )"
            },
            "Pacific/Efate": {
                "name": "Pacific/Efate",
                "offset_string": "UTC+11",
                "offset_value": 39600,
                "readable_name": "+11:00 Efate ( Pacific )"
            },
            "Pacific/Enderbury": {
                "name": "Pacific/Enderbury",
                "offset_string": "UTC+13",
                "offset_value": 46800,
                "readable_name": "+13:00 Enderbury ( Pacific )"
            },
            "Pacific/Fakaofo": {
                "name": "Pacific/Fakaofo",
                "offset_string": "UTC+13",
                "offset_value": 46800,
                "readable_name": "+13:00 Fakaofo ( Pacific )"
            },
            "Pacific/Fiji": {
                "changed_offset_string": "UTC+13",
                "changed_offset_value": 46800,
                "changed_readable_name": "+13:00 Fiji ( Pacific )",
                "dst_change_epoch": 1446301669,
                "name": "Pacific/Fiji",
                "offset_string": "UTC+12",
                "offset_value": 43200,
                "readable_name": "+12:00 Fiji ( Pacific )"
            },
            "Pacific/Funafuti": {
                "name": "Pacific/Funafuti",
                "offset_string": "UTC+12",
                "offset_value": 43200,
                "readable_name": "+12:00 Funafuti ( Pacific )"
            },
            "Pacific/Galapagos": {
                "name": "Pacific/Galapagos",
                "offset_string": "UTC-6",
                "offset_value": -21600,
                "readable_name": "-6:00 Galapagos ( Pacific )"
            },
            "Pacific/Gambier": {
                "name": "Pacific/Gambier",
                "offset_string": "UTC-9",
                "offset_value": -32400,
                "readable_name": "-9:00 Gambier ( Pacific )"
            },
            "Pacific/Guadalcanal": {
                "name": "Pacific/Guadalcanal",
                "offset_string": "UTC+11",
                "offset_value": 39600,
                "readable_name": "+11:00 Guadalcanal ( Pacific )"
            },
            "Pacific/Guam": {
                "name": "Pacific/Guam",
                "offset_string": "UTC+10",
                "offset_value": 36000,
                "readable_name": "+10:00 Guam ( Pacific )"
            },
            "Pacific/Honolulu": {
                "name": "Pacific/Honolulu",
                "offset_string": "UTC-10",
                "offset_value": -36000,
                "readable_name": "-10:00 Honolulu ( Pacific )"
            },
            "Pacific/Kiritimati": {
                "name": "Pacific/Kiritimati",
                "offset_string": "UTC+14",
                "offset_value": 50400,
                "readable_name": "+14:00 Kiritimati ( Pacific )"
            },
            "Pacific/Kosrae": {
                "name": "Pacific/Kosrae",
                "offset_string": "UTC+11",
                "offset_value": 39600,
                "readable_name": "+11:00 Kosrae ( Pacific )"
            },
            "Pacific/Kwajalein": {
                "name": "Pacific/Kwajalein",
                "offset_string": "UTC+12",
                "offset_value": 43200,
                "readable_name": "+12:00 Kwajalein ( Pacific )"
            },
            "Pacific/Majuro": {
                "name": "Pacific/Majuro",
                "offset_string": "UTC+12",
                "offset_value": 43200,
                "readable_name": "+12:00 Majuro ( Pacific )"
            },
            "Pacific/Marquesas": {
                "name": "Pacific/Marquesas",
                "offset_string": "UTC-9:30",
                "offset_value": -34200,
                "readable_name": "-9:30 Marquesas ( Pacific )"
            },
            "Pacific/Nauru": {
                "name": "Pacific/Nauru",
                "offset_string": "UTC+12",
                "offset_value": 43200,
                "readable_name": "+12:00 Nauru ( Pacific )"
            },
            "Pacific/Niue": {
                "name": "Pacific/Niue",
                "offset_string": "UTC-11",
                "offset_value": -39600,
                "readable_name": "-11:00 Niue ( Pacific )"
            },
            "Pacific/Norfolk": {
                "name": "Pacific/Norfolk",
                "offset_string": "UTC+11:30",
                "offset_value": 41400,
                "readable_name": "+11:30 Norfolk ( Pacific )"
            },
            "Pacific/Noumea": {
                "name": "Pacific/Noumea",
                "offset_string": "UTC+11",
                "offset_value": 39600,
                "readable_name": "+11:00 Noumea ( Pacific )"
            },
            "Pacific/Pago_Pago": {
                "name": "Pacific/Pago_Pago",
                "offset_string": "UTC-11",
                "offset_value": -39600,
                "readable_name": "-11:00 Pago Pago ( Pacific )"
            },
            "Pacific/Palau": {
                "name": "Pacific/Palau",
                "offset_string": "UTC+9",
                "offset_value": 32400,
                "readable_name": "+9:00 Palau ( Pacific )"
            },
            "Pacific/Pitcairn": {
                "name": "Pacific/Pitcairn",
                "offset_string": "UTC-8",
                "offset_value": -28800,
                "readable_name": "-8:00 Pitcairn ( Pacific )"
            },
            "Pacific/Pohnpei": {
                "name": "Pacific/Pohnpei",
                "offset_string": "UTC+11",
                "offset_value": 39600,
                "readable_name": "+11:00 Pohnpei ( Pacific )"
            },
            "Pacific/Port_Moresby": {
                "name": "Pacific/Port_Moresby",
                "offset_string": "UTC+10",
                "offset_value": 36000,
                "readable_name": "+10:00 Port Moresby ( Pacific )"
            },
            "Pacific/Rarotonga": {
                "name": "Pacific/Rarotonga",
                "offset_string": "UTC-10",
                "offset_value": -36000,
                "readable_name": "-10:00 Rarotonga ( Pacific )"
            },
            "Pacific/Tahiti": {
                "name": "Pacific/Tahiti",
                "offset_string": "UTC-10",
                "offset_value": -36000,
                "readable_name": "-10:00 Tahiti ( Pacific )"
            },
            "Pacific/Tarawa": {
                "name": "Pacific/Tarawa",
                "offset_string": "UTC+12",
                "offset_value": 43200,
                "readable_name": "+12:00 Tarawa ( Pacific )"
            },
            "Pacific/Tongatapu": {
                "name": "Pacific/Tongatapu",
                "offset_string": "UTC+13",
                "offset_value": 46800,
                "readable_name": "+13:00 Tongatapu ( Pacific )"
            },
            "Pacific/Wake": {
                "name": "Pacific/Wake",
                "offset_string": "UTC+12",
                "offset_value": 43200,
                "readable_name": "+12:00 Wake ( Pacific )"
            },
            "Pacific/Wallis": {
                "name": "Pacific/Wallis",
                "offset_string": "UTC+12",
                "offset_value": 43200,
                "readable_name": "+12:00 Wallis ( Pacific )"
            },
            "UTC": {
                "name": "UTC",
                "offset_string": "UTC",
                "offset_value": 0,
                "readable_name": "+0:00 UTC"
            },
            "WET": {
                "changed_offset_string": "UTC",
                "changed_offset_value": 0,
                "changed_readable_name": "+0:00 WET",
                "dst_change_epoch": 1445735935,
                "name": "WET",
                "offset_string": "UTC+1",
                "offset_value": 3600,
                "readable_name": "+1:00 WET"
            }
        }
    },
};

$(document).ready(function() {
    // Open panel
    $('div.main-div').swiperight(function() {
        $( "#left-panel" ).panel( "open" );
    });

    // Close panel with click
    $('div.ui-panel-content-wrap,div.ui-panel-dismiss').live('click', function(){
        $( "#left-panel" ).panel( "close" );
    });

    // Make swiping a bit harder
    $.event.special.swipe.horizontalDistanceThreshold = 75;

    app.init();
});
