app.highlightedMeetingsView = app.genericCollectionView.extend({
    renderExtras : function(){
        this.$el.prepend('<div><h3 id="tasks" class="tasks">Tasks</h3></div>');
    }
});

