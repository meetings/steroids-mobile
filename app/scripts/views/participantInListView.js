app.participantInListView = Backbone.View.extend({
    initialize: function(options) {
    },
    render: function() {
        this.$el.html( templatizer.participantInListView( _.extend(this.model.toJSON(), { show_url : this.model.show_url }) ) ); // Render template
        return this;
    },
    events: {
    }
});
