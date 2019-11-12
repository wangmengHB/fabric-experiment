(function(cAnimation,cNum,cSwiper) {
  cAnimation = window.cAnimation;
  cNum = window.cNum;
  cSwiper = window.Swiper;

    var flash = {
        init: function(){
            this.$totop = $('[data-js=contract_totop]');
            this.initui();
            this.flashSwipe();
            this.bind();
        },
        flashSwipe: function(){
            var that = this;
            var jingguanheader = $('[data-js="jingguan-header"]');
            var _headBtn = jingguanheader.find('.header__linkbutton').hide();
            if(window.sign){
                _headBtn = _headBtn.eq(0);
            }else{
                _headBtn = _headBtn.eq(1);
            }
            jingguanheader.show().addClass("clarity");

            // var delay = 2000;
            // var deg = 50;
            var player = new cAnimation($('.swiper-container'));
            var win_wid = $(window).width();
            var win_hei = $(window).height();
            var min_hei = win_wid>768?700:450;
            var $video = $('.wrap_other');
        
            var numRun = new cNum($('[data-scenes=1]'));
            player.enter(0);
    
            this.swiper = new cSwiper('.swiper-container', {
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
                            //this.snapGrid[this.snapGrid.length - 1] = min_hei * 5 + this.slidesSizesGrid[this.slidesSizesGrid.length - 1] - win_hei;
                            win_hei = min_hei;
                        }
                    },
                    resize:function(){
                        var self = this;
                        setTimeout(function() {
                            win_hei = $(window).height();
                            if( win_hei < min_hei){
                                //self.snapGrid[self.snapGrid.length - 1] = min_hei * 5 + self.slidesSizesGrid[self.slidesSizesGrid.length - 1] - win_hei;
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
                            jingguanheader.show().addClass("clarity");
                            this.pagination.$el.addClass("clarity");
                            _headBtn.hide();
                            that.$totop.stop().hide(100);
                        }else{
                            this.pagination.$el.removeClass("clarity");
                            jingguanheader.show().removeClass("clarity");
                            _headBtn.css('display','inline-block');
                            that.$totop.stop().show(500);
                        }
                    }
                }
            });
        },
        initui: function(){
            //初始化header
            //随机数
            function GetRandomNum(Min,Max){   
                var Range = Max - Min;   
                var Rand = Math.random();   
                return(Min + Math.round(Rand * Range));
            }
            
            $('[data-scenes=1]').find('[data-num]').map(function(ind,item){
                var key = $(item).attr('data-num');
                var num = 0;
                if(key === "num1"){
                    num = GetRandomNum(5,99);
                    $(item).attr('data-num',num);
                }else if(key === "num2"){
                    num = GetRandomNum(200,500);
                    $(item).attr('data-num',num);
                }
            });
            $("[data-js=mobile-mask]").click(function(){
                $(this).hide();
            });
        },
        toTop: function(){
            var $video = $('.wrap_other');
            $video.css('top' , 'auto');
            this.swiper.slideTo(0, 600, false);
        },
        bind: function(){
            //回到顶部
            var that = this;
            this.$totop.click(function(e){
                e.preventDefault();
                that.toTop();
            });
        }
    };
    window.cFlash = flash;
    return flash;
})();