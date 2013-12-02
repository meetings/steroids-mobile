app.appsView = Backbone.View.extend({
    initialize: function(options) {
        _(this).bindAll('render','skip');
    },

    render: function(field) {
        var type = navigator.userAgent.match(/iPhone/i) ? 'iphone' : 'android';
        this.$el.html( templatizer.appsView({ type : type } ) );
        this.$el.trigger("create");
        return this;
    },

    events: {
        'click .skip' : 'skip'
    },

    skip : function(e) {
        e.preventDefault();
        var return_url = localStorage.getItem('apps_return_url');
        window.location.href = return_url ? return_url : '/index.html';
    }
});
