app.participantModel = Backbone.Model.extend({
    idAttribute : 'id',
    defaults : {
        id : null
    },
    initialize : function( data, options ){
        this.set_url_for_id();

        this.on('change', function(e) {
            this.set_url_for_id();
        }, this );
    },
    set_url_for_id : function() {
        if ( this.id ) {
            this.url = app.defaults.api_host + '/v1/meeting_participants/' + this.id;
        }
    }
});
