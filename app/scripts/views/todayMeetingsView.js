app.todayMeetingsView = app.collectionView.extend({
    renderExtras : function(){
        this.$el.prepend('<div><h3 class="today">Today</h3></div>');

        // Loop models and add class to all todays models
        var s = this.collection.length;
        for (var i = 0; i < s ; i++ ){
            $('#' + this.collection.at(i).id , this.el).addClass('today');
        }
        return;
    }
});
