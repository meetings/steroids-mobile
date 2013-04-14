app.editMaterialPanelView = Backbone.View.extend({
    initialize : function(options) {
        this.menu_active = options.active;
        this.materialId = options.materialId;

        // Bind error and success handlers
         options.model.bind('change', this.render, this);
        _(this).bindAll('render');
    },

    render : function() {
        this.$el.html( templatizer.editMaterialPanel( this.model.toJSON() ));
        this.$el.trigger('create');
    },

    events : {
        'click #nav-edit' : 'editMaterial',
        'click #nav-rename' : 'renameMaterial',
        'click #nav-remove' : 'removeMaterial',
        'click #nav-download' : 'downloadMaterial'
    },

    downloadMaterial : function(e){
        e.preventDefault();
        window.location = this.model.get('download_url');
    },

    editMaterial : function(e){
        e.preventDefault();
        this.$el.panel('close');
        AppGyver.switchContext( 'editMaterialPage', { id : this.model.id } );
    },
    renameMaterial : function(e){
        e.preventDefault();
        this.$el.panel('close');
        AppGyver.switchContext( 'renameMaterialPage', { id : this.model.id } );
    },
    removeMaterial : function(e){
        e.preventDefault();
        alert('remove');
    }
});
