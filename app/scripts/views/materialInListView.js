app.materialInListView = Backbone.View.extend({
    initialize: function(options) {
    },
    render: function() {
        this.$el.html( templatizer.materialInListView( this.model.toJSON() ) ); // Render template
        return this;
    },
    events: {
    }
});
