app.participantView = Backbone.View.extend({

    initialize: function(options) {
    },

    render: function() {
        this.$el.html( templatizer.participantView( this.model.toJSON() ) ); // Render template
        this.$el.trigger('create'); // Call JQM

        // when coming back from parent view, remove spinner and show content
        if (app.options.appmode) AppGyver.showContent();

        return this;
    },

    openParticipantView : function(e){
        // app.router.navigate('participants.html');
    }
});
