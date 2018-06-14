import { mount, router, getState, setState, html, drmfComponent, drmfTemplate, key } from './index';


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
mount(document.body, _ => html`<ul  >${_.myList.map( item => html`<li> ${key(item)} Item ${item}</li>`)}</ul>`)