app.participantInMeetingView = Backbone.View.extend({
    initialize: function(options) {
        this.model.bind('change', this.render, this);
    },
    render: function() {
        this.$el.html( templatizer.participantInMeetingView( this.model.toJSON() ) ); // Render template
        this.$el.addClass('wrap');

        return this;
    },
});
