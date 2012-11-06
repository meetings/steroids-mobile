app.participantCollection = Backbone.Collection.extend({
    initialize: function(){
    },
    defaults: {
    },
    fetchMore: function(){
        console.log('fetch more called');
    }
});
