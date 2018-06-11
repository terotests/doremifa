

import { mount, router, getState, setState, html, drmfComponent, drmfTemplate } from './index';

import * as Doremifa from './index';

const list = [1,2,3,4]

function page1() {
  return html`
    ${list.map( _ => html`<div>${_}</div>`)}
  `
}

function page2() {
  return html`<div>Second page</div>`
}

function page3() {
  return html`<div>Third page</div>`
}

/*

html`${[html'<div/>']}`

*/


mount(document.body, state => html`
  <h1>Hello World!!!</h1>
  <a href="#page1">1</a>
  <a href="#page2">2</a>
  <a href="#page3">3</a>
  ${router({page1,page2,page3,default:page3})}
`)


