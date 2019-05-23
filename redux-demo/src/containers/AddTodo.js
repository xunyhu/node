import React from "react";
import { connect } from "react-redux";
import { addTodo } from "../actions";

const AddTodo = ({ dispatch }) => {
	let input;
	return (
		<div>
			<form
			   onSubmit={e => {
			   		e.preventDefault()
			   		if (!input.value.trim()) {
			   			return
			   		}
			   		dispatch(addTodo(input.value))
			   		input.value = ""
			   }}
			>
				<input ref={node => (input = node)}/>
				<button type="submit">Add Todo</button>
			</form>
		</div>
	)
}

/**
 *  redux主要由三部分组成：store，reducer，action。
 * 
 *  使用的redux的connect方法，引入了actions里面的addTodo方法，并且通过dispatch发送了这个方法
 * 	
 * 	dispatch: 用于action的分发——在createStore中可以用middleware中间件对dispatch进行改造，比如当action传入dispatch会立即触发reducer，
 * 	有些时候我们不希望它立即触发，而是等待异步操作完成之后再触发，这时候用redux-thunk对dispatch进行改造，以前只能传入一个对象，改造完成后可以传入一个函数，
 *  在这个函数里我们手动dispatch一个action对象，这个过程是可控的，就实现了异步。
 * 
 * 	如果只使用redux，那么流程是这样的：
 * 	component --> dispatch(action) --> reducer --> subscribe --> getState --> component
 * 
 * 	用了react-redux之后流程是这样的：
 * 	component --> actionCreator(data) --> reducer --> component
 * 
 */

export default connect()(AddTodo);