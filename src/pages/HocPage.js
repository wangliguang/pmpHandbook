import React from 'react';
import Content from '../component/content';
import Bmob from "hydrogen-js-sdk";

export default function (Component) {
  return class extends React.Component {

    state = {
      imgData: [],
      fileData: [],
    }

    addMonitor = () => {
      // 插入script标签，用于做监控统计
      var body = document.getElementsByTagName('body')[0];
      var script = document.createElement('script');
      script.type= 'text/javascript';
      script.src= 'https://v1.cnzz.com/z_stat.php?id=1278286627&web_id=1278286627';
      body.appendChild(script);
    }

    componentDidMount() {
      this.addMonitor();

    
      const imgData = [];
      const fileData = [];

      const params = this.props.location.query;
      const query = Bmob.Query("t_resource");
      const query1 = query.equalTo("chapter", '==', params.chapter || '');
      const query2 = query.equalTo("section", '==', params.section || '');

      query.and(query1, query2);
      query.find().then((res) => {
        res.forEach(item => {
          if (item.type === 'file') {
            fileData.push({
              url: item.url,
              name: item.name
            });
            return;
          }
          imgData.push(item.url);
        });
        this.setState({
          imgData,
          fileData,
        });
      });
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