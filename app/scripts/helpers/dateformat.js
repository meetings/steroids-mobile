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

            var dateString = begin.format('h A');            

            if(begin.format('YYYY-MM-DD') == end.format('YYYY-MM-DD') && begin.hours() != end.hours()) {
                dateString += " - " + end.format('h A');
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

            var dateString = begin.format('ddd MMM DD, h A');            

            if(begin.format('YYYY-MM-DD') != end.format('YYYY-MM-DD')) {
                dateString += " - " + end.format('ddd MMM DD, h A');
            }
            else if(begin.hours() != end.hours()) {
                dateString += " - " + end.format('h A');
            }

            return dateString;
        }
    }
})(window);
