app.matchmakerModel = Backbone.Model.extend({
    idAttribute: "id",
    defaults: {
        "user_id": "",
        "description" : "Hello! I have made my calendar available to you. Please click on the button below to start scheduling the meeting.",
        "location" : "",
        "duration" : 30,
        "buffer" : 30,
        "slots" : _.map( [0,1,2,3,4], function(wd) { return { weekday : wd, begin_second : 8*60*60, end_second : 18*60*60 }; } ),
        "background_url" : "",
        "background_theme" : 0
    },
    initialize : function(){
    }
});

