app.materialInListView = Backbone.View.extend({
    initialize: function(options) {
    },

    render: function() {
        this.$el.html( templatizer.materialInListView( _.extend(this.model.toJSON(), { show_url : this.model.show_url }) ) ); // Render template
        this.$el.attr('data-theme','a');

        // when coming back from parent view, remove spinner and show content
        if (app.options.appmode) AppGyver.showContent();

        return this;
    },
    events: {
        "click" : "openMaterial"
    },

    openMaterial : function(e){
      if( app.options.appmode ) {
        e.preventDefault();
        AppGyver.openPreload("materialPage", {path: this.model.show_url});
      } else {
        document.location = this.model.show_url;
      }
    }
});
