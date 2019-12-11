import React from 'react';
import { Collapse } from 'antd';
import STYLE from './content.style.css';

const { Panel } = Collapse;

export default class Content extends React.Component {
  render() {
    return (
      <Collapse bordered={false} defaultActiveKey={['1']}>
          <Panel header="图片" key="1">
            <div className={STYLE.waterfall}>
              {this.props.imgs.map((img, index) => (
                <div key={`${index}`} className={STYLE.box}>
                  <div className={STYLE.pic}>
                    <img alt='' src={img}/>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
          <Panel header="文档" key="2">
            {'敬请期待'}
          </Panel>
          <Panel header="文章" key="3">
            {'敬请期待'}
          </Panel>
        </Collapse>
    )
  }
}