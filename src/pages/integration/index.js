import React from 'react';
import STYLE from './index.style.css';
import xx from '../../../img/integration/1.png';

const IMG_DATA = [
  require('../../../img/integration/1.png'),
  require('../../../img/integration/2.png'),
  require('../../../img/integration/3.png'),
  require('../../../img/integration/4.png'),
  require('../../../img/integration/5.png'),
]
export default class IntegrationPage extends React.Component {

  render() {
    return (
      <div className={STYLE.page}>
        {IMG_DATA.map((img) => (
          <div className={STYLE.box}>
            <div className={STYLE.pic}>
              <img src={img}/>
            </div>
          </div>
        ))}
      </div>
    )
  }
}