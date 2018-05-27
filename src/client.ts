

import { start, router, getState, setState, element, forElem, html } from './index';

// 
start(document.body, async (state) => {
  return forElem( element`<div>
  <div>Hello World</div>
    <button id="inc">+1</button>
    <button id="dec">-1</button>
    <div></div>   
    
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
  cnt : 0 ,
  list : [1,2,3,4,5]
})


setInterval( ( ) => {
  const list = []
  let cnt = 100 + Math.random()*20
  while( cnt-- > 0 ) {
    list.push( Math.floor( Math.random()* 20 ))
  }
  setState({list})
},5000)

/*

    ${await router({
      "hello" : _ => element`<div>This is hello from hello route</div>`,
      "default" : _ => element`<div>default route</div>`
    })} 

*/