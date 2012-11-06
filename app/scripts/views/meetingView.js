app.meetingView = Backbone.View.extend({
    errors : 0,
    initialize: function(options) {
        //options.model.bind('error', this.errorHandler, this);
    },
    render: function() {
        this.$el.html( templatizer.meetingView( this.model.toJSON() ) ); // Render template
        this.$el.trigger("create");
        return this;
    },
    events: {
        'click .open-material-view' : 'openMaterialView',
        'click .open-participant-view' : 'openParticipantView'
    },
    openMaterialView : function(e){
        window.location.href = 'materials.html?id='+this.model.get('id');
    },
    openParticipantView : function(e){
        window.location.href = 'participants.html?id='+this.model.get('id');
    },
    errorHandler : function(mod, error, options){
        // Retry
        console.log(this.errors);
        if( this.errors === 0 ){
            this.errors++;
            this.model.fetch({ success : function(){
                this.render();
            }, timeout : 2000 });
        }
        else{
            alert('There\'s something really wrong. Try refreshing the page please!');
            this.errors = 0;
        }
    }
});
