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
        app.helpers.switchContext("singleEditPage", {id: this.model.get('id'), field : 'title'});
    },
    editMeetingLocation : function(e){
        e.preventDefault();
        this.$el.panel('close');
        app.helpers.switchContext("singleEditPage", {id: this.model.get('id'), field : 'location'});
    },
    editMeetingTime : function(e) {
        e.preventDefault();
        this.$el.panel('close');
        app.helpers.switchContext("singleEditPage", {id: this.model.get('id'), field : 'time'});
    },
    removeMeeting : function(e){
        e.preventDefault();

        var that = this;
        var meeting_id = this.model.get('meeting_id');

        $popupEl = $('#confirm-delete');
        $popupEl.popup('open');
        $("body").on("touchmove", false);
        this.$el.panel('close');

        // Close popup helper
        var popupClose = function(){
            $popupEl.off('click');
            $popupEl.popup('close');
            $("body").unbind("touchmove");
        };

        // Set handlers
        $popupEl.on('click', '.confirm', function(e){
            e.preventDefault();
            AppGyver.hideContent();
            AppGyver.requireListingRefresh();
            that.model.destroy({ success : function(){
                app.helpers.switchContext("meetingsPage", null, { pop : true } );
            }});
            popupClose();
        });
        $popupEl.on('click', '.cancel', function(e){
            e.preventDefault();
            popupClose();
        });
    }
});
