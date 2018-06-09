
const hyperHTML = require('hyperhtml/cjs').default;

const myList = []
this.state = { myList }
for(let i=0; i<1000; i++) {
  myList.push(i)
}    
setInterval( ()=>{
  myList.splice(0,1)
  myList.reverse()
},60)

function tick(render) {
  // implicit invoke through template literals
  render`
    <div>
      <ul>${myList.map(
        item =>  `<li>Item ${item}</li>`
      )}</ul>
    </div>
  `;
}
 
// update the time each second
setInterval(tick, 60, hyperHTML.bind(document.body));