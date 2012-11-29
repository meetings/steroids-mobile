app.meetingView = Backbone.View.extend({
    errors : 0,
    progressBarStarted : false,
    initialize: function(options) {
        // options.model.bind('error', this.errorHandler, this);
    },
    render: function() {
        this.$el.html( templatizer.meetingView( this.model.toJSON() ) ); // Render template
        this.$el.trigger("create");
        this.initProgressBar();
        return this;
    },
    events: {
        'click .open-material-view' : 'openMaterialView',
        'click .open-participant-view' : 'openParticipantView'
    },
    openMaterialView : function(e){
        AGOpenLayerWithoutTopBar('/materials.html?id='+this.model.get('id'));
//        window.location.href = 'materials.html?id='+this.model.get('id');
    },
    openParticipantView : function(e){
        AGOpenLayerWithoutTopBar('/participants.html?id='+this.model.get('id'));
//        window.location.href = 'participants.html?id='+this.model.get('id');
    },
    initProgressBar : function(){
        if( this.model.get('begin_epoch')){
            // Get values
            var now = Math.floor( moment() / 1000 );
            var begin = this.model.get('begin_epoch');
            var end = this.model.get('end_epoch');
            var duration = end - begin;
            var elapsed = now - begin;
            var timeleft = 'Meeting ends ' + moment.duration((duration - elapsed)*1000).humanize(true);

            // Check if we it's on
            if( begin <= now && end >= now ){

                // Calculate progress
                var progress = Math.floor( elapsed / duration * 100);


                // Render template
                $('#progress-bar').html( templatizer.progressBar({ progress : progress, timeleft : timeleft }))

                // Set timeout to render
                if( ! this.progressBarStarted ){
                    this.progressBarStarted = true;
                    setInterval( _.bind(this.initProgressBar, this), 3000);
                }
            }
        }
    },
    errorHandler : function(mod, error, options){
        // Retry
        console.log(this.errors);
        if( this.errors === 0 ){
            this.errors++;
            var view = this;
            this.model.fetch({ success : function(a, b){
                view.render();
            }, timeout : 2000 });
        }
        else{
            alert('There\'s something really wrong. Try refreshing the page please!');
            this.errors = 0;
        }
    }
});
