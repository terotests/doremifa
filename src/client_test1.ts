

import { mount, router, getState, setState, html, drmfComponent, drmfTemplate } from './index';

import * as Doremifa from './index';

const list = [1,2,3,4]
let ok = false
function page1() {
  return html`
    ${ ok ? html`
      <div>OK?</div>
    ` : '...'}
  `
}

function page2() {
  return html`<div>Second page</div>
  ${list.map( _ => html`<div>Item ${_}</div>`)}
  <button click=${ _ => {
    list.push(list.length+1)
    setState({})
  }}>+ item</button>
  <button click=${ _ => {
    list.splice(0,1)
    setState({})
  }}>- item</button>  
  ${list.map( _ => html`<div>Item ${_}</div>`)}
  `
}

function page3() {
  return html`<div>Third page</div>`
}

mount(document.body, state => html`
  <h1>Hello World!!!</h1>
  <a href="#page1">1</a>
  <a href="#page2">2</a>
  <a href="#page3">3</a>
  <button click=${_ => {
    ok = !ok
    setState({})
  }}>Ok</button>
  ${router({page1,page2,page3,default:page3})}
`)


