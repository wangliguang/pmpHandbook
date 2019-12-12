import React from 'react';
import Content from '../component/content';
import TOOLS from '../tool';

export default function (component) {
  return class extends React.Component {

    state = {
      imgData: [],
      fileData: [],
    }

    componentDidMount() {
      const data = TOOLS.getData();
      this.setState({
        imgData: data.imgArray,
        fileData: data.fileArray,
      });
    } 

    render() {
      return (
        <div style={{ padding: 20, background: "white"}}>
          <Content imgs={this.state.imgData} files={this.state.fileData}/>
        </div>
      )
    }
  }
}