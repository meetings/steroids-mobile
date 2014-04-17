app.lctView = Backbone.View.extend({
    initialize: function(options) {
    },

    events: {
    },


    render: function() {

        var d = new Date();
        var now = d.getTime();
        var show_before = 15 * 60 * 1000;
        var start = parseInt(this.model.get('begin_epoch')) * 1000;
        var end = parseInt(this.model.get('end_epoch')) * 1000;

        if( start <= now + show_before && end >= now ) {
            this.$el.html( templatizer.lctBar( this.model.toJSON() ) );
            this.$el.trigger('create');
        }
    }
});
