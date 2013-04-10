app.nextActionView = Backbone.View.extend({
    initialize: function(options) {
    },
    render: function() {

        // Show rsvp
        if( this.model.get('rsvp') === '' && this.model.get('rsvp_required') !== '' ){
            this.$el.html( templatizer.rsvpBarView( this.model.toJSON() ) );
        }

        // Scheduling
        else if( app.models.meeting.get('proposals') && app.models.meeting.get('proposals').length > 0 ){
            this.$el.html( templatizer.schedulingBarView( this.getSchedulingStatus() ) );
            this.$el.trigger('create');
        }

    },
    events: {
        'click .attending' : 'setRsvpYes',
        'click .not-attending' : 'setRsvpNo',
        'click .answer-scheduling' : 'answerScheduling',
        'click .choose-date' : 'openChooseDate'
    },
    setRsvpYes : function(e){
        e.preventDefault();
        $('.rsvp-asnwer').html('Saving...');
        app.models.meeting_user.save( { rsvp : 'yes' }, { success : function(){
            $('.rsvp-answer').html('Saving... Saved.').delay( 2000 ).slideToggle('slow').delay(2000).remove();
        }});
    },
    setRsvpNo : function(e){
        e.preventDefault();
        $('.rsvp-answer').html('Saving...');
        app.models.meeting_user.save( { rsvp : 'no' }, { success : function(){
            $('.rsvp-answer').html('Saving... Saved.').delay( 2000 ).slideToggle('slow', function( el ){ $(el).remove(); });
        }});
    },
    answerScheduling : function(e){
        e.preventDefault();
        AppGyver.switchContext("schedulingPage", { id : app.models.meeting.get('id')});
    },
    openChooseDate : function(e){
        e.preventDefault();
        AppGyver.switchContext("schedulingPage", { mode : 'choose', id : app.models.meeting.get('id')});
    },
    getSchedulingStatus : function(){
        var status = {
            creator : false,
            user_answered : false,
            all_answered : true
        }

        if( this.model.get('is_creator') == 1 ) status.creator = true;
        if( this.model.get('unanswered_proposal_count') < _.size(this.model.get('proposal_answers')) ) status.user_answered = true;

        // Check if everyone has answered
        var participants = app.models.meeting.get('participants');
        for( var i = 0; i < participants.length; i++ ){
            if( participants[i].unanswered_proposal_count != 0 ) status.all_answered = false;
        }


        return status;
    }
});
