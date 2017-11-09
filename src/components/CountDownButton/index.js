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

    this.lable = '';
    this.time = 5;
    this.timekey = null;
    this.tooltipsMap = {};

    this.init = this.init.bind(this);
    this.startCountDown = this.startCountDown.bind(this);
    this.reset = this.reset.bind(this);
    this.checkInfo = this.checkInfo.bind(this);

  }

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    clearTimeout(this.timekey);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (Object.keys(this.tooltipsMap).indexOf(nextProps.status) !== -1) {
  //     this.reset(nextProps.status);
  //   } else {
  //     this.setState({ status: true })
  //   }
  // }

  init( status = true ) {
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
    const countDown = () => {
      this.timekey = setTimeout(() => {
        if (this.time > 1) {
          this.setState({buttonText: this.lable.replace('$', --this.time)});
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
    }, () => countDown());
  }

  checkInfo() {
    const { onSubmit, checkForm } = this.props;
    const status = checkForm && checkForm();
    if (status === true) {
      this.startCountDown();
      onSubmit(this.reset); 
    }
    if (Object.keys(this.tooltipsMap).indexOf(status) !== -1) {
      this.setState({ status })
    }
    this.setState({ status });
  }

  reset( status = true ) {
    clearTimeout(this.timekey);
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