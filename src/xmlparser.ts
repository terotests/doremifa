import { drfmKey } from "./index";

export type bufferType = string | any

export interface XMLBuilder {
  beginNode( name:string, buffer_index?:number )
  setAttribute( name:string, value:bufferType, buffer_index?:number)
  addTextNode( value:string, buffer_index?:number )
  closeNode( name:string, buffer_index?:number )
  eof()
}

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
                this.isTagChar( c2, true ) ) ) )  // valid tag char
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
    if(typeof(this.buff) === 'undefined') return ''
    if(start_buff == this.buff) {
      return this.buff.substring( sp, this.i )
    }
    return start_buff.substring( sp )
    // the old, only return one buffer at time...
    /*
    intermediate.pop() // remove last intermediate because it is this.buff
    return start_buff.substring( sp ) + intermediate.join('') + this.buff.substring( 0, this.i )
    */
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

      if(this.isHere(34)) { // "
        this.step(1) 
        const value = this.collectUntil(34) // collect to the "
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
          this.step(1)
          this.in_tagdef = true
          this.last_tag_name = this.collectXMLName()
          callback.beginNode( this.last_tag_name, this.used_index )
          return
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