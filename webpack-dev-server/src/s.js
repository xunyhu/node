// 状态提升

import React from 'react';
import ReactDOM from 'react-dom';

class BoilingVerdict extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>{this.props.celsius >= 100 ? <p>水会烧开</p> : <p>水不会烧开</p>}</div>
		)
	}
}

class Calculator  extends React.Component {
	constructor(props) {
		super(props);
		this.state = {temperature: ''};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.setState({temperature: e.target.value})
	}

	render() {
		const temperature = this.state.temperature;
		return (
			<fieldset>
				<legend>输入一个摄氏温度</legend>
				<input value={temperature} onChange={this.handleChange} />
				 <BoilingVerdict celsius={parseFloat(temperature)} />
			</fieldset>
		)
	}
}

export default Calculator;