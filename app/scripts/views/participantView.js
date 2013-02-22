app.participantView = Backbone.View.extend({

    initialize: function(options) {
    },

    render: function() {
        this.$el.html( templatizer.participantView( this.model.toJSON() ) ); // Render template
        this.$el.trigger('create'); // Call JQM

        return this;
    },

    openParticipantView : function(e){
        // app.router.navigate('participants.html');
    }
});
