app.nextActionView = Backbone.View.extend({
    initialize: function(options) {
        if( options ) this.mm_mode = options.mm_mode || false;
    },

    events: {
        'click .open-meetme-accept' : 'openMeetmeAccept',
        'click .open-meetme-decline' : 'openMeetmeDecline',
        'click .send-invites' : 'sendMeetmeInvites',
        'click .dismiss-matchmaking-notice' : 'dismissMatchmakingNotice',
        'click .decline-request' : 'declineMeetmeRequest',
        'click .cancel-action' : 'cancelAction',
        'click .yes-attending' : 'setRsvpYes',
        'click .not-attending' : 'setRsvpNo',
        'click .answer-scheduling' : 'answerScheduling',
        'click .choose-date' : 'openChooseDate'
    },

    render: function() {

        // Show rsvp
        if( this.model.get('rsvp') === '' && this.model.get('rsvp_required') !== '' && ! this.model.get('rsvp_status') ) {
            this.$el.html( templatizer.rsvpBarView( this.model.toJSON() ) );
        }

        // Scheduling
        else if( app.models.meeting.get('proposals') && app.models.meeting.get('proposals').length > 0 ) {
            this.$el.html( templatizer.schedulingBarView( this.getSchedulingStatus() ) );
        }

        // Matchmaking
        else if( app.models.meeting.get('matchmaking_accepted') === 0) {
            this.$el.html( templatizer.meetmeAcceptView({ user : this.model.toJSON(), meeting : app.models.meeting.toJSON(), mm_mode : this.mm_mode }) );

            // Hide participants & material
            $('#participant-list,#materials_list').hide();
        }

        this.$el.trigger('create');

    },


    cancelAction : function(e) {
        e.preventDefault();
        this.render();
    },

    dismissMatchmakingNotice : function(e) {
        e.preventDefault();

        // Hide participants & material
        $('#participant-list,#materials_list').show();

        app.models.meeting.save({ 'matchmaking_accepted' : 1 }, { success : function(res) {
        }});
    },

    sendMeetmeInvites : function(e) {
        e.preventDefault();
        app.views.meeting.renderSendInvites();
    },

    declineMeetmeRequest : function(e) {
        e.preventDefault();
        $('.ui-btn-text', e.currentTarget).text('Declining...');
        $.ajax({
            url : app.defaults.api_host + '/v1/meetings/' + app.models.meeting.id + '/matchmaking_decline',
            type : 'POST',
            data : {
                decline_message : $('.decline-message').val(),
                user_id : app.auth.user,
                dic : app.auth.token
            },
            success : function(res) {
                AppGyver.switchContext("meetingsPage");
            }
        });
    },

    openMeetmeAccept : function(e) {
        e.preventDefault();
        $('.meetme-action',this.el).hide();
        $('.meetme-accept',this.el).show();
    },

    openMeetmeDecline : function(e) {
        e.preventDefault();
        $('.meetme-action',this.el).hide();
        $('.meetme-decline',this.el).show();
    },

    setRsvpYes : function(e) {
        e.preventDefault();
        $('.rsvp-answer').html('Saving...');
        this.model.save( { rsvp : 'yes' }, { success : function(){
            $('.rsvp-answer').html('Saving... Saved.').delay( 2000 ).slideToggle('slow').delay(2000).remove();
        }});
    },
    setRsvpNo : function(e) {
        e.preventDefault();
        $('.rsvp-answer').html('Saving...');
        this.model.save( { rsvp : 'no' }, { success : function(){
            $('.rsvp-answer').html('Saving... Saved.').delay( 2000 ).slideToggle('slow', function( el ){ $(el).remove(); });
        }});
    },
    answerScheduling : function(e) {
        e.preventDefault();
        AppGyver.switchContext("schedulingPage", { id : app.models.meeting.get('id')});
    },
    openChooseDate : function(e) {
        e.preventDefault();
        AppGyver.switchContext("schedulingPage", { mode : 'choose', id : app.models.meeting.get('id')});
    },
    getSchedulingStatus : function() {
        var status = {
            creator : false,
            user_answered : false,
            all_answered : true
        };

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
