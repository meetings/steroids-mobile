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
        "click .open-add-meeting-view" : "createMeeting",
        "click .meeting-back-button" : "meetingBack"
    },

    createMeeting : function(e){
        e.preventDefault();
        AppGyver.switchContext('editPage', { id: '' });
    },

    meetingBack : function(e){
        e.preventDefault();
        AppGyver.switchContext('meetingsPage');
    },

    navigateBack : function(e){
        e.preventDefault();
        AppGyver.popContext();
    },

    handleChange : function(e) {
        if ( this.model.model_type && this.model.model_type == 'material_edit' ) {
            // todo: activate disabled Save button
//            $("#edit-material-save").
        }
    }

});
