 
import { XMLParser, bufferType } from './xmlparser'

// Ideas:
// - https://polymer.github.io/lit-html/guide/writing-templates.html


// idea from lit-html
const envCachesTemplates =
    ((t: any) => t() === t())(() => ((s: TemplateStringsArray) => s) ``);

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
  render() : drmfTemplate {
    return drmf`<div>Hello World</div>`
  }
}

export class drmfTemplateCollection {
  node:Node
  list:drmfTemplate[]

  refreshFrom(tpls:drmfTemplate[]) {
    
    const curr_collection = this
    const curr_tpls = curr_collection.list
    let prevNode = curr_collection.node
    const len = Math.max( tpls.length, curr_tpls.length )
    if(len === 0) return
    if(tpls.length === 0) {
      for( let t of curr_tpls) {
        t.removeBaseNodes()
      }
      curr_collection.list = []
      return
    }
    let ii = 0
    let list = new Array(tpls.length)
    for(let ii = 0 ; ii <len ; ii++) {
      const ct = curr_tpls[ii]
      let rt = tpls[ii]
      if(ct && rt) {
        const p = ct.replaceWith( rt )
        list[ii] = p
        prevNode = p.getLastNode() // p.rootNodes[p.rootNodes.length - 1]
        continue
      } 
      if(ct && !rt) {
        ct.removeBaseNodes()
        // ct.rootNodes.forEach( n => n.parentNode.removeChild(n))                              
        continue
      }
      if(!ct && rt) { 
        if(rt.baseNodes.length === 0) rt.createDOM()
        rt.addAt( prevNode.parentNode, prevNode.nextSibling )
        list[ii] = rt
        prevNode = rt.getLastNode()
        continue
      }            
    }
    curr_collection.list = list    
  }
}

export class drmfTemplate {
  key:any
  values:any[]
  valuestream:bufferType[]

  rootNodes:Node[] = []

  // to get all the root nodes
  baseNodes:any[] = []  
  slotTypes:any[][] = []

  ids : { [key: string]: Element } 
  list : { [key: string]: Element[] } 

  _ready : (tpl:drmfTemplate) => void

  onReady( fn: (tpl:drmfTemplate) => void) : drmfTemplate {
    this._ready = fn
    return this
  }

  getFirstNode() : Node {
    const n = this.baseNodes[0]
    if(Array.isArray(n)) {
      return n[0]
    }
    if(n instanceof drmfTemplate) {
      return n.getFirstNode()
    }
    if(n instanceof drmfTemplateCollection) {
      return n.node
    }    
  }

  getLastNode() : Node {
    if(this.baseNodes.length == 0) return null
    const n = this.baseNodes[this.baseNodes.length-1]
    if(Array.isArray(n)) {
      return n[n.length-1]
    }
    if(n instanceof drmfTemplate) {
      return n.getLastNode()
    }
    if(n instanceof drmfTemplateCollection) {
      if(n.list.length == 0) return n.node
      return n.list[ n.list.length - 1 ].getLastNode()
    }    
  }  

  addAt( parentNode:Node, before?:Node ) {
    for(let n of this.baseNodes) {
      if(Array.isArray(n)) {
        for( let node of n) {
          parentNode.insertBefore( node, before )
        }
        continue
      }
      if(n instanceof drmfTemplate) {
        n.addAt( parentNode, before)
      }
      if(n instanceof drmfTemplateCollection) {
        if(n.node) parentNode.insertBefore( n.node, before )
        for( let el of n.list ) {
          el.addAt( parentNode, before)
        }
      }
    }
  }
  
  removeBaseNodes() {
    for(let n of this.baseNodes) {
      if(Array.isArray(n)) {
        for( let node of n) {
          node.parentNode.removeChild( node )
        }
        continue
      }
      if(n instanceof drmfTemplate) {
        n.removeBaseNodes()
      }
      if(n instanceof drmfTemplateCollection) {
        // remove the placeholder node...
        if(n.node && n.node.parentNode) n.node.parentNode.removeChild( n.node )
        for( let el of n.list ) {
          el.removeBaseNodes()
        }
      }
    }
  }

