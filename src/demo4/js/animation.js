(function(){
     function cAnimation(_wrap){
        this.index = 0;
        this.scene = [
        ];
        this.director = null;
        this.init(_wrap);
    }

    cAnimation.prototype = {
        init:function(_wrap){
            var scenes,self = this;
            _wrap = _wrap || 'document';
            this.$wrap = $(_wrap);
            scenes = this.$wrap.find('[data-scenes]');
            scenes.map(function(index,item){
                var data = self.getInfo(item);
                self.scene.push(data);
            });
        },
        getInfo:function(_item){
            var _list = $(_item).find('[data-delay]');
            var _data = [];
            _list.map(function(index,item){
                _data.push({
                    _dom:$(item),
                    delay:$(item).attr('data-delay') || 0
                });
            });
            _data.sort(function(a,b){
                return a.delay - b.delay;
            });
            return _data;
        },
        turnScene:function(_dir){
            this.enter(this.index - _dir);
        },
        enter:function(_index){
            var scene = this.getScene(_index);
            if(scene){
                this.level(this.index);
                //场景切换回调
                this.changeScene(_index,this.index);
                this.$wrap.removeClass('page'+this.index).addClass('page'+_index);
                this.index = _index;
                this.play(scene,-1);
            }
            
        },
        level:function(_index){
            var scene = this.getScene(_index);
            this.stop();
            scene.map(function(item,index){
                $(item._dom).removeClass('active');
            });
        },
        play:function(scene,ind,now){
            ind++;
            var self = this,_aim = scene[ind];
            now = now || 0;
            if(_aim){
                this.director = setTimeout(function(){
                    _aim._dom.addClass('active');
                    self.play(scene,ind,_aim.delay);
                },(_aim.delay - now));
            }
        },
        stop:function(){
            clearTimeout(this.director);
        },
        getScene:function(_index){
            return this.scene[_index];
        },
        changeScene:function(){}
    };

    window.cAnimation = cAnimation;

    return cAnimation;
})();