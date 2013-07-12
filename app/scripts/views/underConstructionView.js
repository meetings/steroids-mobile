app.underConstructionView = Backbone.View.extend({
    initialize: function(options) {
        this.message = options.message || false;

        if(!options.url) throw 'no redirect url given';
        this.redirect = options.url;
    },

    render: function(field) {
        this.$el.html( templatizer.underConstructionView({ message : this.message } ) );
        this.$el.trigger("create");
        return this;
    },

    events: {
        'click .proceed' : 'proceed'
    },

    proceed : function(e) {
        e.preventDefault();
        window.location = this.redirect;
    }
});
