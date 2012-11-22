app.loginView = Backbone.View.extend({
    initialize: function(options) {
    },
    render: function() {
        this.$el.html( templatizer.loginView() );
    },
    events: {
        'click .login' : 'login',
        'click .register' : 'register',
        'click .tryagain' : 'tryagain',
        'click #no-mobile' : 'nomobile'
    },
    tryagain : function(e){
        e.preventDefault();
        this.render();
        this.$el.trigger('create');
    },
    login : function(e){
        e.preventDefault();
        var $form = $('#login-form');
        var $button = $(e.target);
        var $mail_field = $('#email');
        if( ! $mail_field.val() ){
             $form.append( $('<p class="error">Oops, you forgot to type in an email.</p>').delay(5000).fadeOut() );
             return;
        }
        $button.html('Sending email...');
        $.post( app.defaults.api_host + '/v1/login', { email : $mail_field.val(), return_host : app.defaults.return_host }, function( response ){
            if( response.result === 1 ){
                $form.fadeOut( function(){
                    $form.html('<h3>Now open your email</h3><p class="login-message">Check your mail ' + $mail_field.val() + ' and click the login link to begin. </p><p><a class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-b tryagain"><span class="ui-btn-inner ui-btn-corner-all">Try again</span></a></p>').fadeIn();
                });
            }
            else{
               $button.html('Request Login Link');
               $form.append( $('<p class="error">Sorry, ' + $mail_field.val() + ' not found. Try again or register a new account!</p>').delay(5000).fadeOut() );
            }
        }, 'json');
    },
    register : function(e){
        e.preventDefault();
        var $form = $('#login-form');
        var $button = $(e.target);
        var $mail_field = $('#email');
        if( ! $mail_field.val() ){
             $form.append( $('<p class="error">Oops, you forgot to type in an email.</p>').delay(5000).fadeOut() );
             return;
        }
        $button.html('Creating account...');
        $.post( app.defaults.api_host + '/v1/login', { email : $mail_field.val(), return_host : app.defaults.return_host, allow_register : 1 }, function( response ){
            if( response.result === 1 ){
                $form.fadeOut( function(){
                    $form.html('<p class="login-message">Open your mobile email client for ' + $mail_field.val() + ' and click the login link to access. </p>').fadeIn();
                });
            }
            else{
               $button.html('Register new account');
               $form.append( $('<p class="error">Sorry, ' + $mail_field.val() + ' not found. Try again!</p>').delay(5000).fadeOut() );
            }
        }, 'json');
    },
    nomobile : function(e){
        e.preventDefault();
        window.location = 'http://www.meetin.gs/nomobile.php';
    }
});
