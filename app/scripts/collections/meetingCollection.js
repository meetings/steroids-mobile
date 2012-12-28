app.meetingCollection = Backbone.Collection.extend({
    model: app.meetingModel,
    initialize: function( data, options ){
        if( options && options.override_endpoint ){
            this.url = app.defaults.api_host + '/v1/users/' + app.auth.user + '/' + options.override_endpoint;
        }
        else{
            this.url = app.defaults.api_host + '/v1/users/' + app.auth.user + '/meetings';
        }
    }

});
