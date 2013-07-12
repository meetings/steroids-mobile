app.slotCollection = Backbone.Collection.extend({

    model : app.slotModel,

    initialize : function( data, options ) {
        if( options && options.duration ) this.duration = options.duration;
        if( options && options.matchmaker ) this.matchmaker = options.matchmaker;
        if( options && options.tz_offset ) this.tz_offset = options.tz_offset;
    },

    defaults : {
    },

    // Override parse to split slots
    parse : function( slots ) {
        var splitSlots = [];
        var slotMillis = 60 * 30 * 1000; // 30 minutes
        var durationMillis = this.duration * 60 * 1000;

        // Loop each slot
        var i, l = slots.length;
        for( i = 0; i < l; i++) {

            // Create slots with resolution of 30 min
            var tempstart = slots[i].start;
            while( tempstart + durationMillis <= slots[i].end ) {
                splitSlots.push( this.createSlot( tempstart, tempstart + durationMillis ) );
                tempstart += slotMillis;
            }
        }

        return splitSlots;
    },

    createSlot : function( start, end ) {
        return {
            matchmaker : this.matchmaker,
            start : start,
            end : end,
            start_epoch : Math.floor( start / 1000 ),
            end_epoch : Math.floor( end / 1000 ),
            day_string : app.helpers.dayString(start, this.tz_offset),
            date_string : app.helpers.dateString(start, this.tz_offset),
            time_string : app.helpers.hourSpanString( start, end, this.tz_offset)
        };
    }
});
