import { mount, router, getState, setState, html, drmfComponent, drmfTemplate, key } from './index';


function _random (max) {
  return Math.round(Math.random() * 1000) % max;
}

function buildData (count = 1000) {
  var adjectives = ['pretty', 'large', 'big', 'small', 'tall', 'short', 'long', 'handsome', 'plain', 'quaint', 'clean', 'elegant', 'easy', 'angry', 'crazy', 'helpful', 'mushy', 'odd', 'unsightly', 'adorable', 'important', 'inexpensive', 'cheap', 'expensive', 'fancy'];
  var colours = ['red', 'yellow', 'blue', 'green', 'pink', 'brown', 'purple', 'brown', 'white', 'black', 'orange'];
  var nouns = ['table', 'chair', 'house', 'bbq', 'desk', 'car', 'pony', 'cookie', 'sandwich', 'burger', 'pizza', 'mouse', 'keyboard'];
  var data = new Array(1000);
  let id = 0;
  for (var i = 0; i < count; i++) {
    data[i] = {
      id: id++,
      label: adjectives[_random(adjectives.length)] + ' ' + colours[_random(colours.length)] + ' ' + nouns[_random(nouns.length)]
    };
  }
  return data;
}

const myList = []
this.state = { myList }
  
//  
//  
// onclick=${ _ => {}}
setState({myList})
// <td class="col-md-4"><a href="#" onclick=${ _ => {}} >${item.label}</a></td>

mount(document.body, _ => {
 return html`
<table class="table table-hover table-striped test-data">
<tbody>${
      _.myList.map( item => {
        return html`<tr class=${item.id === 'selected' ? 'danger' : ''} ><td class="col-md-1">
        ${item.id}</td><td class="col-md-4"><a href="#" onclick=${ _ => {}}>${item.label}</a></td><td class="col-md-1">
        <a href="#" onclick=${ _ => {}}  >
          <span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td>
        <td class="col-md-6"></td>
    </tr>`
      })
    }</tbody>
</table>
`})

setTimeout(()=>{
  setState({myList:buildData(10000)})
},2000)