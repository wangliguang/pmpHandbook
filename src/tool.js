import ASSETS_DATA from './assets/index.json';
const DATA = ASSETS_DATA.assets;

function parseData() {
  const result = {};
  for (const i in DATA) {
    const chapter = DATA[i];
    for (const j in chapter) {
      const section = chapter[j];
      result[`${i}/${j}`] = {
        imgArray: objToArray(`${i}/${j}`, section.img),
        fileArray: objToArray(`${i}/${j}`, section.file),
      };
    }
  }
  console.log('数据解析完成：', result);
  return result;
}

function getCurrenChapterSectionName() {
  const item = document.scripts[0];
  const array = item.baseURI.split('/');
  const capterName = array[3];
  const sectionName = array[4];
  return {
    capterName,
    sectionName,
  }
}

function getData() {
  const { capterName, sectionName } = getCurrenChapterSectionName();
  const data = parseData()[`${capterName}/${sectionName}`] || {};
  return {
    imgArray: data.imgArray || [],
    fileArray: data.fileArray || [],
  }
}


function objToArray(prefix, obj) {
  const dataArray = [];
  for (const key in obj) {
    dataArray.push(require(`./assets/${prefix}/img/${key}`));
  }
  return dataArray;
}

export default {
  getData,
}