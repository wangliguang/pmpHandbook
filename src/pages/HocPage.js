import React from 'react';
import Content from '../component/content';
import TOOLS from '../tool';

export default function (component) {
  return class extends React.Component {

    state = {
      imgData: [],
      fileData: [],
    }

    componentDidMount() {
      const data = TOOLS.getData();
      this.setState({
        imgData: data.imgArray,
        fileData: data.fileArray,
      });
    } 

    render() {
      return (
        <div style={{ padding: 20, background: "white"}}>
          <script type="text/javascript">var cnzz_protocol = (("https:" == document.location.protocol) ? "https://" : "http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1278286627'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "v1.cnzz.com/z_stat.php%3Fid%3D1278286627' type='text/javascript'%3E%3C/script%3E"));</script>
          <Content imgs={this.state.imgData} files={this.state.fileData}/>
        </div>
      )
    }
  }
}