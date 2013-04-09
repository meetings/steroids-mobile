app.materialView = Backbone.View.extend({

    initialize: function(options) {
        options.model.on('change', this.render, this);
        options.edit_collection.on('change', this.render, this);
        options.edit_collection.on('remove', this.render, this);
        options.edit_collection.on('add', this.render, this);
        options.edit_collection.on('remove', function() { options.model.fetch() }, this);

        // Start polling for new edit versions

        this.edit_collection = options.edit_collection;
        this.edits_polling();

        // Open panel
        $('div.main-div').swipeleft(function(){
            $( "#edit-material-panel" ).panel( "open" );
        });

        // Close panel with click
        $('div.ui-panel-content-wrap,div.ui-panel-dismiss').live('click', function(){
            $( "#edit-material-panel" ).panel( "close" );
        });

    },

    current_edits_polling_timeout: false,
    edits_polling: function() {
        this.edit_collection.fetch( { update : true });

        if ( this.current_edits_polling_timeout ) {
            clearTimeout( this.current_edits_polling_timeout );
        }

        var that = this;
        this.current_edits_polling_timeout = setTimeout( function() { that.edits_polling() }, 5000 );
    },

    render: function() {
        var current_edit = this.edit_collection.at(0);
        this.$el.html( templatizer.materialView( {
            model : this.model.toJSON(),
            current_edit : current_edit ? current_edit.toJSON() : false,
            auth_user_id : app.auth.user
        } ) );
        this.initDownloadLink();
        this.initScribd();
        return this;
    },

    events : {
    },

    initDownloadLink: function(){
        if( this.model.get('download_url')){

          $('#download-link').attr('href', this.model.get('download_url'));

          if( app.options.build !== 'web' ) {
            $('#download-link').on("click", function(e){
              e.preventDefault();
              steroids.openURL(encodeURI($(this).attr("href")));
            });
          }
        }
        else{
            $('#download-link').hide();
        }
    },

    initScribd: function(){

        $('.js_dicole_scribd_file').each(function(i){
            var divnode = $(this);
            divnode.parent().addClass('nopadding');
            $('#material-container').addClass('scribd');
            divnode.before('<div class="loader" id="scribd_loader"><span class="loader"></span></div>');
            var args_string = divnode.attr('data-scribd-args') || divnode.attr('title');
            var args = args_string.split(",");
            var scribd_doc = scribd.Document.getDoc( args[0], args[1] );

            // this eventlistener prevents a lot of errors from happening:
            scribd_doc.addEventListener("iPaperReady", function() {});

            scribd_doc.addParam("jsapi_version", 2);

            var type = args[2];
            // TODO: currently no intelligent type is given so use slide, which uses scale to fit
            scribd_doc.addParam( "mode", type == 'slideshow' ? "slide" : "slide" );

            scribd_doc.addParam("hide_disabled_buttons", true);
            if ( 'https:' == document.location.protocol ) {
                scribd_doc.addParam("use_ssl", true);
            }
            scribd_doc.addEventListener('docReady', function(){
                $('#scribd_loader').remove();
            });
            scribd_doc.addParam("default_embed_format","html5");

            scribd_doc.write( divnode.attr('id') );
        });
    }
});
