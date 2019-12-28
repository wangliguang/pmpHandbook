import React from 'react';
import { Select, Radio, Icon, Button, Modal } from 'antd';
import Upload from '../../component/upload';
import TagGroup from '../../component/tagGroup';
import STYLE from './index.css';
import Bmob from "hydrogen-js-sdk";

const { Option } = Select;
const capterData = [
  '-请选择章-', '项目整合管理', '项目范围管理', 
  '项目进度管理', '项目成本管理',
  '项目质量管理', '项目资源管理',
  '项目沟通管理', '项目风险管理',
  '项目采购管理', '项目相关方管理'
];
const sectionData = {
  '项目整合管理': [
    '-请选择节-', '制定项目章程', '制定项目管理计划', '指导和管理项目工作',
    '管理项目知识', '监控项目工作', '实施整体变更控制', '结束项目或阶段'
  ],
  '项目范围管理': [
    '-请选择节-', '规划范围管理', '收集需求', '定义范围',
    '创建WBS', '确认范围', '控制范围'
  ],
  '项目进度管理': [
    '-请选择节-', '规划进度管理', '定义活动', '排列活动顺序', 
    '估算活动资源持续时间', '制定进度计划', '控制进度'
  ],
  '项目成本管理': [
    '-请选择节-', '规划成本管理', '估算成本', '制定预算', '控制成本'
  ],
  '项目质量管理': [
    '-请选择节-', '规划质量管理', '管理质量', '控制质量'
  ],
  '项目资源管理': [
    '-请选择节-', '规划资源管理', '估算活动资源', '获取资源', 
    '建设团队', '管理团队', '控制资源'
  ],
  '项目沟通管理': [
    '-请选择节-', '规划沟通管理', '管理沟通', '监督沟通'
  ],
  '项目风险管理': [
    '-请选择节-', '规划风险管理', '识别风险', '实施定性风险分析',
    '实施定量风险分析', '规划风险应对', '实施风险应对', '监督风险'
  ],
  '项目采购管理': [
    '-请选择节-', '规划采购管理', '实施采购', '控制采购'
  ],
  '项目相关方管理': [
    '-请选择节-', '识别相关方', '规划相关方参与', '管理相关方参与', '监督相关方参与'
  ]
};

export default class extends React.Component {

  state = {
    sections: [],
    secondSection: '-请选择节-',
    firstChapter: '-请选择章-',
    resourceType: 'image',
    submitData: [],
  };
  
  handleCapterChange = value => {
    this.setState({
      firstChapter: value,
      sections: sectionData[value],
      secondSection: sectionData[value][0],
    });
  };

  handleSecondSectionChange = value => {
    this.setState({
      secondSection: value,
    });
  };

  handleFileChange = (files) => {
    let tmpSubmitData = files.map((file) => {
      return {
        url: file.url,
        type: file.type,
        name: file.name,
        tags: [],
      }
    });
    this.setState({
      submitData: this.state.submitData.concat(tmpSubmitData),
    });
  }

  handleTagChange = (file, tags) => {
    const tmpSubmitData = this.state.submitData.map((item) => {
      const tmpItem = item;
      if (item.url === file.url) {
        tmpItem.tags = tags;
      }
      return tmpItem;;
    });
    this.setState({
      submitData: tmpSubmitData
    });
  }

  handleSubmit = () => {

    if (this.state.firstChapter === '-请选择章-' || this.state.secondSection === '-请选择节-') {
      Modal.warning({
        title: '请选择要提交的章和节'
      });
      return;
    }

    if (!this.state.submitData.length) {
      Modal.warning({
        title: '请选择需要提交的资源'
      });
      return;
    }

    let isHasTags = true;
    for (const item of this.state.submitData) {
      if (item.tags.length === 0) {
        isHasTags = false;
        break;
      }
    }

    if (!isHasTags) {
      Modal.warning({
        title: '请给文件打标签'
      });
      return;
    }

    const requestPromises = this.state.submitData.map((item) => {
      const query = Bmob.Query('t_resource');
      query.set('chapter', this.state.firstChapter);
      query.set('section', this.state.secondSection);
      query.set("tags", item.tags);
      query.set("type", item.type);
      query.set("url", item.url);
      query.set("name", item.name);
      return query.save()
    });

    Promise.all(requestPromises).then((res) => {
      Modal.success({
        title: '保存成功'
      });
    }).catch((e) => {
      Modal.error({
        title: '保存失败',
        content: e.error
      });
    });
  }

  render() {
    return (
      <div style={{ padding: 20, minHeight: 500, background: "white", display: "flex", justifyContent: 'flex-start', flexDirection: 'column'}}>
        {this.renderSelectCapterSection()}
        {this.renderUploadImage()}
        <Button style={{ marginTop: 100, width: 150, marginLeft: 150, marginBottom: 50 }} onClick={this.handleSubmit} type="primary">提交</Button>
      </div>
    )
  }

  renderUploadImage() {
    return (
      <div style={{ marginTop: 30 }}>
        <span>资源上传：</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', }}>
          {this.state.submitData.map((file) => (
            <div style={{ display: "flex", flexDirection: 'row' }} key={`${file.url}`}>
              <div className={STYLE.img}>
                {file.type === 'image' ? (
                  <img src={file.url} style={{ width: 100, height: 100 }}/>
                ) : (
                  <span>{file.name}</span>
                )}
              </div>  
              <TagGroup onChange={(tags) => this.handleTagChange(file, tags)} style={{ marginLeft: 5, width: 110, height: 110, marginTop: 20 }}/> 
            </div>
          ))}
          <Upload onChange={this.handleFileChange} style={{ marginLeft: 20, marginTop: 20 }} />
        </div>
      </div>
    );
  }


  renderSelectCapterSection() {
    return (
      <div>
        <span>选择章节：</span>
        <Select
          defaultValue={capterData[0]}
          style={{ width: 150, height: 40 }}
          onChange={this.handleCapterChange}
        >
          {capterData.map(capter => (
            <Option key={capter}>{capter}</Option>
          ))}
        </Select>
        <Select
          style={{ width: 150, height: 40, marginLeft: 20 }}
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
