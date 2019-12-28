import React from 'react';
import { Icon } from 'antd';
import STYLE from './index.css';
import { uploadFile } from '../../tool/uploadFile';

export default class extends React.PureComponent {

  componentDidMount() {
    const fileUploadControl = document.getElementById('profilePhotoFileUpload');
    fileUploadControl.onchange = () => {
      let files = fileUploadControl.files || [];
      files = Array.prototype.slice.call(files);
      const allFilePromise = files.map((file) => {
        return uploadFile(file);
      });

      Promise.all(allFilePromise).then((files) => {
        console.log('文件上传成功', files);
        this.props.onChange && this.props.onChange(files);
      }).catch((e) => {
        console.error('上传文件失败', e);
      });
    }
  }

  render() {
    return (
      <div className={STYLE.wraper} style={this.props.style}>
        <input className={STYLE.input} 
          name="file" type="file" 
          id="profilePhotoFileUpload"  multiple="multiple" 
        />
        <label className={STYLE.label} htmlFor="file"/>
        <Icon type={'plus'} />
        <div style={{ marginTop: 5}}>上传文件</div>  
      </div>     
    );
  }
}

