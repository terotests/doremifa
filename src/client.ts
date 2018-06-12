

import { mount, router, getState, setState, html, drmfComponent, drmfTemplate } from './index';

import * as Doremifa from './index';

import { XMLBuilder, XMLParser} from './xmlparser'
import { setInterval } from 'timers';

function intropage(state) {

  const colorList = ['red', 'yellow', 'green', 'brown']
  return html`

<h1>Hello! This is the introduction page</h1>
<p>Hello World, it is ${(new Date).toString()}</p>
<div>Color is now ${state.color}</div>
<form action="#">
${
  colorList.map( color => html`
  <p>
    <label>
      <input name="group1" type="radio" checked=${state.color===color} list="colors" 
        click=${(e,tpl)=>{
          setState({color})
        }} />
      <span>${color}</span>
    </label>
  </p>  
  `)
}
</form>
<ul>
  ${[1,2,3,4,5,6].map( item => html`<li>${item}</li>`)}
</ul>
  `  
}

function details(state) {
  const item = state.list.filter( item => item.id == state.params.id ).pop()

  // could you just bind to the ID values directly...
  return html`<div>
    <h4>Details for item ${state.params.id}</h4>

    <form class="col s12">    
    <div class="row">
      <div class="input-field col s12">
        <input placeholder="Placeholder" value=${item.name} id="name" type="text" list="input" class="validate">
        <label for="name">Name</label>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="duration" type="text" value=${item.duration} class="validate">
          <label for="duration">Duration</label>
        </div>
      </div>
      <a class="waves-effect waves-light btn" click=${(e,tpl) => {
        item.duration = tpl.ids.duration.value
        item.name = tpl.ids.name.value
        window.location.hash = 'lista'
      }}>Tallenna tiedot</a>
      <a class="waves-effect waves-light btn" click=${(e,tpl) => {
        removeTask(item)
        window.location.hash = 'lista'
      }}>Poista</a>      
    </div>    
    </form>
  </div>`

}

function removeTask( task ) {
  const list = getState().list
  const index = list.indexOf(task)
  list.splice(index,1)
  setState({list})    
}

let id_list = 10
function generateID() {
  return id_list++
}

function addTask() {
  const list = getState().list
  const id = generateID()
  const task  = {
    id,
    name : 'Task ' + id,
    duration : Math.floor( 2 + Math.random()*8 )
  }
  list.push(task)
  setState({list})   
  return task 
}

function add100Tasks() {
  let cnt = 100
  while(cnt--) addTask()
}


function listademo(state) {
  let item_list
  const res = html`
  <div>
    <a class="waves-effect waves-light btn" click=${addTask}>+ Task</a>
    <a class="waves-effect waves-light btn" click=${add100Tasks}>+ 100 Tasks</a>
    <div class="collection">
      ${item_list = state.list.sort( (a,b) => a.id - b.id
      ).map( item => html`<li><a href="#details/id/${item.id}" class="collection-item" id="link">

        <span class="new badge blue"
        data-badge-caption="" 
        click=${ e => {
          e.preventDefault()
          item.duration--;
          setState({})
        }}>-</span>         
        <span class="new badge blue"
          data-badge-caption="" 
          click=${ e => {
            e.preventDefault()
            item.duration++;
            setState({})
          }}>+</span>      
        <span class=${item.duration > 3 ? 'new badge red' : 'new badge blue'} 
          data-badge-caption="h" >${item.duration}</span>
        ${item.name}</a></li>` ) }
    </div>    
  </div>
  `
  return res;
}

function createPoint(item) : drmfTemplate {
  const time = (new Date).getTime() / 1000
  const value = item.id
  const r = 10 + Math.sin(value/10)*5 
  const op = Math.abs( Math.cos(time) )
  const x = Math.floor( 200 + Math.cos(time + value/10) * (20 + value/2) * Math.cos( time ) )
  const y = Math.floor( 200 + Math.sin(time + value/10) * (20 + value/2) * Math.cos( time ) )
  return html`<circle fill="red" opacity=${op} r=${r} cx=${x} cy=${y}/>`
}

function svgPart(state) : drmfTemplate {
  return html `<svg height="600" width="600" viewBox="0 0 400 400">
                  ${state.list.map(createPoint)}
                </svg>` 
}

