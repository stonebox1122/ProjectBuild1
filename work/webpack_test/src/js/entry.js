import {foo, bar} from './math';
import data from '../data/test.json';
import '../css/test.css';

//注意data会自动被转换为原生的js对象或者数组
console.log(typeof data);
document.write('entry.js is working' + '<br/>');
document.write(foo(3) + '<br/>');
document.write(bar(3) + '<br/>');
document.write(JSON.stringify(data) + '<br/>');