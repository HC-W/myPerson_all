<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/9/25
 * Time: 14:47
 */
//echo "123";
function connectDB($ip,$name,$pad,$db){
    $db_ip=$ip;
    $db_name=$name;
    $db_psd=$pad;
    $db_select=$db;
    //连接
    $con=mysqli_connect($db_ip,$db_name,$db_psd) or die(mysqli_connect_error());
    //连接数据库
    mysqli_select_db($con,$db_select);
    //设置字符集
    mysqli_query($con,"set names utf8");
    return $con;
}
//查询的函数
function sel($co,$sqlStr){
    //执行
    $result=mysqli_query($co,$sqlStr);
    //把结果装进数组
    $arr=array();
    //结果逐条取出，判断有值就为true,然后执行
    while ($row=mysqli_fetch_assoc($result)){
        //装进去
        array_push($arr,$row);
    }
    return $arr;
}
//增删改
function zsg($co,$sqlStr){
    //执行sql
    mysqli_query($co,$sqlStr);
    //判断是否成功
    //数据表中受影响的行数   有一条受影响就说明成功了
    if(mysqli_affected_rows($co)>0){
        return true;
    }else{
        return false;
    }
}
// 获取当前时间戳(以s为单位)函数
function timestampToTime() {
    date_default_timezone_set("Asia/Shanghai");
    $d=date("Y/m/d H:i");  //H:24小时制  h:12小时制
    return $d;
}
