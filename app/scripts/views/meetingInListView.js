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
            AppGyver.hideContent();
            Backbone.history.loadUrl();
        }});
    },

    openMeeting : function(e){
        e.preventDefault();

        var that = this;

        // Handle suggestions from Gcal & phone calendar
        if( this.model.get('source') ){
            var $popupEl = $('#suggestion-popup');

            // Set calendar name to popup
            var source_arr = this.model.get('source').split(':');
            if( source_arr[1] ){
                $('#calendar-name').text('From calendar: '+source_arr[1]);
            }
            else{
                $('#calendar-name').text('From Google calendar');
            }

            // Open popup
            $popupEl.popup('open');

            // Disable scroll
            $("body").on("touchmove", false);

            // Unset the button
            $clickEl = $(e.currentTarget);

            // Close popup helper
            var popupClose = function(){
                $popupEl.off('click');
                $popupEl.popup('close');
                $clickEl.removeClass('ui-btn-active');
                $("body").unbind("touchmove");
            };

            // Set handlers
            $popupEl.on('click', '.remove-suggestion', function(e){
                e.preventDefault();
                that.removeSuggestion();
                popupClose();
            });
            $popupEl.on('click', '.create-meeting', function(e){
                e.preventDefault();
                that.createFromSuggestion();
                popupClose();
            });
            $popupEl.on('click', '.cancel', function(e){
                e.preventDefault();
                popupClose();
            });
            $popupEl.on('click', '.remove-all', function(e){
                e.preventDefault();
                popupClose();
                if ( ! app.models.user.get('hidden_sources') ) {
                     app.models.user.set('hidden_sources', []);
                }
                app.models.user.get('hidden_sources').push(that.model.get('source'));
                app.models.user.save({}, {success : function(){
                    AppGyver.hideContent();
                    Backbone.history.loadUrl();
                }});
            });

        }
        else{
            AppGyver.switchContext("meetingPage", {id: this.model.id});
        }
    }
});
