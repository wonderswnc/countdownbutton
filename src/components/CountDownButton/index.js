import React, { Component } from 'react';
import proptypes from 'prop-types';
import './style.less';

class CountDown extends Component  {

  static defaultProps = {
    checkForm: () => true,
    onSubmit: () => {},
    onComplete: () => {},
    tooltipsMap: {'type1': '对不起, 请输入电话号码','type2': '改电话已经被注册, 请直接登录','type3': '请输入正确的电话号码'},
    time: 5,
    lable: '$秒后可再次发送验证码',
    defaultText: '发送验证码',
  }

  static propTypes = {
    checkForm: proptypes.func,
    onSubmit: proptypes.func,
    onComplete: proptypes.func,
    resetMark: proptypes.bool,
    tooltipsMap: proptypes.object,
    time: proptypes.number,
    lable: proptypes.string,
    defaultText: proptypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      buttonText: '',
      cdMark: false,
      status: true
    }

    this.lable = ''; //提示文字
    this.time = 5; //倒计时时长
    this.timekey = null; //记录setTimeout返回值
    this.tooltipsMap = {}; //提示文字对应关系

    this.init = this.init.bind(this); //初始化函数
    this.startCountDown = this.startCountDown.bind(this); //开始倒计时函数
    this.reset = this.reset.bind(this); //重置函数
    this.checkInfo = this.checkInfo.bind(this); //检查

  }

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    clearTimeout(this.timekey); //清除计时器
  }

  // componentWillReceiveProps(nextProps) {
  //   if (Object.keys(this.tooltipsMap).indexOf(nextProps.status) !== -1) {
  //     this.reset(nextProps.status);
  //   } else {
  //     this.setState({ status: true })
  //   }
  // }

  init( status = true ) { //初始化函数，用来将组件状态恢复到最开始的状态
    const { time, lable, defaultText, tooltipsMap } = this.props;
    this.time = time;
    this.lable = lable;
    this.defaultText = defaultText;
    this.tooltipsMap = tooltipsMap;

    this.setState({
      buttonText: defaultText,
      cdMark: false,
      status: status
    })
  }

  startCountDown() {
    const countDown = () => { //定义倒计时计算函数
      this.timekey = setTimeout(() => {
        if (this.time > 1) { 
          this.setState({buttonText: this.lable.replace('$', --this.time)}); //修改button文字
          countDown();
        } else {
          this.init();
          this.props.onComplete();
        }
      }, 1000);
    };
    this.setState({
      cdMark: true,
      buttonText: this.lable.replace('$', this.time)
    }, () => countDown()); //将文字修改为倒计时状态文字并开始倒计时
  }

  checkInfo() {
    const { onSubmit, checkForm } = this.props;
    const status = checkForm && checkForm(); //获取表单检查函数返回值，不传默认函数返回为true
    if (status === true) {
      this.startCountDown(); //开始倒计时
      onSubmit(this.reset); //开始submit操作，并将重置函数传递过去
    }
    if (Object.keys(this.tooltipsMap).indexOf(status) !== -1) {
      this.setState({ status }) //返回值不为true将组建状态置于返回值的状态
    }
    this.setState({ status }); 
  }

  reset( status = true ) {
    clearTimeout(this.timekey); //清楚计时器
    this.init( status );
  }

  render() {

    const { status, cdMark, buttonText } = this.state;
    const defaultProps = ['checkForm','onSubmit','onComplete','tooltipsMap','time','lable','defaultText'];
    const overProps = {};
    Object.entries(this.props).forEach(ky => {
      if (defaultProps.indexOf(ky[0]) === -1) {
        overProps[ky[0]] = ky[1];
      }
    })

    return (
      <div className={`countdown ${status === true ? '' : 'wranning'}`}>
        <button disabled={cdMark} onClick={this.checkInfo} {... overProps}>
          { buttonText }
        </button>
        {
          status === true ? 
          null : 
          <span>{this.tooltipsMap[status]}</span>
        }
        {/*<button onClick={this.reset}>reset</button>*/}
      </div>
    )
  }
}

export default CountDown;