// Generic Updating Collection View that offers
// * infinite scroll
// * filtering
// * searching
app.genericCollectionView = Backbone.View.extend({
    defaults : {
        infiniScroll : false,
        mode : 'normal'
    },
    initialize : function(options) {

        // Extend jquery
        (function($) {
            $.fn.outerHTML = function() {
                return $(this).clone().wrap('<div></div>').parent().html();
            }
        })(jQuery);

        // Check requirements
        if (!options.childViewConstructor) throw "no child view constructor provided";
        if (!options.childViewTagName) throw "no child view tag name provided";

        // Bind this to this object
        _(this).bindAll('add', 'remove', 'reset');

        // Save options
        this.options = $.merge( options, this.defaults );

        // Initiate add buffer
        this.addHtmlBuffer = [];

        // Setup infinite scrolling
        if (this.options.infiniScroll){
            var that = this;
            var direction = this.options.infiniScrollDirection || 'down';
            var extraParams = this.options.infiniScrollExtraParams || {};
            this.infiniScroll = new Backbone.InfiniScroll(this.collection, {
                success: function(col, res){ that.scrolledMore(col, res); },
                onFetch: function(){
                },
                direction: direction,
                extraParams: extraParams,
                view: this
            });
        }

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

        if( options.index === 0 || this.options.mode === 'addtotop' ) this._childViews.unshift(childView);
        else this._childViews.push(childView);

        if (this._rendered) {

            if( options.index === 0 || this.options.mode === 'addtotop' ) {
                //this.addHtmlBuffer = $(childView.render().el).outerHTML() + this.addHtmlBuffer;
                this.addHtmlBuffer.push( childView.render().el );
                this.delayedAdd();
            }
            else this.$el.append(childView.render().el);

            this.$el.delay(100).listview().listview("refresh");
        }
    },

    // We want to add content to dom all at once, so underscores debounce is used to achieve this
    delayedAdd : _.debounce( function(){
        // Make space for the incoming stuff
        var $loader = $('li.loader',this.el);
        if( this.options.mode === 'addtotop'){
            var incoming_h = 102 * this.addHtmlBuffer.length;
            var cur_h = this.$el.height();
            this.$el.css('height', cur_h + incoming_h );
            window.scrollBy(0, incoming_h );
            $loader.after($(this.addHtmlBuffer));
        }
        else{
            $loader.before($(this.addHtmlBuffer));
        }

        this.addHtmlBuffer = [];
        this.$el.delay(100).listview().listview("refresh");
        $loader.removeClass().addClass('loader'); // Clean jqm stuff
        $('p',$loader).removeClass();
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

            $(viewToRemove.el).remove();

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

        this.$el.delay(100).listview().listview("refresh");

        // Show loader if there was 10 meeitngs returned
        if( this.options.infiniScroll && l == 10 ){
            var loader = '<li class="loader"><span class="loader" ></span><p>Loading more...</p></li>';
            if( this.options.mode === 'addtotop'){
                this.$el.prepend( loader );
            }
            else{
                this.$el.append( loader );
            }
        }

        this._rendered = true;

        return this;
    },

    scrolledMore : function(col, res) {
        if( res.length < 10 ){
            this.hideLoader();
            var msg = this.emptyString;
            var mode = this.options.mode;
            var el = this.$el;

            // Allow time for the delayed render function to complete
            setTimeout(function(){
                if( mode === 'addtotop'){
                    window.scrollBy(0, 30);
                    el.prepend(msg);
                }
                else{
                    el.append(msg);
                }
            },500);
        }
    },
    hideLoader : function(){
        $('li.loader', this.el).hide();
        if( this.options.mode === 'addtotop'){
            window.scrollBy(0, -94);
            this.$el.css('height', this.$el.height() - 94);
        }
    }
});

