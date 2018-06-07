

import * as React from 'react';
import * as ReactDOM from 'react-dom';

class Clock extends React.Component {
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

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.body
  );
}

setInterval(tick, 1000);

