import React from 'react';
import HocPage from '../HocPage';
import Content from '../../component/content';
import TOOLS from '../../tool';

export default HocPage(class extends React.Component {

  static isSelfRender = true;

  state = {
    allImgData: [],
    allFileData: []
  }

  componentWillReceiveProps(nextProps) {
    let { allFileData, allImgData } = TOOLS.getAllFileImgData();
    const fileterF = (str) => {
      const reg = new RegExp(`${nextProps.keyword}`);
      return reg.test(str);
    }
    allImgData = allImgData.filter(fileterF)
    allFileData = allFileData.filter(fileterF);
    this.setState({
      allImgData,
      allFileData,
    });
  }

  render() {
    return <Content imgs={this.state.allImgData} files={this.state.allFileData} />
  }
})