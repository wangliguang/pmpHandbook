import React from 'react';
import Content from '../component/content';
import TOOLS from '../tool';

export default function (Component) {
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

      // 插入script标签，用于做埋点统计
      var body = document.getElementsByTagName('body')[0];
      var script = document.createElement('script');
      script.type= 'text/javascript';
      script.src= 'https://v1.cnzz.com/z_stat.php?id=1278286627&web_id=1278286627';
      body.appendChild(script);
    } 

    render() {
      return (
        <div style={{ padding: 20, minHeight: 500, background: "white"}}>
          {!Component.isSelfRender ? (
            <Content imgs={this.state.imgData} files={this.state.fileData}/>
          ) : (
            <Component {...this.props.location.query}/>
          )}
        </div>
      )
    }
  }
}