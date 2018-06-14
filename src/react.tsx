

import * as React from 'react';
import * as ReactDOM from 'react-dom';

class PerfTest extends React.Component {
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
      myList.reverse()
      this.setState({myList})
    },50)
  }
  render() {
    return (
        <ul>{this.state.myList.map( item => <li>Item {item}</li>)}</ul>
    );
  }
}


ReactDOM.render(<PerfTest/>, 
  document.getElementById('content')
);
