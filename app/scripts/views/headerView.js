app.headerView = Backbone.View.extend({

    initialize: function( options ) {
        if ( options.model ) {
            options.model.bind('change', this.handleChange, this);
        }
    },

    render: function() {
    },

    events: {
        "click .back-button" : "navigateBack",
        "click #create-meeting" : "createMeeting",
        "click #edit-material-cancel" : "editMaterialCancel",
        "click #edit-material-save" : "editMaterialSave"
    },

    createMeeting : function(e){
        e.preventDefault();
        if ( app.options.build !== 'web' ) {
            AppGyver.openPreload('editPage', { id: ''});
        }
        else {
            window.location = 'edit.html';
        }
    },

    navigateBack : function(e){
        e.preventDefault();

        if ( app.options.build !== 'web' ) {
            setTimeout(function(){ AppGyver.hideContent(); }, 100);
            steroids.layers.pop();
        }
        else if ( $('.back-button').attr('href') !== '#' ){
            window.location = $('.back-button').attr('href');
        }
        else {
            history.go(-1);
        }
    },

    handleChange : function(e) {
        if ( this.model.model_type && this.model.model_type == 'material_edit' ) {
            // todo: activate disabled Save button
//            $("#edit-material-save").
        }
    },

    editMaterialCancel : function(e){
        e.preventDefault();

        // TODO: Add confirmation if content has changed
        if ( app.options.build !== 'web' ) {
            setTimeout(function(){ AppGyver.hideContent(); }, 100);
            steroids.layers.pop();
        }
        else {
            history.go(-1);
        }
    },
    editMaterialSave : function(e){
        e.preventDefault();
        var save_url = app.defaults.api_host + '/v1/meeting_materials/' + this.model.get('material_id');
        var params = {
            edit_id : this.model.id,
            content : this.model.get('content') || '',
            old_content : this.model.old_content || '',
            user_id : app.auth.user,
            dic : app.auth.token
        };

        $.ajax( {
            type : 'PUT',
            url : save_url,
            data : params,
            success : function( response ) {
                if ( app.options.build !== 'web' ) {
                    setTimeout(function(){ AppGyver.hideContent(); }, 100);
                    steroids.layers.pop();
                }
                else {
                    history.go(-1);
                }
            }
        } );
    }

});
