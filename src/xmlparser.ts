import { drfmKey } from "./index";

// TODO:
// - support self closing tags
// http://xahlee.info/js/html5_non-closing_tag.html

export type bufferType = string | any

export interface XMLBuilder {
  beginNode( name:string, buffer_index?:number )
  setAttribute( name:string, value:bufferType, buffer_index?:number)
  addTextNode( value:string, buffer_index?:number )
  closeNode( name:string, buffer_index?:number )
  eof()
}

function createDetector( strs:string[]) : (buff:string, index:number) => boolean {
  let cached_detectors = new Array(256)
  function cacheDetector(str) {
    const cache_index = str.charCodeAt(0)
    if(!cached_detectors[cache_index]) cached_detectors[cache_index] = []
    cached_detectors[cache_index].push((buff:string, index:number) : boolean => {
      if((buff.length - index) < str.length) return false
      for(let i=0; i<str.length; i++) {
        if(str.charCodeAt(i) != buff.charCodeAt(index + i)) return false
      }
      return true
    })
  }  
  for( let s of strs ) {
    cacheDetector(s)
  }
  return (buff:string, index:number) : boolean => {
    const detectors = cached_detectors[buff.charCodeAt(index)]
    if(detectors) {
      for( let fn of detectors) {
        if(fn(buff,index)) return true        
      }
    }
    return false
  }
}
const isSelfClosingTag = createDetector(['area',
  'base',
  'br',
  'col', 
  'command',
  'embd',
  'hr', 
  'img',
  'input',
  'keygen ',
  'link',
  'menuitem',
  'meta',
  'param',
  'source',
  'track',
  'wbr',  
])

const isCommentStart = createDetector(['<!--'])
const isCommentEnd = createDetector(['-->'])

export class XMLParser  {

  __len = 0
  buff_index = 0
  used_index = 0
  parents = []
  tag_depth = 0

  // buffer and the index inside it
  buff:bufferType
  i = 0
  eof = false

  buffers:bufferType[]
  last_finished = null

  in_tagdef = false
  is_selfclosing = false
  last_tag_name = ''

  constructor(initWith:string[]) {
    this.buffers = initWith
    this.buff = initWith[0]
    this.i = 0
    this.buff_index = 0
    this.used_index = 0
    this.eof = false
    if(!this.buff) this.eof = true
  }

  code ( index:number ) : number {
    if( (this.buff_index & 1 ) && typeof(this.buff) != 'string') {
      return 0
    }
    if(this.buff.length <= this.i + index ) {
      const next = this.buffers[this.buff_index + 1]
      if(typeof(next) != 'string') {
        return 0
      }
      if(next) {
        return next.charCodeAt( this.i + index - this.buff.length )
      }
      return 0
    }        
    return this.buff.charCodeAt( this.i + index )
  }

  here () : number {
    if(typeof(this.buff) != 'string') return 0
    return this.buff.charCodeAt( this.i )
  }

  isValueBlock() {
    return ( (this.buff_index & 1 ) === 1)
  }

  isHere (value:number) : boolean {
    return this.buff.charCodeAt( this.i ) == value
  }  
  step ( index:number ) : number {
    this.i += index
    this.used_index = this.buff_index
    if(this.buff.length <= this.i ) {
      this.i = this.i - this.buff.length
      this.buff_index = this.buff_index + 1
      this.used_index = this.buff_index
      this.buff = this.buffers[ this.buff_index ]
      if(typeof(this.buff) === 'undefined') {
        this.eof = true
        return 0
      } else {
        if(typeof(this.buff) != 'string') return 0
        return this.buff.charCodeAt(0)
      }
    }
    return this.buff.charCodeAt(this.i)
  }   

  stepBuffer() {
    this.buff_index = this.buff_index + 1
    this.used_index = this.buff_index
    this.buff = this.buffers[ this.buff_index ]
    this.i = 0
    if(typeof(this.buff) === 'undefined') {
      this.eof = true
    }   
  }

  skipspace() {
    if(typeof(this.buff) != 'string') return;    
    let c = this.here()
    while(!this.eof) {
      if( c > 32 ) break;
      c = this.step(1)
      const b = this.buff as any
      if( b instanceof drfmKey) {
        this.stepBuffer()
      }
    }
  }

  isTagChar( c:number, first:boolean ) {
    return (    ((c >= 65) && (c <= 90))     // A - Z
    || ((c >= 97) && (c <= 122))    // a - z
    || ( c == 95)                   // _
    || ( c == 58)                   // :
    || (!first && (c >= 48) && (c <= 57))     // 0 - 9
    || (!first && c == 46)          // .
    || (!first && c == 45)          // -
   )
  }

  // collects a name like div or attribute name ( a bit simplified version )
  collectXMLName () : string {
    let sp = this.i;
    let c = this.here()
    let first = true
    const start_buff = this.buff
    while( !this.eof && this.isTagChar( c, first) ) {
      c = this.step(1)
      first = false
    }
    if(start_buff == this.buff) {
      return this.buff.substring( sp, this.i )
    }
    return start_buff.substring( sp ) + this.buff.substring( 0, this.i )
  } 
  
