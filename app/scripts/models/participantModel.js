app.participantModel = Backbone.Model.extend({
    initialize : function( data, options ){
        this.url = app.defaults.api_host + '/v1/meeting_participants/' + ( data.id || '' );
    	this.on("change", function() {
            this.url = app.defaults.api_host + '/v1/meeting_participants/' + ( this.id || '' );
        }, this );
    },
    idAttribute : 'id',
    defaults : {
        id : null
    }
});
