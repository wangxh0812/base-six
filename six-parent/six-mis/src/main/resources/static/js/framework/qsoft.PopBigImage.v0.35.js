/**
    
    qsoft.PopBigImage
    
    version：0.35
    author： kimmking@163.com
    date：   2009年3月25日3:54:50
    
    功能描述：
    一般页面的的图片为了布局考虑，显示大小都小于实际大小。
    鼠标在图片上移动时，在旁边展示一个跟此图片显示大小一样的层。
    并讲鼠标附近区域对应的原始图片的区域按原始大小显示在这个层中。
    
    v0.1：实现了IE下的鼠标滑动小图动态展示对应的放大局部图的功能。
    v0.2：实现了Firefox的兼容支持，修改了IE下传递偏移0,0时有空隙的对不齐问题。
    v0.3：实现了鼠标第一次进入图片时动态创建显示层。提供了一个静态创建方法。
    v0.35：加入了对google chrome浏览器的支持。
    
    
    参数描述：
    origImageId： 要绑定的img对象的id
    dx：展示大图相对于绑定的img对象右方的x轴偏移量
    dy：展示大图相对于绑定的img对象上方的y轴偏移量
    mx：展示层的宽
        mx在0到1之间时，取大图的宽*mx的值与小图的宽中的较大者
        mx在1到10之间时，取小图的宽*mx的值与大图的宽中的较小者
        mx大于10时，确保mx在大小图的宽之间，超出的话，取边界值
    my：展示层的高
        参照mx的值
    bflag：create方法中渲染完后是否将展示层显示出来，
            在onmouseover事件中使用true参数
            在页面加载时初始化的话使用false参数
    
    
    
    用法：
    1、页面加载后统一预先加载，在页面上添加JavaScript脚本
    window.onload = function(){
        new qsoft.PopBigImage("orig",20,0,2,2).render();  
        //或是 qsoft.PopBigImage.create("orig",20,0,2,2,false).render();    
    }
    
    或是
    2、鼠标第一次进入图片时才加载本图片的显示层，在img标签中添加 
    onmouseover="qsoft.PopBigImage.create(this,20,0,2,2,true);"
    
    **/
   
    var qsoft = { 
        version : 0.35,
        isIE : document.all?true:false,
        prefx : 'qsoft',
        __id : 0,
        nextId : function ()
        {
            return this.prefx + this.__id++;
        } 
    }
    
    qsoft.PopBigImage = function (origImage,dx,dy,mx,my)
    {
        var type = typeof(origImage);
        if(type.toLowerCase() == "string")
            this.oim = document.getElementById(origImage);
        else
            this.oim = origImage;
            
        if(typeof(this.oim.pbi) != "undefined")
            return this.oim.pbi;
            
        this.id = qsoft.nextId();
        this.oim.__maskid = this.id;
        this.oim.style.cursor = "crosshair";
        
        this.ow = this.oim.width;
        this.oh = this.oim.height;
        
        this.detaX = (typeof(dx) == "undefined")?30 : dx;
        this.detaY = (typeof(dy) == "undefined")?0 : dy;
        
        var getPos = function(o) // for chrome
        {
            var x = 0, y = 0;
            do{ x += o.offsetLeft;y += o.offsetTop;}while((o=o.offsetParent));
            return {left:x,top:y};
        }
        
        this.getPosition = function(o)
        {
            return document.documentElement.getBoundingClientRect && o.getBoundingClientRect() || getPos(o); 
        }

        var rect = this.getPosition(this.oim); 
        this.ol = rect.left + this.detaX + this.ow - (qsoft.isIE ?2:0);
        this.ot = rect.top + this.detaY - (qsoft.isIE ?2:0);
        
        this.src = this.oim.src;
        
        this.getImageSize = function (img)
        {
            var im = new Image();
            im.src = img.src;
            
            var size = {};
            size.width = im.width;
            size.height = im.height;
            
            im = null;
            delete im;
            
            return size;
        }
           
        var rsize = this.getImageSize(this.oim);
        this.w = rsize.width;
        this.h = rsize.height;
        
        this.maskX = (typeof(mx) == "undefined")? this.ow : mx;
        this.maskY = (typeof(my) == "undefined")? this.oh : my;
        if(this.maskX < 1) 
            this.maskX = Math.ceil(this.w * this.maskX); 
        else if (this.maskX < 10) 
            this.maskX = Math.ceil(this.ow * this.maskX);
        if(this.maskY < 1) 
            this.maskY = Math.ceil(this.h * this.maskY); 
        else if (this.maskY < 10) 
            this.maskY = Math.ceil(this.oh * this.maskY);  
        this.maskX = this.maskX < this.ow ? this.ow : this.maskX ;
        this.maskY = this.maskY < this.oh ? this.oh : this.maskY ;
        this.maskX = this.maskX > this.w ? this.w : this.maskX ;
        this.maskY = this.maskY > this.h ? this.h : this.maskY ;
        
        var qObj = this;
        this.createMask = function ()
        {
            if(typeof(this.mask) == "undefined")
            {
                this.mask = document.createElement("div");
                this.mask.id = this.oim.__maskid + "_mask";
                this.mask.style.position  = "absolute";
                this.mask.style.width = this.maskX + "px";
                this.mask.style.height = this.maskY + "px";
                this.mask.style.left = this.ol + "px";
                this.mask.style.top = this.ot + "px";    
                this.mask.style.backgroundImage  = "url("+this.src+")";
                this.mask.style.backgroundRepeat = "no-repeat";     
                this.mask.style.display = "none";
                //this.mask.style.zIndex = 1000; 
                this.mask.style.zIndex = 99999; 
                document.body.appendChild(this.mask);      
            }
        }
        
        this.regEvent = function ()
        {
            this.oim.onmousemove = function ()
            {

                var e = arguments[0] || window.event;
                var ct = e.target || e.srcElement;
                var sz = qObj.getPosition(ct);
                var ox = qsoft.isIE ? e.offsetX: (e.pageX - sz.left);
                var oy = qsoft.isIE ? e.offsetY: (e.pageY - sz.top);
                var x = Math.ceil(ox * qObj.w/qObj.ow) - qObj.maskX/2;
                var y = Math.ceil(oy * qObj.h/qObj.oh) - qObj.maskY/2;
           
               if(x<0) x = 0;
               if(y<0) y = 0;
               var maxx = Math.ceil((qObj.w-qObj.maskX));
               var maxy = Math.ceil((qObj.h-qObj.maskY));
               if(x>maxx) x = maxx;
               if(y>maxy) y = maxy;
               qObj.mask.style.backgroundPosition = -x  + "px " + -y + "px"; 
 
            }

            this.oim.onmouseout = function ()
            {
                qObj.mask.style.display = "none";
            }
        
            this.oim.onmouseover = function ()
            {
                qObj.mask.style.display = "block";
            }
            
        }
        
        this.render = function ()
        {
            this.createMask();
            this.regEvent();
        } 
        
    }

    qsoft.PopBigImage.create  = function (origImage,dx,dy,mx,my,bflag)
    {
        var q = new qsoft.PopBigImage(origImage,dx,dy,mx,my);
        q.render();
        if(bflag)
            q.mask.style.display = "block";
        return q;
    }