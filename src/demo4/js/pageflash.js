
function getRandomNum(Min,Max){   
  var Range = Max - Min;   
  var Rand = Math.random();   
  return(Min + Math.round(Rand * Range));
}


var cAnimation = window.cAnimation;
var cNum = window.cNum;
var cSwiper = window.Swiper;

    var flash = {
        init: function(){
          
          
        },
        
        
        
        
    };

$(function() {
  $('[data-scenes=1]').find('[data-num]').map(function(ind,item){
    var key = $(item).attr('data-num');
    var num = 0;
    if(key === "num1"){
        num = getRandomNum(5,99);
        $(item).attr('data-num',num);
    }else if(key === "num2"){
        num = getRandomNum(200,500);
        $(item).attr('data-num',num);
    }
  });

  var player = new cAnimation($('.swiper-container'));
  var win_wid = $(window).width();
  var win_hei = $(window).height();
  var min_hei = win_wid>768?700:450;
  var $video = $('.wrap_other');
  var numRun = new cNum($('[data-scenes=1]'));
  player.enter(0);

    window.swiper = this.swiper = new cSwiper('.swiper-container', {
        direction: 'vertical',
        speed:600,
        parallax:true,
        mousewheel: true,
        simulateTouch: false,
        slidesPerView: 'auto',
        longSwipesMs: 1000,
        longSwipesRatio: 0.1,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        on:{
            init:function(e){
                if( win_hei < min_hei){
                    
                    win_hei = min_hei;
                }
            },
            resize:function(){
                var self = this;
                setTimeout(function() {
                  
                    win_hei = $(window).height();
                    if( win_hei < min_hei){
                        win_hei = min_hei;
                    }
                    if(self.activeIndex >= 1 && self.activeIndex < 4){
                        var _top = self.snapGrid[self.activeIndex] + win_hei*0.5;
                        $video.css('top' , _top);
                    }
                    self.updateSize();
                }, 100);
            },
            slideChange:function(){
                if(this.previousIndex === this.activeIndex){
                    return false;
                }
                player.enter(this.activeIndex);
                if(this.activeIndex >= 1 && this.activeIndex < 4){
                    var _top = this.snapGrid[this.activeIndex] + win_hei*0.5;
                    $video.css('top' , _top);
                }
                if(this.activeIndex === 1){
                    numRun.run();
                }
                if(this.activeIndex === 0){
                  this.pagination.$el.addClass("clarity");
                }else{
                  this.pagination.$el.removeClass("clarity");
                }
            }
        }
    });

  setTimeout(() => {
    this.swiper.update();
  }, 300);
})

    
