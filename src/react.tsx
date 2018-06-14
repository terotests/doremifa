

import * as React from 'react';
import * as ReactDOM from 'react-dom';

function _random (max) {
  return Math.round(Math.random() * 1000) % max;
}

function buildData (count = 1000) {
  var adjectives = ['pretty', 'large', 'big', 'small', 'tall', 'short', 'long', 'handsome', 'plain', 'quaint', 'clean', 'elegant', 'easy', 'angry', 'crazy', 'helpful', 'mushy', 'odd', 'unsightly', 'adorable', 'important', 'inexpensive', 'cheap', 'expensive', 'fancy'];
  var colours = ['red', 'yellow', 'blue', 'green', 'pink', 'brown', 'purple', 'brown', 'white', 'black', 'orange'];
  var nouns = ['table', 'chair', 'house', 'bbq', 'desk', 'car', 'pony', 'cookie', 'sandwich', 'burger', 'pizza', 'mouse', 'keyboard'];
  var data = new Array(1000);
  let id = 0;
  for (var i = 0; i < count; i++) {
    data[i] = {
      id: id++,
      label: adjectives[_random(adjectives.length)] + ' ' + colours[_random(colours.length)] + ' ' + nouns[_random(nouns.length)]
    };
  }
  return data;
}

class PerfTest extends React.Component {
  state: {
    myList
  }
  constructor(props) {
    super(props)    
    const myList = []
    this.state = { myList }
    setTimeout( ()=>{
      this.setState({myList:buildData(10000)})
    },2000)
  }
  render() {
    const _ = this.state
    console.log(this.state)
    return (
      <table className="table table-hover table-striped test-data">
      <tbody>
          {
            _.myList.map( item => {

            return <tr className={item.id === 'selected' ? 'danger' : ''} >
              <td className="col-md-1">${item.id}</td>
              <td className="col-md-4">
                  <a href="#" onClick={ _ => {}} >{item.label}</a>
              </td>
              <td className="col-md-1"><a href="#" onClick={ _ => {}}  >
                <span className="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td>
              <td className="col-md-6"></td>
          </tr>        
              
            })
          }

      </tbody>
      </table>
    );
  }
}


ReactDOM.render(<PerfTest/>, 
  document.getElementById('content')
);
