app.materialEditView = Backbone.View.extend({

    beforeClose : function() {
        this.$el.parent().append( $('<div class="view-container"></div>') );

        if ( this.current_lock_ensure_timeout ) {
            clearTimeout( this.current_lock_ensure_timeout );
        }
    },

    initialize: function(options) {
        var that = this;

        this.model = new app.materialEditModel();

        _(this).bindAll('editMaterialCancel','editMaterialSave');
        
        this.ready_to_render = false;
        this.rendered_once = false;

        var start_url = options.continue_edit ?
            app.defaults.api_host + '/v1/meeting_materials/' + options.material_id + '/continue_edit' :
            app.defaults.api_host + '/v1/meeting_materials/' + options.material_id + '/edits';

        var params = {
            user_id : app.auth.user,
            dic : app.auth.token
        };

        $.post( start_url, params, function( response ){
            that.ready_to_render = true;

            if ( response.id ) {
                that.model.set( response );
                that.model.set( 'old_content' , response.content );
                that.ensure_lock();
            }
            else {
                that.error_message = response.error.message;
            }

            that.render();

        }, 'json' );
    },

    current_lock_ensure_timeout: false,
    ensure_lock: function() {
        this.model.check_save( false, true );

        if ( this.current_lock_ensure_timeout ) {
            clearTimeout( this.current_lock_ensure_timeout );
        }

        var that = this;
        this.current_lock_ensure_timeout = setTimeout( function() { that.edits_polling() }, 5 * 60 * 1000 );
    },

    render: function() {
        if ( ! this.rendered_once && this.ready_to_render ) {
            this.rendered_once = true;
            this.$el.html( templatizer.materialEditView( { model : this.model.toJSON(), error_message : this.error_message }  ) );

            this.initTinyMCE();

            this.$el.parent().trigger('pagecreate');
            app.showContent();
        }
        return this;
    },

    events: {
        "click .edit-material-cancel" : "editMaterialCancel",
        "click .edit-material-save" : "editMaterialSave" 
    },

    initTinyMCE : function() {
        var that = this;
        if ( typeof( tinyMCE ) == 'undefined' ) {
            return;
        }

        $('textarea').css('width', '100%');

        tinyMCE.init({
            theme : "advanced",
            theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,bullist,numlist,|,removeformat",
            theme_advanced_buttons2 : "forecolor,backcolor,|,formatselect",
            theme_advanced_toolbar_align : "center",

            onchange_callback : function( instance ) {
                that.model.update_edit_content( instance.getContent() );
            },

            mode:'textareas'
        });
    },
    
    editMaterialCancel : function(e){
        e.preventDefault();
        AppGyver.popContext();
    },

    editMaterialSave : function(e){
        e.preventDefault();
        var that = this;

        var save_url = app.defaults.api_host + '/v1/meeting_materials/' + this.model.id;
        var params = {
            edit_id : this.model.id,
            content : this.model.get('content') || '',
            old_content : this.model.get('old_content') || '',
            user_id : app.auth.user,
            dic : app.auth.token
        };

        $.ajax( {
            type : 'PUT',
            url : save_url,
            data : params,
            success : function( response ) {
                AppGyver.switchContext('materialPage', { id : that.model.meeting_id }, { pop : 1 } );
            }
        } );
    }
});
