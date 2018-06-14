import { mount, router, getState, setState, html, drmfComponent, drmfTemplate } from './index';


const myList = []
this.state = { myList }
for(let i=0; i<1000; i++) {
  myList.push(i)
}    
setState({myList})
setInterval( ()=>{
  myList.reverse()
  setState({myList})
},60)

class Benchmark extends drmfComponent {
  render() : drmfTemplate {
    const state = getState()
    return html`<ul>${state.myList.map( item => html`<li>Item ${item}</li>`)}</ul>`
  }
}
mount(document.body, _ => html`<h1>Benchmark</h1></h1><ul>${_.myList.map( item => html`<li>Item ${item}</li>`)}</ul>`)