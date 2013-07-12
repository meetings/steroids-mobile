app.userModel = Backbone.Model.extend({
    initialize : function( data, options ){
        if( data ){
            this.url = app.defaults.api_host + '/v1/users/' + ( data.id || 'me' );
        }

        // Change url if id changes
        this.on("change", function() {
            if( this.id ) this.url = app.defaults.api_host + '/v1/users/' + this.id;
        }, this );
    },
    defaults : {
        hidden_sources : []
    },
    idAttribute : 'id'
});
