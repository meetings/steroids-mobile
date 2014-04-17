app.participantInListView = Backbone.View.extend({
    initialize: function(options) {
    },
    render: function() {
        this.$el.html( templatizer.participantInListView( this.model.toJSON() ) ); // Render template

        return this;
    },
    events: {
      "click": "openParticipant"
    },

    openParticipant: function(e){
        e.preventDefault();
        app.helpers.switchContext("participantPage", { id : this.model.id } );
    }
});
