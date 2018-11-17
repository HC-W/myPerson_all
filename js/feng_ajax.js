/*
* author:ggg
* date:2018.9.18
* time:14:50
* purpose:AJAX
// * */
// sg_ajax("get","hello.php",{
//     "a":1243,
//     "n":"what"
// },true,function (abc) {
//     //abc即为传回来的数据
//     console.log(abc);
// })
function sg_ajax(type,url,data,asy,fn){
    //实例化对象
    var ajaxObj=new XMLHttpRequest();
    //用来拼接字符串数据
    var dataStr="";
    //i是key   data[i]表示value
    for (var i in data){
        //把key value拼到字符串里
        dataStr+=i+"="+data[i]+"&";
    }
    //str结果：a=1243&n=what&    多余了一个&
    //去掉后面的&
    dataStr.substr(0,dataStr.length-1);
    //a=1243&n=what
    //防止不是大写，转化成大写
    type=type.toUpperCase();
    //判断请求方式
    if(type=="GET"){
        ajaxObj.open(type,url+"?"+dataStr,asy);
        ajaxObj.send();
    }else if (type=="POST"){
        ajaxObj.send(type,url,asy);
        //设置请求头
        ajaxObj.setRequestHeader("CONTENT-TYPE","application/x-www-form-urlencoded");
        ajaxObj.send(dataStr);
    }
    //监听ajax状态变化
    ajaxObj.onreadystatechange=function(){
        if (ajaxObj.readyState==4 && ajaxObj.status==200){
            var dataObj=JSON.parse(ajaxObj.responseText);
            //回调函数,把数据传回去
            fn(dataObj);
        }
    }
}