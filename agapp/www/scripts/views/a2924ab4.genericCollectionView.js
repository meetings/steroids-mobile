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

        // Cache jQuery selector for parent element
        this.el = $(this.el);

        // Initiate add buffer
        this.addHtmlBuffer = '';

        // Setup infinite scrolling
        if (this.options.infiniScroll){
            var that = this;
            var direction = this.options.infiniScrollDirection || 'down';
            var extraParams = this.options.infiniScrollExtraParams || {};
            this.infiniScroll = new Backbone.InfiniScroll(this.collection, {
                success: function(col, res){ that.scrolledMore(col, res); },
                onFetch: function(){
                    this.view.showLoader();
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
                this.addHtmlBuffer += $(childView.render().el).outerHTML();
                this.delayedAdd();
            }
            else this.el.append(childView.render().el);



            this.el.listview("refresh");

            if( this.options.mode === 'addtotop' ){
                this.keepScrollPos();
            }
        }
    },

    // We want to add content to dom all at once, so underscores debounce is used to achieve this
    delayedAdd : _.debounce( function(){

        this.el.prepend(this.addHtmlBuffer);
        this.addHtmlBuffer = '';
        this.el.listview("refresh");

    },20),

    // Remove model from the collection
    remove : function(model) {
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

        this.el.html('');

        var s = this._childViews.length;
        for (var i = 0; i < s ; i++ ){
            this.el.append(this._childViews[i].render().el);
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
        if( ! s && this._rendered && typeof this.emptyString === 'string' ){
            this.el.html( this.emptyString );
        }

        this.el.listview("refresh");

        this._rendered = true;

        return this;
    },

    scrolledMore : function(col, res) {
        this.loader.remove();
        if( this.options.mode === 'addtotop'){
            window.scrollBy(0, 102 * res.length  );
        }
        if( res.length < 10 ){
            var msg = this.emptyString;
            var mode = this.options.mode;
            var el = this.el;

            // Allow time for the delayed render function to complete
            setTimeout(function(){
                if( mode === 'addtotop'){
                    el.prepend(msg);
                }
                else{
                    el.append(msg);
                }
            },500);
        }
    },
    keepScrollPos : function(){
        //window.scrollBy(0,102);
    },
    showLoader : function(){
        this.loader = $('<li style="text-align:center;"><span class="loader" ></span><p>Loading more...</p></li>');
        if( this.options.mode === 'addtotop'){
            this.el.prepend(this.loader);
        }
        else{
            this.el.append(this.loader);
        }
    }
});

