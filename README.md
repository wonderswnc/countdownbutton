> 遇到的第一个面试题项目, 啊哈哈

# 下面是一个React的倒计时按钮组件

---

## 何时使用

# 需要一定时间间隔后再进行某些操作的时候

---

## API

```jsx
<CountDown />
```

> 所有的参数都不为必传参数, 除此之外的参数会继承到组件的button元素上面。提供的reset函数接受一个重置后的状态作为参数。

| 参数 | 说明 | 类型 | 默认值 |
|:---:|:----:|:---:|:-----:|
| checkForm | 点击按钮后检测表单信息, 应该保证一直有一个返回值, 返回值为true表示初始状态 | Function | () => true | 
| onSubmit | 点击按钮后, 发生的事件。 比如向后台去数据, 第一个参数为组件的reset函数 | Function | () => {}|
| onComplete | 倒计时结束后需要发生的事件 | Function | () => {}|
| tooltipsMap | 警告或者错误提示对象 | Object | {'type1': '对不起, 请输入电话号码','type2': '该电话已经被注册, 请直接登录','type3': '请输入正确的电话号码'} |
| time | 倒计时的时长 | Number | 5 |
| label | 倒计时开始后按钮的文字,可自定义, 用‘$’符号占据时间的位置 | String | '$秒后可再次发送验证码' 
| defaultText | 默认状态下按钮的文字 | String | '发送验证码'|

---

# 示例

> 相关示例的表现可以去[这里](https://wonderswnc.github.io/countdownbutton/)查看

## 例一

> 利用onSubmit和onComplete可以在按钮倒计时开始前和结束后执行一些事件
---
> 点击按钮，开始会弹出弹框，倒计时开始，结束计时后会出发onComplete函数

```jsx

const action_1 = () => {
  alert('倒计时开始')
}

const action_2 = () => {
  alert('倒计时结束')
}

<CountDownButton 
  time = {10}
  onSubmit = {action_1}
  onComplete = {action_2}
/>

```

## 例二

> label以及defaultText分别允许自定义button的倒计时文字和默认状态的文字。额外的参数会转移到组件的button元素上面。
---
> 这里我们给组件设置了一个额外的props，他会自动传递到button里面去

```jsx

<CountDownButton
  lable = {'还有$s钟才可以提交'}
  defaultText = {'提交'}
  style={{fontSize: '16px'}}
>

```

## 例三

> tooltipsMap可以允许自定义按钮提示信息, checkForm函数可以接受一个检查表单的方法，返回值是button的状态, 返回true将执行onSubmit的函数以及开始倒计时
---
> 在没有输入名字或者密码的时候，按钮会进入相应的你设置的tooltips状态，不会进行下一步的submit操作

```jsx

const tips = {
  'name_empty': '名字不能为空哦',
  'passwd_empty': '似乎你忘记了填写密码'
}

const checkForm = () => {
    if (this.username.value === '') {
      return 'name_empty'
    }
    if (this.passwd.value === '') {
      return 'passwd_empty'
    }
    return true;
  }

<div>
  <div>
    <label>用户名： <input type="text" name="username" ref={username => this.username = username}/></label>
    <label>密码： <input type="password" name="passwd" ref={passwd => this.passwd = passwd}/></label>
  </div>
  <CountDownButton 
    tooltipsMap = {tips}
    checkForm = {this.checkForm}
  />
</div>

```

## 例四

> 可以通过onSubmit函数定义一个计时器开始的前一个动作，比如可以异步的请求服务器, 这个函数提供第一个参数为组件的reset函数。当然你也可以通过设置一个ref, 来得到组件的reset函数。
---
> 点击按钮待信息填写完整之后，会触发submit事件，可以在这里使用reset函数将组件置于某种状态

```jsx

const onSubmit = reset => {
  reset = reset || this.cdBtn.reset;
  setTimeout(function() {
    reset('type2');
  }, 2000);
}

<div>
  <div>
    <label>电话号码: <input type="text" name="input" ref={input => this.input = input}/></label>
  </div>
  <CountDownButton 
    ref={cdBtn => this.cdBtn = cdBtn}
    checkForm={this.checkForm_2}
    onSubmit={this.onSubmit}
  />
</div>

```

