const crypto = require('crypto');
const date = new Date().toUTCString();

const key = 'wangliguang';
const secret = 'niepangg';
const method = 'PUT';
const uri = '/';
function sign(key, secret, method, uri, date, policy=null, md5=null) {
    const elems = [];
    [method, uri, date, policy, md5].forEach(item => {
        if (item != null) {
            elems.push(item)
        }
    })
    let value = elems.join('&');
    let auth = hmacsha1(secret, value);
    return `UPYUN ${key}:${auth}`;
}

function hmacsha1(secret, value) {
    return crypto.createHmac('sha1', secret).update(value, 'utf8').digest().toString('base64');
}

function MD5(value) {
  return crypto.createHash('md5').update(value).digest('hex');
}

function uploadFile(file) {
  const token = `${sign(key, MD5(secret), method, uri, date)}`;
  console.log(token);
  const data = new FormData();
  data.append(file.name, file);
  fetch('http://v0.api.upyun.com/pmphandbook', {
    method: 'POST',
    mode: 'cors',
    headers: {
      "Authorization": token,
      "Content-Length": file.size,
      "Origin": 'http://localhost:8000'
    },
    body: data,
  }).then((res) => {
    console.log('====', res);
  }).catch((e) => {
    console.log('error', e);
  });
}

export {
  uploadFile,
}