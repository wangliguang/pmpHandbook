import { Layout, Menu, Breadcrumb } from 'antd';
import React from 'react';
import LAYOUT_DATA from './layout';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class extends React.Component {
  state = {
    collapsed: false,
    title: '#1',
    subTitle: '',
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  handleSubMenuClick = (item) => {
    this.setState({
      title: item.key,
      subTitle: '',
    });
  } 

  handleMenuItemClick = (item) => {
    this.setState({
      subTitle: item.key,
    });
  } 

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            {LAYOUT_DATA.map((item) => (
              <SubMenu
                onTitleClick={this.handleSubMenuClick}
                key={item.title}
                title={<span>{item.title}</span>}
              >
              {item.subType.map((subTypeTitle) => (
                <Menu.Item onClick={this.handleMenuItemClick} key={subTypeTitle}>{subTypeTitle}</Menu.Item>
              ))}
            </SubMenu>
            ))}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>{this.state.title}</Breadcrumb.Item>
              <Breadcrumb.Item>{this.state.subTitle}</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>橘子科技 ©2019 Created by GG</Footer>
        </Layout>
      </Layout>
    );
  }
}
