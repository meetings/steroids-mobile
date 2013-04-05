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
        alert('start editing');
    },
    renameMaterial : function(e){
        alert('rename');
    },
    removeMaterial : function(e){
        alert('remove');
    }
});
