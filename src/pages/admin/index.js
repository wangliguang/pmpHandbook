import React from 'react';
import { Select, Radio, Icon } from 'antd';
import Upload from '../../component/upload';
import STYLE from './index.css';

const { Option } = Select;
const provinceData = ['Zhejiang', 'Jiangsu'];
const cityData = {
  Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};

export default class extends React.Component {

  state = {
    cities: cityData[provinceData[0]],
    secondCity: cityData[provinceData[0]][0],
    resourceType: 'image',
    fileList: [],
    imgs: [],
  };

  handleChangeResourceType = (e) => {
    this.setState({
      resourceType: e.target.value
    });
  }

  handleOnChange = (urls) => {
    this.setState({
      imgs: urls,
    });
  }

  render() {
    return (
      <div style={{ padding: 20, minHeight: 500, background: "white", display: "flex", justifyContent: 'flex-start', flexDirection: 'column'}}>
        {this.renderSelectCapterSection()}
        {this.renderSelectFileType()}
        {this.renderUploadImage()}
    
      </div>
    )
  }

  renderUploadImage() {
    return (
      <div style={{ marginTop: 30 }}>
        <span>图片上传：</span>
        <div>
          {this.state.imgs.map((url) => (
            <div class={STYLE.img}>
              <img src={url} style={{ width: 100, height: 100}}/>
            </div>
          ))}
        </div>
        <Upload onChange={this.handleOnChange}/>
      </div>
    );
  }

  renderSelectFileType() {
    return (
      <div style={{ marginTop: 30 }}>
        <span>资源类型：</span>
        <Radio.Group value={this.state.resourceType} onChange={this.handleChangeResourceType}>
          <Radio.Button value="image">图片</Radio.Button>
          <Radio.Button value="file">文件</Radio.Button>
        </Radio.Group>
      </div>
    );
  }

  renderSelectCapterSection() {
    return (
      <div>
        <span>选择章节：</span>
        <Select
          defaultValue={provinceData[0]}
          style={{ width: 120, height: 40 }}
          onChange={this.handleProvinceChange}
        >
          {provinceData.map(province => (
            <Option key={province}>{province}</Option>
          ))}
        </Select>
        <Select
          style={{ width: 120, height: 40, marginLeft: 20 }}
          value={this.state.secondCity}
          onChange={this.onSecondCityChange}
        >
          {this.state.cities.map(city => (
            <Option key={city}>{city}</Option>
          ))}
        </Select>
      </div>
    )
  }
}
