

import * as React from 'react';
import * as ReactDOM from 'react-dom';

class PerfTest extends React.Component {
  props: {
    date
  }
  state: {
    myList
  }
  constructor(props) {
    super(props)    
    const myList = []
    this.state = { myList }
    for(let i=0; i<1000; i++) {
      myList.push(i)
    }    
    this.setState({myList})
    setInterval( ()=>{
      myList.splice(0,1)
      this.setState({myList})
    },60)
  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <div>{this.state.myList.map( item => <li key={item}>Item {item}</li>)}</div>
      </div>
    );
  }
}

class Clock extends React.Component {
  props = {
    date : null
  }
  componentDidMount() {
    console.log('Clock did mount')
  }
  constructor(params) {
    super(params)
    console.log('Clock was created...')
    this.state = Math.random()
  } 
  render() {
    return <div>{this.props.date.toLocaleTimeString()} {this.state}</div>
  }
}

let cnt = 0
setInterval( _ => cnt++, 1000)

function tick() {
  ReactDOM.render(
    cnt & 1 ? <Clock date={new Date()} /> : <div><Clock date={new Date()} /></div>, 
    document.getElementById('content')
  );
}

setInterval(tick, 1000);

/*
ReactDOM.render(
  cnt & 1 ? <Clock date={new Date()} /> : <Clock date={new Date()} /> , 
  document.getElementById('content')
);
*/