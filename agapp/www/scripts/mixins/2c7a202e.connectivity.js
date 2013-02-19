app.mixins.connectivity = {
  errorHandler : function(mod, error, options){
        // Retry the fetch<
        if( this.errors < 2 || this.errors > 2 ){
            this.errors++;
            this.model.fetch({ timeout : 5000 });
        }
        else{
            this.notice_bar = $('body').prepend( templatizer.noticeBar() );
            this.errors++;
        }
    },
    successHandler : function( mod, error, options){
        console.log('success')
        this.errors = 0;
        if( this.notice_bar ){
            this.notice_bar.remove();
        }
    }
};
