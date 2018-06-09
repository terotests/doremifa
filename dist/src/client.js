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
    return index_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\n<h1>Hello! This is the introduction page</h1>\n<p>Hello World, it is ", "</p>\n<div>Color is now ", "</div>\n<form action=\"#\">\n", "\n</form>\n<ul>\n  ", "\n</ul>\n  "], ["\n\n<h1>Hello! This is the introduction page</h1>\n<p>Hello World, it is ", "</p>\n<div>Color is now ", "</div>\n<form action=\"#\">\n",
        "\n</form>\n<ul>\n  ", "\n</ul>\n  "])), (new Date).toString(), state.color, colorList.map(function (color) { return index_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  <p>\n    <label>\n      <input name=\"group1\" type=\"radio\" checked=", " list=\"colors\" \n        click=", " />\n      <span>", "</span>\n    </label>\n  </p>  \n  "], ["\n  <p>\n    <label>\n      <input name=\"group1\" type=\"radio\" checked=", " list=\"colors\" \n        click=",
        " />\n      <span>", "</span>\n    </label>\n  </p>  \n  "])), state.color === color, function (e, tpl) {
        index_1.setState({ color: color });
    }, color); }), [1, 2, 3, 4, 5, 6].map(function (item) { return index_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["<li>", "</li>"], ["<li>", "</li>"])), item); }));
}
function details(state) {
    var item = state.list.filter(function (item) { return item.id == state.params.id; }).pop();
    // could you just bind to the ID values directly...
    return index_1.html(templateObject_4 || (templateObject_4 = __makeTemplateObject(["<div>\n    <h4>Details for item ", "</h4>\n\n    <form class=\"col s12\">    \n    <div class=\"row\">\n      <div class=\"input-field col s12\">\n        <input placeholder=\"Placeholder\" value=", " id=\"name\" type=\"text\" list=\"input\" class=\"validate\">\n        <label for=\"name\">Name</label>\n      </div>\n      <div class=\"row\">\n        <div class=\"input-field col s12\">\n          <input id=\"duration\" type=\"text\" value=", " class=\"validate\">\n          <label for=\"duration\">Duration</label>\n        </div>\n      </div>\n      <a class=\"waves-effect waves-light btn\" click=", ">Tallenna tiedot</a>\n      <a class=\"waves-effect waves-light btn\" click=", ">Poista</a>      \n    </div>    \n    </form>\n  </div>"], ["<div>\n    <h4>Details for item ", "</h4>\n\n    <form class=\"col s12\">    \n    <div class=\"row\">\n      <div class=\"input-field col s12\">\n        <input placeholder=\"Placeholder\" value=", " id=\"name\" type=\"text\" list=\"input\" class=\"validate\">\n        <label for=\"name\">Name</label>\n      </div>\n      <div class=\"row\">\n        <div class=\"input-field col s12\">\n          <input id=\"duration\" type=\"text\" value=", " class=\"validate\">\n          <label for=\"duration\">Duration</label>\n        </div>\n      </div>\n      <a class=\"waves-effect waves-light btn\" click=",
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
function add100Tasks() {
    var cnt = 100;
    while (cnt--)
        addTask();
}
function listademo(state) {
    var item_list;
    var res = index_1.html(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  <div>\n    <a class=\"waves-effect waves-light btn\" click=", ">+ Task</a>\n    <a class=\"waves-effect waves-light btn\" click=", ">+ 100 Tasks</a>\n    <div class=\"collection\">\n      ", "\n    </div>    \n  </div>\n  "], ["\n  <div>\n    <a class=\"waves-effect waves-light btn\" click=", ">+ Task</a>\n    <a class=\"waves-effect waves-light btn\" click=", ">+ 100 Tasks</a>\n    <div class=\"collection\">\n      ",
        "\n    </div>    \n  </div>\n  "])), addTask, add100Tasks, item_list = state.list.sort(function (a, b) { return a.id - b.id; }).map(function (item) { return index_1.html(templateObject_6 || (templateObject_6 = __makeTemplateObject(["<a href=\"#details/id/", "\" class=\"collection-item\" id=\"link\">\n\n        <span class=\"new badge blue\"\n        data-badge-caption=\"\" \n        click=", ">-</span>         \n        <span class=\"new badge blue\"\n          data-badge-caption=\"\" \n          click=", ">+</span>      \n        <span class=", " \n          data-badge-caption=\"h\" >", "</span>\n        ", "</a>"], ["<a href=\"#details/id/", "\" class=\"collection-item\" id=\"link\">\n\n        <span class=\"new badge blue\"\n        data-badge-caption=\"\" \n        click=",
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
function createPoint(item) {
    var time = (new Date).getTime() / 1000;
    var value = item.id;
    var r = 10 + Math.sin(value / 10) * 5;
    var op = Math.abs(Math.cos(time));
    var x = Math.floor(200 + Math.cos(time + value / 10) * (20 + value / 2) * Math.cos(time));
    var y = Math.floor(200 + Math.sin(time + value / 10) * (20 + value / 2) * Math.cos(time));
    return index_1.html(templateObject_7 || (templateObject_7 = __makeTemplateObject(["<circle fill=\"red\" opacity=", " r=", " cx=", " cy=", "/>"], ["<circle fill=\"red\" opacity=", " r=", " cx=", " cy=", "/>"])), op, r, x, y);
}
function svgPart(state) {
    return index_1.html(templateObject_8 || (templateObject_8 = __makeTemplateObject(["<svg height=\"600\" width=\"600\" viewBox=\"0 0 400 400\">\n                  ", "\n                </svg>"], ["<svg height=\"600\" width=\"600\" viewBox=\"0 0 400 400\">\n                  ", "\n                </svg>"])), state.list.map(createPoint));
}
var WestWorld = /** @class */ (function (_super) {
    __extends(WestWorld, _super);
    function WestWorld() {
        var _this = _super.call(this) || this;
        console.log('West World was created!!!');
        return _this;
    }
    WestWorld.prototype.removeItem = function () {
        var list = index_1.getState().list;
        list.push(Math.floor(Math.random() * 100));
        index_1.setState({ list: list });
    };
    WestWorld.prototype.render = function () {
        var state = index_1.getState();
        return index_1.html(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n    <div>\n      <nav>\n        <div class=\"nav-wrapper\">\n          <a href=\"#lista\" class=\"brand-logo\">Tasks: ", "</a>\n          <ul id=\"nav-mobile\" class=\"right hide-on-med-and-down\">\n            <li><a href=\"#intro\">Intro</a></li>\n            <li><a href=\"#lista\">Listademo</a></li>\n            <li><a href=\"#svg\">SVG</a></li>\n            <li><a class=\"waves-effect waves-light btn\" click=", ">+ Item to list</a></li>\n          </ul>\n        </div>\n      </nav>    \n      <div>     \n      </div>\n      <div class=\"container\">\n        ", "\n      </div>        \n    </div>   \n    "], ["\n    <div>\n      <nav>\n        <div class=\"nav-wrapper\">\n          <a href=\"#lista\" class=\"brand-logo\">Tasks: ", "</a>\n          <ul id=\"nav-mobile\" class=\"right hide-on-med-and-down\">\n            <li><a href=\"#intro\">Intro</a></li>\n            <li><a href=\"#lista\">Listademo</a></li>\n            <li><a href=\"#svg\">SVG</a></li>\n            <li><a class=\"waves-effect waves-light btn\" click=",
            ">+ Item to list</a></li>\n          </ul>\n        </div>\n      </nav>    \n      <div>     \n      </div>\n      <div class=\"container\">\n        ",
            "\n      </div>        \n    </div>   \n    "])), index_1.getState().list.length, function (e) {
            e.preventDefault();
            addTask();
        }, index_1.router({
            intro: intropage,
            lista: listademo,
            details: details,
            default: listademo,
            svg: svgPart,
        }));
    };
    return WestWorld;
}(index_1.drmfComponent));
exports.WestWorld = WestWorld;
var had_it = false;
var HelloWorld = /** @class */ (function (_super) {
    __extends(HelloWorld, _super);
    function HelloWorld() {
        var _this = _super.call(this) || this;
        var c = _this.myCanvas = document.createElement("canvas");
        c.setAttribute('width', '200px');
        c.setAttribute('height', '200px');
        var ctx = c.getContext("2d");
        ctx.moveTo(0, 0);
        ctx.lineTo(200, 100);
        ctx.stroke();
        return _this;
    }
    HelloWorld.prototype.render = function () {
        var _this = this;
        return index_1.html(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n      <h4 id='head'>Hello World, it is ", "</h4>\n      <div id='canvasContainer'/>\n      Very nice...\n      "], ["\n      <h4 id='head'>Hello World, it is ", "</h4>\n      <div id='canvasContainer'/>\n      Very nice...\n      "])), (new Date).toString()).onReady(function (tpl) {
            console.log('Binded ');
            tpl.ids.head.setAttribute('style', 'color:green;');
            tpl.ids.canvasContainer.appendChild(_this.myCanvas);
        });
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
var ww = new WestWorld();
var hello = new HelloWorld();
var cnt = 0;
index_1.mount(document.body, function (state) {
    return index_1.html(templateObject_11 || (templateObject_11 = __makeTemplateObject(["  \n\n  <header class=\"mui-appbar mui--z1\">\n  <div class=\"mui-container\">\n    <table>\n      <tr class=\"mui--appbar-height\">\n        <td class=\"mui--text-title\">Brand.io</td>\n        <td class=\"mui--text-right\">\n          <ul class=\"mui-list--inline mui--text-body2\">\n            <li><a href=\"#\">About</a></li>\n            <li><a href=\"#\">Pricing</a></li>\n            <li><a href=\"#\">Login</a></li>\n          </ul>\n        </td>\n      </tr>\n    </table>\n  </div>\n  </header>\n  <!-- the actual page content comes in here -->\n  <div id=\"content-wrapper\" class=\"mui--text-center\">\n    <div class=\"mui--appbar-height\"></div>\n    <br>\n    <br>\n    <div class=\"mui--text-display3\">Brand.io ... comment ?? </div>\n    <br>\n    <br>\n    <button class=\"mui-btn mui-btn--raised\">Get started</button>\n    <!--\n    <img width=\"200\" height=\"200\" src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/1200px-Wikipedia-logo-v2.svg.png\">\n    -->\n  </div>\n  <footer>\n    <div class=\"mui-container mui--text-center mui--text-bottom\">\n      Made with \u2665 by <a href=\"https://www.muicss.com\">MUICSS</a>\n    </div>\n  </footer>\n  \n  "], ["  \n\n  <header class=\"mui-appbar mui--z1\">\n  <div class=\"mui-container\">\n    <table>\n      <tr class=\"mui--appbar-height\">\n        <td class=\"mui--text-title\">Brand.io</td>\n        <td class=\"mui--text-right\">\n          <ul class=\"mui-list--inline mui--text-body2\">\n            <li><a href=\"#\">About</a></li>\n            <li><a href=\"#\">Pricing</a></li>\n            <li><a href=\"#\">Login</a></li>\n          </ul>\n        </td>\n      </tr>\n    </table>\n  </div>\n  </header>\n  <!-- the actual page content comes in here -->\n  <div id=\"content-wrapper\" class=\"mui--text-center\">\n    <div class=\"mui--appbar-height\"></div>\n    <br>\n    <br>\n    <div class=\"mui--text-display3\">Brand.io ... comment ?? </div>\n    <br>\n    <br>\n    <button class=\"mui-btn mui-btn--raised\">Get started</button>\n    <!--\n    <img width=\"200\" height=\"200\" src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/1200px-Wikipedia-logo-v2.svg.png\">\n    -->\n  </div>\n  <footer>\n    <div class=\"mui-container mui--text-center mui--text-bottom\">\n      Made with \u2665 by <a href=\"https://www.muicss.com\">MUICSS</a>\n    </div>\n  </footer>\n  \n  "])));
});
setTimeout(add100Tasks, 100);
var templateObject_2, templateObject_3, templateObject_1, templateObject_4, templateObject_6, templateObject_5, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11;
// setInterval( _ => setState({}), 20)
//# sourceMappingURL=client.js.map