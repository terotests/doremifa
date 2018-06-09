 
import { XMLParser, bufferType } from './xmlparser'

export class drfmKey {
  value:string
}

export function key(value:string|number) : drfmKey {
  const o = new drfmKey
  o.value = typeof value === 'string' ? value : value+''
  return o
}

const svgNS = "http://www.w3.org/2000/svg"; 
let tickFunctions = []

export class drmfComponent {
  lastRender : drmfTemplate

  tpl() : drmfTemplate {
    return this.lastRender
  }

  toDom() : Node[] {
    const tpl = this.render()    
    // if not rendered at all or different template
    if(!this.lastRender || (this.lastRender.key != tpl.key)) {
      const elems = tpl.createDOM()
      this.lastRender = tpl
      return elems
    }
    const last = this.lastRender 
    last.updateValues( tpl.values )
    // TODO: does not work always, root nodes can change
    return last.rootNodes
  }

  render() : drmfTemplate {
    return drmf`<div>Hello World</div>`
  }
}

export class drmfTemplateCollection {
  node:Node
  list:drmfTemplate[]
}

export class drmfTemplate {
  key:string
  strings:string[]
  values:any[]
  valuestream:bufferType[]
  children : { [key: string]: any } = {}
  doms : { [key: string]: Element[] } = {}

  templateStr:string
  templateDom:Node[]

  rootNodes:Node[] = []
  slotTypes:any[][] = []
  
  prevNode:Node

  ids : { [key: string]: Element } = {}
  list : { [key: string]: Element[] } = {}

  _ready : (tpl:drmfTemplate) => void

  onReady( fn: (tpl:drmfTemplate) => void) : drmfTemplate {
    this._ready = fn
    return this
  }

  replaceWith(renderedTpl:drmfTemplate) : drmfTemplate {

    if(this.key == renderedTpl.key) {
      this.updateValues( renderedTpl.values )
      return this
    } 

    const currTpl = this
    const nodes = currTpl.rootNodes
    let renderNodes
    const new_nodes = renderedTpl.createDOM()
    // replace current with new
    const pNode = nodes[0].parentNode
    const first = nodes[0]
    for( let n of new_nodes ) {
      pNode.insertBefore( n, first )
    }
    for( let n of nodes ) {
      pNode.removeChild( n )
    }
    return renderedTpl
  }

