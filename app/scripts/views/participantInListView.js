app.participantInListView = Backbone.View.extend({
    initialize: function(options) {
    },
    render: function() {
        this.$el.html( templatizer.participantInListView( _.extend(this.model.toJSON(), { show_url : this.model.show_url }) ) ); // Render template

        // when coming back from parent view, remove spinner and show content
        if (app.options.appmode) AppGyver.showContent();

        return this;
    },
    events: {
      "click": "openParticipant"
    },

    openParticipant: function(e){
      if( app.options.appmode ) {
        e.preventDefault();
        AppGyver.openPreload("participantPage", {path: this.model.show_url});
      } else {
        document.location = this.model.show_url;
      }
    }
});
