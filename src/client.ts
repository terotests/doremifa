import * as Doremifa from '../src/'

const html = Doremifa.html;
const setState = Doremifa.setState
const getState = Doremifa.getState
class someClass extends Doremifa.drmfComponent {
  render() {
    return html`<div>Object test with render()</div>`
  }
}
const obj = new someClass()
function renderType(state) {
  switch(state.type) {
    case 0:
      return 'Just a Text <b>HTML not rendered</b>'
    case 1:
      return ['Array ', html`<b>Of</b> `, [3,' Different elems']]  
    case 2:
      return obj
    case 3:
      return html`<div>HTML <u>template</u> built with literal</div>`
  }
}

// initial state
setState({
  editable : false,
  type : 0,
  time:(new Date).toTimeString(),
  items : [1,2,3,4].map( id => ({ id : id, name : 'item ' + id}))
})

let idcnt = 4
const add_item = () =>{
  const state = getState()
  idcnt++
  setState({
    items : [...state.items, { id : idcnt, name : 'item '+idcnt}]
  })
}
const delete_item = (item) =>{
  const state = getState()
  setState({
    items : [...state.items.filter( i => i.id != item.id)]
  })
}

function editable_row(item) {
  return html`<li ${Doremifa.key(item.id)} class="list-group-item"><input value=${item.name} oninput=${ e =>{
    item.name = e.target.value
  }}/><a 
class="btn btn-light float-right" role="button" href=${`#details/id/${item.id}`}>Edit</a>
<button type="button" class="btn btn-light float-right" 
  onclick=${ _ => delete_item(item) }
>Remove</button>   
</li>`
}

function std_row(item) {
  return html`<li class="list-group-item">${item.name}</li>`
}

// mount application into some node
Doremifa.mount(document.body,
 (state) => 
    html`
  <div>Time now is: ${state.time}</div>
  <a href="#">Show List</a> 
  <a href="#page2">Show Page 2</a>
  ${Doremifa.router({   
    // route for #page2 
    page2 : (state) =>html`<h2>Route for page 2</h2>
  <!-- table render example -->
  <table class="table">
    ${[[1, 2], [3, 4]].map(tr =>
    html`<tr>
      ${tr.map(text => html`<td>Cell ${text}</td>`)}
    </tr>`)}
  </table>
  <div>
    The state is now 
    <pre>${JSON.stringify(state,null,2)}</pre>
  </div>
`,  
    // route for #itemlist
    default : (state) => 
      html`
   <div>${[0,1,2,3].map(ti => html`<button onclick=${_ => setState({type:ti})}>type ${ti}</button>`)}</div>
   ${renderType(state)}

<h2>Items ${state.items.length}</h2>

<button type="button" 
 class="btn btn-primary" onclick=${add_item}>+ item</button>
<button type="button" 
 class="btn btn-warning" onclick=${ _ => {
   setState( {items : state.items.reverse()} )
 }}>Reverse</button>
<button type="button" 
 class="btn btn-warning" onclick=${ _ => {
   setState( {editable : !state.editable} )
 }}>${state.editable ? 'Hide Edits' : 'Toggle Editable'}</button>
<ul class="list-group">
        ${state.items.length ? state.items.map( item => {
            return state.editable ? editable_row(item) : std_row(item)
          }) : html`<li class="list-group-item">List is empty</li>` }
</ul>
`,
    // route for #details/id/xxxx  
    details(state) {
      const item = state
        .items.filter( item => item.id == state.params.id).pop()
      return html`<h2>Item ${item.id}</h2>
        <input value=${item.name} id="name">
        <button onclick=${(e,tpl)=>{
          item.name = tpl.ids.name.value
          window.location.hash = "#"
        }}>Save</button>
        <button onclick=${_ => {
          delete_item(item)
          window.location.hash = "#"
        }}>Delete</button>      `
     }
    })}
</div>
`       
 )
// update the clock
setInterval( _ => {
  setState({time:(new Date).toTimeString()})
},1000)