  updateValues(values:any[]) {

    for( let i=0; i<values.length ; i++) {
      const value = values[i]
      if(!value) continue
      const last_slot = this.slotTypes[i]
      if(!last_slot) continue
      const last_type = last_slot[0]
      const last_root = last_slot[1]
      // assuming now that the type stays the same...
      switch(last_type) {
        case 1:
          const name = last_slot[2]
          const is_svg = last_slot[4]
          if(value==='false' || value==='true') {
            const t = value==='true'
            if(t) {
              if(is_svg) {
                last_root.setAttributeNS(null, name, '')
              } else {
                last_root.setAttribute(name, '')
              }
            } else {
              last_root.removeAttribute(name)
            }
          } else {
            if(is_svg) {
              last_root.setAttributeNS( null, name, value )
            } else {
              last_root.setAttribute( name, value )
            }
          }          
        break;
        case 2:
          // simple content template was the last type...
          const currTpl = last_slot[2] as drmfTemplate
          const nodes = currTpl.rootNodes

          if( value instanceof drmfTemplate) {
            const renderedTpl = value as drmfTemplate
            this.slotTypes[i][2] = currTpl.replaceWith( renderedTpl )            
          }

          if(value instanceof drmfComponent) {
            // render the situation now...
            const renderedComp = value as drmfComponent
            const rTpl = renderedComp.render()  
            const newTpl = currTpl.replaceWith( rTpl )   
            this.slotTypes[i] = [2, last_root, newTpl, newTpl.rootNodes]   
          }          

          // transform into txt node
          if( typeof(value) == 'string' ) {
            const txt = document.createTextNode(value)
            this.slotTypes[i] = [3, last_root, txt]            
            const nodes = currTpl.rootNodes
            const pNode = nodes[0].parentNode
            const first = nodes[0]
            pNode.insertBefore( txt, first )
            for( let n of nodes ) {
              pNode.removeChild( n )
            }             
          }
          
        break;
        case 3:
          const text_node = last_slot[2]
          if(typeof(value) == 'string') {
            text_node.textContent = value
          }
          if( value instanceof drmfTemplate) {
            const new_nodes = value.createDOM()
            // replace current with new
            const pNode = text_node.parentNode
            for( let n of new_nodes ) {
              pNode.insertBefore( n, text_node )
            }            
            pNode.removeChild(text_node)
            this.slotTypes[i] = [2, last_root, value, new_nodes] 
          }
          if(value instanceof drmfComponent) {
            const comp = value as drmfComponent
            const tpl = comp.render()
            const new_nodes = tpl.createDOM()
            const pNode = text_node.parentNode
            for( let n of new_nodes ) {
              pNode.insertBefore( n, text_node )
            }  
            pNode.removeChild(text_node)
            this.slotTypes[i] = [5, last_root, comp, tpl, new_nodes]             
            return
          } 

        break;
        case 4:
          const tpls = value as drmfTemplate[]
          const curr_collection = last_slot[2] as drmfTemplateCollection
          const curr_tpls = curr_collection.list
          let prevNode = curr_collection.node
          const len = Math.max( tpls.length, curr_tpls.length )
          if(len === 0) return
          if(tpls.length === 0) {
            curr_tpls.forEach( d => {
              d.rootNodes.forEach( n => n.parentNode.removeChild(n))
            })
            curr_collection.list = []
            return
          }
          let ii = 0
          let list = []
          for(let ii = 0 ; ii <len ; ii++) {
            const ct = curr_tpls[ii]
            let rt = tpls[ii]
            if(ct && rt) {
              const p = ct.replaceWith( rt )
              list[ii] = p
              prevNode = p.rootNodes[p.rootNodes.length - 1]
              continue
            } 
            if(ct && !rt) {
              ct.rootNodes.forEach( n => n.parentNode.removeChild(n))                              
              continue
            }
            if(!ct && rt) { 
              if(rt.rootNodes.length === 0) rt.createDOM()
              rt.rootNodes.forEach( n => {
                prevNode.parentNode.insertBefore( n, prevNode.nextSibling )
                prevNode = n
              })
              list[ii] = rt
              continue
            }            
          }
          curr_collection.list = list

        break;

        case 5:

          if(typeof(value) == 'string') {
            const tplNow = last_slot[3] as drmfTemplate
            const txt = document.createTextNode(value)
            this.slotTypes[i] = [3, last_root, txt]     

            const nodes = tplNow.rootNodes
            const pNode = nodes[0].parentNode
            const first = nodes[0]
            pNode.insertBefore( txt, first )
            for( let n of nodes ) {
              pNode.removeChild( n )
            }  
          }

          if(value instanceof drmfTemplate) {
            const comp = last_slot[2] as drmfComponent
            const tplNow = last_slot[3] as drmfTemplate
            const tpl_nodes = tplNow.rootNodes
            const rTpl = value as drmfTemplate
            const newTpl = tplNow.replaceWith( rTpl ) 
            this.slotTypes[i] = [2, last_root, newTpl, newTpl.rootNodes]  
          }          

          if(value instanceof drmfComponent) {
            const comp = last_slot[2] as drmfComponent
            const tplNow = last_slot[3] as drmfTemplate
            const tpl_nodes = tplNow.rootNodes
  
            // render the situation now...
            const renderedComp = value as drmfComponent
            const rTpl = renderedComp.render()
  
            const newTpl = tplNow.replaceWith( rTpl ) 
  
            if(newTpl === rTpl) {
              this.slotTypes[i][2] = renderedComp 
              this.slotTypes[i][3] = newTpl 
            }   
          }
          
        break;
        
      }
    }    
  }

