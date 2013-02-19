app.router = Backbone.Router.extend({
    initialize : function(){
    },
    routes : {
        "" : "meetings",
        "login.html" : "login",
        "index.html" : "meetings",
        "settings.html" : "settings",
        "meeting.html" : "meeting",
        "participants.html" : "participants",
        "materials.html" : "materials",
        "participant.html" : "participant",
        "material.html" : "material",
        "scheduling.html" : "scheduling"
    },
    meetings : function() {

        // Render footer & setup header
        app.views.footer = new app.footerView({ active : "meetings", el : '#meetings' });
        app.views.header = new app.headerView({ el : '#meetings' });
        app.views.footer.render();

        // Get times
        var today = Math.floor( moment().sod() / 1000 );

        // Function to set scroll after both are rendered or show message
        var afterRender = _.after(3, function(){
            if( app.collections.future_meetings.length > 0 || app.collections.past_meetings.length > 0){
                if( $('today') ){
                    var offset = $('#today').offset();
                    window.scrollTo(0, offset.top - 50);
                }
                else{
                    var offset = $('#future').offset();
                    window.scrollTo(0, offset.top - 50);
                }
            }
            else{
                $('.main-div').html('<h2>Sorry</h2><p>Our mobile app doesn\'t yet support creating meetings.</p><p>Open the login link in your email with a desktop browser to get started!</p><p class="sorry"><span class="sorry-squrre"></span></p>');
            }
        });

        // Fetch all future meetings
        app.collections.future_meetings = new app.meetingCollection();
        app.collections.future_meetings.fetch({ success : function(col,res){
            // If problems with auth
            if( res && res.error && res.error.message == "invalid auth" ){
                window.location = '/login.html?clear=true';
                return;
            }

            $('.loader').hide();

            // Get times
            var today = Math.floor ( moment().utc().sod() / 1000 );
            var today_end = Math.floor ( moment().utc().eod() / 1000 );

            // Create a new collection of todays meetings
            var today_meetings = app.collections.future_meetings.filter(function(model) {
                if( model.get('begin_epoch') >= today && model.get('begin_epoch') <= today_end ) return true;
                else return false;
            });
            app.collections.today = new app.meetingCollection( today_meetings );

            // Create new collection of upcoming meetings
            var upcoming_meetings = app.collections.future_meetings.filter(function(model) {
                if( model.get('begin_epoch') > today_end) return true;
                else return false;
            });
            app.collections.upcoming = new app.meetingCollection( today_meetings );

            // Create view for upcoming meetings and render or remove if empty
            app.views.future = new app.upcomingMeetingsView({
                collection : app.collections.upcoming,
                childViewConstructor : app.meetingInListView,
                childViewTagName : 'li',
                el : $('#future'),
                emptyString : '<li class="end">No more upcoming meetings.</li>',
                infiniScroll : true,
                infiniScrollDirection : 'down',
                infiniScrollExtraParams : { start_min : today, sort : "asc" }
            });
            if( app.collections.future_meetings.length === 0 ) app.views.future.remove();
            else app.views.future.render();

            // Create a view for todays meetings and render or remove if empty
            app.views.today = new app.todayMeetingsView({
                collection : app.collections.today,
                childViewConstructor : app.meetingInListView,
                childViewTagName : 'li',
                el : $('#today'),
                infiniScroll : false
            });
            if( app.collections.today.length === 0 ) app.views.today.remove();
            else app.views.today.render();

            afterRender();

        },  data : { start_min : today, limit : 10, sort : "asc"} } );

        // Get the unscheduled meetings
        app.collections.unscheduled_meetings = new app.meetingCollection({},{ override_endpoint : 'unscheduled_meetings' });
        app.collections.unscheduled_meetings.fetch({ success : function(col,res){
            // If problems with auth
            if( res && res.error && res.error.message == "invalid auth" ){
                window.location = '/login.html?clear=true';
                return;
            }
            app.views.unscheduled = new app.unscheduledMeetingsView({
                collection : app.collections.unscheduled_meetings,
                childViewConstructor : app.meetingInListView,
                childViewTagName : 'li',
                el : $('#unscheduled'),
                infiniScroll : false
            });
            $('.loader').hide();

            if( app.collections.unscheduled_meetings.length == 0 ) app.views.unscheduled.remove();
            else app.views.unscheduled.render();

            afterRender();
        }, data : { scheduling_on : 1 }});

        // Fetch past meetings
        app.collections.past_meetings = new app.meetingCollection();
        app.collections.past_meetings.fetch({ success : function(col,res){
            // If problems with auth
            if( res && res.error && res.error.message == "invalid auth" ){
                window.location = '/login.html?clear=true';
                return;
            }
            app.views.past = new app.genericCollectionView({
                collection : app.collections.past_meetings,
                childViewConstructor : app.meetingInListView,
                childViewTagName : 'li',
                el : $('#past'),
                emptyString : '<li class="end">No more past meetings.</li>',
                infiniScroll : true,
                infiniScrollDirection : 'up',
                infiniScrollExtraParams : { start_max : today, sort : "desc" },
                mode : "addtotop"
            });
            $('.loader').hide();
            app.views.past.render();
            afterRender();
        },  data : { start_max : today, limit : 10, sort : "desc" } } );
    },


    login : function() {

        // Show login view
        app.views.login = new app.loginView({ el : $('#login-page') });
        app.views.login.render();
    },

    settings : function() {

        // Show settings view
        app.views.settings = new app.settingsView({ el : $('#settings') });
        app.views.settings.render();

        // Render footer
        app.views.footer = new app.footerView({ active : "settings", el : $('#settings') });
        app.views.header = new app.headerView({ el : '#settings' });
        app.views.footer.render();
    },

    meeting : function(params) {

        // Render footer
        app.views.footer = new app.footerView({ active : "meetings", el : $('#meetings') });
        app.views.header = new app.headerView({ el : '#meetings' });
        app.views.footer.render();

        // Get url params
        var id = params.id || 0;

        // Fetch and show meeting
        app.models.meeting = new app.meetingModel({ id : id });
        app.views.meeting = new app.meetingView({
            el : $('#meeting'),
            model : app.models.meeting
        });
        app.models.meeting.fetch({ success : function(){

            app.views.meeting.render();

            // Init current meeting user
            var data = app.models.meeting.getMeetingUserByID( app.auth.user );
            app.models.meeting_user = new app.participantModel( data, { meeting_id : id } );

            // Show next action bar for the user
            app.views.next_action_view = new app.nextActionView({ el : $('#next-action-bar'), model : app.models.meeting_user });
            app.views.next_action_view.render();

        }, timeout : 5000 });

        app.collections.materials = new app.materialCollection( [], { meeting_id : id } );
        app.collections.materials.url = app.defaults.api_host + '/v1/meetings/' + id + '/materials';
        app.collections.materials.fetch({ success : function(){
            app.views.materials = new app.genericCollectionView({
                el : $('#materials_list'),
                collection : app.collections.materials,
                childViewTagName : 'li',
                childViewConstructor : app.materialInListView
            });
            app.views.materials.render();
        }});

    },

    scheduling : function(params) {

        // Get url params
        var id = params.id || 0;
        var mode = params.mode || 'answer';

        // Start header
        app.views.header = new app.headerView({ el : '#meetings' });

        // Get meeting
        app.models.meeting = new app.meetingModel({ id : id });
        app.views.scheduling = new app.schedulingView({
            el : $('#scheduling'),
            model : app.models.meeting,
            mode : mode
        } );
        app.models.meeting.fetch({ success : function(){

            // Init current meeting user
            var data = app.models.meeting.getMeetingUserByID( app.auth.user );
            app.models.meeting_user = new app.participantModel( data, { meeting_id : id } );

            app.views.scheduling.render();

        }, timeout : 5000 });

    },

    participants : function(params) {

        // Render footer
        app.views.footer = new app.footerView({ active : "meetings", el : '#participants' });
        app.views.header = new app.headerView({ el : '#participants' });
        app.views.footer.render();

        var id = params.id || 0;

        app.collections.participants = new app.participantCollection( [], { meeting_id : id } );
        app.collections.participants.fetch({ success : function(){
            app.views.materials = new app.genericCollectionView({
                el : $('#participants_list'),
                collection : app.collections.participants,
                childViewTagName : 'li',
                childViewConstructor : app.participantInListView
            });
            app.views.materials.render();
        }
        });
    },

    materials : function(params) {
        // Render footer
        app.views.footer = new app.footerView({ active : "meetings", el : '#materials' });
        app.views.header = new app.headerView({ el : '#materials' });
        app.views.footer.render();

        var id = params.id || 0;

        app.collections.materials = new app.materialCollection( [], { meeting_id : id } );
        app.collections.materials.url = app.defaults.api_host + '/v1/meetings/' + id + '/materials';
        app.collections.materials.fetch({ success : function(){
            app.views.materials = new app.genericCollectionView({
                el : $('#materials_list'),
                collection : app.collections.materials,
                childViewTagName : 'li',
                childViewConstructor : app.materialInListView
            });
            app.views.materials.render();
        }});
    },

    participant : function(params) {
        // Render footer
        app.views.footer = new app.footerView({ active : "meetings", el : '#participant' });
        app.views.header = new app.headerView({ el : '#participant' });
        app.views.footer.render();

        var mid = params.mid || 0;
        var id = params.id || 0;
        app.models.participant = new app.participantModel();
        app.models.participant.url = app.defaults.api_host + '/v1/meetings/' + mid + '/participants/'+id;
        app.models.participant.fetch({ success : function(){
            app.views.user = new app.participantView({
                model : app.models.participant,
                el : $('#participant_info')
            });
            app.views.user.render();
        }});
    },

    material : function(params) {
        // Setup header
        app.views.header = new app.headerView({ el : '#material' });

        var id = params.id || 0;
        app.models.material = new app.materialModel();
        app.models.material.url = app.defaults.api_host + '/v1/materials/' + id;
        app.models.material.fetch({ success : function(){
            app.views.material = new app.materialView({
                model : app.models.material,
                el : $('#material_content')
            });
            app.views.material.render();
        }});
        app.collections.comments = new app.commentCollection();
        app.collections.comments.url = app.defaults.api_host + '/v1/materials/' + id + '/comments';
        app.collections.comments.fetch({ success : function(){
            app.views.comments = new app.commentListView({
                el : $('#comments'),
                collection : app.collections.comments,
                childViewTagName : 'li',
                childViewConstructor : app.commentInListView
            });
            app.views.comments.render();
        }});
    }
});
