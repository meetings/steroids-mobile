app.meetingInListView = Backbone.View.extend({

    initialize: function(options) {
    },

    render: function() {
        this.$el.html( templatizer.meetingInListView( this.model.toJSON() ) ); // Render template
        this.$el.attr('id', this.model.id ); // Set id
        return this;
    },

    events: {
        'click' : 'openMeeting'
    },

    createFromSuggestion : function(){
        var that = this;
        // TODO: Handle url stuff in the model
        var new_meeting = new app.meetingModel();
        new_meeting.save({ from_suggestion_id : this.model.get('id') },{ success : function(m){
            AppGyver.switchContext("meetingPage", {id: m.id});
        }});
    },

    removeSuggestion : function(){
        var that = this;
        // TODO: Handle url stuff in the model
        this.model.url = app.defaults.api_host + '/v1/suggested_meetings/' + this.model.get('id');
        this.model.save({'disabled':1},{ success : function(){
            that.model.collection.remove( that.model );
        }});
    },

    openMeeting : function(e){
        e.preventDefault();

        var that = this;

        // Handle suggestions from Gcal & phone calendar
        if( this.model.get('source') === 'google' ){
            var $popupEl = $('#suggestion-popup');
            $popupEl.popup('open');
            $popupEl.on('click', '.remove-suggestion', function(e){
                e.preventDefault();
                that.removeSuggestion();
                $popupEl.off('click');
                $popupEl.popup('close');
            });
            $popupEl.on('click', '.create-meeting', function(e){
                e.preventDefault();
                that.createFromSuggestion();
                $popupEl.off('click');
                $popupEl.popup('close');
            });
        }
        else{
            AppGyver.switchContext("meetingPage", {id: this.model.id});
        }
    }
});
