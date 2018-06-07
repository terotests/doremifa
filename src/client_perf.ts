

import { mount, router, getState, setState, html, drmf, drmfComponent, drmfTemplate, key } from './index';

import { XMLBuilder, XMLParser} from './xmlparser'

// BTW.
// https://parceljs.org/

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
    <div>
      <h1>Hello World!</h1>
        <ul >
          ${this.myList.map( (item,idx) => drmf`<li >item ${item+''}</li>`)}
        </ul>
      </div>
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


