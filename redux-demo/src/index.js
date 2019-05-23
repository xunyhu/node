import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers";
import App from "./component/App"; 

const store = createStore(rootReducer);

/**
 *  主入口index文件
 * 
 * 	最外层使用了Redux包裹整个app大组件，并且传入了store
 */

render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root')
)
