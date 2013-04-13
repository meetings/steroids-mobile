app.materialEditView = Backbone.View.extend({

    beforeClose : function() {
        this.$el.parent().append( $('<div class="view-container"></div>') );

        if ( this.current_lock_ensure_timeout ) {
            clearTimeout( this.current_lock_ensure_timeout );
        }
    },
    material_id : null,
    initialize: function(options) {
        var that = this;

        this.model = new app.materialEditModel();

        _(this).bindAll('editMaterialCancel','editMaterialSave');

        this.ready_to_render = false;
        this.rendered_once = false;

        // Save reference to material id, if edit is locked, the model has no id
        this.material_id = options.material_id;

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

    editMaterialCancel : function(e) {
        e.preventDefault();

        if(this.model && this.model.id) {
            var cancel = confirm('Cancel editing?');

            if(cancel) {
                var delete_url = app.defaults.api_host + '/v1/meeting_material_edits/' + this.model.id;

                var params = {
                    user_id : app.auth.user,
                    dic : app.auth.token
                };

                var me = this;

                $.ajax({
                    url: delete_url,
                    type: 'DELETE',
                    data : params,
                    success : function( response ) {
                        console.log(delete_url);
                        console.log(me.model.id);
                        console.log(me.material_id);
                        me.openMaterialPage();
                    }
                });
            }
        }
        else {
            this.openMaterialPage();
        }
    },

    editMaterialSave : function(e){
        e.preventDefault();
        var that = this;

        var save_url = app.defaults.api_host + '/v1/meeting_materials/' + this.model.get('material_id');
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
                that.openMaterialPage();
            }
        } );
    },

    openMaterialPage: function() {
        AppGyver.switchContext('materialPage', { id : this.material_id }, { pop : 1 } );
    }
});
