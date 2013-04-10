app.editMeetingPanelView = Backbone.View.extend({
    initialize : function(options) {
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
        console.log('hir')
        this.$el.panel('close');
        AppGyver.switchContext("singleEditPage", {id: this.model.get('id'), field : 'title'});
    },
    editMeetingLocation : function(e){
        e.preventDefault();
        console.log('edit loc')
        this.$el.panel('close');
        AppGyver.switchContext("singleEditPage", {id: this.model.get('id'), field : 'location'});
    },
    editMeetingTime : function(e) {
        e.preventDefault();
        console.log('dir')
        this.$el.panel('close');
        AppGyver.switchContext("singleEditPage", {id: this.model.get('id'), field : 'time'});
    },
    removeMeeting : function(e){
        e.preventDefault();
        alert('removeMeeting');
    }
});
