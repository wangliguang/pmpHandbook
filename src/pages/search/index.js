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

  componentDidMount() {
    let tempImgData = TOOLS.getAllImgData();
    tempImgData = tempImgData.filter((str) => {
      const reg = new RegExp(`${this.props.keyword}`);
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