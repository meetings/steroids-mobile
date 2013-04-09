app.materialEditCollection = Backbone.Collection.extend({
    model : app.materialEditModel,
    initialize: function( data, options ){
        this.material_id = options.material_id;
        this.url = app.defaults.api_host + '/v1/meeting_materials/' + options.material_id + '/edits';
    },
    defaults: {
    }
});
