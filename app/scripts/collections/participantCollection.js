app.participantCollection = Backbone.Collection.extend({

    model : app.participantModel,

    initialize: function( models, options ){
        this.meeting_id = options.meeting_id;
        this.url = app.defaults.api_host + '/v1/meetings/' + options.meeting_id + '/participants';
    },

    fetchMore: function(){
    }

});
