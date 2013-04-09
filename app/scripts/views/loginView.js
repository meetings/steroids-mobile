app.loginView = Backbone.View.extend({
    initialize: function(options) {
        $('#login-header > a.back-button').on('click', function(e){
            e.preventDefault();
            $('#login-header').hide();
            app.views.login.render();
            $('#login-page').trigger('create');
            $('#login-page').css('padding-top','0px');
        })
    },
    render: function() {
        this.$el.html( templatizer.loginView() );
        this.$el.trigger('create');
        if( app.options.build !== 'web' ) this.$el.addClass('app-mode');
    },
    events: {
        'click .login_or_register' : 'loginOrRegister',
        'click #no-mobile' : 'nomobile',
        'click #facebook-login' : 'nomobile',
        'focus #email' : 'focusEmail',
        'click .check-pin' : 'checkPin'
    },

    focusEmail : function(e){
        e.preventDefault();
        // TODO: FIX THJIS HIT
        // http://stackoverflow.com/questions/12879857/window-resize-due-to-virtual-keyboard-causes-issues-with-jquery-mobile
        $('#login-header').fadeIn();
        $('a#facebook-login,p.separator,div.logo').fadeOut('fast');
        $('a#facebook-login,p.separator,div.logo').promise().done(function(){
            $('#login-page').css('padding-top','41px');
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
        $.post( app.defaults.api_host + '/v1/login', { pin : $pin_field.val(), email : $('#email').val() }, function( response ){
            if( response.result ){
                // Login
                app._loginWithParams( response.result.user_id, response.result.token );

                var target_location = '/index.html'

                // If tos is accepted
                if ( response.result.tos_accepted ) {
                    if ( app.options.build !== 'web' ) {
                        steroids.layers.popAll();
                    }
                    else {
                        window.location = '/index.html';
                    }
                }
                else {
                    if ( app.options.build !== 'web' ) {
                        AppGyver.openPreload('profilePage', { url_after : target_location })
                    }
                    else {
                        window.location = '/profile.html?url_after_tos_accept=' + encodeURIComponent( target_location );
                    }
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
        if( ! $mail_field.val() ){
             $form.append( $('<p class="error">Oops, you forgot to type in an email.</p>').delay(5000).fadeOut() );
             return;
        }
        $button.html('Sending...');
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
    nomobile : function(e){
        e.preventDefault();
        window.location = 'http://www.meetin.gs/nomobile.php';
    }
});
