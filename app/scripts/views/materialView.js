app.materialView = Backbone.View.extend({

    beforeClose : function() {
        if ( this.current_edits_polling_timeout ) {
            clearTimeout( this.current_edits_polling_timeout );
        }
        $('.back-button').off('click');
    },

    initialize: function(options) {
        var that = this;

        this.model.on('change', this.render, this);

        $('.back-button').on('click', function(e) {
            e.preventDefault();
            that.set_material_edits( false );

            var parts = that.model.id.split(":");
            AppGyver.switchContext('meetingPage', { id : parts[0] }, { pop : true } );
        } );
    },

    set_material_edits : function( edits ) {
        this.material_edits = edits;

        if ( ! edits ) return;

        this.material_edits.on('change', this.render, this);
        this.material_edits.on('remove', this.render, this);
        this.material_edits.on('add', this.render, this);
        this.material_edits.on('remove', function() { this.model.fetch() }, this);

        this.edits_polling();        
    },

    render: function() {
        var current_edit = this.material_edits ? this.material_edits.at(0) : false;

        this.$el.html( templatizer.materialView( {
            model : this.model.toJSON(),
            current_edit : current_edit ? current_edit.toJSON() : false,
            auth_user_id : app.auth.user
        } ) );

        this.initDownloadLink();
        this.initScribd();

        this.$el.trigger('create');
        app.showContent();

        return this;
    },

    events : {
        'click .open-continued-material-edit' : 'continueEditing'
    },

    current_edits_polling_timeout: false,
    edits_polling: function() {
        if ( ! this.material_edits ) return;

        this.material_edits.fetch( { update : true });

        if ( this.current_edits_polling_timeout ) {
            clearTimeout( this.current_edits_polling_timeout );
        }

        var that = this;
        this.current_edits_polling_timeout = setTimeout( function() { that.edits_polling() }, 5000 );
    },

    continueEditing : function(e) {
        e.preventDefault();

        AppGyver.switchContext( 'editMaterialPage', { id : this.model.id, continue_edit : 1 } );
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
