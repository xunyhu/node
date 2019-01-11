import _ from "lodash";
import './index.css';
import ym from './img/ym.jpg';
import Print from './print.js';

function component() {
	var ele = document.createElement('div');
	ele.innerHTML = _.join(['Hello', 'WebPack'], '');

	// var ele = new Image();
	// ele.src = ym;

	var btn = document.createElement('button');
	btn.innerHTML = "Click Me!";
	btn.onclick = Print;
	ele.appendChild(btn);
	return ele;
}


document.body.appendChild(component());