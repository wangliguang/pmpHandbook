import React from 'react';
import HocPage from '../HocPage';
import Content from '../../component/content';
import Bmob from "hydrogen-js-sdk";

export default HocPage(class extends React.Component {

  static isSelfRender = true;

  state = {
    fileData: [],
    imgData: []
  }


  likeSearch = (keyword) => {
    
    const fileData = [];
    const imgData = [];

    const resourceQuery = Bmob.Query("t_resource");
    const cloudQuery = Bmob.Query("t_cloud");
    
    Promise.all([resourceQuery.find(), cloudQuery.find()]).then((res) => {
      let allData = [];
      res.forEach((item) => {
        allData = allData.concat(item);
      });
      allData.forEach(item => {
        const reg = new RegExp(`${keyword}`);
        if (!reg.test(item.tags)) return;
        if (item.type === 'file') {
          fileData.push({
            url: item.url,
            name: item.name
          });
          return;
        }
        imgData.push(item.url);
      });
      console.log(allData);
      this.setState({
        imgData,
        fileData,
      });
    })
  }

  componentWillReceiveProps(nextProps) {
    this.likeSearch(nextProps.keyword);
  }

  render() {
    return <Content imgs={this.state.imgData} files={this.state.fileData} />
  }
})