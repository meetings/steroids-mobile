app.unscheduledMeetingsView = app.collectionView.extend({
    renderExtras : function(){
        this.$el.prepend('<div><h3 class="schedule">Unscheduled</h3></div>');
    }
});

