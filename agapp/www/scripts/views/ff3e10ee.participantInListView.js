app.participantInListView = Backbone.View.extend({
    initialize: function(options) {
    },
    render: function() {
        this.$el.html( templatizer.participantInListView( _.extend(this.model.toJSON(), { show_url : this.model.show_url }) ) ); // Render template
        return this;
    },
    events: {
      "click": "openParticipant"
    },

    openParticipant: function(e){
      if( app.options.appmode ) {
        e.preventDefault();
        AppGyver.open("http://localhost:13101"+this.model.show_url);
        AppGyver.open();
      } else {
        document.location = this.model.show_url;
      }
    }
});
