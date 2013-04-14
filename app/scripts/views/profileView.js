app.profileView = Backbone.View.extend({

    initialize: function(options) {
        this.context_after_tos_accept = options.context_after_tos_accept;
        this.model.on('change', this.render, this);
    },
    render: function() {
        this.$el.html( templatizer.profileView( this.model.toJSON() ) ); // Render template

        if(this.model.get('tos_accepted') != 1) {
            $('.back-button').hide();
            $('#headerTitle').text('Welcome');
        }

        this.$el.trigger('create'); // Call JQM

        return this;
    },

    saveProfileData : function(e) {
        e.preventDefault();

        this.model.set({
            first_name : $('#user-firstname').val(),
            last_name : $('#user-lastname').val(),
            //primary_email : $('#user-email').val(),
            phone : $('#user-phone').val(),
            skype : $('#user-skype').val(),
            organization : $('#user-organization').val(),
            title : $('#user-title').val(),
            tos_accepted : '1'
        });

        var that = this;

        this.model.save({}, {
            success : function() {
                AppGyver.switchContext.apply( AppGyver, JSON.parse( that.context_after_tos_accept || '["meetingsPage"]' ) );
            },
            error: function() {
                alert('Saving profile failed. Please try again!');
            }
        });
    },

    openTos : function(e){
        e.preventDefault();
        var win=window.open('http://meetin.gs/meetings/terms_of_service', '_blank');
        win.focus();
    },

    uploadPhoto : function(e){
        e.preventDefault();
        var that = this;
        navigator.camera.getPicture( function(imageURI){

            // Setup File transfer and progress bar
            var ft = new FileTransfer();
            ft.onprogress = function( progressEvent ){
                if (progressEvent.lengthComputable) {
                    percentLoaded = Math.round(100 * (progressEvent.loaded / progressEvent.total));
                    var progress_text = percentLoaded + "%";
                    //$('#upload_progress').html( templatizer.progressBar({ progress : percentLoaded, progress_text : progress_text }) );
                }
            };

            var options = new FileUploadOptions();
            var filename = imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.fileKey='file';
            options.fileName=filename;
            options.chunkedMode = false;
            options.params = {
                user_id : app.auth.user,
                dic : app.auth.token,
                filename : filename,
                create_thumbnail : 1,
                width : 70,
                height : 70
            };

            $('#profile-image').css('background-image', '');
            $('#image-placeholder').hide();

            ft.upload(imageURI, encodeURI(app.defaults.api_host + "/v1/uploads"), function(res){
                var resp = $.parseJSON(res.response);

                that.model.set({
                    image : resp.result.upload_thumbnail_url,
                    upload_id : resp.result.upload_id
                });
            }, function(error){
                alert('Error uploadin file.');
            }, options);

        }, function(err){
            setTimeout(function(){
                alert('Error uploading file.');
            },100);
        } , { quality : 49, destinationType : Camera.DestinationType.FILE_URI } );
    },

    events : {
        'click .save-profile-data' : 'saveProfileData',
        'click .open-tos-page' : 'openTos',
        'click #profile-image' : 'uploadPhoto'
    }
});
