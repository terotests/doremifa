"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var PerfTest = /** @class */ (function (_super) {
    __extends(PerfTest, _super);
    function PerfTest(props) {
        var _this = _super.call(this, props) || this;
        var myList = [];
        _this.state = { myList: myList };
        for (var i = 0; i < 1000; i++) {
            myList.push(i);
        }
        _this.setState({ myList: myList });
        setInterval(function () {
            myList.splice(0, 1);
            _this.setState({ myList: myList });
        }, 60);
        return _this;
    }
    PerfTest.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("h1", null, "Hello, world!"),
            React.createElement("div", null, this.state.myList.map(function (item) { return React.createElement("li", { key: item },
                "Item ",
                item); }))));
    };
    return PerfTest;
}(React.Component));
var Clock = /** @class */ (function (_super) {
    __extends(Clock, _super);
    function Clock(params) {
        var _this = _super.call(this, params) || this;
        _this.props = {
            date: null
        };
        console.log('Clock was created...');
        _this.state = Math.random();
        return _this;
    }
    Clock.prototype.componentDidMount = function () {
        console.log('Clock did mount');
    };
    Clock.prototype.render = function () {
        return React.createElement("div", null,
            this.props.date.toLocaleTimeString(),
            " ",
            this.state);
    };
    return Clock;
}(React.Component));
var cnt = 0;
setInterval(function (_) { return cnt++; }, 1000);
function tick() {
    ReactDOM.render(cnt & 1 ? React.createElement(Clock, { date: new Date() }) : React.createElement("div", null,
        React.createElement(Clock, { date: new Date() })), document.getElementById('content'));
}
setInterval(tick, 1000);
/*
ReactDOM.render(
  cnt & 1 ? <Clock date={new Date()} /> : <Clock date={new Date()} /> ,
  document.getElementById('content')
);
*/ 
//# sourceMappingURL=react.js.map