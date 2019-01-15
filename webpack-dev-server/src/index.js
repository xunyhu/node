import React from 'react';
import ReactDOM from 'react-dom';
import S from './tic.js'


ReactDOM.render(<S/>, document.getElementById('root'))

// const Weclome = (props) => <p>hello, {props.name}</p>
// const element = <Weclome name="Alibaba"/>

// const app = (
// 		<div>
// 			<Weclome name="Alibaba"/>
// 			<Weclome name="TeCent"/>
// 			<Weclome name="BaiDu"/>
// 		</div>
// 	)
// ReactDOM.render(app, document.getElementById('root'))

// class Clock extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			data: new Date()
// 		};
// 	}

// 	componentDidMount() {
// 		this.timerID = setInterval(() => this.tick(), 1000);
// 	}

// 	componentWillUnmount() {
// 		clearInterval(timerID);
// 	}

// 	tick() {
// 		this.setState({data: new Date()})
// 	}

// 	render() {
// 		return (
// 			<div>
// 				<h1>hello</h1>
// 				{/*<p>现在是北京时间： {new Date().toLocaleString()}</p>*/}
// 				<p>现在是北京时间： {this.state.data.toLocaleTimeString()}</p>
// 			</div>
// 		)
// 	}
// }
// ReactDOM.render(<Clock/>, document.getElementById('root'));


// class Toggle extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			isToggleOn: true
// 		};
// 		this.handleClick = this.handleClick.bind(this);
// 	}

// 	handleClick() {
// 		this.setState(prevState => ({
// 			isToggleOn: !prevState.isToggleOn
// 		}))
// 	}

// 	render() {
// 		return(
// 			<button onClick={this.handleClick}>{this.state.isToggleOn ? 'ON' : 'OFF'}</button>
// 		)
// 	}
// }
// ReactDOM.render(<Toggle/>, document.getElementById('root'));


// function MailBox(props) {
// 	const messages = props.messages;
// 	/*
// 		之所以能这样做，是因为在 JavaScript 中，true && expression 总是返回 expression，
// 		而 false && expression 总是返回 false。
// 		因此，如果条件是 true，&& 右侧的元素就会被渲染，如果是 false，React 会忽略并跳过它。
// 	*/
// 	return (
// 		<div>
// 			<h1>hello</h1>
// 			{
// 				messages.length > 0 && 
// 				<h2>you have {messages.length} unread message</h2>
// 			}
// 		</div>
// 	)
// }

// const messages = ['React', 'Re: React', 'Re:Re: React'];

// ReactDOM.render(<MailBox messages={messages}/>, document.getElementById('root'))


// function Blog(props) {
// 	const sidebar = (
// 		<ul>
// 			{props.posts.map((post) => 
// 				<li key={post.id}>{post.title}</li>
// 			)}
// 		</ul>
// 	);

// 	const content = props.posts.map((post) => 
// 		<div key={post.id}>
// 			<h3>{post.title}</h3>
// 			<p>{post.content}</p>
// 		</div>
// 	);

// 	return (
// 		<div>
// 			{sidebar}
// 			<br/>
// 			{content}
// 		</div>
// 	)
// }

// const posts = [
//   {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
//   {id: 2, title: 'Installation', content: 'You can install React from npm.'}
// ];
// ReactDOM.render(<Blog posts={posts}/>, document.getElementById('root'));



// 表单
// class NameForm extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {vlaue: ''};
// 		this.handleChange = this.handleChange.bind(this);
// 		this.handleSubmit = this.handleSubmit.bind(this);
// 	}

// 	handleSubmit(e) {
// 		alert('A name was submitted: ' + this.state.value);
// 		e.preventDefault();
// 	}

// 	handleChange(e) {
// 		this.setState({value: e.target.value});
// 	}

// 	render() {
// 		return (
// 			<form onSubmit={this.handleSubmit}>
// 				<label>
// 					Name:
// 					<input type="text" value={this.state.value} onChange={this.handleChange} />
// 				</label>
// 				<input type="submit" vlaue="Submit"></input>
// 			</form>
// 		)
// 	}
// }
// ReactDOM.render(<NameForm/>, document.getElementById('root'));


// class EssayForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: 'Please write an essay about your favorite DOM element.'
//     };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     this.setState({value: event.target.value});
//   }

//   handleSubmit(event) {
//     alert('An essay was submitted: ' + this.state.value);
//     event.preventDefault();
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Name:
//           <textarea value={this.state.value} onChange={this.handleChange} />
//         </label>
//         <input type="submit" value="Submit" />
//       </form>
//     );
//   }
// }
// ReactDOM.render(<EssayForm/>, document.getElementById('root'));