app.upcomingMeetingsView = app.collectionView.extend({
    renderExtras : function(){
        // Check if the first meeting is today or further in the future
        var today = Math.floor ( moment().utc().startOf('day') / 1000 );
        var today_end = Math.floor ( moment().utc().endOf('day') / 1000 );
        if( this.collection.length > 0 && this.collection.at(0).get('begin_epoch') >= today && this.collection.at(0).get('begin_epoch') <= today_end ){
            // Add header
            this.$el.prepend('<div><h3 class="today">Today</h3></div>');

            // Loop models and add class to all todays models
            var s = this.collection.length;
            for (var i = 0; i < s ; i++ ){
                if( this.collection.at(i).get('begin_epoch') >= today && this.collection.at(i).get('begin_epoch') <= today_end ){
                    $('#' + this.collection.at(i).id , this.el).addClass('today');
                }
                else{
                    $('#' + this.collection.at(i).id , this.el).before('<div><h3 class="upcoming">Upcoming</h3></div>');
                    break;
                }
            }
        }
        else if(this.collection.length > 0 ){
            this.$el.prepend('<div><h3 class="upcoming">Upcoming</h3></div>');
        }
        return;
    }
});
