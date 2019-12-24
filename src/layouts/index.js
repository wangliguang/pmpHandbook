import { Layout, Menu, Breadcrumb, Icon, Button, Input } from 'antd';
import React from 'react';
import LAYOUT_DATA from './layout';
import router from 'umi/router';
import Link from 'umi/link';
import STYLE from './index.css';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Search } = Input;

export default class extends React.Component {
  state = {
    collapsed: false,
    title: '四：项目整合管理',
    subTitle: '4.1：制定项目章程',
  };

  componentDidMount() {
    router.replace('/integration/pmp41');
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
        <Sider className={STYLE.sider} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} breakpoint="lg">
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
        </Sider>
        <Layout style={{ marginLeft: this.state.collapsed ? 80 : 200 }}>
          <Header style={{ background: '#fff', padding: 0 }}>
          <Search
            placeholder="请输入关键字"
            onSearch={(keyword) => { 
              this.setState({ title: '搜索', subTitle: ''});
              router.push(`/search?keyword=${keyword}`);
            }}
            style={{ width: 250, marginLeft: 20 }}
          />
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
