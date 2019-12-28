import React from 'react';
import HocPage from '../HocPage';
import { Collapse, List } from 'antd';
import Bmob from "hydrogen-js-sdk";

const { Panel } = Collapse;


export default HocPage(class extends React.Component {

  static isSelfRender = true;

  state = {
    cloudData: [],
  }

  componentWillReceiveProps(nextProps) {
  //   '题库',
  // '做题技巧',
  // 'pmpBok分章节',
  // '其他'
    const query = Bmob.Query("t_cloud");
    
    const tiKuArr = {
      title: '题库',
      array: []
    }
    const zuoTiTipArr = {
      title: '做题技巧',
      array: []
    }
    const pmpBokArr = {
      title: 'pmpBok分章节',
      array: []
    }
    const otherArr = {
      title: '其他',
      array: []
    }

    query.find().then((res) => {
      const cloudData = [];
      res.map((item) => {
        if (item.dir === '题库') {
          tiKuArr.array.push({
            name: item.name,
            url: item.url,
          });
        }
        if (item.dir === '做题技巧') {
          zuoTiTipArr.array.push({
            name: item.name,
            url: item.url,
          });
        }
        if (item.dir === 'pmpBok分章节') {
          pmpBokArr.array.push({
            name: item.name,
            url: item.url,
          });
        }
        if (item.dir === '其他') {
          otherArr.array.push({
            name: item.name,
            url: item.url,
          });
        }
      });
      this.setState({
        cloudData: [ tiKuArr, zuoTiTipArr, pmpBokArr, otherArr ]
      });
    });  
  }

  render() {
    return (
      <Collapse bordered={false} defaultActiveKey={['0']}>
      {this.state.cloudData.map((item, index) => {
        return (
          <Panel header={item.title} key={`${index}`} >
            <List
              bordered
              dataSource={item.array}
              renderItem={item => (
                <List.Item>
                  <a target="view_window" href={item.url}>{item.name}</a>
                </List.Item>
              )}
              />
          </Panel>
        )
      })}
    </Collapse>
    )
  }
})