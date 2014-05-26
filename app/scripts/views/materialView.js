app.materialView = Backbone.View.extend({

    beforeClose : function() {
        $('.back-button').off('click');
    },

    initialize: function(options) {
        var that = this;

        this.model.on('change', this.render, this);

        $('.back-button').on('click', function(e) {
            e.preventDefault();

            var parts = that.model.id.split(":");
            app.helpers.switchContext('meetingPage', { id : parts[0] }, { pop : true } );
        } );
    },

    render: function() {
        this.$el.html( templatizer.materialView( {
            model : this.model.toJSON()
        } ) );

        this.initScribd();

        this.$el.trigger('create');

        return this;
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
