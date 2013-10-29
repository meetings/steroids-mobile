app.addParticipantView = Backbone.View.extend({
    meetingModel : null,

    initialize: function(options) {
        this.model.bind('change', this.render, this);
        this.meetingModel = options.meetingModel;
        this.return_context = options.returnContext;
        _(this).bindAll('openMeetingView');
    },

    render : function() {
        var that = this;

        this.$el.html( templatizer.addParticipantView( this.model.toJSON() ) ); // Render template
        this.$el.trigger('create'); // Call JQM

        var $name = $('#participant-name');
        var $email = $('#participant-email');

        $email.on('keypress', function() {
            setTimeout( function() {
                if ( $email.val() ) {
                    $('#submitAddParticipant .ui-btn-text').text( 'Add ' + $email.val() );
                }
                else {
                    $('#submitAddParticipant .ui-btn-text').text( 'Add participant' );
                }

                if ( navigator.contacts && !$name.is(':visible') ) {
                    var fields = ["displayName","emails"];
                    var success = function( contacts ) {
                        $('.suggestions').html('');
                        var i = 1;
                        _.each(contacts, function(c) {
                            if ( i++ > 9 ) return;

                            var n = c.displayName;
                            var e = c.emails ? c.emails[0] ? c.emails[0].value || '' : '' : '';

                            var $link = $('<a href="#"></a>');
                            $link.text( "Add "+ n );

                            $link.on('click', function() {
                                var emailstring = e || n;
                                if ( n && e ) {
                                    var sn = n.replace(/\"/gm, '');
                                    emailstring = '"' + sn + '" <' + e + '>';
                                }
                                $email.val( emailstring );
                                $('#submitAddParticipant .ui-btn-text').text( 'Add participant' );
                                that.saveParticipant();
                            } );

                            var $container = $('<li></li>');
                            $container.append( $link );

                            $('.suggestions').append( $container );
                        } );
                        $('.suggestions').listview().listview('refresh');
                    };
                    var error = function() { $('.suggestions').html(''); };
                    var filter = { filter : $email.val(), multiple : true }

                    navigator.contacts.find( fields, success, error, filter );

                    //success( [ { displayName : 'Antti Vähäkotamäki', emails : [ 'antti@dicole.com' ] }, { displayName : 'Jussi Kaijalainen', emails : [ 'jussi@dicole.com', 'väärä@osoite.com' ] }, { displayName: 'Ilman mailia' } ] );

                }
            }, 100 );

        } );
        return this;
    },

    saveParticipant : function() {
        $('.suggestions').html('');
        var $name = $('#participant-name');
        var $email = $('#participant-email');

        var name = $name.val();
        var email = $email.val();

        var validEmail = false;

        // First case is when only one field is visible, field value could either be a name or an email
        if(!$name.is(':visible')) {
            if(email.length > 0) {
                validEmail = app.helpers.validEmail(email);

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
            validEmail = name.length > 0 && app.helpers.validEmail(email);

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
        if(this.meetingModel && this.meetingModel.get('is_draft') != 1) {
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

        $('#headerTitle').text('Invitation');

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
        AppGyver.requireListingRefresh();

        // after saving, move to meeting view to finish the draft
        var me = this;

        me.model.save({}, {
            success : function() {
                me.openMeetingView();

                // Set header text back to normal
                setTimeout(function(){
                    $('#headerTitle').text('Add participant');
                },1000);
            },
            error: function() {
                alert('Adding participant failed.');
                $('#headerTitle').text('Add participant');
            }
        });
    },

    openMeetingView : function(){
        AppGyver.switchContext(this.return_context, {id: this.meetingModel.get('id')}, { pop : true });
    },

    events: {
        'click #submitAddParticipant' : 'saveParticipant',
        'click .save-meeting-invite' : 'saveInvite'
    }
});
