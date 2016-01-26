
angular.module('myapp')
.controller('videoController', function() {
            
})
.directive('videoDir' , function ($routeParams,$http,$rootScope){
		return {
			link: function() {
				localStorage.setItem("cat_pos","9")
                document.getElementById('loading').style.display ="table";
                document.getElementById('home_btn').style.display ="none";
                $(document).ready(function(){
                    $('.loading_post').hide();
                });
                var scroll_top = 0 ;
                var post_data = [] ;    
                var offset = 0 ; 
				var scr = 0;
                var time_one = 0 ;
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
                
                FetchDataFromServer(offset); 
                
                $('.content').scroll(function(){
                    scroll_top = $('.content').scrollTop();
                    var ones = ( ( $('.content').scrollTop() + ($(window).height())+((0.7)*($(window).height()))) -  $('.posts').height()  );
                    var twoes = ( $(window).height()*(2/3) );
                    
                    if(ones > twoes && scr == 0)
                    {
                        FetchDataFromServer(offset);
                    }
                });
                /*====================================================*/
                function FetchDataFromServer(ofs){
                    scr = 1;
                    if(time_one == 0){
                        time_one ++;
                    }
                    else{
                        $('.loading_post').show();
                    }
                    //  $('.loading_two').show();
                   
                    $.getJSON("http://zibajoo.ir/app/posts.php?offset="+ofs+"&limit="+ofs_limit+"&cat_id="+9,function(data){
                          
                        data = data.data;
                        console.log(data);
                        for(var i=0;i< data.length;i++)
                        {
                            if(data[i].cat_id == 9 )
                            {
                                var $content ='<div class="video_div" style="background-image:url('+data[i].thumb+');" ><video  id="p_'+data[i].ID+'" width="0" height="0" preload="none">';
                                $content += '<source src="'+data[i].video+'" type="video/mp4">';
                                $content += '<source src="'+data[i].video+'" type="video/ogg">';         
                                $content += '</video><span class="video_caption">'+data[i].post_title+'</span><span class="play_btn"></span></div>';
                                $('.posts').append( $content );
                                post_data.push(data[i]);
                            }
                            
                        }
                      /*در ای او اس اسپن با کلاس play_btn 
                      حذف شود*/
                        document.getElementById('loading').style.display = "none";
                        document.getElementById('home_btn').style.display ="block";
                        $('.loading_post').hide();
                        scr = 0;
                        offset+=9;
                           
                    }).
                    fail(function() {
                          $('.loading_two,.loading_post').hide();
                           $.fancybox.open("<p class='alerts'> لطفا اینترنت گوشی خود را فعال کنید </p><span class='ref_btn'><button class='refresh'>تلاش مجدد</button><button class='exit'>بازگشت</button></span>",{modal:true, height: 50,width:100 ,padding : 0});
                    });
                          
                       
                }
                /*======================================a disable detail=========================================*/   
               
                $('.posts').on("click",".video_div",function(){
              
                    var myVideo = document.getElementById($(this).children('video').attr('id'));
                   
                    var this_vid = $(this);
                    $('video').each(function() {
                        $(this).get(0).pause();
                        $(this).get(0).removeAttribute("controls");
                        $(this).get(0).height = 0;
                        $(this).get(0).width = 0;
                    });
                    $('.video_caption ').show();
                    
                    
                    $(this).css({"background-image":"none","background-color":"#000","box-shadow":"none"});
                    
                    if (myVideo.paused) 
                    {
                        this_vid.children('.video_caption').hide();
                        this_vid.children('.play_btn').hide();
                        myVideo.play(); 
                        myVideo.setAttribute("controls","controls");
                        myVideo.height = $('.video_div').height();
                        myVideo.width = $('.video_div').width();
                    }
                    else 
                    {
                        this_vid.children('.video_caption').show();
                        this_vid.children('.play_btn').show();
                        myVideo.pause(); 
                        myVideo.removeAttribute("controls");
                        myVideo.height = 0;
                        myVideo.width = 0;
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
                /*====================================================*/
              

            }/* end */
}});
