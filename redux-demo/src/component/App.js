import React from "react";
import Footer from "./Footer";
import AddTodo from "../containers/AddTodo";
import VisibleTodoList from "../containers/VisibleTodoList";

/*
	component文件夹放的是展示组件
	container文件夹放容器组件

	展示组件： 只需要定义界面元素结构，界面展示，不需要关心数据来源和变换，只需要负责传入什么就渲染什么，展示组件是没有灵魂的。
	容器组件： 用来将展示组件连接到redux，也就是赋予它生命。

	展示组件：
		只是普通的react组件，如果只是比较简单的无状态组件完全可以使用函数搞定，如果需要使用本地state、生命周期、性能优化这些可以转成class的形式。

	容器组件：
		容器组件要做的事情就是管理展示组件的各种状态。
		使用store.subscribe()从Redux树中读取部分数据，并通过props来把这些数据提供给要渲染的组件。
		一般使用React Redux库中的connect()来完成。
		使用connect()之前，需要先定义mapStateToProps这样一个函数来指定如何将当前redux store state映射到展示组件的props中。
		除了从redux中读取state，容器组件还可以分发action，可以通过定义mapDispatchToProps这样一个函数接收dispatch()方法，并返回期望注入到展示容器的props中的回调函数。


	合成组件： 
		最终将所有的容器组件包裹在一个父元素之下导出。


	传入 Store
	所有容器组件都可以访问 Redux store，所以可以手动监听它。一种方式是把它以 props 的形式传入到所有容器组件中。
	但这太麻烦了，因为必须要用 store 把展示组件包裹一层，仅仅是因为恰好在组件树中渲染了一个容器组件。
	建议的方式是使用指定的 React Redux 组件 <Provider> 来 魔法般的 让所有容器组件都可以访问 store，而不必显式地传递它。只需要在渲染根组件时使用即可。


	action 
		action是数据的唯一来源，负责把数据从应用传到store中。

	reducer
		reducer指定了应用状态变化如何响应action并发送到store。

	store
		store就是一个将action与reducer连接起来的对象。

*/

const App = () => (
	<div>
		<AddTodo/>
		<VisibleTodoList/>
		<Footer/>
	</div>
)

/**
 * app组件由三个子组件构成。
 * 	
 */

export default App;