  colllectText () : bufferType {

    if(this.isValueBlock()) {
      const v = this.buff
      this.used_index = this.buff_index
      this.buff_index++
      this.buff = this.buffers[this.buff_index]
      if(typeof(this.buff) === 'undefined') this.eof = true
      this.i = 0
      return v
    }

    let sp = this.i;
    let c1 = this.here()
    let c2 = this.code(1)

    const start_buff = this.buff
    let curr_buff = this.buff
    const intermediate = []

    // read text as long as not <c... or </...
    while( !this.eof && ( !(  c1 == 60 &&  // "<"
              ( (c2 == 47) || // "/"
                this.isTagChar( c2, true ) || // valid tag char
                (c2 == 33) ) ) )  // <! comment start...
          ) {
      c1 = this.step(1)
      if(this.eof) break;
      c2 = this.code(1)
      if(curr_buff != this.buff) {
        // collect only 
        break
        // intermediate.push(this.buff)
      }
      curr_buff = this.buff
    }
    if(start_buff == this.buff) {
      return this.buff.substring( sp, this.i )
    }
    return start_buff.substring( sp )
  }   

  skipUntil (fn) {
    let curr_buff = this.buff
    while( (false === fn(this.buff,this.i)) && !this.eof ) {
      this.step(1)
      if(curr_buff != this.buff) {
        if(this.isValueBlock()) {
          this.stepBuffer()
        }
      }
      curr_buff = this.buff
    }
  }    

  collectUntil (value) : string {
    let sp = this.i;
    let c = this.here()
    const start_buff = this.buff
    let curr_buff = this.buff
    const intermediate = []
    while( c != value && !this.eof ) {
      c = this.step(1)
      if(curr_buff != this.buff) {
        intermediate.push(this.buff)
      }
      curr_buff = this.buff
    }
    if(start_buff == this.buff) {
      return this.buff.substring( sp, this.i )
    }
    intermediate.pop() // remove last intermediate because it is this.buff
    return start_buff.substring( sp ) + intermediate.join('') + this.buff.substring( 0, this.i )
  }  

  collectXMLAttributeValue () : bufferType {
    this.skipspace()
    if(this.isHere(61)) { // = 
      this.step(1)
      this.skipspace()

      // if the current buffer is...
      // setAttributeFunction

      if(typeof(this.buff) != 'string' || (this.isValueBlock())) {
        const v = this.buff
        this.used_index = this.buff_index
        this.buff_index++
        this.buff = this.buffers[this.buff_index]
        if(typeof(this.buff) === 'undefined') this.eof = true
        return v
      }
      const quoteChar = this.here()
      if(quoteChar == 34 || quoteChar == 39) { // "
        this.step(1) 
        const value = this.collectUntil(quoteChar) // collect to the "
        this.step(1)
        return value
      } else {
        return this.collectXMLName()
      }
    } 
    return ''
  }  
 

  // parse something that is meaningful imperatively and then create a callback
  parse ( callback:XMLBuilder ) {
    if(typeof(this.buff) === 'undefined') {
      this.eof = true
      callback.eof()
      return
    }    
    let cc1 = 0;
    let cc2 = 0;
    while (!this.eof) {

      cc1 = this.here()
      if(this.in_tagdef) {
        // <div  something = "..."
        this.skipspace() 
        cc1 = this.here()

        // if tag ends immediately like <div/> or <br/>
        if(cc1 == 47 ) {  // "/" 
          this.step(2)
          this.in_tagdef = false
          callback.closeNode( this.last_tag_name, this.used_index )
          return          
        }
        if( cc1 != 62 ) { // not ">"
          const name = this.collectXMLName()
          const value = this.collectXMLAttributeValue()
          callback.setAttribute( name, value, this.used_index )
          return
        }
        // if ">", check if self closing
        if(this.is_selfclosing) {
          this.step(1)
          this.in_tagdef = false
          callback.closeNode( this.last_tag_name, this.used_index )          
        }
        this.step(1)
        this.in_tagdef = false
        continue
      }

      if(this.isValueBlock()) {
        const idx = this.buff_index
        callback.addTextNode( this.colllectText(), idx )
        continue
      }
      // <
      if( cc1 == 60 ) {        
        cc2 = this.code(1)
        // </ tag is closing
        if( cc2 == 47 ) {
          this.step(2)
          const tag = this.collectXMLName()
          this.step(1)
          callback.closeNode( tag, this.used_index )
          return
        }
        if( this.isTagChar( cc2, true )) {
          this.is_selfclosing = isSelfClosingTag(this.buff, this.i+1)
          this.step(1)
          this.in_tagdef = true
          this.last_tag_name = this.collectXMLName()
          callback.beginNode( this.last_tag_name, this.used_index )
          return
        }
        if(isCommentStart(this.buff, this.i)) {
          this.skipUntil( isCommentEnd )
          this.step(3) // -->
          continue
        } 
      }
      // > the div can be closing....
      if(!this.eof) {
        const idx = this.buff_index
        callback.addTextNode( this.colllectText(), idx )
      }
      return
    }    
    callback.eof()
  }
}