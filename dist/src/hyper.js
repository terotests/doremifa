var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var hyperHTML = require('hyperhtml/cjs').default;
var myList = [];
this.state = { myList: myList };
for (var i = 0; i < 1000; i++) {
    myList.push(i);
}
setInterval(function () {
    myList.splice(0, 1);
    myList.reverse();
}, 60);
function tick(render) {
    // implicit invoke through template literals
    render(__makeTemplateObject(["\n    <div>\n      <ul>", "</ul>\n    </div>\n  "], ["\n    <div>\n      <ul>",
        "</ul>\n    </div>\n  "]), myList.map(function (item) { return "<li>Item " + item + "</li>"; }));
}
// update the time each second
setInterval(tick, 60, hyperHTML.bind(document.body));
//# sourceMappingURL=hyper.js.map