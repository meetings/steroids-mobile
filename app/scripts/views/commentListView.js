app.commentListView = app.genericCollectionView.extend({
    renderExtras : function(){
        this.$el.prepend( templatizer.commentForm() );
        return;
    },
    events : {
        "click .send-comment" : "sendComment"
    },
    sendComment : function( e ){
        e.preventDefault();
        $( e.target ).html('...');
        var c = new app.commentModel();
        c.url = app.collections.comments.url;
        c.save({ content : $("#comment-input").val() }, { success : function(){
            app.collections.comments.fetch();
        }});
    }
});
