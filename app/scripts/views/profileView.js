app.profileView = Backbone.View.extend({

    initialize: function(options) {
        this.context_after_tos_accept = options.context_after_tos_accept;
        this.model.on('change', this.render, this);
    },
    render: function() {
        this.$el.html( templatizer.profileView( this.model.toJSON() ) ); // Render template

        if(this.model.get('tos_accepted') != 1) {
            $('.back-button').hide();
            $('#headerTitle').text('Welcome');
        }

        this.$el.trigger('create'); // Call JQM

        return this;
    },

    saveProfileData : function(e) {
        e.preventDefault();

        var data = {
            first_name : $('#user-firstname').val(),
            last_name : $('#user-lastname').val(),
            //primary_email : $('#user-email').val(),
            phone : $('#user-phone').val(),
            skype : $('#user-skype').val(),
            organization : $('#user-organization').val(),
            title : $('#user-title').val(),
            tos_accepted : '1'
        };

        var that = this;

        this.model.save(data, {
            success : function() {
                AppGyver.switchContext.apply( AppGyver, JSON.parse( that.context_after_tos_accept || '["meetingsPage"]' ) );
            },
            error: function() {
                alert('Saving profile failed. Please try again!');
            }
        });
    },

    openTos : function(e){
        e.preventDefault();
        var win=window.open('http://meetin.gs/meetings/terms_of_service', '_blank');
        win.focus();
    },

    events : {
        'click .save-profile-data' : 'saveProfileData',
        'click .open-tos-page' : 'openTos'
    }
});
