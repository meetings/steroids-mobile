app.editMeetingPanelView = Backbone.View.extend({
    initialize : function(options) {
        this.menu_active = options.active;
        this.meetingId = options.meetingId;
        _(this).bindAll('editMeetingTitle','editMeetingLocation','editMeetingTime');
    },

    render : function() {
        this.$el.html( templatizer.editMeetingPanel() );

        // Hack to get the panel working on mobile without using tirgger create
        this.$el.page();
        this.$el.removeClass('ui-page');
        $('.ui-btn-active',this.el).removeClass('ui-btn-active');
},

    events : {
        'click #nav-edit-title' : 'editMeetingTitle',
        'click #nav-edit-location' : 'editMeetingLocation',
        'click #nav-edit-time' : 'editMeetingTime',
        'click #nav-remove' : 'removeMeeting'
    },

    editMeetingTitle : function(e){
        e.preventDefault();
        if ( app.options.build !== 'web' ) {
            AppGyver.openPreload("editPage", {id: this.meetingId, field : 'title'});
        } else {
            window.location = 'edit.html?id=' + this.meetingId + '&field=title';
        }
    },
    editMeetingLocation : function(e){
        e.preventDefault();
        if ( app.options.build !== 'web' ) {
            AppGyver.openPreload("editPage", {id: this.meetingId, field : 'location'});
        } else {
            window.location = 'edit.html?id=' + this.meetingId + '&field=location';
        }
    },
    editMeetingTime : function(e) {
        e.preventDefault();
        if ( app.options.build !== 'web' ) {
            AppGyver.openPreload("editPage", {id: this.meetingId, field : 'time'});
        } else {
            window.location = 'edit.html?id=' + this.meetingId + '&field=time';
        }
    },
    removeMeeting : function(e){
        e.preventDefault();
        alert('removeMeeting');
    }
});
