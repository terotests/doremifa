

import { mount, router, getState, setState, forElem, html, drmf, drmfComponent, drmfTemplate, key } from './index';

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

export class WestWorld extends drmfComponent {
  testc = new testComponent()
  render() {
    const links = [1,2,3,4,5]
    return html`<div>
      <h4>Hello World, it is ${(new Date).toString()}</h4>
        ${router({
          default : _ => html`<div>Default Page</div>`,
          test : _ => html`<div>Test Page
                ${myHelloComponent4}
                <div>${_.page}</div>
            </div>`,
          second : _ => html`<div>Second Page
            ${myHelloComponent4}
                <div>${_.page}</div>
            </div>`,            
        })}

        <a class="waves-effect waves-light btn" click=${_ => alert("Moro")}>Moro</a>
        <div class="collection">
          ${links.map( item => html`<a href="#test/${item}" class="collection-item">Item ${item}</a>` ) }
        </div>  
        
        <h4>Links to second page</h4>
        <div class="collection">
          ${links.map( item => html`<a href="#second/${item}" class="collection-item">Item ${item}</a>` ) }
        </div>         

        ${router({
          second : _ => html`<div>End of Second Page
                ${this.testc}
            </div>`,            
        })}        
      </div>
    
    `
  }
}

export class HelloWorld extends drmfComponent {
  render() {
    return html`<h4>Hello World, it is ${(new Date).toString()}</h4>`
  }
}
mount( document.body, new WestWorld() )

setInterval( ()=>{
  setState({time: new Date()})
},100)