export class WestWorld extends drmfComponent {
  constructor() {
    super()
    console.log('West World was created!!!')
  }
  removeItem(){
    const list = getState().list
    list.push( Math.floor( Math.random()*100) )
    setState({list})    
  }  
  render() {
    const state = getState()
    return html`
    <div>
      <nav>
        <div class="nav-wrapper">
          <a href="#lista" class="brand-logo">Tasks: ${getState().list.length}</a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li><a href="#intro">Intro</a></li>
            <li><a href="#lista">Listademo</a></li>
            <li><a href="#svg">SVG</a></li>
            <li><a class="waves-effect waves-light btn" click=${e=> {
              e.preventDefault()
              addTask()
            }}>+ Item to list</a></li>
          </ul>
        </div>
      </nav>    
      <div>     
      </div>
      <div class="container">
        ${router({
          intro : intropage,
          lista : listademo,
          details : details,
          default : listademo,    
          svg : svgPart,       
        })}
      </div>        
    </div>   
    `
  }
}

let had_it = false
export class HelloWorld extends drmfComponent {
  myContent:drmfTemplate
  myCanvas:any
  constructor() {
    super()
    const c = this.myCanvas = document.createElement("canvas")
    c.setAttribute('width', '200px')
    c.setAttribute('height', '200px')
    var ctx = c.getContext("2d");
    ctx.moveTo(0, 0);
    ctx.lineTo(200, 100);
    ctx.stroke();
  }  
  render() {
    return html`
      <h4 id='head'>Hello World, it is ${(new Date).toString()}</h4>
      <div id='canvasContainer'/>
      Very nice...
      `.onReady( tpl => {
        console.log('Binded ')
        tpl.ids.head.setAttribute('style', 'color:green;')
        tpl.ids.canvasContainer.appendChild(this.myCanvas)
      })
  }
}

setState({
  color:'red',
  list : [1,2,3,4].map( item => ({
    id:item,
    name : 'Task ' + item,
    duration : Math.floor( 1 + Math.random()*8 )
  }) )
})

const ww = new WestWorld()
const hello = new HelloWorld()
let cnt = 0


