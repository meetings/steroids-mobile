app.commentInListView = Backbone.View.extend({
    initialize: function(options) {
    },
    render: function() {
        this.$el.html( templatizer.commentInListView( this.model.toJSON() ) ); // Render template
        return this;
    },
    events: {
    }
});
