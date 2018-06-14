import {html,render} from 'lit-html'


const list = []
for(let i=0; i<1000; i++) {
  list.push(i)
}
function r() {
  list.reverse()
  return html`<ul>${
       list.map( item => html`<li>Item ${item}</li>`)
       }</ul>`
}

setInterval( _ => render(r(), document.body), 20)