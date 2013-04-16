app.editMeetingPanelView = Backbone.View.extend({
    initialize : function(options) {
        _(this).bindAll('editMeetingTitle','editMeetingLocation','editMeetingTime');
        //this.listenTo( this.model, 'change', this.render );
    },

    render : function() {
        this.$el.html( templatizer.editMeetingPanel( this.model.toJSON() ) );

        this.$el.trigger('create');
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
        AppGyver.switchContext("singleEditPage", {id: this.model.get('id'), field : 'title'});
    },
    editMeetingLocation : function(e){
        e.preventDefault();
        this.$el.panel('close');
        AppGyver.switchContext("singleEditPage", {id: this.model.get('id'), field : 'location'});
    },
    editMeetingTime : function(e) {
        e.preventDefault();
        this.$el.panel('close');
        AppGyver.switchContext("singleEditPage", {id: this.model.get('id'), field : 'time'});
    },
    removeMeeting : function(e){
        e.preventDefault();
        this.$el.panel('close');
        AppGyver.hideContent();
        this.model.destroy({ success : function(){
            AppGyver.switchContext("meetingsPage", null, { pop : true } );
        }});
    }
});
