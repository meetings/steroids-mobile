// Generic Updating Collection View that offers
// * infinite scroll
// * filtering
// * searching
app.genericCollectionView = Backbone.View.extend({
    defaults : {
        infiniScroll : false
    },
    initialize : function(options) {
        // Check requirements
        if (!options.childViewConstructor) throw "no child view constructor provided";
        if (!options.childViewTagName) throw "no child view tag name provided";

        // Bind this to this object
        _(this).bindAll('add', 'remove', 'reset');

        // Save options
        this.options = $.merge( options, this.defaults );

        // Cache jQuery selector for parent element
        this.el = $(this.el);

        // Setup infinite scrolling
        if (this.options.infiniScroll){
            var that = this;
            this.infiniScroll = new Backbone.InfiniScroll(this.collection, {success: function(col, res){ that.scrolledMore(col, res); }});
        }

        // Setup childviews & bind events
        this._childViewConstructor = options.childViewConstructor;
        this._childViewTagName = options.childViewTagName;
        this._childViews = [];
        console.log(this.collection);
        this.collection.each(this.add);
        this.collection.bind('add', this.add);
        this.collection.bind('remove', this.remove);
        this.collection.bind('reset', this.reset);

        // Setup onRender function
        if (options.onRender !== null && options.onRender !== undefined) {
            this.onRender = options.onRender;
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

        if( options.index === 0 ) this._childViews.unshift(childView);
        else this._childViews.push(childView);

        if (this._rendered) {

            if( options.index === 0 ) this.el.prepend(childView.render().el);
            else this.el.append(childView.render().el);

            if (this.onRender !== null && this.onRender !== undefined) {
                this.onRender();
            }
            this.el.trigger('create'); // JQM
        }
    },

    // Remove model from the collection
    remove : function(model) {
        var viewToRemove = _(this._childViews).select(function(cv) { return cv.model === model; })[0];
        this._childViews = _(this._childViews).without(viewToRemove);

        if (this._rendered) {

            $(viewToRemove.el).remove();

            if ( this.options.masonry){
                this.el.masonry( 'appended', $(childView.el), true );
            }

            if (this.onRender !== null && this.onRender !== undefined) {
                this.onRender();
            }
            this.el.page(); // JQM
        }
    },

    // Render the whole view
    render : function() {
        this._rendered = true;

        this.el.html('');

        var s = this._childViews.length;
        for (var i = 0; i < s ; i++ ){
            this.el.append(this._childViews[i].render().el);
        }

        // Call on render function
        if (this.onRender !== null && this.onRender !== undefined) {
            this.onRender();
        }
        //this.el.trigger('create'); // JQM
        this.el.listview("refresh");
        //this.el.page(); // JQM
        return this;
    },

    scrolledMore : function(col, res) {
        if( res.length < 10 ){
            this.el.after('<div style="width:100%;border:1px solid #ccc; padding:20px"><h2>No more meetings.</h2></div>');
        }
    }

});

