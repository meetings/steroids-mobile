app.addParticipantView = Backbone.View.extend({

    initialize: function(options) {
        // Bind error and success handlers
        this.model.bind('error', this.errorHandler, this);
        this.model.bind('success', this.successHandler, this);
        this.model.bind('change', this.render, this);
    },

    render : function() {
        this.$el.html( templatizer.addParticipantView( this.model.toJSON() ) ); // Render template
        this.$el.trigger('create'); // Call JQM

        return this;
    },

    saveParticipant : function() {
        var $name = $('#participant-name');
        var $email = $('#participant-email')

        // empty views stack and send the meeting to server
        var name = $name.val();
        var email = $email.val();

        var validEmail = false;

        // First case is when only one field is visible, field value could either be a name or an email
        if(!$name.is(':visible')) {
            if(email.length > 0) {
                validEmail = this._validEmail(email);

                // If value is not a valid email address, show email field and treat the input as the name
                if(!validEmail) {
                    $('#participant-email').attr('placeholder', 'Email');
                    $('#participant-name').val(email);
                    $('#participant-email').val(name);

                    $('#participant-name-wrapper').fadeIn(function() {
                        $('#participant-email').focus();
                    });
                }
            }
        }
        else {
            // Second case is when both fields are visible
            validEmail = name.length > 0 && this._validEmail(email);

            if(!validEmail) {
                $('#participant-email').focus();
            }
        }

        if(validEmail) {
            $('#headerTitle').text('Saving...');

            this.model.set('email', email);
            this.model.set('name', name);

            AppGyver.hideContent();

            // after saving, move to meeting view to finish the draft
            var me = this;

            me.model.save({}, {
                success : function() {
                    me.openMeetingView();
                },
                error: function() {
                    alert('adding participant failed.');
                }
            });
        }
    },

    _validEmail : function(emailAddress) {
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        return pattern.test(emailAddress);
    },

    openMeetingView : function(){
        if ( app.options.build !== 'web' ) {
            e.preventDefault();
            AppGyver.openPreload("meetingPage", {id: this.model.get('meeting_id')});
        } else {
            window.location = 'meeting.html?id=' + this.model.get('meeting_id');
        }
    },

    events: {
        'click #submitAddParticipant' : 'saveParticipant'
    }
});
_.extend(app.addParticipantView.prototype, app.mixins.connectivity);
