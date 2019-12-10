import React from 'react';
import STYLE from './index.style.css';
import { Collapse } from 'antd';
const { Panel } = Collapse;

const IMG_DATA = [
  require('../../../img/integration/1.png'),
  require('../../../img/integration/2.png'),
  require('../../../img/integration/3.png'),
  require('../../../img/integration/4.png'),
  require('../../../img/integration/5.png'),
  require('../../../img/integration/6.png'),
  require('../../../img/integration/7.png'),
  require('../../../img/integration/8.png'),
]
export default class IntegrationPage extends React.Component {

  render() {
    return (
      <div className={STYLE.page}>
        <Collapse bordered={false} defaultActiveKey={['1']}>
          <Panel header="图片" key="1">
          {'xxx'}
          </Panel>
          <Panel header="This is panel header 2" key="2">
            {'xxx'}
          </Panel>
          <Panel header="This is panel header 3" key="3">
            {'xx'}
          </Panel>
        </Collapse>
      </div>
    )
  }
}