app.meetingCollection = Backbone.Collection.extend({
    model: app.meetingModel,
    initialize: function( data, options ){
        this.url = app.defaults.api_host + '/v1/users/' + app.auth.user + '/meetings';
    }
});
