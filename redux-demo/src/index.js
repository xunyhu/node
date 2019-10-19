import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers";
import App from "./component/App"; 

const store = createStore(rootReducer);

// render(
// 	<Provider store={store}>
// 		<App/>
// 	</Provider>,
// 	document.getElementById('root')
// )


import {
	addTodo,
	toggleTodo,
	setVisibilityFilter,
	VisibilityFilters
} from './actions'

console.log(store.getState())

const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

store.dispatch(addTodo('第一条action'))
store.dispatch(addTodo('第二条action'))
store.dispatch(addTodo('第三条action'))
store.dispatch(toggleTodo(0))
store.dispatch(toggleTodo(1))
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))