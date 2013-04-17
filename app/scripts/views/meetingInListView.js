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
        if( this.model.get('source') ){
            var $popupEl = $('#suggestion-popup');

            // Set calendar name to popup
            var source_arr = this.model.get('source').split(':');
            var cal_name = source_arr[1] ? source_arr[1] : 'Your calendar';
            $('#calendar-name').text('Calendar: '+cal_name);

            // Hide or show  remove all button
            if( cal_name === 'Your calendar' ) $('.remove-all',$popupEl).hide();
            else $('.remove-all',$popupEl).show();

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
            }

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
                app.models.user.get('hidden_sources').push(cal_name);
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
