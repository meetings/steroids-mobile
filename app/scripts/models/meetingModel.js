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
        this.url = 'https://api-dev.meetin.gs/v1/meetings/'+ this.get('id');
    }
});
