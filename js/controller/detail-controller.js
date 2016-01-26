
angular.module('myapp')
.controller('DetailController', function() {
  
   
})
.directive('detailDir' ,  function ($routeParams,$rootScope,$sce,$filter){
		return {
			link: function(scope) {
        
            scope.detail = $filter('filter')($rootScope.post,{ID:$routeParams.id});
            scope.description = $sce.trustAsHtml(scope.detail[0].post_content);
            scope.title = $sce.trustAsHtml(scope.detail[0].post_title);
            scope.date =  moment((scope.detail[0].post_date).valueOf()).format(' jD  jMMMM jYYYY');
            scope.time =  moment((scope.detail[0].post_date).valueOf()).format('HH:mm:ss'); 
                        
                $(document).ready(function(){
                    
                    $('.back_btn_pd').on("click",function(){
                       window.location.hash = "#/post/"+localStorage.getItem('cat_pos'); 
                    });
                    
                      $('.share').on("click",function(){
                        window.plugins.socialsharing.share('SHARED BY ZIBAJOO IOS APP', null, scope.detail[0].thump,scope.detail[0].guid);
                    });
                    /*
                    setTimeout(function(){chech_scroll();}, 1000 );
                    
                    $('.post_detail').scroll(function(){
                        chech_scroll();
                    });
                    
                    function chech_scroll(){
                        if( ( ($('.call_to_action').offset().top) - ($(window).height()) ) > 0 )
                        {
                            $('.back_btn_pd').addClass('fix_back_btn');
                        }
                        else{
                            $('.back_btn_pd').removeClass('fix_back_btn');
                        }
                    }
                    */
                });
                /*======================================reuqest=========================================*/ 
                var draggable = document.getElementById('draggable');
                  draggable.addEventListener('touchmove', function(event) {
                    var touch = event.targetTouches[0];

                    // Place element where the finger is
                    draggable.style.left = touch.pageX-25 + 'px';
                    draggable.style.top = touch.pageY-25 + 'px';
                    event.preventDefault();
                  }, false);
                /*====================================================*/
            }/* end */
}});
