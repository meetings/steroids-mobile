app.slotCollectionView = Backbone.View.extend({
    initialize : function(options) {

        // Check requirements
        if (!options.childViewConstructor) throw 'no child view constructor provided';
        if (!options.childViewTagName) throw 'no child view tag name provided';

        // Bind this to functions
        _(this).bindAll('add', 'remove', 'reset');

        // Cache this
        var _this = this;

        // Save options
        this.options = options;

        // Initiate add buffer & loader
        this.addHtmlBuffer = [];
        this.curDayString = '';
        this.$loader = $('<div class="loader-inlist" data-role="none"><span class="loader"></span><p>Loading more...</p></div>');

        // Setup infinite scrolling
        this.infiniScroll = new Backbone.InfiniScroll(this.collection, {
            success: function(col, res){
                if( ! res.length ) _this.$loader.hide();
            },
            strict : true,
            direction: 'down',
            extraParams : this.options.infiniScrollExtraParams || {},
            pageSize : 5,
            initialPage : this.options.initialPage || 1,
            view: this,
            queryParamsFunc : this.options.queryParamsFunc
        });

        // Setup childviews & bind events
        this._childViewConstructor = options.childViewConstructor;
        this._childViewTagName = options.childViewTagName;
        this._childViews = [];
        this.collection.each(this.add);
        this.collection.bind('add', this.add);
        this.collection.bind('remove', this.remove);
        this.collection.bind('reset', this.reset);
    },

    // Clean the model
    reset : function(collection, options) {
        // TODO : sometimes things break so that the childviews get set but when they render they just return empty li elems
        this._childViews = [];
        var _this = this;
        $.each( collection.models, function(){
            var cv = new _this._childViewConstructor({
                tagName : _this._childViewTagName,
                model : this
            });
            _this._childViews.push(cv);
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
        this.addHtmlBuffer.push( childView.render().el );
        this.delayedAdd();
    },

    // We want to add content to dom all at once, so underscores debounce is used to achieve this
    delayedAdd : _.debounce( function(){
        this.$el.append(this.addHtmlBuffer);
        this.addHtmlBuffer = [];
        this.$el.listview().listview('refresh');
        this.$loader.appendTo(this.$el);
    },20),

    // Render the whole view
    render : function() {

        this.$el.html('');

        var l = this._childViews.length;
        for (var i = 0; i < l ; i++ ){

            // TODO: Fix missing bottom border on last element before split

            // Split by days
            if( this.curDayString != this._childViews[i].model.get('day_string') ) {
                this.curDayString = this._childViews[i].model.get('day_string');
                this.$el.append('<li style="margin-top:14px;" data-role="list-divider">'+this._childViews[i].model.get('date_string')+'</li>');
            }

            this.$el.append(this._childViews[i].render().el);
        }

        this.$el.delay(100).listview().listview('refresh');

        this.$el.append( this.$loader );

        this._rendered = true;

        return this;
    }
});

