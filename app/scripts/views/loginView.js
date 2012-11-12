app.loginView = Backbone.View.extend({
    initialize: function(options) {
    },
    render: function() {
        this.$el.html( templatizer.loginView() );
    },
    events: {
        'click .login' : 'login'
    },
    login : function(e){
        e.preventDefault();
        $.post( app.defaults.api_host + '/v1/login', { email : $('#email').val(), return_host : app.defaults.return_host }, function( response ){
            console.log(response);
        });
    }
});
