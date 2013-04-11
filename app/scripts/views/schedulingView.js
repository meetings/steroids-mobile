app.schedulingView = Backbone.View.extend({
    mode : null,
    chosen_option : null,

    initialize: function(options) {
        if( options && options.mode ) this.mode = options.mode;
        //this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
        if( this.mode === 'answer' ){
            this.renderAnswer();
        }
        else{
            this.renderChoose();
        }
        return this;
    },

    events: {
        'click .option-no' : 'selectOption',
        'click .option-yes' : 'deSelectOption',
        'click .option-choose' : 'confirmChoose',
        'click #confirm-option' : 'saveAndChoose',
        'click #save-options' : 'saveAndClose',
        'click .reset' : 'render'
    },

    renderAnswer : function(){
        // Render template & trigger jQuery create
        this.$el.html('<h3>' + this.model.escape('title') + '</h3><p class="mtngs-location"><i class="icon-location"></i>' + this.model.escape('location') + '</p><p>Tap the times suitable for you:</p>');
        var prop_container = $('<ul id="proposals" data-theme="a" data-inset="true" data-role="listview"></ul>');
        this.$el.append( prop_container );

        // Get proposals & users
        var props = this.model.get('proposals');
        var participants = this.model.get('participants');
        var data = this.model.getMeetingUserByID( app.auth.user );
        var user = new app.participantModel( data, { meeting_id : this.model.get('id') } );

        for (var i = 0; i < props.length; i++) {
            prop_container.append( templatizer.optionInListView( { user : user.toJSON() , proposal : props[i], participants : participants, mode : 'answer' } ) );
        }

        this.$el.append('<a href="#" id="save-options" data-role="button" data-theme="b">Save options</a>');

        //this.$el.html( templatizer.schedulingView( this.model.toJSON() ) ); // Render template
        this.$el.trigger("create");
        prop_container.listview();

    },

    renderChoose : function(){
        this.$el.html('<h3>' + this.model.escape('title') + '</h3><p class="mtngs-location">' + this.model.escape('location') + '</p><p>Tap the time you want to choose:</p>');
        var prop_container = $('<ul id="proposals" data-theme="a" data-inset="true" data-role="listview"></ul>');
        this.$el.append( prop_container );

        // Get proposals & users
        var props = this.model.get('proposals');
        var participants = this.model.get('participants');
        var data = this.model.getMeetingUserByID( app.auth.user );
        var user = new app.participantModel( data, { meeting_id : this.model.get('id') } );


        for (var i = 0; i < props.length; i++) {
            prop_container.append( templatizer.optionInListView( { user : user.toJSON() , proposal : props[i], participants : participants, mode : 'choose' } ) );
        }

        this.$el.trigger("create");
        prop_container.listview();

    },

    selectOption : function(e){
        e.preventDefault();
        var $link = $(e.currentTarget);
        var answers = app.models.meeting_user.get('proposal_answers');
        answers[ $link.attr('data-option-id') ] = 'yes';
        if( this.mode === 'answer' ){
            app.models.meeting_user.set('proposal_answers', answers);
            $link.addClass('option-yes');
            $link.removeClass('option-no');
        }
        else{
            $('.option-yes').removeClass('option-yes').addClass('option-no');
            $link.addClass('option-yes').removeClass('option-no');
        }
    },


    deSelectOption : function(e){
        e.preventDefault();
        var $link = $(e.currentTarget);
        var answers = app.models.meeting_user.get('proposal_answers');
        answers[ $link.attr('data-option-id') ] = 'no';
        if( this.mode === 'answer' ){
            app.models.meeting_user.set('proposal_answers', answers);
            $link.removeClass('option-yes');
            $link.addClass('option-no');
        }
        else{
            $('.option-yes').removeClass('option-yes').addClass('option-no');
        }
    },

    confirmChoose : function(e){
        e.preventDefault();
        var $link = $(e.currentTarget);
        var option_id = $link.attr('data-option-id');
        this.chosen_option = option_id;
        var time = $link.attr('data-time');
        this.$el.html( templatizer.confirmSchedulingChoose( { time : time } ) );
        this.$el.trigger("create");
    },

    saveAndChoose : function(e){
        e.preventDefault();

        // Save stuff to server
        $('#confirm-option span span').html('Saving...');
        this.model.save({ chosen_proposal_id : this.chosen_option }, {success : function(res){
          $('#confirm-option span span').html('Done.');
          if ( app.options.build !== 'web' ) {

            //setTimeout(function(){ AppGyver.hideContent() }, 100)

            steroids.layers.pop();

          }

          AppGyver.switchContext('meetingPage', { id : app.models.meeting.id } );
        }});
    },

    saveAndClose : function(e){
        e.preventDefault();

        // Check undefined answers and set no
        var answers = app.models.meeting_user.get('proposal_answers');
        for (var key in answers ) {
            if( ! answers[key] ){
                answers[key] = 'no';
            }
        }

        // Set the answers
        app.models.meeting_user.set('proposal_answers', answers );

        $('#save-options span span').html('Saving...');
        app.models.meeting_user.save({},{ success : function(res){
            $('#save-options span span').html('Done.');
            // TODO: navigation inside app?
            if ( app.options.build !== 'web' ) {

              setTimeout(function(){ AppGyver.hideContent(); }, 100);

              steroids.layers.pop();

            }
            AppGyver.switchContext('meetingPage', { id : app.models.meeting.id } );
        } });
    }
});
