//获取元素函数
//单元数
function q(css){
	return document.querySelector(css);
}
//多元素数组
function qa(css){
	return document.querySelectorAll(css);
}
//随机数
function rand(min,max){
	return Math.floor(Math.random()*(max+1-min)+min);
}
//随机颜色的赋值
//多个
function randArrColor(arr,min,max,css){
	for(var i=0;i<arr.length;i++){
		var r=rand(min,max);
		var g=rand(min,max);
		var b=rand(min,max);
		arr[i].style[css]="rgb("+r+","+g+","+b+")";
	}
}
//单个
function randColor(who,min,max,css){
	var r=rand(min,max);
	var g=rand(min,max);
	var b=rand(min,max);
	who.style[css]="rgb("+r+","+g+","+b+")";
}
//随机颜色
function thisRandColor(min,max){
	var r=rand(min,max);
	var g=rand(min,max);
	var b=rand(min,max);
	var a=Math.random().toFixed(2);
	//填充颜色的赋值
	return "rgba("+r+","+g+","+b+","+a+")";
}
//创建新元素
function createCss(css){
	return document.createElement(css);
}
//设置属性
function setAtt(who,attr,value){
	return who.setAttribute(attr,value);
}

//获取元素的非行间样式 ： getComputedStyle(标签)[获取的样式：字符串]
//比如说获取div1.offsetLeft  可以用getComputedStyle(div1)[left]获取
function pfGetcss(_sei,_css){
	return parseFloat(getComputedStyle(_sei)[_css]);
}
function getCss(_sei,_css){
	return getComputedStyle(_sei)[_css];
}
//把新生成的元素添加进父级的最后一个子级
function append(who,child){
	return who.appendChild(child);
}


//定时器运动函数
function WmoveTimer(sei,jgTime,css,endpos,speed,dw,fn){
	clearInterval(sei.timer);
	sei.timer=setInterval(function(){
		if(pfGetcss(sei,css) == endpos){
			clearInterval(sei.timer);
			//回调函数:判断fn是否存在
			if(fn){
				fn();
			}
		}else{
			//2、当需要设置的样式未知
			//ele.style[css]
			sei.style[css]=pfGetcss(sei,css)+speed+dw;
		}
	},jgTime);
}
//图片预加载
//参数1：需要预加载的图片对象，类型是json对象
//参数2：回调对象，正在加载图片时的回调、加载完毕后的回调
function loadImage(imgObj,handle){
	//加载好的图片数量
	var loadCount=0;
	//加载好的图片的对象
	var imgs={};
	//图片数量
	var imgCount=0;
	for(var i in imgObj){
		imgCount++;
	}
	//加载图片
	for(var i in imgObj){
		//定义图片对象
		var img=new Image();
		//赋值src
		img.src=imgObj[i];
		//加载图片
		img.onload=(function(i){
			return function(){
				//把加载好的图片放到json对象里面
				imgs[i]=this;
				//加载好的图片数量++
				loadCount++;
				//获取加载记录的百分比
				var sc=loadCount/imgCount*100;
				//回调两个函数
				//1、正在加载
				if(handle.progress){
					//把加载进度sc传过去
					handle.progress(sc);
				}
				//2、图片加载完毕
				if(sc==100){
					//判断加载好了
					if(handle.complete){
						//把加载好的图片传回去
						handle.complete(imgs);
					}
				}
			}
		})(i);
	}
}




