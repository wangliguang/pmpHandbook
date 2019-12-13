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

      // 为了将统计代码放在最Body的最后面
      setTimeout(() => {
        // 插入script标签并监听加载
        var body = document.getElementsByTagName('body')[0];
        var script = document.createElement('script');
        script.type= 'text/javascript';
        script.src= '<script type="text/javascript" src="https://v1.cnzz.com/z_stat.php?id=1278286627&web_id=1278286627"></script>';
        body.appendChild(script);
      }, 1000);
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