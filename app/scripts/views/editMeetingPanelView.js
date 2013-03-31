app.editMeetingPanelView = Backbone.View.extend({    
    initialize : function(options) {
        this.menu_active = options.active;
        this.meetingId = options.meetingId;
    },

    render : function() {
        this.$el.html( templatizer.editMeetingPanel() );
    },

    events : {
        'click #nav-edit' : 'editMeeting',
        'click #nav-rename' : 'renameMeeting',
        'click #nav-remove' : 'removeMeeting'
    },

    editMeeting : function(e){
        if ( app.options.build !== 'web' ) {
            e.preventDefault();
            AppGyver.openPreload("editPage", {id: this.model.get('id')});
        } else {
            window.location = 'edit.html?id=' + this.meetingId;
        }
    },
    renameMeeting : function(e){
        alert('renameMeeting');
    },
    removeMeeting : function(e){
        alert('removeMeeting');
    }
});
