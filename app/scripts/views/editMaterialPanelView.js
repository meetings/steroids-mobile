app.editMaterialPanelView = Backbone.View.extend({
    initialize : function(options) {
        this.menu_active = options.active;
        this.materialId = options.materialId;
    },

    render : function() {
        this.$el.html( templatizer.editMaterialPanel() );
    },

    events : {
        'click #nav-edit' : 'editMaterial',
        'click #nav-rename' : 'renameMaterial',
        'click #nav-remove' : 'removeMaterial'
    },

    editMaterial : function(e){
        e.preventDefault();
        window.location = '/edit_material.html?id=' + this.materialId;
    },
    renameMaterial : function(e){
        e.preventDefault();
        alert('rename');
    },
    removeMaterial : function(e){
        e.preventDefault();
        alert('remove');
    }
});
