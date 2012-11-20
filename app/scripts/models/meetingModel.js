app.meetingModel = Backbone.Model.extend({
    idAttribute: "id",
    defaults: {
        "id" : 0,
        "title": "Example meeting",
        "date_string" : "Monday, August 6",
        "time_string": "4 - 5pm",
        "location": "Fredrikinkatu 61 A, 8th floor, Helsinki, Finland",
        "participants": [{image:'/images/dot_green.png'},{image:'/images/dot_red.png'}],
        "ongoing" : false,
        "timeleft" : 50,
        "skype_address" : false
    },
    initialize : function(){
        this.url = app.defaults.api_host + '/v1/meetings/'+ this.get('id');
    },
    getMeetingUserByID : function( id ){
        var p = this.get('participants');
        var l = p.length;
        for( var i = 0; i < l; i++ ){
            if( p[i].user_id === id ) return p[i];
        }
        return false;
    }
});