  createDOM() : Node[] {

    const parser = new XMLParser(this.valuestream)
    let eof = false
    const nodetree:Node[] = []
    
    let activeNode:Node 
    let is_svg = false
    const me = this
     
    const callbacks = {
      beginNode(name, index:number) {
        let new_node
        switch(name) {
          case "svg":
            new_node= document.createElementNS(svgNS, "svg");
            is_svg = true
          break
          // TODO: add full set of SVG elements
          case "g":
          case "rect":
          case "path":
          case "image":
          case "line":
          case "ellipse":
          case "circle":
            is_svg = true
          default:
            if(is_svg) {
              new_node= document.createElementNS(svgNS, name);
            } else {
              new_node = document.createElement(name)
            }
        }
        if( activeNode instanceof Node && activeNode) {
          activeNode.appendChild( new_node )
        } else {
          me.rootNodes.push(new_node)        
        }
        activeNode = new_node
        nodetree.push(new_node)
      },
      setAttribute(name, value, index) {
        if(!activeNode) return;
        if(value instanceof drfmKey) {
          return
        }        
        if( index & 1 ) {
          me.slotTypes[( index - 1 ) >> 1] = [1, activeNode, name, value, is_svg] 
        }              
        if(typeof(value) == 'function') {
          if(activeNode instanceof Node) {
            activeNode.addEventListener(name, (e)=>{
              value(e,me)
            })
          }
          if(activeNode instanceof drmfComponent) {
            activeNode.addEventListener(name, value)
          }
          return;
        }
        const node = activeNode as Element

        if(is_svg) {
          if(value==='false' || value==='true') {
            const t = value==='true'
            if(t) {
              node.setAttributeNS(null,name, '')
            }
          } else {
            node.setAttributeNS(null,name, value)
          }        } else {
          if(value==='false' || value==='true') {
            const t = value==='true'
            if(t) {
              node.setAttribute(name, '')
            }
          } else {
            node.setAttribute(name, value)
          }
        }        
        if(name==='id') me.ids[value] = node        
        if(name==='list') {
          if(!me.list[value]) me.list[value] = []
          me.list[value].push(node)  
        }      
      },
      closeNode(name) {
        if(name == 'svg') {
          is_svg = false
        }
        nodetree.pop()
        if(nodetree.length > 0) {
          activeNode = nodetree[nodetree.length-1]
        } else {
          activeNode = null
        }
      },
      addTextNode(value, index) {

        if(value instanceof drfmKey) {
          return
        }
        if( index & 1 ) {
          if(value instanceof drmfTemplate) {
            const tpl = value as drmfTemplate
            const items = tpl.createDOM()
            const snodes = []
            for( let it of items ) {
              activeNode.appendChild( it )
              snodes.push( it )
            }
            // render template
            me.slotTypes[( index - 1 ) >> 1] = [2, activeNode, tpl, snodes]           
            return
          }            
          if(value instanceof drmfComponent) {
            const comp = value as drmfComponent
            const tpl = comp.render()
            const items = tpl.createDOM()
            const snodes = []
            for( let it of items ) {
              activeNode.appendChild( it )
              snodes.push( it )
            }
            // render template
            me.slotTypes[( index - 1 ) >> 1] = [5, activeNode, comp, tpl, snodes]               
            return
          }            
          if(Array.isArray( value )) {
            const coll = new drmfTemplateCollection
            const txtV = document.createTextNode('')
            coll.node = txtV
            activeNode.appendChild(txtV) // placeholder in case empty list

            const tpls = value as drmfTemplate[]
            coll.list = tpls
            const snodes = []
            for(let idx=0; idx < tpls.length; idx++) {
              let cont = tpls[idx]
              if(!cont || !cont.createDOM) {
                throw `Array or result of map must contain valid template elements:\n ${value} \n----------------------------\n ${me.valuestream}`
              }
              const items = cont.createDOM()
              for( let it of items ) {
                activeNode.appendChild( it )
                snodes.push( it )
              }  
            }
            // render templates
            me.slotTypes[( index - 1 ) >> 1] = [4, activeNode, coll, snodes]  
            return
          }            
        }
        // the inserted text could be parsed...
        let v = value
        if(!isNaN(v)) v = v + ''
        const txt = document.createTextNode(v)
        if( index & 1) {
          // render text
          me.slotTypes[( index - 1 ) >> 1] = [3, activeNode, txt]           
        }
        if(!activeNode) {
          me.rootNodes.push(txt)
          return 
        }  
        activeNode.appendChild( txt )        
      },
      eof() {
        eof = true
      }
    }  
    let max_cnt = 100000
    while(!parser.eof) {
      parser.parse(callbacks)
      if(max_cnt-- < 0 ) break
    }  
    if(this._ready) {
      tickFunctions.push( () => {
        this._ready(this)
      })  
    }
    return this.rootNodes
  }  

  renderTemplate() {
    const parts = []
    let s = "",i=0, pcnt = 0;
    for(; i<this.values.length; i++) {
      parts.push(this.strings[i])
      parts.push(`<div placeholder="${pcnt++}" list="placeholders"></div>`)
    }
    parts.push(this.strings[i])  
    this.templateStr = parts.join('')   
    this.templateDom = this.createDOM()
  }

}

