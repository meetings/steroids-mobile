app.materialModel = Backbone.Model.extend({
    idAttribute : 'material_id',
    initialize : function( data, options ){
        console.log('er');
        if( this.collection ){
            this.show_url = '/material.html?mid=' + this.collection.meeting_id + '&id=' + data.material_id;
        }
    }
});
