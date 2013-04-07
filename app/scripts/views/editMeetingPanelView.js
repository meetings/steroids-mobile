app.editMeetingPanelView = Backbone.View.extend({    
    initialize : function(options) {
        this.menu_active = options.active;
        this.meetingId = options.meetingId;
    },

    render : function() {
        this.$el.html( templatizer.editMeetingPanel() );
    },

    events : {
        'click #nav-edit-title' : 'editMeetingTitle',
        'click #nav-edit-location' : 'editMeetingLocation',
        'click #nav-edit-time' : 'editMeetingTime',
        'click #nav-remove' : 'removeMeeting'
    },

    editMeetingTitle : function(e){
        if ( app.options.build !== 'web' ) {
            e.preventDefault();
            AppGyver.openPreload("editPage", {id: this.model.get('id'), field : 'title'});
        } else {
            window.location = 'edit.html?id=' + this.meetingId + '&field=title';
        }
    },
    editMeetingLocation : function(e){
        if ( app.options.build !== 'web' ) {
            e.preventDefault();
            AppGyver.openPreload("editPage", {id: this.model.get('id'), field : 'location'});
        } else {
            window.location = 'edit.html?id=' + this.meetingId + '&field=location';
        }
    },
    editMeetingTime : function() {
        if ( app.options.build !== 'web' ) {
            e.preventDefault();
            AppGyver.openPreload("editPage", {id: this.model.get('id'), field : 'time'});
        } else {
            window.location = 'edit.html?id=' + this.meetingId + '&field=time';
        }
    },
    removeMeeting : function(e){
        alert('removeMeeting');
    }
});
