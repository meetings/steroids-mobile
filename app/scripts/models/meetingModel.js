app.meetingModel = Backbone.Model.extend({
    idAttribute: "id",
    defaults: {
        "id" : 0,
        "title": "",
        "date_string" : "",
        "time_string": "",
        "location": "",
        "participants": [],
        "skype_address" : false
    },
    initialize : function(data, options){
        if( options && options.override_endpoint ){
            this.url = app.defaults.api_host + '/v1/meetings';
        }
        else {
            this.url = app.defaults.api_host + '/v1/meetings/'+ this.get('id');
        }
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
