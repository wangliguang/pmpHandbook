import React from 'react';
import { Select, Radio, Upload, Icon } from 'antd';
import { uploadFile } from '../../tool/uploadFile';

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
  };

  handleChangeResourceType = (e) => {
    this.setState({
      resourceType: e.target.value
    });
  }

  componentDidMount() {
    const fileUploadControl = document.getElementById('profilePhotoFileUpload');
    fileUploadControl.onchange = () => {
      const pic = fileUploadControl.files
      uploadFile(pic);
    }

  }

  handleChange = ({ fileList }) => {
    uploadFile(fileList);
    this.setState({ fileList });
  }

  render() {
    return (
      <div style={{ padding: 20, minHeight: 500, background: "white", display: "flex", justifyContent: 'flex-start', flexDirection: 'column'}}>
        {this.renderSelectCapterSection()}
        {this.renderSelectFileType()}
        {this.renderUploadImage()}
        {this.renderUploadFile()}
        <input type="file" id="profilePhotoFileUpload"  multiple="multiple" />

        
      </div>
    )
  }

  renderUploadImage() {
    return (
      <div style={{ marginTop: 30 }}>
        <span>图片上传：</span>
        <Upload
          listType="picture-card"
          fileList={this.state.fileList}
          onChange={this.handleChange}
        >
          <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
          </div>
        </Upload>
      </div>
    );
  }

  renderUploadFile() {
    return (
      <div style={{ marginTop: 30 }}>
        <span>文件上传：</span>
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
