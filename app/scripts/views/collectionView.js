app.collectionView = Backbone.View.extend({
    defaults : {
    },

    fetchOn : false,
    page : 1,
    pageSize : 10,

    events: {
        'click .js-load-more' : 'fetchMore'
    },

    initialize : function(options) {
        // Check requirements
        if (!options.childViewConstructor) throw "no child view constructor provided";
        if (!options.childViewTagName) throw "no child view tag name provided";

        // Bind this to this object
        _(this).bindAll('add', 'remove', 'reset');

        // Save options
        this.options = $.merge( options, this.defaults );

        // Initiate add buffer
        this.addHtmlBuffer = [];

        // Setup childviews & bind events
        this._childViewConstructor = options.childViewConstructor;
        this._childViewTagName = options.childViewTagName;
        this._childViews = [];
        this.collection.each(this.add);
        this.collection.bind('add', this.add);
        this.collection.bind('remove', this.remove);
        this.collection.bind('reset', this.reset);

        // Setup onRender function
        if ( typeof options.onRender === 'function' ) {
            this.onRender = options.onRender;
        }

        // Setup on empty function
        if ( typeof options.emptyString === 'string' ) {
            this.emptyString = options.emptyString;
        }

        this.options = _.defaults(options, {
            success: function(){ },
            error: function(){ },
            onFetch: function(){ },
            queryParamsFunc: false,
            target: $(window),
            param: "until",
            untilAttr: "id",
            pageSize: this.pageSize,
            scrollOffset: 100,
            scrollOn: true,
            add: true,
            update: true,
            strict: false,
            includePage: true,
            extraParams : {},
            direction: 'down',
            initialPage: 1
        });

        this.fetchOn = true;
        this.hasMore = false;
        this.page = this.options.initialPage || 1;

        this.$loader = $('<li class="loader-inlist" data-role="list-divider"><span class="loader"></span><p>Loading more...</p></li>');
        this.$loadMore = $('<li class="loader-inlist" data-role="list-divider"><a href="#" class="js-load-more">Load more...</a></li>');
    },

    disableInfiniteScroll: function() {
    },

    enableInfiniteScroll: function() {
    },

    fetchMore: function() {
        if ( this.fetchOn ) {
            this.$loadMore.hide();
            this.$loader.appendTo(this.$el).show();
            this.$el.listview('refresh');

            var lastModel = this.collection.last();
            if (!lastModel) { return; }

            this.onFetch();
            this.disableFetch();

            this.collection.fetch({
                success: _.bind(this.fetchSuccess, this),
                error: _.bind(this.fetchError, this),
                add: this.options.add,
                update: this.options.update,
                remove: false,
                data: this.options.queryParamsFunc ? this.options.queryParamsFunc(this.page) : _.bind(this.buildQueryParams, this)(lastModel)
                //silent: true
            });
        }
    },

    // Clean the model
    reset : function(collection, options){
        // TODO : sometimes things break so that the childviews get set but when they render they just return empty li elems
        this._childViews = [];
        var that = this;
        $.each( collection.models, function(){
            var cv = new that._childViewConstructor({
                tagName : that._childViewTagName,
                model : this
            });
            that._childViews.push(cv);
        });
        this.render();
    },

    // Add model to the collection
    add : function(model, self, options) {
        var childView = new this._childViewConstructor({
            tagName : this._childViewTagName,
            model : model
        });

        this._childViews.push(childView);

        if(this._rendered) {
            this.addHtmlBuffer.push( childView.render().el );

            this.delayedAdd();
        }
    },

    // We want to add content to dom all at once, so underscores debounce is used to achieve this
    delayedAdd : _.debounce( function(){
        this.$loader.hide();

        this.$el.append(this.addHtmlBuffer);
        this.addHtmlBuffer = [];
        
        if(this.hasMore) {
            this.$loadMore.appendTo(this.$el).show();
        }

        this.$el.listview('refresh');
    },20),

    // Remove model from the collection
    remove : function(model) {
        // In case no model passed, remove the whole thing
        if( ! model ){
            this.$el.remove();
            return;
        }

        var viewToRemove = _(this._childViews).select(function(cv) { return cv.model === model; })[0];
        this._childViews = _(this._childViews).without(viewToRemove);

        if (this._rendered) {

            this.render();

            if (this.onRender !== null && this.onRender !== undefined) {
                this.onRender();
            }
        }
    },

    // Render the whole view
    render : function() {

        this.$el.html('');

        var l = this._childViews.length;
        for (var i = 0; i < l ; i++ ){
            this.$el.append(this._childViews[i].render().el);
        }

        // Call on render function
        if ( typeof this.onRender === 'function' ) {
            this.onRender();
        }

        // Call render extras if available
        if( typeof this.renderExtras === 'function' ){
            this.renderExtras();
        }

        // Call onEmpty if no results && not first render
        if( ! l && this._rendered && typeof this.emptyString === 'string' ){
            this.$el.html( this.emptyString );
        }

        // Hide / show view element, if hideIfEmpty is set
        if( this.options.hideIfEmpty ){
            if( ! l ) this.$el.hide();
            else this.$el.show();
        }

        this.$el.listview("refresh");
        //_.delay(function($el) { $el.listview().listview("refresh"); }, 10, this.$el);

        // Show loader if there was 10 meeitngs returned
        this.hasMore = (l == 10);

        if(this.hasMore){ 
            this.$el.append(this.$loadMore.show());

            this.$el.listview("refresh");
        }

        this._rendered = true;

        return this;
    },

    destroy : function() {
        //$target.off("scroll", this.watchScroll);
    },

    enableFetch : function() {
        setTimeout(function(){
            this.fetchOn = true;
        },50);
    },

    disableFetch : function() {
        fetchOn = false;
    },

    onFetch : function() {
        this.options.onFetch();
    },

    fetchSuccess : function(collection, response) {
        if ((this.options.strict && collection.length >= (this.page + 1) * this.options.pageSize) || (!this.options.strict && response.length >= this.options.pageSize)) {
            this.enableFetch();
            this.page += 1;
        } else {
            this.disableFetch();
        }
        
        if(response.length < 10) {
            this.$loader.hide();
            this.$loadMore.hide();
            this.hasMore = false;

            var msg = this.emptyString;
            var el = this.$el;
            var _this = this;

            // Allow time for the delayed render function to complete
            setTimeout(function(){
                el.append(msg);
                _this.$el.listview("refresh");
            },500);
        }
    },

    fetchError : function(collection, response) {
        this.enableFetch();
        this.options.error(collection, response);
    },

    buildQueryParams : function(model) {
        var params = { };

        params[this.options.param] = typeof(model[this.options.untilAttr]) === "function" ? model[this.options.untilAttr]() : model.get(this.options.untilAttr);

        if (this.options.includePage) {
            params.offset = (this.page ) * this.options.pageSize;
            params.limit = this.options.pageSize;
        }

        if ( this.options.extraParams ){
           params =  _.extend( this.options.extraParams, params );
        }

        if( this.options.query ){
            params = _.extend( params, this.options.query );
        }

        return params;
    }
});

