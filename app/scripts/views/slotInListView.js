app.slotInListView = Backbone.View.extend({

    initialize : function(options) {
    },

    render : function() {
        this.$el.html( templatizer.slotInListView( this.model.toJSON() ) );
        return this;
    },

    events : {
        'click' : 'reserveSlot'
    },

    reserveSlot : function(e) {
        e.preventDefault();
        app.views.current.chooseSlot( {
            start_epoch : this.model.get('start_epoch'),
            end_epoch : this.model.get('end_epoch'),
            matchmaker_id : this.model.get('matchmaker')
        }, this.$el );
    }
});
