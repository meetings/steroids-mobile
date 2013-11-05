app.loginView = Backbone.View.extend({
    // TODO: Fix mystery problem of having weird white bottom
    initialize: function(options) {
        $('#login-header > a.back-button').on('click', function(e){
            e.preventDefault();
            $('#login-header').hide();
            app.views.login.render();
            $('#login-page').trigger('create');
            $('#login-page').css('padding-top','0px');
        });

        this.google_uid = options.google_uid;
        this.google_rt = options.google_rt;
    },
    render: function() {
        this.$el.html( templatizer.loginView() );
        this.$el.trigger('create');
        if( app.options.build !== 'web' ) $('#login').addClass('app-mode');
        if ( this.google_uid ) {
            $('#login-header').fadeIn();
            $('a#facebook-login,a#google-login,p.separator,div.logo,#email').fadeOut('fast');
            $('a#facebook-login,a#google-login,p.separator,div.logo,#email').promise().done(function(){
                $('#login-page').css('padding-top','41px');
                $('div#google-connect-form').fadeIn();
                $('body').scrollTop(0);
            });
        }
    },
    events: {
        'click .login_or_register' : 'loginOrRegister',
        'click #no-mobile' : 'nomobile',
        'click #facebook-login' : 'facebookLogin',
        'click #google-login' : 'googleLogin',
        'click #google-connect' : 'googleConnect',
        'focus #email' : 'focusEmail',
        'click .check-pin' : 'checkPin'
    },

    focusEmail : function(e){
        e.preventDefault();
        $('#login-header').fadeIn();
        $('a#facebook-login,a#google-login,p.separator,div.logo').fadeOut('fast');
        $('a#facebook-login,a#google-login,p.separator,div.logo').promise().done(function(){
            $('div.controls').fadeIn();
            $('body').scrollTop(0);
        });
    },
    checkPin : function(e){
        e.preventDefault();
        var $form = $('#pin-form');
        var $button = $(e.target);
        var $pin_field = $('#pin');
        $button.html('Checking...');

        if( ! $pin_field.val() ){
             $button.html('Continue');
             $form.append( $('<p class="error">Oops, looks like you skipped the PIN.</p>').delay(5000).fadeOut() );
             return;
        }

        if( ! app.hasInternet() ) return;
        $.post( app.defaults.api_host + '/v1/login', { pin : $pin_field.val(), email : $('#email').val() }, function( response ){
            if( response.result ){
                // Login
                app._loginWithParams( response.result.user_id, response.result.token );

                AppGyver.requireListingRefresh();
                if ( response.result.tos_accepted ) {
                    AppGyver.switchContext( 'meetingsPage' );
                }
                else {
                    AppGyver.switchContext( 'profilePage', { context_after_tos_accept : JSON.stringify( ['meetingsPage'] ) } );
                }
            }
            else{
                $button.html('Continue');
                if( response.error && response.error.code == 1 ){
                    $form.append( $('<p class="error">The PIN is not correct. Please try again!</p>').delay(5000).fadeOut() );
                }
                else if( response.error && response.error.code == 3 ){
                    $form.append( $('<p class="error">Too many recent PIN failurers. Wait a moment and try again!</p>').delay(5000).fadeOut() );
                }
                else if( response.error && response.error.code == 4 ){
                    $form.append( $('<p class="error">PIN is already used or expired. Please request a new PIN!</p>').delay(5000).fadeOut() );
                }
                else{
                    $form.append( $('<p class="error">An unknown error has happened. Please go back and try again!</p>').delay(5000).fadeOut() );
                }
            }
        }, 'json' );
    },
    tryagain : function(e){
        e.preventDefault();
        this.render();
        this.$el.trigger('create');
    },
    loginOrRegister : function(e){
        e.preventDefault();
        var $form = $('#login-form');
        var $button = $(e.target);
        var $mail_field = $('#email');
        var mail = $mail_field.val();
        if( ! app.helpers.validEmail( mail ) ){
             $form.append( $('<p class="error">Oops, you need to type in a valid email.</p>').delay(5000).fadeOut() );
             return;
        }
        $button.html('Sending...');

        if( ! app.hasInternet() ) return;
        $.post( app.defaults.api_host + '/v1/login', { include_pin : 1, email : $mail_field.val(), return_host : app.defaults.return_host, allow_register : 1 }, function( response ){
            if( response.result === 1 ){
                $form.fadeOut( function(){
                    $('#login-page').prepend('<p class="login-message">We\'ve sent you a PIN code to this address: ' + $mail_field.val() + '</p>').fadeIn();
                    $('#pin-form').fadeIn(function(){
                        setTimeout(function(){
                            document.getElementById("pin").focus();
                        },100);
                        //$('#pin').focus();
                    });
                });
            }
            else{
               $button.html('Send');
               $form.append( $('<p class="error">Sorry,there was an error processing your request. Try again!</p>').delay(5000).fadeOut() );
            }
        }, 'json');
    },
    googleConnect : function(e) {
        var that = this;
        e.preventDefault();
        var $form = $('#google-connect-form');
        var $button = $(e.target);
        var $mail_field = $('#google-connect-email');
        if( ! $mail_field.val() ){
             $form.append( $('<p class="error">Oops, you forgot to type in an email.</p>').delay(5000).fadeOut() );
             return;
        }
        $button.html('Sending...');
        $.post( app.defaults.api_host + '/v1/login', { include_pin : 1, email : $mail_field.val(), return_host : app.defaults.return_host, allow_register : 1, google_uid : that.google_uid, google_rt : that.google_rt }, function( response ){
            if( response.result === 1 ){
                $form.fadeOut( function(){
                    $('#login-page').prepend('<p class="login-message">We\'ve sent you a PIN code to this address: ' + $mail_field.val() + '</p>').fadeIn();
                    $('#pin-form').fadeIn(function(){
                        setTimeout(function(){
                            document.getElementById("pin").focus();
                        },100);
                        //$('#pin').focus();
                    });
                });
            }
            else{
               $button.html('Send');
               $form.append( $('<p class="error">Sorry,there was an error processing your request. Try again!</p>').delay(5000).fadeOut() );
            }
        }, 'json');
    },
    facebookLogin : function(e) {
        e.preventDefault();
        var redirect_uri = 'https://dev.meetin.gs/meetings_global/facebook_redirect';
        var url = 'https://www.facebook.com/dialog/oauth?client_id=181390985231333&redirect_uri='+ encodeURIComponent( redirect_uri ) +'&state=' + encodeURIComponent( JSON.stringify( { to : window.location.protocol + '//' + window.location.host + window.location.pathname +'?fb_login=1', redirect_uri : redirect_uri } ) );
        window.location = url;
    },
    googleLogin : function(e) {
        e.preventDefault();
        app.startGoogleConnecting( [ { key : 'google_login', value : 1 } ] );
    },
    nomobile : function(e){
        e.preventDefault();
        window.location = 'http://www.meetin.gs/nomobile.php';
    }
});
