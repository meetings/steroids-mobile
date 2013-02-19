app.participantModel = Backbone.Model.extend({
    initialize : function( data, options ){
        if( this.collection ){
            this.show_url = '/participant.html?mid=' + this.collection.meeting_id + '&id=' + data.user_id;
        }
        if( data && options && options.meeting_id ){
            this.url = app.defaults.api_host + '/v1/meetings/' + options.meeting_id + '/participants/' + data.user_id;
        }
    },
    idAttribute : 'user_id'
});
