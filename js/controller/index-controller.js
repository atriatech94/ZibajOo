var myVar = 0 ;
angular.module('myapp')
.controller('IndexController', function() {
          
})
.directive('indexDir' , function (){
		return {
			link: function() {
				clearInterval(myVar);
                 window.addEventListener('load', function() {
					new FastClick(document.body);
				}, false);
				/*====================================================*/
                $(document).ready(function(){
                    localStorage.setItem('postion',null);
                    /*====================================================*/
                    var cat_len = $('.cat a').length;
                    var now_cat = 0;
                    $('.cat a.active p').addClass('color');
                   myVar =  setInterval(function(){transition_img();},3000);
                    /*====================================================*/
                    function transition_img()
                    {
                        if((cat_len-1) == now_cat){clearInterval(myVar);}else{now_cat++;}
                        $('*.cat a').removeClass('active');
                        $('.cat a p').removeClass('color');
                        $('.cat a:eq('+now_cat+')').addClass('active');
                        $('.cat a.active div').css({"background-position":"top"});
                        $('.cat a.active p').addClass('color');
                        $('.cat a.active div').animate({'background-position-y': '-100px'}, 5000);
                        $('.cat a.active p').animate({'background-color': 'transparent'}, 5000);
                    }
                    /*====================================================*/
                });
				/*====================================================*/
            }/* end */
}});
