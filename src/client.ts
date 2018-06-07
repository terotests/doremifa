

import { mount, router, getState, setState, html, drmfComponent, drmfTemplate } from './index';

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

function addThousandTasks() {
  let cnt = 1000
  while(cnt--) addTask()
}


function listademo(state) {
  let item_list
  console.log('listademo called')
  const res = html`
  <div>
    <a class="waves-effect waves-light btn" click=${addTask}>+ Task</a>
    <a class="waves-effect waves-light btn" click=${addThousandTasks}>+ 1000 Tasks</a>
    <div class="collection">
      ${item_list = state.list.sort( (a,b) => a.id - b.id
      ).map( item => html`<a href="#details/id/${item.id}" class="collection-item" id="link">

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
        ${item.name}</a>` ) }
    </div>    
  </div>
  `
  return res;
}

export class WestWorld extends drmfComponent {
  removeItem(){
    const list = getState().list
    list.push( Math.floor( Math.random()*100) )
    setState({list})    
  }  
  render() {
    return html`
    <div>
      <nav>
        <div class="nav-wrapper">
          <a href="#lista" class="brand-logo">Tasks: ${getState().list.length}</a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li><a href="#intro">Intro</a></li>
            <li><a href="#lista">Listademo</a></li>
            <li><a class="waves-effect waves-light btn" click=${e=> {
              e.preventDefault()
              addTask()
            }}>+ Item to list</a></li>
          </ul>
        </div>
      </nav>    
      <svg height  =  "300" width="300">
      <path id="lineAB" d="M 100 350 l 150 -300" stroke="red" stroke-width="3" fill="none" />
        <path id="lineBC" d="M 250 50 l 150 300" stroke="red" stroke-width="3" fill="none" />
        <path d="M 175 200 l 150 0" stroke="green" stroke-width="3" fill="none" />
        <path d="M 100 350 q 150 -300 300 0" stroke="blue" stroke-width="5" fill="none" />
        <!-- Mark relevant points -->
        <g stroke="black" stroke-width="3" fill="black">
          <circle id="pointA" cx="100" cy="350" r="3" />
          <circle id="pointB" cx="250" cy="50" r="3" />
          <circle id="pointC" cx="400" cy="350" r="3" />
        </g>
        <!-- Label the points -->
        <g font-size="30" font-family="sans-serif" fill="black" stroke="none" text-anchor="middle">
          <text x="100" y="350" dx="-30">A</text>
          <text x="250" y="50" dy="-10">B</text>
          <text x="400" y="350" dx="30">C</text>
        </g>
        Sorry, your browser does not support inline SVG.
      </svg>

      <div class="container">
        ${router({
          intro : intropage,
          lista : listademo,
          details : details,
          default : intropage,           
        })}
      </div>        
    </div>   
    `
  }
}
export class HelloWorld extends drmfComponent {
  render() {
    return html`<h4>Hello World, it is ${(new Date).toString()}</h4>`
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
mount( document.body, new WestWorld() )




