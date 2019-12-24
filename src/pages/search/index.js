import React from 'react';
import HocPage from '../HocPage';
import ASSETS_DATA from '../../assets/index.json';
import Content from '../../component/content';
import TOOLS from '../../tool';

export default HocPage(class extends React.Component {

  static isSelfRender = true;

  state = {
    imgData: []
  }

  componentWillReceiveProps(nextProps) {
    let tempImgData = TOOLS.getAllImgData();
    tempImgData = tempImgData.filter((str) => {
      const reg = new RegExp(`${nextProps.keyword}`);
      return reg.test(str);
    })
    this.setState({
      imgData: tempImgData,
    });
  }

  render() {
    return <Content imgs={this.state.imgData} files={[]} />
  }
})