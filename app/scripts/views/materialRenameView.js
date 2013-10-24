app.materialRenameView = Backbone.View.extend({
    initialize: function(options) {
        var that = this;

        this.header = new app.headerView({ el : options.el }); // hooks pre-load back button for now

        this.model = new app.materialModel( { id : options.material_id } );
        this.model.fetch( { success : function() { that.render() } } );

        _(this).bindAll('renameMaterialCancel','renameMaterialSave');
    },

    render: function() {
        this.$el.html( templatizer.materialRenameView( { model : this.model.toJSON() }  ) );
        this.$el.parent().trigger('pagecreate');
        app.showContent();

        return this;
    },

    events: {
        "click .rename-material-cancel" : "renameMaterialCancel",
        "click .rename-material-save" : "renameMaterialSave"
    },

    renameMaterialCancel : function(e){
        var that = this;
        e.preventDefault();
        AppGyver.switchContext( 'materialPage', { id : that.model.get('material_id') }, { pop : 1 } );
    },

    renameMaterialSave : function(e){
        var that = this;
        e.preventDefault();

        $('.ui-btn-text', e.currentTarget).text('Saving...');

        this.model.set('title', $('#material-title').val() );

        this.model.save( {}, { success : function() {
            AppGyver.switchContext('materialPage', { id : that.model.get('material_id') }, { pop : 1 } );
        } } );
    }
});