// initial state
setState({
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

class Hello extends drmfComponent {
  msg = 'World'
  render() {
    return html`<div>Hello ${this.msg} Component</div>`
  }
}

// The Materialize demo...
// Doremifa.mount(document.body, new WestWorld() )

function frontpage(state) {
  return html`
  <h2>Hello World</h2>
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#buttons" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>

  <div class="alert alert-primary" role="alert">
    This is a primary alert—check it out!
  </div>`
}

function jumbo(state) {
  return html`
  <div class="jumbotron">
    <h1 class="display-4">Hello, world!</h1>
    <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
    <hr class="my-4">
    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
    <p class="lead">
      <a class="btn btn-primary btn-lg" href="#" role="button" click=${e => {
        e.preventDefault()
        getState().items.push({name:'foobar ' + Math.floor(Math.random()*100)})
        setState({})
      }}>+ Item</a>
      <a class="btn btn-primary btn-lg" href="#" role="button" >See more</a>
    </p>
  </div>  
  ${getState().items.map( item => html`<div>${item.name}</div>`)}
  `
}

const helloComp = new Hello()
function buttons(state) {
  return html`

    ${state.warning ? html`
    Example warning:
    <div class="alert alert-warning" role="alert">
      ${state.warning}
    </div>
    ` : html``}
    <div>  
      <a role="button" class="btn btn-primary" href="#jumbo">Primary</a>
      <button type="button" class="btn btn-secondary" click=${_ => {
        setState({warning: ''})
      }}>Secondary</button>
      <button type="button" class="btn btn-success">Success</button>
      <button type="button" class="btn btn-danger" click=${_ => {
        const s = getState()
        s.items.splice(0,1);
        setState({})
      }}>Danger</button>
      <button type="button" class="btn btn-warning" click=${_ => {
        setState({warning: 'I Give you a warning here!!!'})
      }}>Warning</button>
      <button type="button" class="btn btn-info">Info</button>
      <button type="button" class="btn btn-light">Light</button>
      <button type="button" class="btn btn-dark" click=${ _ =>{
        setState({items:getState().items.reverse()})
      }}>Reverse</button>  
      <button type="button" class="btn btn-link">Link</button>  
    </div>
    ${html`abc${html`<div>Deep Div</div>`}efg`}
    ${ counter & 1 ? (new Date()).toString() : html` <div>OK1?</div> <div>OK2?</div> `}
    ${ counter & 1 ? 'Alternative text...' : helloComp}
    ${getState().items.map( item => html`<div>...${item.name}</div>`)}
 `
}

function testBox(txt, value) {
  return html`
  <div style="width:200px;float:left">
    <div>${txt}</div>
    ${value}
  </div>  
  `
}
// ${ counter & 1 ? 'Alternative text...' : helloComp}

//  ${ counter & 1 ? 'Array OR' : getState().items.map( item => html`<div>ARRAY ${item.name}</div>`)}

let counter = 0
const helloComp2 = new Hello()
Doremifa.mount(document.body, state => html`
${state.items.map( (item, idx) => idx & 1 ? html`<b>${item.name}</b>` : 'Hello ' + item.name)}
<div class="container">
  <!-- Content here -->
  <div>
    <input/>
    ${state.items.map( (item, idx) => idx & 1 ? html`<b>${item.name}</b>` : 'Hello ' + item.name)}
  </div>
  ${router({
    default : frontpage,
    buttons,
    jumbo,
  })}
</div>
${ testBox( 'Test from TXT -> array', Math.floor( counter ) & 1 ? 'TXT' :  getState().items.map( item => html`<div>...${item.name}</div>`) ) }
${ testBox( 'Test from html -> array', Math.floor( counter ) & 1 ? html`<div><b>DIV</b></div>` :  getState().items.map( item => html`<div>...${item.name}</div>`) ) }
${ testBox( 'Test from static array -> array',  Math.floor( counter ) & 1 ? [1, '+', 2, html`<b>== 10</b>`] :  getState().items.map( item => html`<div>...${item.name}</div>`) ) }
${ testBox( 'Test from Object -> array', Math.floor( counter ) & 1 ? helloComp2 :  getState().items.map( item => html`<div>...${item.name}</div>`) ) }

`)

setInterval( _=> {
  counter++
  setState({})
}, 5000)





/*
// mount application into some node
Doremifa.mount(document.body,
 (state) => 
    html`Fooo...

  <div>${state.time}</div>
  <!-- navigation -->
  <a href="#">Default</a> 
  <a href="#itemlist">Show List</a> 
  <a href="#page2">Show Page 2</a>
  ${Doremifa.router({   
  
    default : (state) => html`
<div>
  <hr><br><br>
  This is the default route. Click show list to edit list of items.
  Currently the list of items is ${state
    .items.map( (item,i) => 
               html`${i > 0 ? ', ' : ''} ${item.name}`)}
  <div>
    ${state.items.length === 4 ? 'Four' : html`<b>NOT FOUR!</b>`}
  </div>
</div>
    `,

    // route for #page2 
    page2 : () =>html`
  <h2>Route for page 2</h2>
  <hr>
  <div>
    The state is now 
    <pre>${JSON.stringify(state,null,2)}</pre>
  </div>
`,
  
    // route for #itemlist
    itemlist : () => 
      html`
        <h2>Items</h2>
        <button click=${add_item}>+ item</button>
        <div>
          ${state.items.map( item => 
            html`<div>${item.name}<a href=${`#details/id/${item.id}`}>Edit</div>`)}
        </div>
      `,
  
    // route for #details/id/xxxx  
    details(state) {
      const item = state
        .items.filter( item => item.id == state.params.id).pop()
      return html`<h2>Item ${item.id}</h2>
        <input value=${item.name} id="name">
        <button click=${(e,tpl)=>{
          item.name = tpl.ids.name.value
          window.location.hash = "#itemlist"
        }}>Save</button>
        <button click=${_ => {
          delete_item(item)
          window.location.hash = "#itemlist"
        }}>Delete</button>
      `
     }
    })}

`       
 )
*/
// update the clock
/*
setInterval( _ => {
  setState({time:(new Date).toTimeString()})
},1000)
*/
/*
mount( document.body, (state) => {
  return html`  

  <header class="mui-appbar mui--z1">
  <div class="mui-container">
    <table>
      <tr class="mui--appbar-height">
        <td class="mui--text-title">Brand.io</td>
        <td class="mui--text-right">
          <ul class="mui-list--inline mui--text-body2">
            <li><a href="#">About</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Login</a></li>
          </ul>
        </td>
      </tr>
    </table>
  </div>
  </header>
  <!-- the actual page content comes in here -->
  <div id="content-wrapper" class="mui--text-center">
    <div class="mui--appbar-height"></div>
    <br>
    <br>
    <div class="mui--text-display3">Brand.io ... comment ?? </div>
    <br>
    <br>
    <button class="mui-btn mui-btn--raised">Get started</button>
    <!--
    <img width="200" height="200" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/1200px-Wikipedia-logo-v2.svg.png">
    -->
  </div>
  <footer>
    <div class="mui-container mui--text-center mui--text-bottom">
      Made with ♥ by <a href="https://www.muicss.com">MUICSS</a>
    </div>
  </footer>
  
  `
})
*/
// setTimeout(add100Tasks,100)
// setInterval( _ => setState({}), 20)



