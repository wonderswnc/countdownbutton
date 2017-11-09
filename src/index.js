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
        <span className="github_icon"><a href="https://github.com/wonderswnc/countdownbutton" title="我的github">
          <svg aria-hidden="true" class="octicon octicon-mark-github" height="32" version="1.1" viewBox="0 0 16 16" width="32"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
        </a></span>
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