app.participantCollection = Backbone.Collection.extend({

    model : app.participantModel,

    initialize: function(){
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
