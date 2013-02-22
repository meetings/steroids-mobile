app.meetingView = Backbone.View.extend({
    errors : 0, // Track connection errors for this view
    progressBarStarted : false,
    initialize: function(options) {

        // Bind error and success handlers
         options.model.bind('error', this.errorHandler, this);
         options.model.bind('success', this.successHandler, this);

    },

    render: function() {

        // Render template & trigger jQuery create
        this.$el.html( templatizer.meetingView( this.model.toJSON() ) ); // Render template
        this.$el.trigger("create");

        // Start progressbar
        this.initProgressBar();

        return this;

    },

    events: {
        'click .open-material-view' : 'openMaterialView',
        'click .open-participant-view' : 'openParticipantView',
        'click .back-button' : 'navigateBack'
    },

    navigateBack : function(e){
      e.preventDefault();
      // when does this even happen?
      if ( app.options.appmode ) {

        return false;

      } else {
        document.location = 'index.html';
      }

    },

    openMaterialView : function(e){
      if ( app.options.appmode ) {
        e.preventDefault();
        AppGyver.openPreload("materialsPage", {id: this.model.get('id')});
      } else {
        document.location = '/materials.html?id='+this.model.get('id');
      }
    },

    openParticipantView : function(e){
      if ( app.options.appmode ) {
        e.preventDefault();
        AppGyver.openPreload("participantsPage", {id: this.model.get('id')});
      } else {
        document.location = '/participants.html?id='+this.model.get('id');
      }
    },

    initProgressBar : function(){

        if( this.model.get('begin_epoch') ){
            // Get values
            var now = Math.floor( moment() / 1000 );
            var begin = this.model.get('begin_epoch');
            var end = this.model.get('end_epoch');
            var duration = end - begin;
            var elapsed = now - begin;
            var timeleft = 'Meeting ends ' + moment.duration((duration - elapsed)*1000).humanize(true);

            // Check if it's on
            if( begin <= now && end >= now ){

                // Calculate progress
                var progress = Math.floor( elapsed / duration * 100);

                // Render template
                $('#progress-bar').html( templatizer.progressBar({ progress : progress, timeleft : timeleft }));

                // Set timeout to render
                if( ! this.progressBarStarted ){
                    this.progressBarStarted = true;
                    setInterval( _.bind(this.initProgressBar, this), 3000);
                }
            }
        }
    }
});
_.extend(app.meetingView.prototype, app.mixins.connectivity);
