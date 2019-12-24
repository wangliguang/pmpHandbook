import ASSETS_DATA from './assets/index.json';
const DATA = ASSETS_DATA.assets;

function parseData() {
  const result = {};
  for (const i in DATA) {
    const chapter = DATA[i];
    for (const j in chapter) {
      const section = chapter[j];
      result[`${i}/${j}`] = {
        imgArray: objToArray(`${i}/${j}`, section.img, 'img'),
        fileArray: objToArray(`${i}/${j}`, section.file, 'file'),
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


function objToArray(prefix, obj, fileType) {
  const dataArray = [];
  for (const key in obj) {
    dataArray.push(require(`./assets/${prefix}/${fileType}/${key}`));
  }
  return dataArray;
}

function getAllImgData() {
  const allData = ASSETS_DATA.assets;
  let tempImgData = [];
  for (const capterName in allData) {
    for (const sectionName in allData[capterName]) {
      for (const type in allData[capterName][sectionName]) {
        if(type === 'img') {
          const imgArray = allData[capterName][sectionName][type];
          tempImgData = tempImgData.concat(objToArray(`${capterName}/${sectionName}`, imgArray, 'img'));
        }
      }
    }
  }
  return tempImgData;
}

export default {
  getData,
  getAllImgData,
}