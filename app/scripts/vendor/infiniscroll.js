// Created by Jonathan Eatherly, (https://github.com/joneath)
// MIT license
// Version 0.1

(function() {
    Backbone.InfiniScroll = function(collection, options) {
        options = options || { };

        var self = { },
        $target,
        fetchOn,
        page,
        pageSize = 10,
        prevScrollY = 0;

        self.collection = collection;
        self.options = _.defaults(options, {
            success: function(){ },
            error: function(){ },
            onFetch: function(){ },
            queryParamsFunc: false,
            target: $(window),
            param: "until",
            untilAttr: "id",
            pageSize: pageSize,
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

        var initialize = function() {
            $target = $(self.options.target);
            fetchOn = true;
            page = self.options.initialPage || 1;

            $target.on("scroll", self.watchScroll);
        };

        self.destroy = function() {
            $target.off("scroll", self.watchScroll);
        };

        self.enableFetch = function() {
            setTimeout(function(){
                fetchOn = true;
            },50);
        };

        self.disableFetch = function() {
            fetchOn = false;
        };

        self.onFetch = function() {
            self.options.onFetch();
        };

        self.fetchSuccess = function(collection, response) {
            if ((self.options.strict && collection.length >= (page + 1) * self.options.pageSize) || (!self.options.strict && response.length >= self.options.pageSize)) {
                self.enableFetch();
                page += 1;
            } else {
                self.disableFetch();
            }
            self.options.success(collection, response);
        };

        self.fetchError = function(collection, response) {
            self.enableFetch();
            self.options.error(collection, response);
        };

        self.watchScroll = function(e) {
            var queryParams,
            scrollY = $target.scrollTop() + $target.height(),
            scrollYbottom = $target.scrollTop(),
            docHeight = $target.get(0).scrollHeight;

            if (!docHeight) {
                docHeight = $(document).height();
            }

            if ( self.collection.length < self.options.pageSize ) return;

            // Check scroll params
            var getmore = false;
            if( self.options.direction === 'down'){
                getmore = ( scrollY >= docHeight - self.options.scrollOffset && prevScrollY <= scrollY ) ? true : false;
            }
            else if( self.options.direction === 'up'){
                getmore = ( scrollYbottom <= self.options.scrollOffset && prevScrollY >= scrollY ) ? true : false;
            }

            if ( getmore && fetchOn ) {
                var lastModel = self.collection.last();
                if (!lastModel) { return; }

                self.onFetch();
                self.disableFetch();

                self.collection.fetch({
                    success: self.fetchSuccess,
                    error: self.fetchError,
                    add: self.options.add,
                    update: self.options.update,
                    remove: false,
                    data: self.options.queryParamsFunc ? self.options.queryParamsFunc(page) : buildQueryParams(lastModel)
                    //silent: true
                });
            }
            prevScrollY = scrollY;
        };

        function buildQueryParams(model) {
            var params = { };

            params[self.options.param] = typeof(model[self.options.untilAttr]) === "function" ? model[self.options.untilAttr]() : model.get(self.options.untilAttr);

            if (self.options.includePage) {
                params.offset = (page ) * self.options.pageSize;
                params.limit = self.options.pageSize;
            }

            if ( self.options.extraParams ){
               params =  _.extend( self.options.extraParams, params );
            }

            if( self.options.query ){
                params = _.extend( params, self.options.query );
            }

            return params;
        }

        initialize();

        return self;
    };
})();


