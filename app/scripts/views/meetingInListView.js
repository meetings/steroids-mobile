app.meetingInListView = Backbone.View.extend({
    initialize: function(options) {
    },
    render: function() {
        this.$el.html( templatizer.meetingInListView( this.model.toJSON() ) ); // Render template
        return this;
    },
    events: {
        'click .material-view' : 'openMaterialView',
        'click .participant-view' : 'openParticipantView'
    },
    openMaterialView : function(e){
        // app.router.navigate('materials.html');
    },
    openParticipantView : function(e){
        // app.router.navigate('participants.html');
    }
});
