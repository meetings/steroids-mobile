app.participantCollection = Backbone.Collection.extend({

    model : app.participantModel,

    initialize: function( models, options ){
        this.meeting_id = options.meeting_id;
        this.url = app.defaults.api_host + '/v1/meetings/' + options.meeting_id + '/participants';
    },

    fetchMore: function(){
    },

    comparator : function( m ){
        if( m.get('is_creator') ) return 1;
        else if( m.get('rsvp_status' ) === 'yes' ) return 2;
        else if( m.get('rsvp_status' ) === ' no' ) return 4;
        else return 3;
    }

});
