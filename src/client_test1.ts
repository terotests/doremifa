

import { mount, router, getState, setState, forElem, html, drmf, drmfComponent, drmfTemplate, key } from './index';

import { XMLBuilder, XMLParser} from './xmlparser'


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
    // is the component just updated with some new parameters ? 
    return  drmf`
    <div style=${`position:absolute;left:${i*50+''}px;top:${i*450}px;`}>
      ${myHelloComponent}
      <div><textarea class="foobar"/></div>
      <h1 click=${(e)=> {
        console.log('round ', i)
      }}>Hello ${'World' + (render_counter++) + this.myValue}</h1>
      
      ${drmf`<div>This is a <b>test...${render_counter}</b></div>`}
      
      ${ Math.floor(render_counter / 550) & 1 ?
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
          ${this.myList.map( (item,idx) => drmf`<li key=${key(item+'')}>item ${item+''} <b>Bold</b> 
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

console.time('xml parser')
for(let i=0; i< 1; i++) {
  const size=100
  const el_style = `position:absolute;left:${i+''}px;top:${i*450}px;`

  // ? list of dynamic elements may have to be diffed
  // element 1 -> template + values
  // -> the event handlers will be different
  // -> possibly rebind always to the actual DOM
  // --> the DOM tree
  // --> set the value for each position 
  // --> each of the templates are re-rendered and rendering is re-used

  // NOTE: cache key will be strings + the slots...
  // must be exactly the same template so can use the same DOM view...
  //  1) what if the position of the template changes in the array ? 
  //  2) must walk the array of templates and insert to new position
  // What if there is some field which is edited <textarea></textarea>
  // 

  // could implement some local states if wants...
  
  const state = {};

  // The function which creates the object...
  const obj = new testComponent()
  
  console.log(obj)
  const items = obj.toDom()
  for( let item of items ) {
    document.body.appendChild( item )
  }

  for(let i=0; i<1000; i++) {
    obj.myList.push(i)
  }

  setInterval( () => {
    obj.myList.splice(0,1)
    const items2 = obj.toDom()
    for( let item of items2 ) {
      if(!item.parentNode) document.body.appendChild( item )
    }    
  },60)
  

}
console.timeEnd('xml parser')


