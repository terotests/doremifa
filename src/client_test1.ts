

import { mount, router, getState, setState, html, drmf, drmfComponent, drmfTemplate, key } from './index';

import { XMLBuilder, XMLParser} from './xmlparser'
import { setInterval } from 'timers';


export class helloComponent extends drmfComponent {
  cnt = 0
  txt = 'Hello World from Component'
  constructor(initValue:number) {
    super()    
    this.cnt = initValue
    setInterval(()=>{
      this.cnt++
    },1000)
  }
  reset() {
    this.cnt = 0
  }
  setText(v:string) : helloComponent {
    this.txt = v
    return this
  }
  render() : drmfTemplate {

    if(this.cnt > 10) {
      return drmf`<div style="padding:10px;background-color:#eeeeee">
        <h2>${this.txt} ${this.cnt+''}</h2>
      </div>`      
    }
    return drmf`<div>
      <h2>${this.txt} ${this.cnt+''}</h2>
    </div>`
  }
}
let render_counter = 0

// So here it is, not really inside the component Tree!!!
const myHelloComponent = new helloComponent(0)
const myHelloComponent2 = new helloComponent(12)
const myHelloComponent3 = new helloComponent(12)
const myHelloComponent4 = new helloComponent(5)

export class testComponent extends drmfComponent {

  myValue:string = ''
  mySize = 100

  myList = [1,2,3,4]


  render() : drmfTemplate {
    const i = 0
    const size = 100
    const upd_value = (e)=>{
      this.myValue = e.target.value
      console.log(e.target.value)
    }

    const swap = Math.floor( render_counter / 10 ) & 1
    // is the component just updated with some new parameters ? 
    return  drmf`
    <div >
      ${myHelloComponent}
      <div>${0}</div>
      <div>${getState().time ? getState().time.toString() : ''}</div>
      <div><textarea class="foobar"/></div>
      <h1 click=${(e)=> {
        console.log('round ', i)
      }}>Hello ${'World' + (render_counter++) + this.myValue}</h1>
      
      <div> 
        <div>Swap 1</div>
        ${ swap ?  drmf`<div>This is a <b>test...${render_counter}</b></div>` : '<div>OK!!!</div>'}
      </div>
      <div> 
        <div>Swap 2</div>
        ${ swap ?  myHelloComponent3 : '... text ...'}
      </div>

      <div> 
        <div>Swap 3</div>
        ${ swap ? drmf`<div><b>text</b> swap component <-> html</div>` : myHelloComponent4}
      </div>      

      ${ Math.floor(render_counter / 100) & 1 ?
      drmf`
      <div>
        <h2>Second Page</h2>
        <div style="color:green;">
          ${myHelloComponent2.setText('Toinen Hello Comp')}
        </div>
        <div>Some text here...${render_counter}</div>
        <button click=${()=>myHelloComponent2.reset()}>Reset counter</button>
        <textarea/>
      </div>
      `
        :
      drmf`<textarea keyup=${upd_value}>${'somevalue...'}</textarea>
      <div>
        <input value=${'123'} keyup=${
          (e) => {
            if(!isNaN(e.target.value)) {
              this.mySize = parseInt(e.target.value)
              
              console.log(this.myList)
            }
          }
        }/>
        ${myHelloComponent2.setText('Toinen Hello Comp, toisella sivulla')}
      </div>
      <div>
        <button click=${()=>{
          this.myList.push(this.mySize)
        }}>Click Me</button>
        <button click=${()=>{
          this.myList.splice(0,1)
        }}>Remove</button>

        <div><button>Something 1</button><button>Something 2</button></div>
      </div>
  
      <img height=${this.mySize} width=${this.mySize} src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Wikipedia-logo-v2-fr.svg/500px-Wikipedia-logo-v2-fr.svg.png"/>
  
      <p>Here is <b>Some</b> test</p>
      <div style="color:blue;"> 
        <ul style=${ this.myList.length > 6 ? 'color:red;' : 'color:green;' }>
          ${this.myList.map( (item,idx) => drmf`<li >item ${item+''} <b>Bold</b> 
              <input keyup=${(e) => {
                // this.myList[idx] = parseInt(e.target.value)
              }}/></li>`)}
        </ul>
        <div>Footnote</div>
      </div>`}
    </div>
    ` 
  }
}

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


function listademo(state) {
  return html`
  <div>
    <a class="waves-effect waves-light btn" click=${addTask}>+ Task</a>
    <div class="collection">
      ${state.list.sort( (a,b) => a.name.localeCompare(b.name)
      ).map( item => html`<a href="#details/id/${item.id}" class="collection-item">
        <span class="new badge ${item.duration > 3 ? 'red' : 'blue'}" data-badge-caption="h">${item.duration}</span
        ${item.name}</a>` ) }
    </div>    
  </div>
  `
}

export class WestWorld extends drmfComponent {
  testc = new testComponent()
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
      <div class="container">
        ${router({
          intro : intropage,
          lista : listademo,
          details : details,
          default : intropage,
          test : _ => html`<div>Test Page
                ${myHelloComponent4}
                <div>${_.page}</div>
            </div>`,
          second : _ => html`<div>Second Page
            ${myHelloComponent4}
                <div>${_.page}</div>
            </div>`,            
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
/*
setInterval( ()=>{
  setState({time: new Date()})
},100)
*/



