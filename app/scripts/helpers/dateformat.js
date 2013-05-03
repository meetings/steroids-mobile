// Function to handle showing dates
(function(){
    window.DateFormat = {
        init: function() {
        },

        dateString: function(begin_epoch, end_epoch) {
            begin_epoch = parseInt(begin_epoch);
            end_epoch = parseInt(end_epoch);

            if(!begin_epoch || !end_epoch) {
                return "";
            }

            var begin = moment.unix(begin_epoch);
            var end = moment.unix(end_epoch);

            var dateString = begin.format('ddd MMM DD');            

            if(begin.format('YYYY-MM-DD') != end.format('YYYY-MM-DD')) {
                dateString += " - " + end.format('ddd MMM DD');
            }

            return dateString;
        },

        timeString: function(begin_epoch, end_epoch) {
            begin_epoch = parseInt(begin_epoch);
            end_epoch = parseInt(end_epoch);

            if(!begin_epoch || !end_epoch) {
                return "";
            }

            var begin = moment.unix(begin_epoch);
            var end = moment.unix(end_epoch);

            var dateString = begin.minutes() ? begin.format('h:mm A') : begin.format('h A');

            if(begin.format('YYYY-MM-DD') == end.format('YYYY-MM-DD') && begin.hours() != end.hours()) {
                dateString += " - " + ( end.minutes() ? end.format('h:mm A') : end.format('h A') );
            }

            return dateString;
        },

        dateAndTimeString: function(begin_epoch, end_epoch) {
            begin_epoch = parseInt(begin_epoch);
            end_epoch = parseInt(end_epoch);

            if(!begin_epoch || !end_epoch) {
                return "";
            }

            var begin = moment.unix(begin_epoch);
            var end = moment.unix(end_epoch);

            var dateString = begin.minutes() ? begin.format('ddd MMM DD, h:mm A') : begin.format('ddd MMM DD, h A');

            if(begin.format('YYYY-MM-DD') != end.format('YYYY-MM-DD')) {
                dateString += " - " + end.format('ddd MMM DD, h A');
            }
            else if(begin.hours() != end.hours()) {
                dateString += " - " + ( end.minutes() ? end.format('h:mm A') : end.format('h A') );
            }

            return dateString;
        },

        dateTimeInputString: function(epoch) {
            epoch = parseInt(epoch);

            if(!epoch) {
                return "";
            }

            return moment.unix(epoch).format('YYYY-MM-DDTHH:mm');
        }
    }
})(window);
