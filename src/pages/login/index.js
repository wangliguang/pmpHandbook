import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Modal } from 'antd';
import STYLE from './index.css';
import router from 'umi/router';
import Bmob from "hydrogen-js-sdk";
import { setCookie } from '../../tool/cookie';
import HocPage from '../HocPage';

class Login extends React.Component {
  
  static isSelfRender = true; 

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, userInfo) => {
      if (!err) {
        Bmob.User.login(userInfo.username, userInfo.password).then(res => {
          router.replace('/integration/pmp41?chapter=项目整合管理&section=制定项目章程');
          setCookie('token', res.sessionToken);
          setCookie('role', res.role);
          setCookie('username', userInfo.username);
        }).catch(err => {
          Modal.error({
            content: err.error
          });
       });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ padding: 20, minHeight: 500, background: "white"}}>
        <Form onSubmit={this.handleSubmit} className={STYLE.login_form}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={STYLE.login_form_button}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default WrappedNormalLoginForm;