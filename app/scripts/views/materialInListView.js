app.materialInListView = Backbone.View.extend({
    initialize: function(options) {
    },
    render: function() {
        this.$el.html( templatizer.materialInListView( _.extend(this.model.toJSON(), { show_url : this.model.show_url }) ) ); // Render template
        this.$el.attr('data-theme','a');
        return this;
    },
    events: {
    }
});
