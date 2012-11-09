app.participantModel = Backbone.Model.extend({
    initialize : function( data, options ){
        if( this.collection ){
            this.show_url = '/participant.html?mid=' + this.collection.meeting_id + '&id=' + data.user_id;
        }
    },
    idAttribute : 'user_id'
});
