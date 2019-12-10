import { Layout, Menu, Breadcrumb } from 'antd';
import React from 'react';
import LAYOUT_DATA from './layout';
import Link from 'umi/link';
import Integration from '../pages/integration';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class extends React.Component {
  state = {
    collapsed: false,
    title: '#1',
    subTitle: '#11',
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  handleMenuItemClick = (item) => {
    let title = '';
    for (const key in LAYOUT_DATA) {
      const tempItem = LAYOUT_DATA[key];
      tempItem.subTitles.forEach(element => {
        if (item.key === element) {
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
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['#11']} mode="inline">
            {LAYOUT_DATA.map((item) => (
              <SubMenu
                key={item.title}
                title={<span>{item.title}</span>}
              >
              {item.subTitles.map((subTitle) => (
                <Menu.Item onClick={this.handleMenuItemClick} key={subTitle}>
                  <Link to='/integration'>{subTitle}</Link>
                </Menu.Item>
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
            <Integration/>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>橘子科技 ©2019 Created by GG</Footer>
        </Layout>
      </Layout>
    );
  }
}
