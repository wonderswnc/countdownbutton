import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.less';

import { CountDownButton } from './components';

class TestCountButton extends Component {

  action_1 = () => {
    alert('发送消息中!')
  }

  action_2 = () => {
    alert('倒计时结束!')
  }

  checkForm_1 = () => {
    if (this.username.value === '') {
      return 'name_empty'
    }
    if (this.passwd.value === '') {
      return 'passwd_empty'
    }
    return true;
  }

  checkForm_2 = () => {
    if (this.input.value === '') {
      return 'type1';
    }

    return true;
  }

  onSubmit = reset => {
    reset = reset || this.cdBtn.reset;
    setTimeout(function() {
      reset();
      alert('已经重置！')
    }, 2000);
  }

  render() {

    const tips = {
      'name_empty': '名字不能为空哦',
      'passwd_empty': '似乎你忘记了填写密码'
    }

    return (
      <div className="test_wrapper">
        <span className="github_icon"><a href="">我的github</a></span>
        <div className="test test_1">
          <h5>用例一</h5>
          <div className="content">
            <CountDownButton 
              time = {10}
              onSubmit = {this.action_1}
              onComplete = {this.action_2}
            />
          </div>
          <div className="img-wrapper">
           <img src="/src/images/test1.jpeg"/>
          </div>
        </div>
        <div className="test test_2">
          <h5>用例二</h5>
          <div className="content">
            <CountDownButton
              lable = {'还有$s钟才可以提交'}
              defaultText = {'提交'}
              style={{fontSize: '16px'}}
            />
          </div>
          <div className="img-wrapper">
           <img src="/src/images/test2.jpeg"/>
          </div>
        </div>
        <div className="test test_3">
          <h5>用例三</h5>
          <div className="content">
            <div className="content-form">
              <label><span>用户名： </span><input type="text" name="username" ref={username => this.username = username}/></label>
              <label><span>密码： </span><input type="password" name="passwd" ref={passwd => this.passwd = passwd}/></label>
            </div>
            <CountDownButton 
              tooltipsMap = {tips}
              checkForm = {this.checkForm_1}
            />
          </div>
          <div className="img-wrapper">
           <img src="/src/images/test3.jpeg"/>
          </div>
        </div>
        <div className="test test_4">
          <h5>用例四</h5>
          <div className="content">
            <div className="content-form">
              <label><span>电话号码：</span><input type="text" name="input" ref={input => this.input = input}/></label>
            </div>
            <CountDownButton 
              ref={cdBtn => this.cdBtn = cdBtn}
              checkForm={this.checkForm_2}
              onSubmit={this.onSubmit}
            />
          </div>
          <div className="img-wrapper">
           <img src="/src/images/test4.jpeg"/>
          </div>
        </div>
      </div>
    )
  }
}

render(
  <TestCountButton />,
  document.getElementById('root')
)