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
    openMeeting : function(e){
        e.preventDefault();
        alert('clicked that meeting man');
        AGPerformTransition("slideFromLeft", 0.4, function(){
            alert('woot');
        },
        function(){
            alert('nowork');
        });
        window.location.href = '/meeting.html?id=' + this.model.id;
    }
});
