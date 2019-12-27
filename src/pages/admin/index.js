import React from 'react';
import { Select, Radio, Icon, Button } from 'antd';
import Upload from '../../component/upload';
import TagGroup from '../../component/tagGroup';
import STYLE from './index.css';

const { Option } = Select;
const capterData = ['Zhejiang', 'Jiangsu'];
const sectionData = {
  Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};

export default class extends React.Component {

  state = {
    sections: sectionData[capterData[0]],
    secondSection: sectionData[capterData[0]][0],
    resourceType: 'image',
    fileList: [],
    imgs: [],
    files: [],
    submitData: [],
  };
  
  handleCapterChange = value => {
    this.setState({
      sections: sectionData[value],
      secondSection: sectionData[value][0],
    });
  };

  handleSecondSectionChange = value => {
    this.setState({
      secondSection: value,
    });
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

  handleTagChange = (url, tags) => {
    let tmpSubmitData = this.state.submitData;

    tmpSubmitData = tmpSubmitData.filter((item) => {
      return item.url !== url
    });

    tmpSubmitData.push({
      url,
      tags,
    });
    this.setState({
      submitData: tmpSubmitData
    });
  }

  handleSubmit = () => {

  }

  render() {
    return (
      <div style={{ padding: 20, minHeight: 500, background: "white", display: "flex", justifyContent: 'flex-start', flexDirection: 'column'}}>
        {this.renderSelectCapterSection()}
        {this.renderSelectFileType()}
        {this.renderUploadImage()}
        <Button style={{ marginTop: 100, width: 150, marginLeft: 150 }} onClick={this.handleSubmit} type="primary">提交</Button>
      </div>
    )
  }

  renderUploadImage() {
    return (
      <div style={{ marginTop: 30 }}>
        <span>图片上传：</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 20 }}>
          {this.state.imgs.map((url) => (
            <div style={{ display: "flex", flexDirection: 'row' }} key={`${url}`}>
              <div className={STYLE.img}>
                <img src={url} style={{ width: 100, height: 100 }}/>
              </div>  
              <TagGroup  onChange={(tags) => this.handleTagChange(url, tags)} style={{ marginLeft: 5, width: 110, height: 110 }}/> 
            </div>
          ))}
          <Upload onChange={this.handleOnChange} style={{ marginLeft: 20 }} />
        </div>
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
          defaultValue={capterData[0]}
          style={{ width: 120, height: 40 }}
          onChange={this.handleCapterChange}
        >
          {capterData.map(capter => (
            <Option key={capter}>{capter}</Option>
          ))}
        </Select>
        <Select
          style={{ width: 120, height: 40, marginLeft: 20 }}
          value={this.state.secondSection}
          onChange={this.handleSecondSectionChange}
        >
          {this.state.sections.map(city => (
            <Option key={city}>{city}</Option>
          ))}
        </Select>
      </div>
    )
  }
}
