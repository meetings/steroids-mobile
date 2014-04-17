app.editMaterialPanelView = Backbone.View.extend({
    initialize : function(options) {
        this.menu_active = options.active;
        this.materialId = options.materialId;

         this.listenTo(this.model, 'change', this.render);
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
        app.helpers.switchContext( 'editMaterialPage', { id : this.model.id } );
    },
    renameMaterial : function(e){
        e.preventDefault();
        this.$el.panel('close');
        app.helpers.switchContext( 'renameMaterialPage', { id : this.model.id } );
    },
    removeMaterial : function(e){
        e.preventDefault();

        var that = this;
        var meeting_id = this.model.get('meeting_id');

        $popupEl = $('#confirm-delete');
        $popupEl.popup('open');
        $("body").on("touchmove", false);
        this.$el.panel('close');

        // Close popup helper
        var popupClose = function(){
            $popupEl.off('click');
            $popupEl.popup('close');
            $("body").unbind("touchmove");
        };

        // Set handlers
        $popupEl.on('click', '.confirm', function(e){
            e.preventDefault();
            AppGyver.hideContent();
            that.model.destroy({ success : function(){
                app.helpers.switchContext("meetingPage", { id : meeting_id }, { pop : true } );
            }});
            popupClose();
        });
        $popupEl.on('click', '.cancel', function(e){
            e.preventDefault();
            popupClose();
        });
    }
});
