import React from 'react';
import Content from '../component/content';
import TOOLS from '../tool';

export default function (component) {
  return class extends React.Component {

    state = {
      imgData: [],
    }

    componentDidMount() {
      const test = TOOLS.getData();
      this.setState({
        imgData: test.imgArray || [],
      });
    } 

    render() {
      return (
        <div style={{ padding: 20, background: "white"}}>
          <Content imgs={this.state.imgData}/>
        </div>
      )
    }
  }
}