app.newProfileView = Backbone.View.extend({

    render: function() {
        this.$el.html( templatizer.newProfileView( this.model.toJSON() ) ); // Render template
        this.$el.trigger('create'); // Call JQM

        return this;
    },

    events : [
    
    ]
});