export function html(strings, ...values) : drmfTemplate {
  const t = new drmfTemplate()   
  t.key = strings.join('<>')
  t.strings = strings
  t.values = values.map( value => {
    if(!isNaN(value) && (!Array.isArray(value))) return value.toString()
    return value
  }) 
  const kk = t.values.filter( _ => _ instanceof drfmKey).map( _ => 'key=' + _.value ).join('&')
  t.key = t.key + kk
  const len = strings.length + values.length
  t.valuestream = new Array(len);
  let i = 0, si = 0, vi = 0;
  while(i<len) {
    t.valuestream[i] = i&1 ? t.values[vi++] : t.strings[si++]
    i++;
  }  
  return t
}

export const drmf = html;

// the application state for doremifa
let app:any = {
  state : {
    page : '',
    params : {},    
  }
}

export function getState() : any {
  return app.state
}

export function setState( state:any ) {
  try {
    app.state = { ...app.state, ...state }
  } catch(e) {

  }
}

export function reduce( reducer:(state:any) => any ) {
  try {
    app.state = { ...app.state, ...reducer(app.state) }
  } catch(e) {

  }
}

class drmfRouter extends drmfComponent {
  routemap:any
  constructor(routes:any) {
    super()
    this.routemap = routes
  }
  render() {
    const routermap = this.routemap
    let page_name = app.state.page || 'default';
    let page = routermap[app.state.page || 'default'] || (page_name = 'default', routermap.default)
    let phase = 'refresh'
    if(page) {
      if( page_name != app.last_page_name ) {
        const last_page = routermap[app.last_page_name]
        phase = 'init'
      }
      app.last_page_name = page_name
      return page({...app.state, phase})
    }
    return drmf`<div></div>`      
  }
}

export function router(routermap:any) : drmfComponent  {
  return new drmfRouter(routermap)
}

let b_render_on = false
let last_state;

const register_hash = () => {
  const parts = window.location.hash.substring(1).split('/')
  const name = parts.shift()
  let params = {}
  for(let i=0; i<parts.length; i+=2) {
    params[parts[i]] = parts[i+1]
  }
  app.state = { ...app.state, 
    page : name,
    params : params
  }
}
export interface DoremifaOptions {
  updateInterval: number;
}

let interval = null
let current_node = null
let is_registered = false
let last_items = null
let lastTpl:drmfTemplate

export type drmfFunction = (state:any)=>drmfTemplate

// initialize app using init function...
export function mount ( root:Element, 
  comp:drmfComponent|drmfFunction,
  // renderFn : (state:any) => Promise<drmfTemplate>, 
  state? :any, 
  options?:DoremifaOptions ) {
  if(!app.is_registered) {
    console.log('registering app')
    app.is_registered = true
    register_hash()
    window.addEventListener("hashchange", register_hash, false);
  }
  if(interval) clearInterval(interval)
  let update_delay = (options && options.updateInterval) || 100;
  let retry_cnt = 0
  if(state) app.state = {...app.state, ...state}
  const update_application = async ()=>{
    if(b_render_on && (retry_cnt < 5)) {
      retry_cnt++
      return
    }
    retry_cnt = 0
    try {
      if(last_state != app.state) {
        last_state = app.state
        b_render_on = true
        if( typeof(comp) == 'function') {
          const tpl = comp(app.state)
          if(lastTpl) {
            lastTpl = lastTpl.replaceWith( tpl )
          } else {
            const items = tpl.createDOM()
            for( let item of items ) {
              if(!item.parentNode) document.body.appendChild( item )
            } 
            lastTpl = tpl
          }
        }
        if( comp instanceof drmfComponent) {
          const items = comp.toDom()
          for( let item of items ) {
            if(!item.parentNode) document.body.appendChild( item )
          } 
          if(last_items) {
            for( let last of last_items ) {
              if( last.parentNode && items.indexOf(last) < 0 ) {
                last.parentNode.removeChild( last )
              }
            }  
          }
          last_items = items  
        }
        b_render_on = false
      }
    } catch(e) {
      console.error(e)
    }
    window.requestAnimationFrame( update_application)
    for(let f of tickFunctions) {
      if(f) f()
    }
    tickFunctions.length = 0
  }
  window.requestAnimationFrame( update_application )
  // interval = setInterval( update_application, update_delay);
}




