app.materialModel = Backbone.Model.extend({
    idAttribute : 'id',

    initialize : function( data, options ) {
        this.set_url_for_id();

        this.on('change', function(e) {
            this.set_url_for_id();
        }, this );

        if( this.collection ){
            this.show_url = '/material.html?mid=' + this.collection.meeting_id + '&id=' + data.material_id;
        }
    },

    set_url_for_id : function() {
        if ( this.id ) {
            this.url = app.defaults.api_host + '/v1/meeting_materials/' + this.id;
        }
    }
});
