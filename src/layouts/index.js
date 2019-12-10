import { Layout, Menu, Breadcrumb } from 'antd';
import React from 'react';
import LAYOUT_DATA from './layout';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            {LAYOUT_DATA.map((item, i) => (
              <SubMenu
                key={`${i}`}
                title={<span>{item.title}</span>}
              >
              {item.subType.map((subTypeTitle, j) => (
                <Menu.Item key={`${i}_${j}`}>{subTypeTitle}</Menu.Item>
              ))}
            </SubMenu>
            ))}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}
