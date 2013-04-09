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

        // Hack to get the panel working on mobile without using tirgger create
        this.$el.page();
        this.$el.removeClass('ui-page');
        $('.ui-btn-active',this.el).removeClass('ui-btn-active');
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
        window.location = '/editMaterial.html?id=' + this.materialId;
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
