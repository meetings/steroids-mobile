app.newProfileView = Backbone.View.extend({

    render: function() {
        this.$el.html( templatizer.newProfileView( this.model.toJSON() ) ); // Render template
        this.$el.trigger('create'); // Call JQM

        return this;
    },

    saveProfileData : function(e) {
        e.preventDefault();

        var data = {
            first_name : $('#user-firstname').val(),
            last_name : $('#user-lastname').val(),
            primary_email : $('#user-email').val(),
            phone : $('#user-phone').val(),
            organization : $('#user-organization').val(),
            title : $('#user-title').val()
        };

        this.model.save(data, function() {
            alert('saved!');            
        });

        this.openMeetingList();
    },

    openMeetingList : function() {
        //if ( app.options.build !== 'web' ) {
        //    AppGyver.openPreload("inde", {id: this.model.get('id')});
        //} else {
        window.location = 'index.html';
        //}        
    },

    events : {
        'click .save-profile-data' : 'saveProfileData'
    }
});
