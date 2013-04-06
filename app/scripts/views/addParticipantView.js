app.addParticipantView = Backbone.View.extend({
    meetingModel : null,

    initialize: function(options) {
        if(options.meetingModel) {
            this.meetingModel = options.meetingModel;
        }

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

        var name = $name.val();
        var email = $email.val();

        var validEmail = false;

        // First case is when only one field is visible, field value could either be a name or an email
        if(!$name.is(':visible')) {
            if(email.length > 0) {
                validEmail = this._validEmail(email);

                // If value is not a valid email address, show email field and treat the input as the name
                if(!validEmail) {
                    $email.attr('placeholder', 'Email');
                    $email.val(name);
                    $name.val(email);

                    $('#participant-name-wrapper').fadeIn(function() {
                        $email.focus();
                    });
                }
            }
        }
        else {
            // Second case is when both fields are visible
            validEmail = name.length > 0 && this._validEmail(email);

            if(!validEmail) {
                $email.focus();
            }
        }

        // If email is ok, check if we need to show invite screen for meetings which are not drafts
        if(validEmail) {
            this.model.set('email', email);
            this.model.set('name', name);

            this.saveParticipantOrBuildInvite();
        }
    },

    saveParticipantOrBuildInvite : function() {
        if(this.meetingModel && !this.meetingModel.is_draft) {
            this.renderInvite();
        }
        else {
            this.finalizeAddParticipant();
        }
    },

    renderInvite : function() {
        // Render template & trigger jQuery create
        this.$el.html( templatizer.sendInvitesView( this.meetingModel.toJSON() ) ); // Render template
        this.$el.trigger("create");

        $('#headerTitle').text('Invitation message');

        // textarea doesn't grow automatically with pre-filled data so help it out a bit
        $('#invite-message').keyup();

        return this;
    },

    saveInvite : function() {
        this.model.set({
            greeting_subject : $('#invite-subject').val(),
            greeting_message : $('#invite-message').val(),
            require_rsvp : $('#invite-require-rsvp').prop('checked') ? '1' : '0'
        });

        this.finalizeAddParticipant();
    },

    finalizeAddParticipant : function() {
        $('#headerTitle').text('Saving...');

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
        'click #submitAddParticipant' : 'saveParticipant',
        'click .save-meeting-invite' : 'saveInvite'
    }
});
_.extend(app.addParticipantView.prototype, app.mixins.connectivity);
