import { Layout, Menu, Breadcrumb, Button, Input, Icon } from 'antd';
import React from 'react';
import LAYOUT_DATA from './layout';
import router from 'umi/router';
import Link from 'umi/link';
import STYLE from './index.css';
import Bmob from "hydrogen-js-sdk";
import { getCookie } from '../tool/cookie';
import OS from '../tool/platform';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Search } = Input;

Bmob.initialize("22cb8890c273968f", "753159");

export default class extends React.Component {
  state = {
    collapsed: false,
    title: '四：项目整合管理',
    subTitle: '4.1：制定项目章程',
  };

  componentDidMount() {
    if (OS.isPc) {
      router.replace('/integration/pmp41?chapter=项目整合管理&section=制定项目章程');
    } else {
      this.setState({ title: '搜索', subTitle: ''});
      router.replace('/search');
    }
    
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };


  handleMenuItemClick = (item) => {
    let title = '';
    for (const key in LAYOUT_DATA) {
      const tempItem = LAYOUT_DATA[key];
      tempItem.subTitles.forEach(subItem => {
        if (item.key === subItem.title) {
          title = tempItem.title;
        }
        if (title) return false;
      });
    }

    this.setState({
      subTitle: item.key,
      title,
    });
  } 

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        {OS.isPc ? <Sider 
          width={250} 
          className={STYLE.sider} 
          collapsible 
          collapsed={this.state.collapsed} 
          onCollapse={this.onCollapse} 
          breakpoint="lg"
        >
          <div className="logo" />
          <Menu theme="dark" defaultOpenKeys={['四：项目整合管理']} defaultSelectedKeys={['4.1：制定项目章程']} mode="inline">
            {LAYOUT_DATA.map((item) => (
              <SubMenu
                key={item.title}
                title={<span>{item.title}</span>}
              >
              {item.subTitles.map((subItem) => (
                <Menu.Item onClick={this.handleMenuItemClick} key={subItem.title}>
                  <Link to={subItem.path}>{subItem.title}</Link>
                </Menu.Item>
              ))}
            </SubMenu>
            ))}
          </Menu>
        </Sider> : null}
        <Layout style={{ marginLeft: OS.isPc ? (this.state.collapsed ? 80 : 250) : 0 }}>
          <Header style={{ background: '#fff', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Search
              placeholder="请输入关键字"
              onSearch={(keyword) => { 
                this.setState({ title: '搜索', subTitle: ''});
                router.push(`/search?keyword=${keyword}`);
              }}
              style={{ width: OS.isPc ? 250 : 180, marginLeft: 20 }}
            />
            
            <div>
              <Button style={{ position: 'relative', marginRight: 20 }} onMouseOver={() => {
                document.getElementById('qrcode').setAttribute('class', STYLE.showQrcode);
              }} onMouseOut={() => {
                document.getElementById('qrcode').setAttribute('class', STYLE.hideQrcode);
              }}>
                <Icon className={STYLE.weixin} type="wechat" />
                <img id='qrcode' className={STYLE.hideQrcode} src={require('../../images/callMe.jpg')}/>
              </Button>

              <Button onClick={() => {
                router.push(`/cloud`);
                this.setState({ title: '云盘', subTitle: ''});
              }} style={{ marginRight: 20}}>云盘</Button>

              {getCookie('role') === '1' && OS.isPc && (
                <Button onClick={() => {
                  router.push(`/admin`);
                  this.setState({ title: '后台', subTitle: '', collapsed: true});
                }} style={{ marginRight: 20}}>后台</Button>
              )}

              {OS.isPc ? (
                <Button onClick={() => {
                  if (getCookie('toekn')) return;
                   router.push(`/login`);
                  this.setState({ title: '登录', subTitle: '', collapsed: true });
                }} style={{ marginRight: 20}}>
                  {getCookie('token') ? `你好，${getCookie('username')}` : '登录'}
                </Button>
              ) : null}

            </div>

          </Header>
          <Content style={{ margin: '0 16px', overflow: 'initial' }} >
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>{this.state.title}</Breadcrumb.Item>
              <Breadcrumb.Item>{this.state.subTitle}</Breadcrumb.Item>
            </Breadcrumb>
            {this.props.children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>橘子科技 ©2019 Created by GG</Footer>
        </Layout>
      </Layout>
    );
  }
}
