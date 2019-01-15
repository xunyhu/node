// 状态提升
//在React中，状态分享是通过将state数据提升至离需要这些数据的组件最近的父组件来完成的。这就是所谓的状态提升。

import React from 'react';
import ReactDOM from 'react-dom';

const scaleNames = {
	// c: 'Celsius',
	// f: 'Fahrenheit'
	c: '摄氏度',
	f: '华氏温度'
}

const toCelsius = (fahrenheit) => (fahrenheit - 32) * 5 / 9;

const toFahrenheit = (celsius) => (celsius * 9 / 5) + 32;

const tryConvert = (temperature, convert) => {
	const input = parseFloat(temperature);
	if (Number.isNaN(input)) {
		return '';
	}
	const output = convert(input);
	const rounded = Math.round(output * 1000) / 1000;
	return rounded.toString();
}

// function toCelsius(fahrenheit) {
// 	return (fahrenheit - 32) * 5 / 9;
// }

// function toFahrenheit(celsius) {
// 	return (celsius * 9 / 5) + 32;
// }

// function tryConvert(temperature, convert) {
// 	const input = parseFloat(temperature);
// 	if (Number.isNaN(input)) {
// 		return '';
// 	}
// 	const output = convert(input);
// 	const rounded = Math.round(output * 1000) / 1000;
// 	return rounded.toString();
// }

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

class TemperatureInput extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {temperature: ''};
	}

	handleChange(e) {
		// this.setState({temperature: e.target.value});
		this.props.onTemperatureChange(e.target.value);
	}

	render() {
		// const temperature = this.state.temperature;
		const temperature = this.props.temperature;
		const scale = this.props.scale;
		return (
			<fieldset>
				<legent>请输入 {scaleNames[scale]}</legent>
				<input value={temperature} onChange={this.handleChange} />
			</fieldset>
		)
	}
}

class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {temperature: '', scale: 'c'};
		this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
		this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
	}

	handleCelsiusChange(temperature) {
		this.setState({scale: 'c', temperature});
	}

	handleFahrenheitChange(temperature) {
		this.setState({scale: 'f', temperature});
	}

	render() {
		const scale = this.state.scale;
	    const temperature = this.state.temperature;
	    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
	    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

		return (
			<div>
				<TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange} />
				<TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange} />
				<BoilingVerdict celsius={parseFloat(celsius)} />
			</div>
		)
	}
}

export default Calculator;