  replaceWith(renderedTpl:drmfTemplate) : drmfTemplate {

    if(this.key == renderedTpl.key) {
      // The problem is here, the update values will update root elements...
      this.updateValues( renderedTpl.values )
      return this
    } 

    // creates the nodes...
    renderedTpl.createDOM()

    const fNode = this.getFirstNode()    
    // get the first render template node...
    renderedTpl.addAt( fNode.parentNode, fNode )
    this.removeBaseNodes()
    return renderedTpl
  }

  updateValues(values:any[]) {

    for( let i=0; i<values.length ; i++) {
      const value = values[i]

      if(typeof(value) === 'undefined') continue
      const last_slot = this.slotTypes[i]
      if(value instanceof drfmKey) {
        continue
      }
      if(typeof(last_slot) === 'undefined' ) {
        continue
      } 
      const last_type = last_slot[0]
      const last_root = last_slot[1]
      // assuming now that the type stays the same...
      switch(last_type) {
        case 1:
          const name = last_slot[2]
          const is_svg = last_slot[4]

          if(typeof(value) === 'function') {
            last_root[name] = (e)=>{
              value(e,this)
            }
            continue
          }

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
              if( name !== 'xmlns' && name !=='xmlns:xlink' ) {
                last_root.setAttributeNS( null, name, value )
              } else {
                last_root.setAttribute( name, value ) 
              }
            } else {
              last_root.setAttribute( name, value )                         
            }
          }          
        break;

        // last node was drmfTemplate
        case 2:
          // simple content template was the last type...
          const currTpl = last_slot[2] as drmfTemplate
          let local_value = value
          if(Array.isArray(value)) {
            local_value = html`${value}`
          }
          if( local_value instanceof drmfTemplate) {
            const renderedTpl = local_value as drmfTemplate
            this.slotTypes[i][2] = currTpl.replaceWith( renderedTpl )   
            if(typeof(this.baseNodes[i*2 + 1]) !== 'undefined') this.baseNodes[i*2 + 1] = this.slotTypes[i][2]         
          }

          if(value instanceof drmfComponent) {
            // render the situation now...
            const renderedComp = value as drmfComponent
            const rTpl = renderedComp.render()  
            const newTpl = currTpl.replaceWith( rTpl )   
            this.slotTypes[i] = [2, last_root, newTpl, newTpl.rootNodes]   
            if(typeof(this.baseNodes[i*2 + 1]) !== 'undefined') this.baseNodes[i*2 + 1] = newTpl
          }          

          // transform into txt node
          if( typeof(value) == 'string' ) {
            const txt = document.createTextNode(value)                        
            const first = currTpl.getFirstNode()
            first.parentNode.insertBefore( txt, first )
            currTpl.removeBaseNodes()
            this.slotTypes[i] = [3, first.parentNode, txt]   
            if(typeof(this.baseNodes[i*2 + 1]) !== 'undefined') this.baseNodes[i*2 + 1] =[txt]       
          }
          
        break;

        // last node was text node
        case 3:
          const text_node = last_slot[2]
          if(typeof(value) == 'string') {
            text_node.textContent = value
          } else {
            let v = value
            if(Array.isArray(value)) {
              v = html`${value}`
            }
            if( v instanceof drmfTemplate) {
              v.createDOM()
              v.addAt(text_node.parentNode, text_node)
              text_node.parentNode.removeChild(text_node)
              this.slotTypes[i] = [2, last_root, v] 
              // if the slot is base slot...
              if(typeof(this.baseNodes[i*2 + 1]) !== 'undefined') this.baseNodes[i*2 + 1] = v
            }
            if(v instanceof drmfComponent) {
              const comp = v as drmfComponent
              const tpl = comp.render()
              tpl.createDOM()
              tpl.addAt(text_node.parentNode, text_node)
              text_node.parentNode.removeChild(text_node)
              this.slotTypes[i] = [5, last_root, comp, tpl]     
              if(typeof(this.baseNodes[i*2 + 1]) !== 'undefined') this.baseNodes[i*2 + 1] = tpl
            } 
          }         
        break;

         // last node was drmfTemplateCollection
        case 4:
          const curr_collection = last_slot[2] as drmfTemplateCollection
          if(Array.isArray(value)) {
            const items = value 
            let b_diff = false
            for(let i=0; i<items.length;i++) {
              const ii = items[i]
              if(!(ii instanceof drmfTemplate)) {
                b_diff = true
                break
              }
            }
            if(b_diff) {
              const tpls = new Array( items.length )
              for(let i=0; i<items.length;i++) {
                const ii = items[i]
                if(ii instanceof drmfTemplate) {
                  tpls[i] = ii
                } else {
                  tpls[i] = html`${ii}`
                }
              }              
              curr_collection.refreshFrom( tpls )                  
            } else {
              curr_collection.refreshFrom( value )
            }
          } else {
            const tpls =[html`${value}`]         
            curr_collection.refreshFrom( tpls )  
          }
        break;

        // last node was drmfComponent        
        case 5:

          let local_tpl = value
          if(Array.isArray(value)) {
            local_tpl = html`${value}`
          }        
          if(typeof(value) == 'string') {
            const tplNow = last_slot[3] as drmfTemplate
            const txt = document.createTextNode(value)
            const first = tplNow.getFirstNode()
            first.parentNode.insertBefore( txt, first )
            tplNow.removeBaseNodes()
            this.slotTypes[i] = [3, first.parentNode, txt] 
            if(typeof(this.baseNodes[i*2 + 1]) !== 'undefined') this.baseNodes[i*2 + 1] = [txt]            
          }

          if(local_tpl instanceof drmfTemplate) {
            const comp = last_slot[2] as drmfComponent
            const tplNow = last_slot[3] as drmfTemplate
            const rTpl = local_tpl as drmfTemplate
            const newTpl = tplNow.replaceWith( rTpl ) 
            this.slotTypes[i] = [2, last_root, newTpl]  
            if(typeof(this.baseNodes[i*2 + 1]) !== 'undefined') this.baseNodes[i*2 + 1] = local_tpl
          }          

          if(value instanceof drmfComponent) {
            const comp = last_slot[2] as drmfComponent
            const tplNow = last_slot[3] as drmfTemplate
  
            // render the situation now...
            const renderedComp = value as drmfComponent
            const rTpl = renderedComp.render()
  
            const newTpl = tplNow.replaceWith( rTpl ) 
  
            if(newTpl === rTpl) {
              this.slotTypes[i][2] = renderedComp 
              this.slotTypes[i][3] = newTpl 
            }   
            if(typeof(this.baseNodes[i*2 + 1]) !== 'undefined') this.baseNodes[i*2 + 1] = newTpl
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
      beginNode(name_orig, index:number) {
        let new_node
        const name = name_orig.toLowerCase()
        switch(name) {
          case "script":
            activeNode = document.createElement(name)
            return
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
          if(!me.baseNodes[index]) me.baseNodes[index] = []   
          me.baseNodes[index].push( new_node )  
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
            activeNode[name] = (e)=>{
              value(e,me)
            }
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
            if( name !== 'xmlns' && name !=='xmlns:xlink') {
              node.setAttributeNS( null, name, value )
            } else {
              node.setAttribute( name, value ) 
            }            
          }        
        } else {
          if(value==='false' || value==='true') {
            const t = value==='true'
            if(t) {
              node.setAttribute(name, '')
            }
          } else {
            node.setAttribute(name, value)
          }
        }        
        if(name==='id') (me.ids = me.ids || {})[value] = node        
        if(name==='list') {
          if(!me.list[value]) (me.list = me.list || {}) [value] = []
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
        const append = (new_node:Node) => {
          if(activeNode) {
            activeNode.appendChild( new_node )
          } else {
            me.rootNodes.push(new_node)        
          }         
        }        
        if( index & 1 ) {
          if(value instanceof drmfTemplate) {
            const tpl = value as drmfTemplate
            const items = tpl.createDOM()
            const snodes = []
            for( let it of items ) {
              append( it )
              snodes.push( it )
            }
            // render template
            me.slotTypes[( index - 1 ) >> 1] = [2, activeNode, tpl, snodes]
            if(!activeNode) me.baseNodes[index] = tpl           
            return
          }            
          if(value instanceof drmfComponent) {
            const comp = value as drmfComponent
            const tpl = comp.render()
            const items = tpl.createDOM()
            const snodes = []
            for( let it of items ) {
              append( it )
              snodes.push( it )
            }
            // render template
            me.slotTypes[( index - 1 ) >> 1] = [5, activeNode, comp, tpl, snodes]  
            if(!activeNode) me.baseNodes[index] = tpl             
            return
          }            
          if(Array.isArray( value )) {

            const coll = new drmfTemplateCollection
            const txtV = document.createTextNode('')
            coll.node = txtV
            append(txtV)             
            const tpls = value.map( item => {
              if(item instanceof drmfTemplate) return item
              return html`${item}`
            })
            coll.list = tpls
            const snodes = []
            for(let idx=0; idx < tpls.length; idx++) {
              let cont = tpls[idx]
              const items = cont.createDOM()
              for( let it of items ) {
                append( it )
                snodes.push( it )
              }  
            }
            me.slotTypes[( index - 1 ) >> 1] = [4, activeNode, coll, null]  
            if(!activeNode) me.baseNodes[index] = coll
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
          if(!me.baseNodes[index]) me.baseNodes[index] = []
          me.baseNodes[index].push( txt )
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

}

export function html(strings, ...values) : drmfTemplate {
  const t = new drmfTemplate()   

  let b_has_key = false
  let key_v = ''
  for(let v of values) {
    if(v instanceof drfmKey) {
      b_has_key = true
      key_v = v.value
    }
  }
  if(envCachesTemplates && !b_has_key) {
    t.key = strings
  } else {
    if(b_has_key) {
      t.key = key_v
    } else {
      t.key = strings.join('&')
    }
  }
  t.values = values
  for(let i=0; i<t.values.length; i++) {
    if(typeof(t.values[i]) === 'undefined') t.values[i] = ''
    if( typeof(t.values[i]) === 'number' ) t.values[i] = t.values[i].toString()
  }
  const len = strings.length + values.length
  t.valuestream = new Array(len);
  let i = 0, si = 0, vi = 0;
  while(i<len) {
    t.valuestream[i] = i&1 ? t.values[vi++] : strings[si++]
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

// polyfill for really old browsers
(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                 || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback) {
          var currTime = new Date().getTime();
          var timeToCall = Math.max(0, 16 - (currTime - lastTime));
          var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
            timeToCall);
          lastTime = currTime + timeToCall;
          return id;
      };

  if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
          clearTimeout(id);
      };
}());

export type drmfFunction = (state:any)=>drmfTemplate


// initialize app using init function...
export function mount ( root:Element, 
  comp:drmfComponent|drmfFunction,
  // renderFn : (state:any) => Promise<drmfTemplate>, 
  state? :any, 
  options?:DoremifaOptions ) {

  let interval = null
  let current_node = null
  let is_registered = false
  let last_items = null
  let lastTpl:drmfTemplate
    
        
  if(!app.is_registered) {
    app.is_registered = true
    register_hash()
    window.addEventListener("hashchange", register_hash, false);
  }
  if(interval) clearInterval(interval)
  let update_delay = (options && options.updateInterval) || 100;
  let retry_cnt = 0
  if(state) app.state = {...app.state, ...state}
  const update_application = ()=>{
    if(b_render_on && (retry_cnt < 5)) {
      retry_cnt++
      return
    }
    retry_cnt = 0
    // try {
      if(last_state != app.state) {
        last_state = app.state
        b_render_on = true
        let tpl
        if( typeof(comp) == 'function') {
          tpl = comp(app.state)
        }
        if( comp instanceof drmfComponent) {
          tpl = comp.render()
        }
        if(tpl) {
          if(lastTpl) {
            lastTpl = lastTpl.replaceWith( tpl )
          } else {
            tpl.createDOM()
            tpl.addAt( root, root.lastChild )
            lastTpl = tpl
          }
        }
        b_render_on = false
      }
    //} catch(e) {
    //  console.error(e)
    // }
    window.requestAnimationFrame( update_application)
    for(let f of tickFunctions) {
      if(f) f()
    }
    tickFunctions.length = 0
  }
  window.requestAnimationFrame( update_application )
  // interval = setInterval( update_application, update_delay);
}




