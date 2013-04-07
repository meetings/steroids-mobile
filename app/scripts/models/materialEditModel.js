app.materialEditModel = Backbone.Model.extend({
    idAttribute : 'id',
    model_type : 'material_edit',
    initialize : function( options ) {
        this.on('change', function(e) {
            if ( this.id ) {
                this.url = app.defaults.api_host + '/v1/meeting_material_edits/' + this.id;
                this.check_save();
            }
        }, this );
    },

    storing_in_progress : false,
    last_change : false,
    last_save : false,
    save_timeout : false,
    last_saved_content : false,
    last_saved_content_set : false,

    check_save : function( from_timeout ) {
        if ( from_timeout ) {
            this.save_timeout = false;
        }

        if ( this.storing_in_progress ) {
            return;
        }
        if ( ! this.last_saved_content_set ) {
            // This is the first run ever so we presume it is from the intitial set
            this.last_saved_content_set = 1;
            this.last_saved_content = this.get('content');
            this.last_save = new Date();

            return;
        }

        if ( this.last_saved_content == this.get('content') ) {
            return;
        }

        if ( ! from_timeout ) {
            this.last_change = new Date();
        }

        if ( ( this.last_change && this.last_change.getTime() + 2000 < new Date().getTime() ) || ( this.last_save && this.last_save.getTime() + 30000 < new Date().getTime() ) ) {
            if ( this.save_timeout ) {
                clearTimeout( this.save_timeout );
                this.save_timeout = false;
            }
            this.last_saved_content = this.get('content');
            this.last_save = new Date();
            this.save();
        }
        else if ( ! this.save_timeout ) {
            var that = this;
            this.save_timeout = setTimeout( function() { that.check_save( 1 ) }, 500 );
        }
    }
    
});
