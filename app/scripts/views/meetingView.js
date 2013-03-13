app.meetingView = Backbone.View.extend({
    errors : 0, // Track connection errors for this view
    progressBarStarted : false,
    initialize: function(options) {

        // Bind error and success handlers
         options.model.bind('error', this.errorHandler, this);
         options.model.bind('success', this.successHandler, this);
         options.model.bind('change', this.render, this);

        _(this).bindAll('openMaterialView', 'openParticipantView');
    },

    render: function() {

        // Render template & trigger jQuery create
        this.$el.html( templatizer.meetingView( this.model.toJSON() ) ); // Render template
        this.$el.trigger("create");

        // Start progressbar
        this.initProgressBar();

        // Setup materials col & view
        app.views.materials = new app.genericCollectionView({
            el : '#materials_list',
            collection : app.collections.materials,
            childViewTagName : 'li',
            childViewConstructor : app.materialInListView
        });
        app.views.materials.render();

        return this;
    },

    events: {
        'click .open-material-view' : 'openMaterialView',
        'click .open-participant-view' : 'openParticipantView',
        'click .add-photo-material' : 'addPhotoMaterial',
        'click .save-photo-material' : 'savePhotoMaterial',
        'click .open-map-link' : 'openMapLink'
    },

    openMapLink : function(e){
        e.preventDefault();
        var location = this.model.get('location');
        var appurl = "maps:q="+location;
        var normurl = "https://maps.google.com/maps?daddr="+location;
        app.openUrlSchemeLink( appurl, normurl );
    },

    savePhotoMaterial : function(e){
        e.preventDefault();
        $('.save-text').show();
        $('.file-save-form').hide();
        var that = this;
        var data = {
            upload_id : $('#file-upload-id').val(),
            meeting_id : this.model.get('id'),
            material_name : $('#file-upload-name').val(),
            user_id : app.auth.user
        };
        //alert('posting to: '+ app.defaults.api_host + '/v1/meetings/' + this.model.get('id') + '/materials' );
        $.post(app.defaults.api_host + '/v1/meetings/' + this.model.get('id') + '/materials', data, function(res){
            app.collections.materials.fetch({ success : function(){
                $('.add-photo-material',that.el).show();
                $('#upload_progress').html('');
                $('.save-text',that.el).hide();
                $('.save-photo-material',that.el).hide();
                $('#file-upload-name',that.el).val('');
            }, error : function(err){
                alert('error in fetch');
            }});
        });
    },

    addPhotoMaterial : function(e){
        e.preventDefault();
        navigator.camera.getPicture( function(imageURI){

            var that = this;
            // Show filename field
            var ft = new FileTransfer();

            var options = new FileUploadOptions();
            var filename = imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.fileKey='file';
            options.fileName=filename;
            options.params = {
                user_id : app.auth.user,
                dic : app.auth.token,
                filename : filename
            };
            options.chunkedMode = false;

            ft.onprogress = function( progressEvent ){
                if (progressEvent.lengthComputable) {
                    percentLoaded = Math.round(100 * (progressEvent.loaded / progressEvent.total));
                    var progress_text = percentLoaded + "%";
                    $('#upload_progress').html( templatizer.progressBar({ progress : percentLoaded, progress_text : progress_text }) );
                }
            };

            $('.file-save-form',that.el).show();
            setTimeout( function(){
                $('#file-upload-name').focus();
            },100);
            $('.add-photo-material',that.el).hide();
            ft.upload(imageURI, encodeURI(app.defaults.api_host + "/v1/uploads"), function(res){
                var resp = $.parseJSON(res.response);
                $('#file-upload-id').val(resp.result.upload_id);
                $('.save-photo-material',that.el).show();
            }, function(error){
                alert('error with upload');
            }, options);

        }, function(err){
            setTimeout(function(){
                alert(err);
            },100);
        } , { quality : 49, destinationType : Camera.DestinationType.FILE_URI } );
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
                $('#progress-bar').html( templatizer.progressBar({ progress : progress, progress_text : timeleft }));

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
