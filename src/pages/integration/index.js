import React from 'react';
import STYLE from './index.style.css';
import Content from '../../component/content';

const IMG_DATA = [
  require('../../assets/integration/1.png'),
  require('../../assets/integration/2.png'),
  require('../../assets/integration/3.png'),
  require('../../assets/integration/4.png'),
  require('../../assets/integration/5.png'),
  require('../../assets/integration/6.png'),
  require('../../assets/integration/7.png'),
  require('../../assets/integration/8.png'),
]
export default class IntegrationPage extends React.Component {

  render() {
    return (
      <div className={STYLE.page}>
        <Content imgs={IMG_DATA}/>
      </div>
    )
  }
}