app.meetmeCalendarView = Backbone.View.extend({

    initialize : function(options) {
        _(this).bindAll('render','renderSlots','chooseSlot');

        this.user_model = options.user_model;
        this.matchmaker_collection = options.matchmakers_collection;
        this.lock = new app.matchmakerLockModel();
        this.new_user = new app.userModel();
        this.new_user.url = app.defaults.api_host + '/v1/users';
        this.time_zone_checked = false;
        this.chosen_timezone = null;
        this.selected_matchmaker_path = options.selected_matchmaker_path || 'default';
        this.subviews = {};
        this.now = new Date();
        this.quickmeet_key = options.quickmeet_key || false;

        app.options.ua_time_zone = jstz.determine_timezone();
    },

    events : {
        'click .save-profile-data' : 'saveProfile',
        'click .cancel-slot' : 'cancelSlot',
        'click .confirm-slot' : 'confirmSlot',
        'change input[name=offset]' : 'changeTimezone',
        'click .open-tos-page' : 'openTos',
        'click .choose-timezone' : 'chooseTimezone'
    },

    render : function() {

        var _this = this;

        if( ! this.active_matchmaker ) {
            var i, l = this.matchmaker_collection.length;
            for( i = 0; i < l; i++ ) {
                var n = this.matchmaker_collection.at(i).get('vanity_url_path') || '';
                if( n === this.selected_matchmaker_path || ( this.selected_matchmaker_path === 'default' && ( ! n || n === 'default' ) ) ) {
                    this.active_matchmaker = this.matchmaker_collection.at(i);
                }
            }
        }

        this.$el.html( templatizer.meetmeCalendar( { user : this.user_model.toJSON(), matchmaker : this.active_matchmaker.toJSON(), mode : this.mode }) );

        // Show header
        $('.header .title').text('Choose time');
        $("[data-position='fixed']").fixedtoolbar('show');


        // Set the background
        var bg_image = '';
        if( this.active_matchmaker.get('background_theme') == 'c' ||  this.active_matchmaker.get('background_theme') == 'u' ) {
            bg_image = this.active_matchmaker.get('background_image_url');

        }
        else{
            bg_image = app.meetme_themes[this.active_matchmaker.get('background_theme')];
        }
        $('.ui-body-a').css({
            'background-image' : 'url('+bg_image+')',
            'background-size' : 'cover',
            'background-position' : '50% 50%',
            'background-attachment' : 'fixed'
        });

        // Save the original timezone
        if( !this.time_zone_checked ) {
            this.active_matchmaker.set('time_zone_offset_original',this.active_matchmaker.get('time_zone_offset'));
            this.active_matchmaker.set('time_zone_original',this.active_matchmaker.get('time_zone'));
        }

        // Check user timezone
        if( !this.time_zone_checked && app.options.ua_time_zone.name() !== this.active_matchmaker.get('time_zone') ){

            // Ensure we won't check timezone again
            this.time_zone_checked = true;

            // Show timezone preferences
            var d = new Date();
            this.$el.html( templatizer.meetmeTimezoneChange({ matchmaker : this.active_matchmaker.toJSON(), user : this.user_model.toJSON(), uatz : app.options.ua_time_zone, d : d, tz_data : app.timezones }) );
            this.$el.trigger('create');

            // Handle custom timezone change and show time
            var $select = $('#timezone-select', this.el);
            $select.change(function(e){
                // Change radio button val
                var tz = $(e.currentTarget).val();
                $('#user-tz', this.el).val( tz );

                // Redraw time
                var new_time_string = moment.utc(d.getTime() + app.timezones.data[tz].offset_value * 1000).format('hh:mm A');
                $('#user-time', this.el).html(new_time_string);

            });
        }
        else{
            this.renderSlots();
        }

        // Set time zone as checked, so it won't get checked again
        this.time_zone_checked = true;
    },

    renderSlots : function(offset) {
        var _this = this;

        app.collections.slots = new app.slotCollection( [], {
            duration : this.active_matchmaker.get('duration'),
            tz_offset : this.active_matchmaker.get('time_zone_offset'),
            matchmaker : this.active_matchmaker.id
        });

        app.collections.slots.url =  app.defaults.api_host + '/v1/matchmakers/'+this.active_matchmaker.get('id')+'/options';


        // TODO: show message, if that time is in past
        var initial_offset = offset || 0;
        if( this.active_matchmaker.get('event_data') && this.active_matchmaker.get('available_timespans') && this.active_matchmaker.get('available_timespans').length ) {

            // Find first time
            var ft = Infinity, i, len = this.active_matchmaker.get('available_timespans').length;
            for( i = 0; i < len; i++ ) {
                if( this.active_matchmaker.get('available_timespans')[i].start < ft ) ft = this.active_matchmaker.get('available_timespans')[i].start;
            }

           // Calculate week offset from now
           // NOTE: multiply by 1000, as we work in milliepochs
           var diff = moment(ft * 1000).startOf('week').valueOf() - moment().startOf('week').valueOf();

           if( diff < 0 ) {
               cal_in_past = true;
           }

           initial_offset = Math.round( diff / ( 1000 * 60 * 60 * 24 * 7 ) );
        }

        // Get calendar events ( adding +1 day as our week starts from monday  not sunday)
        var week_begin = Math.round(moment().utc().add('weeks', initial_offset).startOf('week').add('days',1).valueOf() / 1000);
        var week_end = Math.round(moment().utc().add('weeks', initial_offset).endOf('week').add('days',1).valueOf() / 1000);
        var data = { begin_epoch : week_begin - 25 * 60 * 60, end_epoch : week_end + 25 * 60 * 60 };

        app.collections.slots.fetch({ data : data , success : function(c,r) {
            if( r && r.length === 0 ) {
                _this.renderSlots(initial_offset + 1);
            }
            else{
                $('.load-msg').text('');
                if( ! _this.subviews.slots ) _this.subviews.slots = new app.collectionView({
                    collection : app.collections.slots,
                    childViewConstructor : app.slotInListView,
                    childViewTagName : 'li',
                    el : '#slots',
                    infiniScroll : true,
                    pageSize : 1,
                    infiniScrollDirection : 'down',
                    initialPage : initial_offset + 1,
                    queryParamsFunc: function(offset){
                        var week_begin = Math.round(moment().utc().add('weeks', offset).startOf('week').add('days',1).valueOf() / 1000);
                        var week_end = Math.round(moment().utc().add('weeks', offset).endOf('week').add('days',1).valueOf() / 1000);
                        return { begin_epoch : week_begin - 25 * 60 * 60, end_epoch : week_end + 25 * 60 * 60 };
                    }
                });
                _this.subviews.slots.render();
            }
        }});

    },

    confirmSlot : function(e) {
        e.preventDefault();

        $('.ui-btn-text', e.currentTarget).text('Confirming...');

        if( app.auth.user || this.quickmeet_key ) {
            var _this = this;
            var data = {};

            if( this.quickmeet_key ) {
                data.quickmeet_key = this.quickmeet_key;
            } else {
                data.agenda = $('#meetme-agenda', this.el ).val();
            }

            this.lock.save(data, { success : function(res) {
                if( res.error ) {
                    alert('Cannot make a reservation with your self.');
                    return;
                }
                _this.showSuccess();
            }});
        }
        else {
            this.lock.set({ agenda : $('#meetme-agenda').val() });
            // TODO: Make it visible that only email is needed
            this.$el.html( templatizer.profileView( { new_user : true }) );
            this.$el.trigger('create');
        }
    },

    saveProfile : function(e) {
        e.preventDefault();

        $('.ui-btn-text', e.currentTarget).text('Saving...');

        var _this = this;

        if( ! $('#user-email').val() ) {
            alert('You need to type in an email!');
            return;
        }

        this.new_user.save({
            matchmaker_lock_id : this.lock.get('id'),
            first_name : $('#user-firstname').val(),
            last_name : $('#user-lastname').val(),
            primary_email : $('#user-email').val(),
            phone : $('#user-phone').val(),
            skype : $('#user-skype').val(),
            organization : $('#user-organization').val(),
            organization_title : $('#user-title').val(),
            tos_accepted : '1'
        }, {
            success : function() {

                // TODO: handle error
                _this.lock.save({ expected_confirmer_id : _this.new_user.id }, { success : function(res) {
                    if( res.error ) {
                        alert('Cannot make a reservation with your self.');
                        return;
                    }
                    _this.$el.html( templatizer.meetmeConfirmationSent( _this.new_user.toJSON() ) );
                }});
            },
            error: function() {
                alert('Saving profile failed. Please try again!');
            }
        });
    },

    showSuccess : function() {

        // TODO: Hide back button

        this.$el.html( templatizer.meetmeConfirmed( _.merge( this.active_matchmaker.toJSON(), this.lock.toJSON(), { quickmeet_key : this.quickmeet_key } ) ) );
        this.$el.trigger('create');

        return;
        // Send user timezone as ua if user chose to use the target timezone
        // else use matchmaker timezone
        if( this.active_matchmaker.get('time_zone_original') !== this.active_matchmaker.get('time_zone') ){
            data.user_time_zone = this.active_matchmaker.get('time_zone');
        }
        else{
            data.user_time_zone = app.options.ua_time_zone.name();
        }

        // Extra params to the template
        var extra_template_params = {
            matchmaker_timezone : _this.active_matchmaker.get('time_zone'),
            original_matchmaker_timezone : _this.active_matchmaker.get('time_zone_original'),
            user_agent_timezone : app.options.ua_time_zone.name()
        };


    },

    cancelSlot : function(e) {
        var _this = this;

        $('.cancel-slot .ui-btn-text',this.el).text('Canceling...');
        this.lock.destroy({ success : function() {
            app.helpers.switchContext('meetmeCalendar', { user : _this.user_model.get('matchmaker_fragment') });
        }});
    },

    chooseTimezone : function(e) {
        e.preventDefault();
        var choice = $('input[name=offset]:checked').val();
        if( choice == 'custom' ) {
            choice = $('#timezone-select').val();
        }

        this.active_matchmaker.set('time_zone', choice);
        var tz = app.timezones.data[choice];
        this.active_matchmaker.set('time_zone_offset',tz.offset_value);
        this.active_matchmaker.set('time_zone_string',tz.readable_name);
        this.render();

        // Fix timezone text
        $('p.timezone', this.el).text(tz.readable_name);

    },

    changeTimezone : function(e) {
        var $radio = $(e.currentTarget);
        var $select = $('#timezone-select');
        if( $radio.val() == 'custom' ) {
            $select.selectmenu('enable');
        }
        else{
            $select.selectmenu('disable');
        }
    },

    chooseSlot : function(data, $slot_el) {
        var _this = this;

        var $slot_text = $('.left', $slot_el);
        $slot_text.html('Reserving...');

        this.chosen_slot = data;

        // TODO: Handle lock errors

        this.lock.save( data, { success : function(model, res) {

            if(res.error) {
                // TODO: DIsplay the actual error message
                alert('Oops, cannot reserve a meeting from your self!');
                return;
            }

            // Show confirm template
            _this.$el.html( templatizer.meetmeConfirm( {
                uatz : app.options.ua_time_zone.name(),
                uatz_offset : app.timezones.data[app.options.ua_time_zone.name()].offset_value,
                mm_tz : _this.active_matchmaker.get('time_zone'),
                mm_tz_offset : _this.active_matchmaker.get('time_zone_offset'),
                orig_mm_tz : _this.active_matchmaker.get('time_zone_original'),
                orig_mm_tz_offset : _this.active_matchmaker.get('time_zone_offset_original'),
                start_epoch : _this.lock.get('start_epoch'),
                end_epoch : _this.lock.get('end_epoch'),
                quickmeet_key : _this.quickmeet_key
            }) );

            // Change title & hide back button
            $('.header .title').text('Confirm choice');
            $('.header .back-button').hide();

            _this.$el.trigger('create');
        }});

        // Timeout for notifying about the expired lock
        setTimeout( function(){
            alert('Reservation expired, please try again!');
            window.location.reload();
        },900000 );
    },

    openTos : function(e){
        e.preventDefault();
        var win=window.open('http://meetin.gs/meetings/terms_of_service', '_blank');
        win.focus();
    }
});

