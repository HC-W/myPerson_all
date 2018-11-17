//参数1:需要加载的所有图片， 类型为json对象
//参数2:回调对象,json
function loadImage(imgObj, handle) {
	//加载好的图片数量
	var scaleCount = 0;
	//加载好的图片的json对象
	var imgS = {};
	//图片数量
	var imgCount = 0;
	for(var i in imgObj) {
		imgCount++;
	}

	for(var i in imgObj) {
		var img = new Image();
		img.src = imgObj[i];
		img.onload = (function(i) {
			return function() {
				//把加载好的图片放到json对象对应的位置上
				imgS[i] = this;
				
				//加载好的图片数量
				scaleCount++;
				
				//加载进度百分比
				var sc = scaleCount / imgCount * 100;
				
				//当图片没加载完，执行的函数
				if(handle.progress) {
					handle.progress(sc);
				}
				//当图片加载完，执行的函数
				if(sc == 100) {
					if(handle.complete) {
						handle.complete(imgS);
					}
				}
			}
		})(i);
	}
}