app.highlightedMeetingsView = app.genericCollectionView.extend({
    renderExtras : function(){
        this.$el.prepend('<div><h3 class="tasks">Tasks</h3></div>');
    }
});

