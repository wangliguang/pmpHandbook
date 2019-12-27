import React from 'react';
import { Select, Radio, Icon, Button } from 'antd';
import Upload from '../../component/upload';
import TagGroup from '../../component/tagGroup';
import STYLE from './index.css';

const { Option } = Select;
const capterData = [
  '项目整合管理', '项目范围管理', 
  '项目进度管理', '项目成本管理',
  '项目质量管理', '项目资源管理',
  '项目沟通管理', '项目风险管理',
  '项目采购管理', '项目相关方管理'
];
const sectionData = {
  '项目整合管理': [
    '制定项目章程', '制定项目管理计划', '指导和管理项目工作',
    '管理项目知识', '监控项目工作', '实施整体变更控制', '结束项目或阶段'
  ],
  '项目范围管理': [
    '规划范围管理', '收集需求', '定义范围',
    '创建WBS', '确认范围', '控制范围'
  ],
  '项目进度管理': [
    '规划进度管理', '定义活动', '排列活动顺序', 
    '估算活动资源持续时间', '制定进度计划', '控制进度'
  ],
  '项目成本管理': [
    '规划成本管理', '估算成本', '制定预算', '控制成本'
  ],
  '项目质量管理': [
    '规划质量管理', '管理质量', '控制质量'
  ],
  '项目资源管理': [
    '规划资源管理', '估算活动资源', '获取资源', 
    '建设团队', '管理团队', '控制资源'
  ],
  '项目沟通管理': [
    '规划沟通管理', '管理沟通', '监督沟通'
  ],
  '项目风险管理': [
    '规划风险管理', '识别风险', '实施定性风险分析',
    '实施定量风险分析', '规划风险应对', '实施风险应对', '监督风险'
  ],
  '项目采购管理': [
    '规划采购管理', '实施采购', '控制采购'
  ],
  '项目相关方管理': [
    '识别相关方', '规划相关方参与', '管理相关方参与', '监督相关方参与'
  ]
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
