// 组合 vs 继承
/*
	React 具有强大的组合模型，我们建议使用组合而不是继承来复用组件之间的代码。
*/

import React from 'react';
import ReactDOM from 'react-dom';

const FancyBorder = (props) => (
	<div className={'FancyBorder FancyBorder-' + props.color}>
		{props.children}
	</div>
);

const WelcomeDialog = () => (
	<FancyBorder color="blue">
	  <h1 className="Dialog-title">
        我是标题
      </h1>
      <p className="Dialog-message">
        内容内容内容内容
      </p>
	</FancyBorder>
);

//虽然不太常见，但有时你可能需要在组件中有多个入口，这种情况下你可以使用自己约定的属性而不是 children
const SplitPane = (props) => (
	<div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
);

const Contacts = () => <div className="Contacts">我是left</div>;
const Chat = () => <div className="Chat">我是right</div>;

const App = () => (
	<SplitPane left={<Contacts />} right={<Chat/>}/>
);


//特殊实例
const Dialog = (props) => (
	<FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
);

const Welcome = () => (
	<Dialog title="Welcome" message="测试测试测试"/>
);

class SignUpDialog  extends React.Component {
	constructor(props) {
		super(props);
		this.state = {login: ''};
		this.handleChange = this.handleChange.bind(this);
		this.handleSignUp = this.handleSignUp.bind(this);
	}

	handleChange(e) {
		this.setState({login: e.target.value})
	}

	handleSignUp() {
		alert(`Welcome , ${this.state.login}!`);
	}

	render() {
		return (
			<Dialog title="Welcome" message="测试测试测试">
				<input value={this.state.login} onChange={this.handleChange} />
				<button onClick={this.handleSignUp}> Sign Me Up!</button>
			</Dialog>
		)
	}
}


export default SignUpDialog;



