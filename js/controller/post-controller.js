var time_one = 0 ;
angular.module('myapp')
.controller('PostController', function() {
            
})
.directive('postDir' , function ($routeParams,$http,$rootScope){
		return {
			link: function() {
                clearInterval(myVar);
				localStorage.setItem("cat_pos",$routeParams.id)
                document.getElementById('loading').style.display ="table";
                document.getElementById('home_btn').style.display ="none";
                $(document).ready(function(){
                    $('.loading_post').hide();
                });
                var scroll_top = 0 ;
                var post_data = [] ;    
                var offset = 0 ; 
				var scr = 0;
              
                if($(window).width() < 768){
                    var ofs_limit = 9;
                }
                else{
                    var ofs_limit = 18;
                }
                $(window).resize(function(){
                    if($(window).width() < 768){
                        var ofs_limit = 9;
                    }
                    else{
                        var ofs_limit = 18;
                    }
                });
                if($rootScope.post != null || $rootScope.post !== undefined  )
                {
                    if($rootScope.post[0].cat_id == $routeParams.id )
                    {
                        offset = $rootScope.post.length - 1;
                        post_data = $rootScope.post;
                        for(var i=0;i< post_data.length;i++)
                        { 
                            var $content ='<a href="#/detail/'+post_data[i].ID+'" class="post_one"  id="p_'+post_data[i].ID+'" style="background-image:url('+post_data[i].thumb+');" >';
                                                            
                            $content +='<div class="detail">';           
                            $content +=' <div class="post_info"><span class="post_info_date">'+moment((post_data[i].post_date).valueOf()).format(' jD  jMMMM jYYYY')+'</span><span class="post_info_viewer">'+moment((post_data[i].post_date).valueOf()).format('HH:mm:ss')+'<span></span></span></div>';
                            $content +=' <p>'+post_data[i].post_title+'</p>';
                            $('.posts').append( $content );
                        }
                        setTimeout(function(){
                            $('.content').animate({ scrollTop: localStorage.getItem('postion')+"px" }  , 400);
                            localStorage.setItem('postion',null);
                        },500);
                        
                        $('#loading').hide();
                        document.getElementById('home_btn').style.display ="block";
                              
                    }
                    else
                    {         time_one = 0 ;
                             FetchDataFromServer(offset); 
                    }
                }
                else
                {    
                     time_one = 0 ;
                    FetchDataFromServer(offset); 
                }
                $('.content').scroll(function(){
                    scroll_top = $('.content').scrollTop();
                    var ones = ( ( $('.content').scrollTop() + ($(window).height())+((0.7)*($(window).height()))) -  $('.posts').height()  );
                    var twoes = ( $(window).height()*(2/3) );
                    
                    if(ones > twoes && scr == 0)
                    {
                        console.log('1');
                        FetchDataFromServer(offset);
                    }
                });
                /*====================================================*/
                function FetchDataFromServer(ofs){
                    scr = 1;
                    if(time_one == 0){
                        time_one ++;
                         $('.loading_two').hide();
                    }
                    else{
                        $('.loading_post').show();
                    }
                    //  $('.loading_two').show();
                   
                    $.getJSON("http://zibajoo.ir/app/posts.php?offset="+ofs+"&limit="+ofs_limit+"&cat_id="+$routeParams.id,function(data){
                          
                        data = data.data;
                        for(var i=0;i< data.length;i++)
                        {
                            if(data[i].cat_id == $routeParams.id )
                            {
                                var $content ='<a href="#/detail/'+data[i].ID+'" id="p_'+data[i].ID+'" class="post_one" style="background-image:url('+data[i].thumb+');" >';
                                $content +='<div class="detail">';           
                                $content +=' <div class="post_info"><span class="post_info_date">'+moment((data[i].post_date).valueOf()).format(' jD  jMMMM jYYYY')+'</span><span class="post_info_viewer">'+moment((data[i].post_date).valueOf()).format('HH:mm:ss')+'<span></span></span></div>';
                                $content +=' <p>'+data[i].post_title+'</p></div></a>';
                                $('.posts').append( $content );
                                post_data.push(data[i]);
                            }
                            
                        }
                        $rootScope.post  = post_data;
                        document.getElementById('loading').style.display = "none";
                        document.getElementById('home_btn').style.display ="block";
                        $('.loading_post').hide();
                        scr = 0;
                        offset+= 9;
                           
                    }).
                    fail(function() {
                             $('.loading_two,.loading_post').hide();
                           $.fancybox.open("<p class='alerts'> لطفا اینترنت گوشی خود را فعال کنید </p><span class='ref_btn'><button class='refresh'>تلاش مجدد</button><button class='exit'>بازگشت</button></span>",{modal:true, height: 50,width:100 ,padding : 0});
                    });
                          
                       
                }
                /*======================================a disable detail=========================================*/     
                $('body').on("click","a",function(){
                    var href = $(this).attr("href");
                    
                    if( href.indexOf('http') >= 0)
                    {
                       return false;
                    }
                    
                });
                
                /*====================================================*/
                
                var draggable = document.getElementById('home_btn');
                draggable.addEventListener('touchmove', function(event) {
                    var touch = event.targetTouches[0];
                          
                    // Place element where the finger is
                    draggable.style.left = touch.pageX-25 + 'px';
                    draggable.style.top = touch.pageY-25 + 'px';
                    event.preventDefault();
                }, false);
                
                /*====================================================*/
                $(function(){
                    $('body').on('click','.post_one',function(){
                        localStorage.setItem('postion',scroll_top);
                        window.location.hash = $(this).attr('href');
                        return false;
                    });
                });
                /*====================================================*/
                /*======================end  click interneti link ===================================*/
                $('body').on("click",".refresh",function(){
                    $.fancybox.close();
                    FetchDataFromServer(offset);
					
                }); 
                $('body').on("click",".exit",function(){
                    $.fancybox.close();
                    $('.loading_two,.loading_post').hide();
                    $('.refresh_ico').show();
                    document.getElementById('loading').style.display = "none";
                            
                });
                $('body').on("click",".refresh_ico",function(){
                    $('.refresh_ico').hide();
                    
                    FetchDataFromServer(offset);
                }); 
           /*======================chech dobare net===================================*/

            }/* end */
}}).directive('aboutDir' , function (){
		return {
			link: function() {
                /*====================================================*/
                
                var draggable = document.getElementById('home_btn');
                draggable.addEventListener('touchmove', function(event) {
                    var touch = event.targetTouches[0];
                          
                    // Place element where the finger is
                    draggable.style.left = touch.pageX-25 + 'px';
                    draggable.style.top = touch.pageY-25 + 'px';
                    event.preventDefault();
                }, false);
                
                /*====================================================*/
            }
}});  
