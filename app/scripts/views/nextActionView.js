app.nextActionView = Backbone.View.extend({
    initialize: function(options) {
    },
    render: function() {
        // Depending on user data, render different things
        this.$el.html( templatizer.rsvpBarView( this.model.toJSON() ) );
    },
    events: {
        'click .attending' : 'setRsvpYes',
        'click .not-attending' : 'setRsvpNo'
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
    }
});
