/**
 * Created by Sunshine on 16/6/24.
 */

var ph = {};

ph.tools = {};

ph.tools.getByClass = function(oParent,sClass){
    var aEle = oParent.getElementsByTagName('*');
    var arr = [];

    for(var i=0;i<aEle.length;i++)
    {
        if(aEle[i].className == sClass){
            arr.push(aEle[i]);
        }
    }
    return arr;
}

ph.tools.getStyle = function(obj,attr){
    if(obj.currentStyle)
    {
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];
    }
}


ph.ui = {};

ph.ui.textChange = function(obj,str){
    obj.onfocus = function(){
        if(this.value == str)
        {
            this.value = "";
        }
    }

    obj.onblur = function () {
        if(this.value == '')
        {
            this.value = str;
        }
    }
}

ph.ui.fadeIn = function(obj){
    var iCur = ph.tools.getStyle(obj,'opacity');
    if(iCur == 1) return false;

    var value = 0;
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var iSpeed = 5;
        if(value == 100)
        {
            clearInterval(obj.timer);
        }else{
            value += iSpeed;
            obj.style.opacity = value/100;
            obj.style.filter = 'alpha(opacity = '+value+')';
        }
    },30);
}

ph.ui.fadeOut = function(obj){
    var iCur = ph.tools.getStyle(obj,'opacity');
    if(iCur == 0) return false;

    var value = 100;
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var iSpeed = -5;
        if(value == 0)
        {
            clearInterval(obj.timer);
        }else{
            value += iSpeed;
            obj.style.opacity = value/100;
            obj.style.filter = 'alpha(opacity = '+value+')';
        }
    },30);
}


ph.app = {};

ph.app.toTip = function(obj,str){
    var text1 = document.getElementById('text1');
    var text2 = document.getElementById('text2');

    ph.ui.textChange(text1,'Search website');
    ph.ui.textChange(text2,'Search website');
}

ph.app.topBanner = function(){
    var oDd = document.getElementById('ad');
    var aLi = oDd.getElementsByTagName('li');

    var oPrevBg = ph.tools.getByClass(oDd,'prev_bg')[0];
    var oNextBg = ph.tools.getByClass(oDd,'next_bg')[0];
    var oPrev = ph.tools.getByClass(oDd,'prev')[0];
    var oNext = ph.tools.getByClass(oDd,'next')[0];

    var iNow = 0;
    var timer = setInterval(auto,3000);

    function auto(){
        if(iNow == aLi.length-1)
        {
            iNow = 0;
        }else{
            iNow++;
        }

        for(var i = 0;i<aLi.length;i++)
        {
            ph.ui.fadeOut(aLi[i]);
        }
        ph.ui.fadeIn(aLi[iNow]);
    }

    function autoPrev(){
        if(iNow == 0)
        {
            iNow = aLi.length-1;
        }else{
            iNow--;
        }

        for(var i = 0;i<aLi.length;i++)
        {
            ph.ui.fadeOut(aLi[i]);
        }
        ph.ui.fadeIn(aLi[iNow]);
    }

    oPrevBg.onmouseover = oPrev.onmouseover = function(){
        oPrev.style.display = 'block';
        clearInterval(timer);
    }
    oNextBg.onmouseover = oNext.onmouseover = function(){
        oNext.style.display = 'block';
        clearInterval(timer);
    }
    oPrevBg.onmouseout = oPrev.onmouseout = function(){
        oPrev.style.display = 'none';
        timer = setInterval(auto,3000);
    }
    oNextBg.onmouseout = oNext.onmouseout = function(){
        oNext.style.display = 'none';
        timer = setInterval(auto,3000);
    }

    oPrev.onclick = function(){
        autoPrev();
    }

    oNext.onclick = function(){
        auto();
    }
}

ph.app.toSel = function(){
    var oSel = document.getElementById('sel1');
    var aDd = oSel.getElementsByTagName('dd');
    var aUl = oSel.getElementsByTagName('ul');

    for(var i=0;i<aDd.length;i++)
    {
        aDd[i].index = i;
        aDd[i].onclick = function(ev){
            var ev = ev || window.event;
            var This = this;

            for(var i=0;i<aUl.length;i++)
            {
                aUl[i].style.display = 'none';
            }
            aUl[this.index].style.display = 'block';

            document.onclick = function(){
                aUl[This.index].style.display = 'none';
            };

            ev.cancelBubble = true;
        };
    }
}

window.onload = function(){
    ph.app.toTip();
    ph.app.topBanner();
    ph.app.toSel();
}