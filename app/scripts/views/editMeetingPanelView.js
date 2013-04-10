app.editMeetingPanelView = Backbone.View.extend({
    initialize : function(options) {
        this.menu_active = options.active;
        this.meetingId = options.meetingId;
        _(this).bindAll('editMeetingTitle','editMeetingLocation','editMeetingTime');
    },

    render : function() {
        this.$el.html( templatizer.editMeetingPanel() );

        if ( app.options.build !== 'web' ) {
            this.$el.trigger('create');
        }
    },

    events : {
        'click #nav-edit-title' : 'editMeetingTitle',
        'click #nav-edit-location' : 'editMeetingLocation',
        'click #nav-edit-time' : 'editMeetingTime',
        'click #nav-remove' : 'removeMeeting'
    },

    editMeetingTitle : function(e){
        e.preventDefault();
        this.$el.panel('close');
        AppGyver.switchContext("singleEditPage", {id: this.meetingId, field : 'title'});
    },
    editMeetingLocation : function(e){
        e.preventDefault();
        this.$el.panel('close');
        AppGyver.switchContext("singleEditPage", {id: this.meetingId, field : 'location'});
    },
    editMeetingTime : function(e) {
        e.preventDefault();
        this.$el.panel('close');
        AppGyver.switchContext("singleEditPage", {id: this.meetingId, field : 'time'});
    },
    removeMeeting : function(e){
        e.preventDefault();
        alert('removeMeeting');
    }
});
