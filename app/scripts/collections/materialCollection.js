app.materialCollection = Backbone.Collection.extend({
    model : app.materialModel,
    initialize: function( data, options ){
        this.meeting_id = options.meeting_id;
        this.url = app.defaults.api_host + '/v1/meetings/' + options.meeting_id + '/users/' + app.auth.user + '/meetings?token=' + app.auth.token;
    },
    defaults: {
    }
});
