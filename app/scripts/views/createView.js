app.createView = Backbone.View.extend({
    mode : null,
    chosen_option : null,

    initialize: function(options) {
    },

    render: function() {
        this.$el.html( templatizer.createView( /*this.model.toJSON()*/ ) );
        return this;
    },

    events: {
    }
});
