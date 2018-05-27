

import { start, router, getState, setState, element, forElem, html } from './index';

perf_test()

// 
function simple_test() {
  start(document.body, async (state) => {
    return forElem( 
      element`
      <div>
          ${element`${state.cnt}`}
          <button id="inc">+1</button>
          <button id="dec">-1</button>
          ${element`<div>${state.cnt}</div>`}
          <input/>
      </div>
    `, o => {
      o.inc.onclick = () => setState({cnt : state.cnt + 1 })
      o.dec.onclick = () => setState({cnt : state.cnt - 1 })
    })
  }, {
    cnt : 0 
  })
}

function router_example() {
  start(document.body, async (state) => {
    return element`<div>
      <div>
        <a href="#hello">hello</a>
        <a href="#list">list all</a>
        <a href="#list/len/4">list, first 4</a>
      </div>
      ${await router({
        "hello" : _ => element`<div>This is hello from hello route</div>`,
        "list" : _ => {
          const values = _.params.len ? _.list.slice(0, _.params.len | 0) : _.list
          return element`<div>
            <ul>${values.map( _ => element`<li><a href="#hello">${_}</a></li>`)}</ul>
          </div>
          `
        }
      })} 
  </div>
    `
  }, {
    list :[1,2,3,4,5,6,7,8,9,10] 
  })
}

function perf_test() {
  start(document.body, async (state) => {
    return forElem( 
      element`<div>
        <div>Hello World</div>
          <div>
            <a href="#hello">hello</a>
            <a href="#list">list</a>
          </div>
      <button id="inc">+1</button>
      <button id="dec">-1</button>
      <div>${state.cnt}</div>   
      
      ${
        element`<div>The counter is ${state.cnt} and page <b>${state.page}</b></div>`
      }
      ${
        element`<div>
          This is the  page value
          <b>It may work ? </b>
          <textarea value="jee" cols="80" rows="5" ></textarea>
        </div>`
      }
      ${await router({
        "hello" : _ => element`<div>This is hello from hello route</div>`,
        "default" : _ => element`<div>default route</div>`,
        "list" : _ => {
          console.log(_.phase)
          const values = _.params.len ? _.list.slice(0, _.params.len | 0) : _.list
          return element`<div>
            <ul>${values.map( _ => html`<li><a href="#hello">${_}</a></li>`)}</ul>
          </div>
          `
        }
      })} 
  </div>
    `, o => {
      o.inc.onclick = () => setState({cnt : state.cnt + 1 })
      o.dec.onclick = () => setState({cnt : state.cnt - 1 })
    })
  }, {
    cnt : 0 
  })
  setInterval( ( ) => {
    const list = []
    let cnt = 1000 + Math.random()*20
    while( cnt-- > 0 ) {
      list.push( Math.floor( Math.random()* 20 ))
    }
    setState({list})
  },40)
}

