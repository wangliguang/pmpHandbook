import React from 'react';
import { Collapse, List } from 'antd';
import STYLE from './content.style.css';
import Viewer from 'react-viewer';

const { Panel } = Collapse;

export default class Content extends React.PureComponent {

  state = {
    visible: false,
  }

  handleImgClick = (activeIndex) => {
    this.setState({
      activeIndex,
      visible: true,
    });
  }

  render() {
    const viewerDataArray = this.props.imgs.map((img) => {
      return {
        src: `http://${document.location.host}${img}`,
      };
    });

    

    return (
      <Collapse bordered={false} defaultActiveKey={['1']}>
          <Panel header="图片" key="1">
            <div className={STYLE.waterfall}>
              {this.props.imgs.length != 0 ? this.props.imgs.map((img, index) => (
                <div key={`${index}`} className={STYLE.box}>
                  <div className={STYLE.pic}>
                    <img onClickCapture={() => this.handleImgClick(index)} className="img" alt='' src={img}/>
                  </div>
                </div>
              )): '敬请期待'}
            </div>
          </Panel>
          <Panel header="文档" key="2">
          {this.props.files.length != 0 ? (
            <List
              bordered
              dataSource={this.props.files}
              renderItem={item => (
                <List.Item>
                  <a target="view_window" href={`http://${document.location.host}${item}`}>{item.split('/')[2].split('.')[0]}</a>
                </List.Item>
              )}
            />
          ) : '敬请期待'}
          </Panel>
          <Panel header="文章" key="3">
            {'敬请期待'}
          </Panel>
          <Viewer
            drag={false}
            rotatable={false}
            zoomSpeed={0.5}
            scalable={false}
            visible={this.state.visible}
            onClose={() => this.setState({ visible: false})}
            onMaskClick={() => this.setState({ visible: false})}
            images={viewerDataArray}
            activeIndex={this.state.activeIndex}
          />
        </Collapse>
    )
  }
}