app.addParticipantView = Backbone.View.extend({

    initialize: function(options) {
        // Bind error and success handlers
        this.model.bind('error', this.errorHandler, this);
        this.model.bind('success', this.successHandler, this);
        this.model.bind('change', this.render, this);
    },

    render : function() {
        $('#headerTitle').text('Add participant');

        this.$el.html( templatizer.addParticipantView( this.model.toJSON() ) ); // Render template
        this.$el.trigger('create'); // Call JQM

        return this;
    },

    saveParticipant : function() {
        $('#headerTitle').text('Saving...');

        // empty views stack and send the meeting to server
        var email = $('#meeting-participant').val();
        this.model.set('email', email);
        this.model.set('name', email);

        AppGyver.hideContent();

        // after saving, move to meeting view to finish the draft
        var me = this;
        
        me.model.save({}, {
            success : function() {
                me.openMeetingView();
            },
            error: function() {
                alert('adding participant failed.');
            }
        });
    },

    openMeetingView : function(){
        if ( app.options.build !== 'web' ) {
            e.preventDefault();
            AppGyver.openPreload("meetingPage", {id: this.model.get('meeting_id')});
        } else {
            window.location = 'meeting.html?id=' + this.model.get('meeting_id');
        }
    },

    events: {
        'click #submitAddParticipant' : 'saveParticipant'
    }
});
_.extend(app.addParticipantView.prototype, app.mixins.connectivity);