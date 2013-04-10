app.materialInListView = Backbone.View.extend({
    initialize: function(options) {
    },

    render: function() {
        this.$el.html( templatizer.materialInListView( this.model.toJSON() ) ); // Render template
        this.$el.attr('data-theme','a');

        return this;
    },
    events: {
        "click" : "openMaterial"
    },

    openMaterial : function(e){
        e.preventDefault();
        AppGyver.switchContext("materialPage", { id: this.model.id } );
    }
});
