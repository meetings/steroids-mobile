app.profileView = Backbone.View.extend({

    initialize: function(options) {
        this.context_after_tos_accept = options.context_after_tos_accept;
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

        var me = this;

        this.model.save(data, {
            success : function() {
                me.openMeetingList();
            },
            error: function() {
                alert('adding participant failed.');
            }
        });
    },

    openMeetingList : function() {
        if( app.options.build !== 'web' ){
            $('#left-panel').panel('close');
            steroids.layers.popAll();
        }
        AppGyver.switchContext.apply( AppGyver, JSON.parse( this.context_after_tos_accept || '[]' ) );
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
