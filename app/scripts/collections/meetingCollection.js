app.meetingCollection = Backbone.Collection.extend({
    model: app.meetingModel,
    initialize: function(){
        this.url = 'https://api-dev.meetin.gs/v1/users/' + app.auth.user + '/meetings?token=' + app.auth.token;
    },
    url: '/v1/'
});
