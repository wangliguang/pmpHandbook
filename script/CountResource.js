const path = require('path');
const fs = require('fs');
// 获取指定路径 path 下的，默认深度为 3 的目录 JSON
function getIndexByPath(dir, deep = 4) {
    let dirDevide = dir.split('/');
    let preDir = dirDevide.splice(0, dirDevide.length - 1).join('/');
    let index = {};
    getIndexOfPathByDeep(index, path.join(__dirname, preDir), dirDevide[0], deep + 1);
    return index;
}
// 开始对指定 path 递归查找深度为 deep 深度
function getIndexOfPathByDeep(obj, dir, curDir, deep) {
    let curPath = path.join(dir, curDir);
    // 达到搜索深度，停止
    if(deep) {
        if (curDir === '.DS_Store' || curDir === 'index.json') {
          return;
        }
        obj[curDir] = curDir;
        if(fs.statSync(curPath).isDirectory()) {
            obj[curDir] = {};
            let lists = fs.readdirSync(curPath);
            lists.forEach(list => getIndexOfPathByDeep(obj[curDir], curPath, list, deep - 1))
        }
    }
 
}

const json = getIndexByPath('../src/assets');
fs.writeFile(path.join(__filename, '../../src/assets/index.json'), JSON.stringify(json), function (e) {
  if (e) {
    console.log('❌❌❌❌：资源错误');
  }
  console.log('👍👍👍👍：资源计数完毕');
});


