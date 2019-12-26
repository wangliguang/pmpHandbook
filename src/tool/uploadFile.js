const SparkMD5 = require('../../sdk/spark-md5');

function uploadFile(file) {
  console.log(file);
  const bucket_name="pmphandbook";              //服务名称
  const opename="wangliguang";                      //操作员账号
  const opepass="qMdA6WhtmEdBxyr8vlw2lkRbqJUqNUrG";                      //操作员密码
  const save_as=`/${new Date().getTime()}_${file.name}`;                    //保存路径
  const acc_point="http://v0.api.upyun.com/";
  const date=(new Date()).toUTCString();
	const	sign=SparkMD5.hash("PUT&/"+encodeURI(bucket_name+save_as)+"&"+date+"&"+file.size+"&"+SparkMD5.hash(opepass));

  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.onload=function(event){
      if(xhr.status==200){
        resolve(`http://pmphandbook.test.upcdn.net${save_as}`);
      }else{
        reject('上传失败：', JSON.parse(xhr.responseText).code);
      }
    };
    xhr.open('PUT', acc_point+encodeURI(bucket_name+save_as), true);
    xhr.setRequestHeader("Authorization","UpYun "+opename+":"+sign);
    xhr.setRequestHeader("X-Date",date);
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.send(file);
  });
}

export {
  uploadFile
}