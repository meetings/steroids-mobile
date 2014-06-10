app.meetingsView = Backbone.View.extend({
    initialize: function( options ) {
        // Get times
        var today = Math.floor( moment().startOf('day') / 1000 );

        if( ! app.views.future ) app.views.future = new app.upcomingMeetingsView({
            collection : app.collections.upcoming,
            childViewConstructor : app.meetingInListView,
            childViewTagName : 'li',
            el : '#future',
            emptyString : '<li class="end">No more upcoming meetings.</li>',
            infiniScroll : true,
            infiniScrollDirection : 'down',
            infiniScrollExtraParams : { start_min : today, sort : "asc" },
            hideIfEmpty : true
        });

        if( ! app.views.today ) app.views.today = new app.todayMeetingsView({
            collection : app.collections.today,
            childViewConstructor : app.meetingInListView,
            childViewTagName : 'li',
            el : $('#today'),
            infiniScroll : false,
            hideIfEmpty : true
        });

        if( ! app.views.unscheduled ) app.views.unscheduled = new app.unscheduledMeetingsView({
            collection : app.collections.unscheduled_meetings,
            childViewConstructor : app.meetingInListView,
            childViewTagName : 'li',
            el : '#unscheduled',
            infiniScroll : false,
            hideIfEmpty : true
        });

        if( ! app.views.past ) app.views.past = new app.pastMeetingsView({
            collection : app.collections.past_meetings,
            childViewConstructor : app.meetingInListView,
            childViewTagName : 'li',
            el : '#past',
            emptyString : '<li class="end">No more past meetings.</li>',
            infiniScroll : true,
            infiniScrollDirection : 'down',
            infiniScrollExtraParams : { start_max : today, sort : "desc" },
            hideIfEmpty : true
        });
        app.views.past.disableInfiniteScroll();

        this.$el.find('#navbar a').click(_.bind(this.switchMeetingPage, this));

        this.model.on('change', function() { this.render(); }, this );
    },

    switchMeetingPage: function(e) {
        e.preventDefault();
        e.stopPropagation();

        var $a = $(e.delegateTarget),
            target = $a.data('id');

        // Set active tab & page.
        this.$el.find('#navbar a').removeClass('ui-btn-active');
        this.$el.find('#navbar a[data-id="' + target + '"]').addClass('ui-btn-active');

        this.$el.find('#all-meetings').hide();
        this.$el.find('#past-meetings').hide();
        this.$el.find('#' + target).show();

        if(target === 'past-meetings') {
            app.views.future.disableInfiniteScroll();
            app.views.past.enableInfiniteScroll();
        }
        else {
            app.views.past.disableInfiniteScroll();
            app.views.future.enableInfiniteScroll();
        }
    },

    render: function() {
        var that = this;
            that._render( { showPhoneConnect : 0 } );
    },
    _render : function(params) {
        params.model = this.model.toJSON();

        this.$el.find('#meetings-buttons').html(templatizer.noMeetingsView( params ));
        this.$el.find('#meetings-buttons').trigger("create");
    },

    events: {
        "click .google-connect-meeting-view" : "googleConnect"
    },

    googleConnect : function(e){
        e.preventDefault();
        app.helpers.switchContext('connectAccountsPage', { google_calendar : 1 } );
    }
});
