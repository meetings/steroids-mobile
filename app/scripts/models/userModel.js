app.userModel = Backbone.Model.extend({
    initialize : function( data, options ){
        if( data ){
            this.url = app.defaults.api_host + '/v1/users/' + ( data.id || 'me' );
        }
        this.on("change", function() {
            this.url = app.defaults.api_host + '/v1/users/' + ( this.id || 'me' );
        }, this );
    },
    idAttribute : 'id'
});
