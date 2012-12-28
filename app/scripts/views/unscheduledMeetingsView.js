app.unscheduledMeetingsView = app.genericCollectionView.extend({
    renderExtras : function(){
        this.$el.prepend('<div><h3 class="schedule">Unscheduled</h3></div>');
    }
});

