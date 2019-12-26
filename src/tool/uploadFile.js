const SparkMD5 = require('../../sdk/spark-md5');

function uploadFile(files) {
  const bucket_name="pmphandbook";              //服务名称
  const opename="wangliguang";                      //操作员账号
  const opepass="5d1PKkLJtEuw23gQLjY9FYir0Nj2oEIK";                      //操作员密码
  const save_as=`${new Date().getTime()}`;                    //保存路径
  const acc_point="http://v0.api.upyun.com/";
  const date=(new Date()).toUTCString();
  const file=files[0];
  const sign=SparkMD5.hash("PUT&/"+encodeURI(bucket_name+save_as)+"&"+date+"&"+file.size+"&"+SparkMD5.hash(opepass));
  // const infoHtml = "文件名称:" + file.name + "";
  // infoHtml+= "文件大小:" + file.size + "";
  // infoHtml+= "文件类型:" + file.type + "";
  
  var xhr = new XMLHttpRequest();
  xhr.onload=function(event){
    if(xhr.status==200){
      alert("上传成功");
      console.log(xhr);
    }else{alert("上传失败,代码:"+JSON.parse(xhr.responseText).code);}
  };
  xhr.open('PUT', acc_point+encodeURI(bucket_name+save_as), true);
  xhr.setRequestHeader("Authorization","UpYun "+opename+":"+sign);
  xhr.setRequestHeader("X-Date",date);
  xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  xhr.send(file);
}

export {
  uploadFile
}