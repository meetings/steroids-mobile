app.materialView = Backbone.View.extend({
    initialize: function(options) {
    },
    render: function() {
        this.$el.html( templatizer.materialView( this.model.toJSON() ) ); // Render template
        this.$el.trigger("create");
        return this;
    },
    events: {
    }
});
