app.meetmeConfigView = Backbone.View.extend({

    initialize : function(options) {
        _(this).bindAll('render', 'saveConfig','editFragment', 'previewCover','previewCalendar','handleFocus','openCalendar','connectGoogle');

        // Bind models
        this.user_model = options.user_model;
        this.matchmaker_collection = options.matchmaker_collection;

        // Setup state
        this.fragment_extra = 0;
        this.check_in_progress = false;
        this.fragment_edit_open = false;
    },

    events : {
        'click .edit-url' : 'editUrl',
        'click .save-url' : 'saveUrl',
        'click .save-msg' : 'saveMsg',
        'click .edit-msg' : 'editMsg'
    },

    render : function() {
        // Setup template
        if( this.matchmaker_collection.length === 0 ){
            this.active_matchmaker = new app.matchmakerModel();
            this.active_matchmaker.url = app.defaults.api_host+'/v1/users/'+app.auth.user+'/matchmakers';
        }
        else{
            this.active_matchmaker = this.matchmaker_collection.at(0);
        }
        this.$el.html( templatizer.meetmeConfig( { user : this.user_model.toJSON(), matchmaker : this.active_matchmaker.toJSON() }) );

        this.$el.trigger('create');

        // Setup timezone
        var _this = this;
        var $select = $('#timezone-select');
        $select.change(function(){
            _this.active_matchmaker.set('time_zone', $select.val() );
        });

        this.findAndShowFragment();

        // Timeslider
        //range: [15, 240],
        //start: this.active_matchmaker.get('duration'),
        //handles: 1,
        //step: 15,

        // Pauseslider
        //range: [0, 120],
        //start: this.active_matchmaker.get('buffer'),
        //handles: 1,
        //step: 15,

    },

    editMsg : function(e){
        e.preventDefault();

        this.$el.html( templatizer.meetmeConfigMsg( { user : this.user_model.toJSON(), matchmaker : this.active_matchmaker.toJSON() }) );

        this.$el.trigger('create');
    },

    editUrl : function(e){
        e.preventDefault();

        this.$el.html( templatizer.meetmeConfigUrl( { user : this.user_model.toJSON(), matchmaker : this.active_matchmaker.toJSON() }) );

        this.$el.trigger('create');
    },

    saveUrl : function(e){
        e.preventDefault();

        // TODO: Save

        this.$el.html( templatizer.meetmeConfig( { user : this.user_model.toJSON(), matchmaker : this.active_matchmaker.toJSON() }) );

        this.$el.trigger('create');
    },

    saveMsg : function(e){
        e.preventDefault();

        // TODO: Save

        this.$el.html( templatizer.meetmeConfig( { user : this.user_model.toJSON(), matchmaker : this.active_matchmaker.toJSON() }) );

        this.$el.trigger('create');
    },

    handleFocus : function(e){
        var $textarea = $(e.currentTarget);
        if( $textarea.val() === this.active_matchmaker.defaults.description ){
            $textarea.html('');
        }
    },

    getNextFreeFragment : function( fragment ){
        var _this = this;

        if( this.fragment_extra !== 0 ){
            fragment = fragment + this.fragment_extra;
        }
        this.fragment_extra++;

        $.ajax({
            url : app.defaults.api_host + '/v1/users/',
            data : { user_fragment : fragment },
            type : 'GET',
            error : function(){
                $('.finding-url').hide();
                $('.your-url').show();
                $('.handle').text(fragment);
            },
            success : function(res){
                _this.getNextFreeFragment( fragment );
            }
        });
    },

    findAndShowFragment : function(){
        if( this.user_model.get('matchmaker_fragment') ){
            $('.your-url', this.el).show();
        }
        else{
            $('.finding-url', this.el).show();
            this.url_extra = 0;
            this.getNextFreeFragment( this.buildUserFragment() );
        }
    },

    buildUserFragment : function(){
        var url = '' + this.user_model.get('name');
        url = url.replace(/\@.*/,'');
        url = url.replace(/[^\w]/g, '.');
        url = url.replace(/\.+/g, '.');
        url = url.toLowerCase();
        return url;
    },

    editFragment : function(e){
        var _this = this;

        e.preventDefault();
        var $handle = $('.handle');
        var $input = $('<input class="handle-value" value="'+$handle.text()+'" type="text"/>');
        var $save = $('.change-url');

        // If editing not started
        if( ! this.fragment_edit_open ){
            this.fragment_edit_open = true;
            $handle.html('').append($input);
            $input.focus();
            $save.html('check');
        }
        // Checking not in progress
        else if( this.check_in_progress === false ){
            $save.html('checking...');
            var val = $('.handle-value').val();

            if( ! val ){
                $save.html('min 3 chars');
                setTimeout(function(){$save.html('check'); },2000);
                return;
            }

            if( ! /^(.{3,})$/.test( val ) ) {
                $save.html('min 3 chars');
                setTimeout(function(){$save.html('check'); },2000);
                return;
            }

            if ( ! /[a-zA-Z]/.test( val ) ) {
                $save.html('must have one alphabet');
                setTimeout(function(){$save.html('check'); },2000);
                return;
            }

            if ( ! /^([a-zA-Z0-9\.\_]+)$/.test( val ) ) {
                $save.html('invalid characters');
                setTimeout(function(){$save.html('check'); },2000);
                return;
            }

            // Handle case where we try to save a previously owned fragment
            if( val == this.user_model.get('matchmaker_fragment') ){
                _this.check_in_progress = false;
                _this.fragment_edit_open = false;
                $handle.html(val);
                $save.html('change');
                return;
            }

            $.ajax({
                url : app.defaults.api_host + '/v1/users/',
                data : { user_fragment : val },
                type : 'GET',
                error : function(){
                    $save.html('success');
                    _this.check_in_progress = false;
                    _this.fragment_edit_open = false;
                    $handle.html(val);
                    setTimeout(function(){
                        $save.html('change');
                    },3000);
                },
                success : function(res){
                    $save.html('sorry, url taken');
                    _this.check_in_progress = false;
                    $input.focus();
                    setTimeout( function(){
                        $save.html('change');
                    },3000);
                }
            });
        }
    },

    getConfig : function(){
        var _this = this;

        // Parse source checkbox values
       var hidden_sources = {};
        $("input:checkbox:not(:checked)").each(function(i){
            var src_id = $(this).val();

            // Find suggestion source with matching source id
            hidden_sources[src_id] = _.find(_this.user_model.get('suggestion_sources'), function(src){ return src.id == src_id; });
        });

        var obj = {
            user : {
                // TODO: This does not work
                matchmaker_fragment : $('span.handle').html()
            },
            matchmaker : {
                user_id : this.user_model.id,
                vanity_url_path : '',
                description : $('#matchmaker-description').val(),
                location : $('#matchmaker-location').val(),
                background_theme : $('.background.active').attr('data-theme-id'),
                background_upload_id : $('#own-bg').attr('data-upload-id'),
                background_preview_url : $('#own-bg').attr('data-upload-image'),
                duration : Math.round($('#timeslider').val()),
                buffer : Math.round($('#pauseslider').val()),
                slots : $('#btd-cal').btdCal('getSlots'),
                time_zone : $('#timezone-select').val(),
                time_zone_offset : dicole.get_global_variable('meetings_time_zone_data').data[$('#timezone-select').val()].offset_value,
                time_zone_string : dicole.get_global_variable('meetings_time_zone_data').data[$('#timezone-select').val()].readable_name,
                hidden_sources : hidden_sources
            }
        };

        // Remove background, if saving a preset themebg or we just uploaded a new one
        if( obj.matchmaker.background_theme !== 'c' || obj.matchmaker.background_upload_id ){
            obj.matchmaker.background_image_url = '';
        }

        return obj;
    },

    saveConfig : function(e){
        e.preventDefault();

        var config = this.getConfig();

        // Remove temp background_url
        this.active_matchmaker.set('background_preview_url','');

        this.user_model.save(config.user);
        // Update
        // TODO: What happens with a new matchmaker
        this.active_matchmaker.save(config.matchmaker);
        //this.matchmaker_collection.create( active_matchmakeru );

        app.router.navigate('meetings/meetme_config/share', {trigger:true});
    },

    saveConfigToLocalStorage : function(){
        var config = this.getConfig();
        this.user_model.set( config.user );
        this.active_matchmaker.set( config.matchmaker );
        localStorage.setItem('previewUser',JSON.stringify( this.user_model.toJSON() ) );
        localStorage.setItem('previewMatchmaker',JSON.stringify( this.active_matchmaker.toJSON() ) );
    },

    previewCalendar : function(e){
        e.preventDefault();
        this.saveConfigToLocalStorage();
        app.router.navigate( 'meet/' + this.user_model.get('matchmaker_fragment') + '/default/preview', {trigger : true});
    },

    previewCover : function(e){
        e.preventDefault();
        this.saveConfigToLocalStorage();
        app.router.navigate( 'meet/' + this.user_model.get('matchmaker_fragment') + '/preview', {trigger : true});
    },


    connectGoogle :function(e){
        e.preventDefault();
        this.saveConfigToLocalStorage();
        window.location = dicole.get_global_variable('meetings_google_connect_url');
    },

    beforeClose : function(){
        this.user_model.unbind();
        this.matchmaker_collection.unbind();
    }
});
