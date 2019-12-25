import React from 'react';
import HocPage from '../HocPage';
import { Collapse, List } from 'antd';
import TOOLS from '../../tool';
const { Panel } = Collapse;

export default HocPage(class extends React.Component {

  static isSelfRender = true;

  state = {
    cloudData: [],
  }

  componentWillReceiveProps(nextProps) {
    let cloudData = TOOLS.getCloudData();
    this.setState({
      cloudData,
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
                  <a target="view_window" href={`http://${document.location.host}${item}`}>{item.split('/')[2].split('.')[0]}</a>
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