"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var index_1 = require("./index");
function intropage(state) {
    var colorList = ['red', 'yellow', 'green', 'brown'];
    return index_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n<h1>Hello! This is the introduction page</h1>\n<p>Hello World, it is ", "</p>\n<div>Color is now ", "</div>\n<form action=\"#\">\n", "\n</form>\n  "], ["\n<h1>Hello! This is the introduction page</h1>\n<p>Hello World, it is ", "</p>\n<div>Color is now ", "</div>\n<form action=\"#\">\n",
        "\n</form>\n  "])), (new Date).toString(), state.color, colorList.map(function (color) { return index_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  <p>\n    <label>\n      <input name=\"group1\" type=\"radio\" checked=", " list=\"colors\" \n        click=", " />\n      <span>", "</span>\n    </label>\n  </p>  \n  "], ["\n  <p>\n    <label>\n      <input name=\"group1\" type=\"radio\" checked=", " list=\"colors\" \n        click=",
        " />\n      <span>", "</span>\n    </label>\n  </p>  \n  "])), state.color === color, function (e, tpl) {
        index_1.setState({ color: color });
    }, color); }));
}
function details(state) {
    var item = state.list.filter(function (item) { return item.id == state.params.id; }).pop();
    // could you just bind to the ID values directly...
    return index_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["<div>\n    <h4>Details for item ", "</h4>\n\n    <form class=\"col s12\">    \n    <div class=\"row\">\n      <div class=\"input-field col s12\">\n        <input placeholder=\"Placeholder\" value=", " id=\"name\" type=\"text\" list=\"input\" class=\"validate\">\n        <label for=\"name\">Name</label>\n      </div>\n      <div class=\"row\">\n        <div class=\"input-field col s12\">\n          <input id=\"duration\" type=\"text\" value=", " class=\"validate\">\n          <label for=\"duration\">Duration</label>\n        </div>\n      </div>\n      <a class=\"waves-effect waves-light btn\" click=", ">Tallenna tiedot</a>\n      <a class=\"waves-effect waves-light btn\" click=", ">Poista</a>      \n    </div>    \n    </form>\n  </div>"], ["<div>\n    <h4>Details for item ", "</h4>\n\n    <form class=\"col s12\">    \n    <div class=\"row\">\n      <div class=\"input-field col s12\">\n        <input placeholder=\"Placeholder\" value=", " id=\"name\" type=\"text\" list=\"input\" class=\"validate\">\n        <label for=\"name\">Name</label>\n      </div>\n      <div class=\"row\">\n        <div class=\"input-field col s12\">\n          <input id=\"duration\" type=\"text\" value=", " class=\"validate\">\n          <label for=\"duration\">Duration</label>\n        </div>\n      </div>\n      <a class=\"waves-effect waves-light btn\" click=",
        ">Tallenna tiedot</a>\n      <a class=\"waves-effect waves-light btn\" click=",
        ">Poista</a>      \n    </div>    \n    </form>\n  </div>"])), state.params.id, item.name, item.duration, function (e, tpl) {
        item.duration = tpl.ids.duration.value;
        item.name = tpl.ids.name.value;
        window.location.hash = 'lista';
    }, function (e, tpl) {
        removeTask(item);
        window.location.hash = 'lista';
    });
}
function removeTask(task) {
    var list = index_1.getState().list;
    var index = list.indexOf(task);
    list.splice(index, 1);
    index_1.setState({ list: list });
}
var id_list = 10;
function generateID() {
    return id_list++;
}
function addTask() {
    var list = index_1.getState().list;
    var id = generateID();
    var task = {
        id: id,
        name: 'Task ' + id,
        duration: Math.floor(2 + Math.random() * 8)
    };
    list.push(task);
    index_1.setState({ list: list });
    return task;
}
function addThousandTasks() {
    var cnt = 1000;
    while (cnt--)
        addTask();
}
function listademo(state) {
    var item_list;
    console.log('listademo called');
    var res = index_1.html(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  <div>\n    <a class=\"waves-effect waves-light btn\" click=", ">+ Task</a>\n    <a class=\"waves-effect waves-light btn\" click=", ">+ 1000 Tasks</a>\n    <div class=\"collection\">\n      ", "\n    </div>    \n  </div>\n  "], ["\n  <div>\n    <a class=\"waves-effect waves-light btn\" click=", ">+ Task</a>\n    <a class=\"waves-effect waves-light btn\" click=", ">+ 1000 Tasks</a>\n    <div class=\"collection\">\n      ",
        "\n    </div>    \n  </div>\n  "])), addTask, addThousandTasks, item_list = state.list.sort(function (a, b) { return a.id - b.id; }).map(function (item) { return index_1.html(templateObject_5 || (templateObject_5 = __makeTemplateObject(["<a href=\"#details/id/", "\" class=\"collection-item\" id=\"link\">\n\n        <span class=\"new badge blue\"\n        data-badge-caption=\"\" \n        click=", ">-</span>         \n        <span class=\"new badge blue\"\n          data-badge-caption=\"\" \n          click=", ">+</span>      \n        <span class=", " \n          data-badge-caption=\"h\" >", "</span>\n        ", "</a>"], ["<a href=\"#details/id/", "\" class=\"collection-item\" id=\"link\">\n\n        <span class=\"new badge blue\"\n        data-badge-caption=\"\" \n        click=",
        ">-</span>         \n        <span class=\"new badge blue\"\n          data-badge-caption=\"\" \n          click=",
        ">+</span>      \n        <span class=", " \n          data-badge-caption=\"h\" >", "</span>\n        ", "</a>"])), item.id, function (e) {
        e.preventDefault();
        item.duration--;
        index_1.setState({});
    }, function (e) {
        e.preventDefault();
        item.duration++;
        index_1.setState({});
    }, item.duration > 3 ? 'new badge red' : 'new badge blue', item.duration, item.name); }));
    return res;
}
var WestWorld = /** @class */ (function (_super) {
    __extends(WestWorld, _super);
    function WestWorld() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WestWorld.prototype.removeItem = function () {
        var list = index_1.getState().list;
        list.push(Math.floor(Math.random() * 100));
        index_1.setState({ list: list });
    };
    WestWorld.prototype.render = function () {
        return index_1.html(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    <div>\n      <nav>\n        <div class=\"nav-wrapper\">\n          <a href=\"#lista\" class=\"brand-logo\">Tasks: ", "</a>\n          <ul id=\"nav-mobile\" class=\"right hide-on-med-and-down\">\n            <li><a href=\"#intro\">Intro</a></li>\n            <li><a href=\"#lista\">Listademo</a></li>\n            <li><a class=\"waves-effect waves-light btn\" click=", ">+ Item to list</a></li>\n          </ul>\n        </div>\n      </nav>    \n      <svg height  =  \"300\" width=\"300\">\n      <path id=\"lineAB\" d=\"M 100 350 l 150 -300\" stroke=\"red\" stroke-width=\"3\" fill=\"none\" />\n        <path id=\"lineBC\" d=\"M 250 50 l 150 300\" stroke=\"red\" stroke-width=\"3\" fill=\"none\" />\n        <path d=\"M 175 200 l 150 0\" stroke=\"green\" stroke-width=\"3\" fill=\"none\" />\n        <path d=\"M 100 350 q 150 -300 300 0\" stroke=\"blue\" stroke-width=\"5\" fill=\"none\" />\n        <!-- Mark relevant points -->\n        <g stroke=\"black\" stroke-width=\"3\" fill=\"black\">\n          <circle id=\"pointA\" cx=\"100\" cy=\"350\" r=\"3\" />\n          <circle id=\"pointB\" cx=\"250\" cy=\"50\" r=\"3\" />\n          <circle id=\"pointC\" cx=\"400\" cy=\"350\" r=\"3\" />\n        </g>\n        <!-- Label the points -->\n        <g font-size=\"30\" font-family=\"sans-serif\" fill=\"black\" stroke=\"none\" text-anchor=\"middle\">\n          <text x=\"100\" y=\"350\" dx=\"-30\">A</text>\n          <text x=\"250\" y=\"50\" dy=\"-10\">B</text>\n          <text x=\"400\" y=\"350\" dx=\"30\">C</text>\n        </g>\n        Sorry, your browser does not support inline SVG.\n      </svg>\n\n      <div class=\"container\">\n        ", "\n      </div>        \n    </div>   \n    "], ["\n    <div>\n      <nav>\n        <div class=\"nav-wrapper\">\n          <a href=\"#lista\" class=\"brand-logo\">Tasks: ", "</a>\n          <ul id=\"nav-mobile\" class=\"right hide-on-med-and-down\">\n            <li><a href=\"#intro\">Intro</a></li>\n            <li><a href=\"#lista\">Listademo</a></li>\n            <li><a class=\"waves-effect waves-light btn\" click=",
            ">+ Item to list</a></li>\n          </ul>\n        </div>\n      </nav>    \n      <svg height  =  \"300\" width=\"300\">\n      <path id=\"lineAB\" d=\"M 100 350 l 150 -300\" stroke=\"red\" stroke-width=\"3\" fill=\"none\" />\n        <path id=\"lineBC\" d=\"M 250 50 l 150 300\" stroke=\"red\" stroke-width=\"3\" fill=\"none\" />\n        <path d=\"M 175 200 l 150 0\" stroke=\"green\" stroke-width=\"3\" fill=\"none\" />\n        <path d=\"M 100 350 q 150 -300 300 0\" stroke=\"blue\" stroke-width=\"5\" fill=\"none\" />\n        <!-- Mark relevant points -->\n        <g stroke=\"black\" stroke-width=\"3\" fill=\"black\">\n          <circle id=\"pointA\" cx=\"100\" cy=\"350\" r=\"3\" />\n          <circle id=\"pointB\" cx=\"250\" cy=\"50\" r=\"3\" />\n          <circle id=\"pointC\" cx=\"400\" cy=\"350\" r=\"3\" />\n        </g>\n        <!-- Label the points -->\n        <g font-size=\"30\" font-family=\"sans-serif\" fill=\"black\" stroke=\"none\" text-anchor=\"middle\">\n          <text x=\"100\" y=\"350\" dx=\"-30\">A</text>\n          <text x=\"250\" y=\"50\" dy=\"-10\">B</text>\n          <text x=\"400\" y=\"350\" dx=\"30\">C</text>\n        </g>\n        Sorry, your browser does not support inline SVG.\n      </svg>\n\n      <div class=\"container\">\n        ",
            "\n      </div>        \n    </div>   \n    "])), index_1.getState().list.length, function (e) {
            e.preventDefault();
            addTask();
        }, index_1.router({
            intro: intropage,
            lista: listademo,
            details: details,
            default: intropage,
        }));
    };
    return WestWorld;
}(index_1.drmfComponent));
exports.WestWorld = WestWorld;
var HelloWorld = /** @class */ (function (_super) {
    __extends(HelloWorld, _super);
    function HelloWorld() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HelloWorld.prototype.render = function () {
        return index_1.html(templateObject_7 || (templateObject_7 = __makeTemplateObject(["<h4>Hello World, it is ", "</h4>"], ["<h4>Hello World, it is ", "</h4>"])), (new Date).toString());
    };
    return HelloWorld;
}(index_1.drmfComponent));
exports.HelloWorld = HelloWorld;
index_1.setState({
    color: 'red',
    list: [1, 2, 3, 4].map(function (item) { return ({
        id: item,
        name: 'Task ' + item,
        duration: Math.floor(1 + Math.random() * 8)
    }); })
});
index_1.mount(document.body, new WestWorld());
var templateObject_2, templateObject_1, templateObject_3, templateObject_5, templateObject_4, templateObject_6, templateObject_7;
//# sourceMappingURL=client.js.map