import React from 'react';
import { Collapse } from 'antd';
import STYLE from './content.style.css';
import Viewer from 'react-viewer';

const { Panel } = Collapse;

export default class Content extends React.PureComponent {

  state = {
    visible: false,
    viewerDataArray: [],
  }

  componentWillReceiveProps() {
    let imgArray = this.props.imgs.map((img) => {
      return {
        src: `http://${document.location.host}${img}`,
      };
    });
    this.setState({
      viewerDataArray: imgArray,
    });    
  }


  handleImgClick = (activeIndex) => {
    this.setState({
      activeIndex,
      visible: true,
    });
  }

  render() {
    return (
      <Collapse bordered={false} defaultActiveKey={['1']}>
          <Panel header="图片" key="1">
            <div className={STYLE.waterfall}>
              {this.props.imgs.map((img, index) => (
                <div onClick={() => this.handleImgClick(index)} key={`${index}`} className={STYLE.box}>
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
          <Viewer
            drag={false}
            rotatable={false}
            zoomSpeed={0.5}
            scalable={false}
            visible={this.state.visible}
            onClose={() => this.setState({ visible: false})}
            onMaskClick={() => this.setState({ visible: false})}
            images={this.state.viewerDataArray}
            activeIndex={this.state.activeIndex}
          />
        </Collapse>
    )
  }
}