
function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, function (c) {
      switch (c) {
          case '<': return '&lt;';
          case '>': return '&gt;';
          case '&': return '&amp;';
          case '\'': return '&apos;';
          case '"': return '&quot;';
      }
  });
}

export class escapedHtml {
  str:string
  constructor( value ) {
    this.str = value
  }
}

let cache_of = {}
setInterval( () => {
  const keys = Object.keys(cache_of)
  for( let key of keys ) {
    const o = cache_of[key]
    if(!o.parentNode) {
      delete cache_of[key]
    }
  }
},100)
function _dom( str:string, fn?: (elems:any) => void ) : Element {
  const cached = cache_of[str]
  if(cached) {
    if(fn) {
      _forElem(cached,fn)
    }
    return cached;
  }
  
  const elem = document.createElement('div')
  elem.innerHTML = str.trim()
  const v = ( cache_of[str] = elem.firstChild as Element)
  elem.removeChild( v )
  if(fn) {
    _forElem(v,fn)
  }
  return v
}

function _build_dom( str:string, fn?: (elems:any) => void ) : Element {
  const elem = document.createElement('div')
  elem.innerHTML = str.trim()
  const v = ( cache_of[str] = elem.firstChild as Element)
  if(fn) {
    setTimeout( () => _forElem(v,fn), 1)
  }
  return v
}

function getelem( parent:Element, id:string) : Element {
  var matches = parent.querySelectorAll(`#${id}`);  
  return matches.item(0)
}

function _forElem( parent:Element, fn: (elems:any) => void) : Element {
  let res:any = {}
  const lists:any={}
  const walk_tree = ( elem:Element ) => {
    if(!elem) return;
    if(!elem.getAttribute) return
    let elem_id = elem.getAttribute('id')
    let list_id = elem.getAttribute('list')
    if(elem_id) {
      res[elem_id] = elem
    }
    if(list_id) {
      (lists[list_id] = lists[list_id] || []).push( elem )
    }
    const list = Array.prototype.slice.call(elem.childNodes)
    for( let ch of list) walk_tree( ch )
  }
  walk_tree(parent)
  res = {...res, ...lists, elem:parent}
  fn(res)
  return parent
}

export function forElem( parent:Element, fn: (elems:any) => void) : Element {
  setTimeout( () => _forElem(parent, fn), 1)
  return parent;
}


export function html(strings, ...values) : escapedHtml {
  let results = []
  let f_values = []
  var s = "",i=0;
  for(; i<values.length; i++) {
    const v = values[i]
    if(!isNaN(v)) {
      s+=strings[i]+v
    } else {
      s+=strings[i]+escapeXml( v ); 
    }
  }
  s+=strings[i];
  return new escapedHtml(s)
}

let element_cache:any = {}
setInterval( () => {
  const keys = Object.keys(element_cache)
  for( let key of keys ) {
    const o = element_cache[key]
    if(!o.elem.parentNode) {
      delete element_cache[key]
    }
  }
},100)
export function element(strings, ...values) : Element {
  let results = []
  let f_values = []
  var s = "",i=0, pcnt = 0;
  var key = strings.join('')
  for(; i<values.length; i++) {
    const v = values[i]
    const is_string = typeof(v)=="string"
    const is_number = !isNaN(v)
    if(typeof(v)=="string" || !isNaN(v)) {
      if(is_string) {
        s+=strings[i]+escapeXml( v ); 
      } else {
        s+=strings[i]+v
      }
    } else {
      if( v instanceof escapedHtml) {
        s+=strings[i]+v.str
        continue
      }
      // mapping several elements would be problematic
      if(Array.isArray(v)) {
        const to_join = []
        for( let item of v ) {
          if( item instanceof escapedHtml) {
            to_join.push(item.str)
          } else {            
            if( item instanceof Element) {
              const placeholder = `<div placeholder="${pcnt++}" list="placeholders"></div>`
              to_join.push( placeholder )
              f_values.push( item )      
            } else {
              throw "HTML must be escaped"
            }             
          }
        }
        s+=strings[i]+to_join.join('')
      } else {
        if(typeof(v) == "object") {
          const placeholder = `<div placeholder="${pcnt++}" list="placeholders"></div>`
          s+=strings[i] + placeholder
          f_values.push( v )  
        }
      }
    }
  }
  s+=strings[i];
  s = s.trim()
  let obj
  let elem;
  const thedom = _dom(s, o => {

    obj = element_cache[s] = element_cache[s] || { 
        first:true,
        elem:o.elem, 
        placeholders:o.placeholders}

    // TODO: verify this... using the cache is disabled if cloning is required...
    let b_mustbe_new = false
    if(obj.placeholders) {
      for(let i=0; i<f_values.length; i++) {
        if(f_values[i] && (obj.first || f_values[i] !== obj.placeholders[i])) {
          const v = f_values[i]
          if(v.parentNode && (v.parentNode != obj.placeholders[i].parentNode)) {
            b_mustbe_new = true
          }
        } 
      }
      if(b_mustbe_new) {
        obj = element_cache[s] = { 
          first:true,
          elem:o.elem, 
          placeholders:o.placeholders}
      }
    }        
    elem = o.elem;
    if(obj.placeholders) {
      for(let i=0; i<f_values.length; i++) {

        // version without cloning...
        if(f_values[i] && (obj.first || f_values[i] !== obj.placeholders[i])) {
          obj.placeholders[i].parentNode.replaceChild( f_values[i], obj.placeholders[i]  )
          obj.placeholders[i] = f_values[i];              
        } 

        /*
        if(f_values[i] && (obj.first || f_values[i] !== obj.placeholders[i])) {
          const v = f_values[i]
          // the bug comes from here...
          if(v.parentNode && (v.parentNode != obj.placeholders[i].parentNode)) {
            const clone = v.cloneNode(true)
            obj.placeholders[i].parentNode.replaceChild( clone, obj.placeholders[i]  )
            obj.placeholders[i] = clone;    
            console.log('cloned node ', clone)    
            console.log(obj.placeholders[i]) 
            console.log(v)      
          } else {
            obj.placeholders[i].parentNode.replaceChild( f_values[i], obj.placeholders[i]  )
            obj.placeholders[i] = f_values[i];              
          }
        } 
        */
      }
    }
    obj.first = false;
  })
  
  return thedom;
}

// export let html = element;

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

// reduce( _ => {} )
export function reduce( reducer:(state:any) => any ) {
  try {
    app.state = { ...app.state, ...reducer(app.state) }
  } catch(e) {

  }
}

export async function router(routermap:any) : Promise<Element>  {
  let page_name = app.state.page || 'default';
  let page = routermap[app.state.page || 'default'] || (page_name = 'default', routermap.default)
  let phase = 'refresh'
  if(page) {
    if( page_name != app.last_page_name ) {
      const last_page = routermap[app.last_page_name]
      //if(last_page) {
      //  last_page({...app.state, phase:'close'})
      //}
      phase = 'init'
    }
    app.last_page_name = page_name
    return page({...app.state, phase})
  }
  return element`route not found`
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

// initialize app using init function...
export function start ( root:Element, 
  renderFn : (state:any) => Promise<Element>, 
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
        const el = await renderFn(app.state)
        if(!current_node) {
          root.appendChild( el )
        } else {
          if( el != current_node ) {
            current_node.parentNode.replaceChild( el, current_node )
          }
        }
        current_node = el
        b_render_on = false
      }
    } catch(e) {
      console.error(e)
    }
  }
  setInterval( update_application, update_delay);
}




