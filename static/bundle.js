(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
var Doremifa = require("./index");
var timers_1 = require("timers");
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
        "\n    </div>    \n  </div>\n  "])), addTask, add100Tasks, item_list = state.list.sort(function (a, b) { return a.id - b.id; }).map(function (item) { return index_1.html(templateObject_6 || (templateObject_6 = __makeTemplateObject(["<li><a href=\"#details/id/", "\" class=\"collection-item\" id=\"link\">\n\n        <span class=\"new badge blue\"\n        data-badge-caption=\"\" \n        click=", ">-</span>         \n        <span class=\"new badge blue\"\n          data-badge-caption=\"\" \n          click=", ">+</span>      \n        <span class=", " \n          data-badge-caption=\"h\" >", "</span>\n        ", "</a></li>"], ["<li><a href=\"#details/id/", "\" class=\"collection-item\" id=\"link\">\n\n        <span class=\"new badge blue\"\n        data-badge-caption=\"\" \n        click=",
        ">-</span>         \n        <span class=\"new badge blue\"\n          data-badge-caption=\"\" \n          click=",
        ">+</span>      \n        <span class=", " \n          data-badge-caption=\"h\" >", "</span>\n        ", "</a></li>"])), item.id, function (e) {
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
// initial state
index_1.setState({
    time: (new Date).toTimeString(),
    items: [1, 2, 3, 4].map(function (id) { return ({ id: id, name: 'item ' + id }); })
});
var idcnt = 4;
var add_item = function () {
    var state = index_1.getState();
    idcnt++;
    index_1.setState({
        items: state.items.concat([{ id: idcnt, name: 'item ' + idcnt }])
    });
};
var delete_item = function (item) {
    var state = index_1.getState();
    index_1.setState({
        items: state.items.filter(function (i) { return i.id != item.id; }).slice()
    });
};
var Hello = /** @class */ (function (_super) {
    __extends(Hello, _super);
    function Hello() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.msg = 'World';
        return _this;
    }
    Hello.prototype.render = function () {
        return index_1.html(templateObject_11 || (templateObject_11 = __makeTemplateObject(["<div>Hello ", " Component</div>"], ["<div>Hello ", " Component</div>"])), this.msg);
    };
    return Hello;
}(index_1.drmfComponent));
// The Materialize demo...
// Doremifa.mount(document.body, new WestWorld() )
function frontpage(state) {
    return index_1.html(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  <h2>Hello World</h2>\n  <div class=\"card\" style=\"width: 18rem;\">\n    <div class=\"card-body\">\n      <h5 class=\"card-title\">Card title</h5>\n      <p class=\"card-text\">Some quick example text to build on the card title and make up the bulk of the card's content.</p>\n      <a href=\"#buttons\" class=\"btn btn-primary\">Go somewhere</a>\n    </div>\n  </div>\n\n  <div class=\"alert alert-primary\" role=\"alert\">\n    This is a primary alert\u2014check it out!\n  </div>"], ["\n  <h2>Hello World</h2>\n  <div class=\"card\" style=\"width: 18rem;\">\n    <div class=\"card-body\">\n      <h5 class=\"card-title\">Card title</h5>\n      <p class=\"card-text\">Some quick example text to build on the card title and make up the bulk of the card's content.</p>\n      <a href=\"#buttons\" class=\"btn btn-primary\">Go somewhere</a>\n    </div>\n  </div>\n\n  <div class=\"alert alert-primary\" role=\"alert\">\n    This is a primary alert\u2014check it out!\n  </div>"])));
}
function jumbo(state) {
    return index_1.html(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n  <div class=\"jumbotron\">\n    <h1 class=\"display-4\">Hello, world!</h1>\n    <p class=\"lead\">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>\n    <hr class=\"my-4\">\n    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>\n    <p class=\"lead\">\n      <a class=\"btn btn-primary btn-lg\" href=\"#\" role=\"button\" click=", ">+ Item</a>\n      <a class=\"btn btn-primary btn-lg\" href=\"#\" role=\"button\" >See more</a>\n    </p>\n  </div>  \n  ", "\n  "], ["\n  <div class=\"jumbotron\">\n    <h1 class=\"display-4\">Hello, world!</h1>\n    <p class=\"lead\">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>\n    <hr class=\"my-4\">\n    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>\n    <p class=\"lead\">\n      <a class=\"btn btn-primary btn-lg\" href=\"#\" role=\"button\" click=",
        ">+ Item</a>\n      <a class=\"btn btn-primary btn-lg\" href=\"#\" role=\"button\" >See more</a>\n    </p>\n  </div>  \n  ", "\n  "])), function (e) {
        e.preventDefault();
        index_1.getState().items.push({ name: 'foobar ' + Math.floor(Math.random() * 100) });
        index_1.setState({});
    }, index_1.getState().items.map(function (item) { return index_1.html(templateObject_14 || (templateObject_14 = __makeTemplateObject(["<div>", "</div>"], ["<div>", "</div>"])), item.name); }));
}
var helloComp = new Hello();
function buttons(state) {
    return index_1.html(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n\n    ", "\n    <div>  \n      <a role=\"button\" class=\"btn btn-primary\" href=\"#jumbo\">Primary</a>\n      <button type=\"button\" class=\"btn btn-secondary\" click=", ">Secondary</button>\n      <button type=\"button\" class=\"btn btn-success\">Success</button>\n      <button type=\"button\" class=\"btn btn-danger\" click=", ">Danger</button>\n      <button type=\"button\" class=\"btn btn-warning\" click=", ">Warning</button>\n      <button type=\"button\" class=\"btn btn-info\">Info</button>\n      <button type=\"button\" class=\"btn btn-light\">Light</button>\n      <button type=\"button\" class=\"btn btn-dark\" click=", ">Reverse</button>  \n      <button type=\"button\" class=\"btn btn-link\">Link</button>  \n    </div>\n    ", "\n    ", "\n    ", "\n    ", "\n "], ["\n\n    ",
        "\n    <div>  \n      <a role=\"button\" class=\"btn btn-primary\" href=\"#jumbo\">Primary</a>\n      <button type=\"button\" class=\"btn btn-secondary\" click=",
        ">Secondary</button>\n      <button type=\"button\" class=\"btn btn-success\">Success</button>\n      <button type=\"button\" class=\"btn btn-danger\" click=",
        ">Danger</button>\n      <button type=\"button\" class=\"btn btn-warning\" click=",
        ">Warning</button>\n      <button type=\"button\" class=\"btn btn-info\">Info</button>\n      <button type=\"button\" class=\"btn btn-light\">Light</button>\n      <button type=\"button\" class=\"btn btn-dark\" click=",
        ">Reverse</button>  \n      <button type=\"button\" class=\"btn btn-link\">Link</button>  \n    </div>\n    ", "\n    ", "\n    ", "\n    ", "\n "])), state.warning ? index_1.html(templateObject_16 || (templateObject_16 = __makeTemplateObject(["\n    Example warning:\n    <div class=\"alert alert-warning\" role=\"alert\">\n      ", "\n    </div>\n    "], ["\n    Example warning:\n    <div class=\"alert alert-warning\" role=\"alert\">\n      ", "\n    </div>\n    "])), state.warning) : index_1.html(templateObject_17 || (templateObject_17 = __makeTemplateObject([""], [""]))), function (_) {
        index_1.setState({ warning: '' });
    }, function (_) {
        var s = index_1.getState();
        s.items.splice(0, 1);
        index_1.setState({});
    }, function (_) {
        index_1.setState({ warning: 'I Give you a warning here!!!' });
    }, function (_) {
        index_1.setState({ items: index_1.getState().items.reverse() });
    }, index_1.html(templateObject_18 || (templateObject_18 = __makeTemplateObject(["abc", "efg"], ["abc", "efg"])), index_1.html(templateObject_19 || (templateObject_19 = __makeTemplateObject(["<div>Deep Div</div>"], ["<div>Deep Div</div>"])))), counter & 1 ? (new Date()).toString() : index_1.html(templateObject_20 || (templateObject_20 = __makeTemplateObject([" <div>OK1?</div> <div>OK2?</div> "], [" <div>OK1?</div> <div>OK2?</div> "]))), counter & 1 ? 'Alternative text...' : helloComp, index_1.getState().items.map(function (item) { return index_1.html(templateObject_21 || (templateObject_21 = __makeTemplateObject(["<div>...", "</div>"], ["<div>...", "</div>"])), item.name); }));
}
function testBox(txt, value) {
    return index_1.html(templateObject_22 || (templateObject_22 = __makeTemplateObject(["\n  <div style=\"width:200px;float:left\">\n    <div>", "</div>\n    ", "\n  </div>  \n  "], ["\n  <div style=\"width:200px;float:left\">\n    <div>", "</div>\n    ", "\n  </div>  \n  "])), txt, value);
}
// ${ counter & 1 ? 'Alternative text...' : helloComp}
//  ${ counter & 1 ? 'Array OR' : getState().items.map( item => html`<div>ARRAY ${item.name}</div>`)}
var counter = 0;
var helloComp2 = new Hello();
Doremifa.mount(document.body, function (state) { return index_1.html(templateObject_23 || (templateObject_23 = __makeTemplateObject(["\n", "\n<div class=\"container\">\n  <!-- Content here -->\n  <div>\n    <input/>\n    ", "\n  </div>\n  ", "\n</div>\n", "\n", "\n", "\n", "\n\n"], ["\n", "\n<div class=\"container\">\n  <!-- Content here -->\n  <div>\n    <input/>\n    ", "\n  </div>\n  ",
    "\n</div>\n", "\n", "\n", "\n", "\n\n"])), state.items.map(function (item, idx) { return idx & 1 ? index_1.html(templateObject_24 || (templateObject_24 = __makeTemplateObject(["<b>", "</b>"], ["<b>", "</b>"])), item.name) : 'Hello ' + item.name; }), state.items.map(function (item, idx) { return idx & 1 ? index_1.html(templateObject_25 || (templateObject_25 = __makeTemplateObject(["<b>", "</b>"], ["<b>", "</b>"])), item.name) : 'Hello ' + item.name; }), index_1.router({
    default: frontpage,
    buttons: buttons,
    jumbo: jumbo,
}), testBox('Test from TXT -> array', Math.floor(counter) & 1 ? 'TXT' : index_1.getState().items.map(function (item) { return index_1.html(templateObject_26 || (templateObject_26 = __makeTemplateObject(["<div>...", "</div>"], ["<div>...", "</div>"])), item.name); })), testBox('Test from html -> array', Math.floor(counter) & 1 ? index_1.html(templateObject_27 || (templateObject_27 = __makeTemplateObject(["<div><b>DIV</b></div>"], ["<div><b>DIV</b></div>"]))) : index_1.getState().items.map(function (item) { return index_1.html(templateObject_28 || (templateObject_28 = __makeTemplateObject(["<div>...", "</div>"], ["<div>...", "</div>"])), item.name); })), testBox('Test from static array -> array', Math.floor(counter) & 1 ? [1, '+', 2, index_1.html(templateObject_29 || (templateObject_29 = __makeTemplateObject(["<b>== 10</b>"], ["<b>== 10</b>"])))] : index_1.getState().items.map(function (item) { return index_1.html(templateObject_30 || (templateObject_30 = __makeTemplateObject(["<div>...", "</div>"], ["<div>...", "</div>"])), item.name); })), testBox('Test from Object -> array', Math.floor(counter) & 1 ? helloComp2 : index_1.getState().items.map(function (item) { return index_1.html(templateObject_31 || (templateObject_31 = __makeTemplateObject(["<div>...", "</div>"], ["<div>...", "</div>"])), item.name); }))); });
timers_1.setInterval(function (_) {
    counter++;
    index_1.setState({});
}, 5000);
var templateObject_2, templateObject_3, templateObject_1, templateObject_4, templateObject_6, templateObject_5, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_14, templateObject_13, templateObject_16, templateObject_17, templateObject_19, templateObject_18, templateObject_20, templateObject_21, templateObject_15, templateObject_22, templateObject_24, templateObject_25, templateObject_26, templateObject_27, templateObject_28, templateObject_29, templateObject_30, templateObject_31, templateObject_23;
/*
// mount application into some node
Doremifa.mount(document.body,
 (state) =>
    html`Fooo...

  <div>${state.time}</div>
  <!-- navigation -->
  <a href="#">Default</a>
  <a href="#itemlist">Show List</a>
  <a href="#page2">Show Page 2</a>
  ${Doremifa.router({
  
    default : (state) => html`
<div>
  <hr><br><br>
  This is the default route. Click show list to edit list of items.
  Currently the list of items is ${state
    .items.map( (item,i) =>
               html`${i > 0 ? ', ' : ''} ${item.name}`)}
  <div>
    ${state.items.length === 4 ? 'Four' : html`<b>NOT FOUR!</b>`}
  </div>
</div>
    `,

    // route for #page2
    page2 : () =>html`
  <h2>Route for page 2</h2>
  <hr>
  <div>
    The state is now
    <pre>${JSON.stringify(state,null,2)}</pre>
  </div>
`,
  
    // route for #itemlist
    itemlist : () =>
      html`
        <h2>Items</h2>
        <button click=${add_item}>+ item</button>
        <div>
          ${state.items.map( item =>
            html`<div>${item.name}<a href=${`#details/id/${item.id}`}>Edit</div>`)}
        </div>
      `,
  
    // route for #details/id/xxxx
    details(state) {
      const item = state
        .items.filter( item => item.id == state.params.id).pop()
      return html`<h2>Item ${item.id}</h2>
        <input value=${item.name} id="name">
        <button click=${(e,tpl)=>{
          item.name = tpl.ids.name.value
          window.location.hash = "#itemlist"
        }}>Save</button>
        <button click=${_ => {
          delete_item(item)
          window.location.hash = "#itemlist"
        }}>Delete</button>
      `
     }
    })}

`
 )
*/
// update the clock
/*
setInterval( _ => {
  setState({time:(new Date).toTimeString()})
},1000)
*/
/*
mount( document.body, (state) => {
  return html`

  <header class="mui-appbar mui--z1">
  <div class="mui-container">
    <table>
      <tr class="mui--appbar-height">
        <td class="mui--text-title">Brand.io</td>
        <td class="mui--text-right">
          <ul class="mui-list--inline mui--text-body2">
            <li><a href="#">About</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Login</a></li>
          </ul>
        </td>
      </tr>
    </table>
  </div>
  </header>
  <!-- the actual page content comes in here -->
  <div id="content-wrapper" class="mui--text-center">
    <div class="mui--appbar-height"></div>
    <br>
    <br>
    <div class="mui--text-display3">Brand.io ... comment ?? </div>
    <br>
    <br>
    <button class="mui-btn mui-btn--raised">Get started</button>
    <!--
    <img width="200" height="200" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/1200px-Wikipedia-logo-v2.svg.png">
    -->
  </div>
  <footer>
    <div class="mui-container mui--text-center mui--text-bottom">
      Made with ♥ by <a href="https://www.muicss.com">MUICSS</a>
    </div>
  </footer>
  
  `
})
*/
// setTimeout(add100Tasks,100)
// setInterval( _ => setState({}), 20)

},{"./index":2,"timers":5}],2:[function(require,module,exports){
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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var xmlparser_1 = require("./xmlparser");
var drfmKey = /** @class */ (function () {
    function drfmKey() {
    }
    return drfmKey;
}());
exports.drfmKey = drfmKey;
function key(value) {
    var o = new drfmKey;
    o.value = typeof value === 'string' ? value : value + '';
    return o;
}
exports.key = key;
var svgNS = "http://www.w3.org/2000/svg";
var tickFunctions = [];
var drmfComponent = /** @class */ (function () {
    function drmfComponent() {
    }
    drmfComponent.prototype.tpl = function () {
        return this.lastRender;
    };
    drmfComponent.prototype.render = function () {
        return exports.drmf(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<div>Hello World</div>"], ["<div>Hello World</div>"])));
    };
    return drmfComponent;
}());
exports.drmfComponent = drmfComponent;
var drmfTemplateCollection = /** @class */ (function () {
    function drmfTemplateCollection() {
    }
    drmfTemplateCollection.prototype.refreshFrom = function (tpls) {
        var curr_collection = this;
        var curr_tpls = curr_collection.list;
        var prevNode = curr_collection.node;
        var len = Math.max(tpls.length, curr_tpls.length);
        if (len === 0)
            return;
        if (tpls.length === 0) {
            for (var _i = 0, curr_tpls_1 = curr_tpls; _i < curr_tpls_1.length; _i++) {
                var t = curr_tpls_1[_i];
                t.removeBaseNodes();
            }
            curr_collection.list = [];
            return;
        }
        var ii = 0;
        var list = [];
        for (var ii_1 = 0; ii_1 < len; ii_1++) {
            var ct = curr_tpls[ii_1];
            var rt = tpls[ii_1];
            if (ct && rt) {
                var p = ct.replaceWith(rt);
                list[ii_1] = p;
                prevNode = p.getLastNode(); // p.rootNodes[p.rootNodes.length - 1]
                continue;
            }
            if (ct && !rt) {
                ct.removeBaseNodes();
                // ct.rootNodes.forEach( n => n.parentNode.removeChild(n))                              
                continue;
            }
            if (!ct && rt) {
                if (rt.rootNodes.length === 0)
                    rt.createDOM();
                rt.addAt(prevNode.parentNode, prevNode.nextSibling);
                list[ii_1] = rt;
                prevNode = rt.getLastNode();
                continue;
            }
        }
        curr_collection.list = list;
    };
    return drmfTemplateCollection;
}());
exports.drmfTemplateCollection = drmfTemplateCollection;
var drmfTemplate = /** @class */ (function () {
    function drmfTemplate() {
        this.children = {};
        this.doms = {};
        this.rootNodes = [];
        // to get all the root nodes
        this.baseNodes = [];
        this.slotTypes = [];
        this.ids = {};
        this.list = {};
    }
    drmfTemplate.prototype.onReady = function (fn) {
        this._ready = fn;
        return this;
    };
    drmfTemplate.prototype.getFirstNode = function () {
        var n = this.baseNodes[0];
        if (Array.isArray(n)) {
            return n[0];
        }
        if (n instanceof drmfTemplate) {
            return n.getFirstNode();
        }
        if (n instanceof drmfTemplateCollection) {
            return n.node;
        }
    };
    drmfTemplate.prototype.getLastNode = function () {
        if (this.baseNodes.length == 0)
            return null;
        var n = this.baseNodes[this.baseNodes.length - 1];
        if (Array.isArray(n)) {
            return n[n.length - 1];
        }
        if (n instanceof drmfTemplate) {
            return n.getLastNode();
        }
        if (n instanceof drmfTemplateCollection) {
            if (n.list.length == 0)
                return n.node;
            return n.list[n.list.length - 1].getLastNode();
        }
    };
    drmfTemplate.prototype.addAt = function (parentNode, before) {
        for (var _i = 0, _a = this.baseNodes; _i < _a.length; _i++) {
            var n = _a[_i];
            if (Array.isArray(n)) {
                for (var _b = 0, n_1 = n; _b < n_1.length; _b++) {
                    var node = n_1[_b];
                    parentNode.insertBefore(node, before);
                }
                continue;
            }
            if (n instanceof drmfTemplate) {
                n.addAt(parentNode, before);
            }
            if (n instanceof drmfTemplateCollection) {
                if (n.node)
                    parentNode.insertBefore(n.node, before);
                for (var _c = 0, _d = n.list; _c < _d.length; _c++) {
                    var el = _d[_c];
                    el.addAt(parentNode, before);
                }
            }
        }
    };
    drmfTemplate.prototype.removeBaseNodes = function () {
        for (var _i = 0, _a = this.baseNodes; _i < _a.length; _i++) {
            var n = _a[_i];
            if (Array.isArray(n)) {
                for (var _b = 0, n_2 = n; _b < n_2.length; _b++) {
                    var node = n_2[_b];
                    node.parentNode.removeChild(node);
                }
                continue;
            }
            if (n instanceof drmfTemplate) {
                n.removeBaseNodes();
            }
            if (n instanceof drmfTemplateCollection) {
                // remove the placeholder node...
                if (n.node && n.node.parentNode)
                    n.node.parentNode.removeChild(n.node);
                for (var _c = 0, _d = n.list; _c < _d.length; _c++) {
                    var el = _d[_c];
                    el.removeBaseNodes();
                }
            }
        }
    };
    drmfTemplate.prototype.replaceWith = function (renderedTpl) {
        if (this.key == renderedTpl.key) {
            // The problem is here, the update values will update root elements...
            this.updateValues(renderedTpl.values);
            return this;
        }
        // creates the nodes...
        renderedTpl.createDOM();
        var fNode = this.getFirstNode();
        // get the first render template node...
        renderedTpl.addAt(fNode.parentNode, fNode);
        this.removeBaseNodes();
        return renderedTpl;
    };
    drmfTemplate.prototype.updateValues = function (values) {
        for (var i = 0; i < values.length; i++) {
            var value = values[i];
            if (typeof (value) === 'undefined')
                continue;
            var last_slot = this.slotTypes[i];
            if (!last_slot)
                continue;
            var last_type = last_slot[0];
            var last_root = last_slot[1];
            // assuming now that the type stays the same...
            switch (last_type) {
                case 1:
                    var name_1 = last_slot[2];
                    var is_svg = last_slot[4];
                    if (value === 'false' || value === 'true') {
                        var t = value === 'true';
                        if (t) {
                            if (is_svg) {
                                last_root.setAttributeNS(null, name_1, '');
                            }
                            else {
                                last_root.setAttribute(name_1, '');
                            }
                        }
                        else {
                            last_root.removeAttribute(name_1);
                        }
                    }
                    else {
                        if (is_svg) {
                            last_root.setAttributeNS(null, name_1, value);
                        }
                        else {
                            last_root.setAttribute(name_1, value);
                        }
                    }
                    break;
                // last node was drmfTemplate
                case 2:
                    // simple content template was the last type...
                    var currTpl = last_slot[2];
                    var nodes = currTpl.rootNodes;
                    var local_value = value;
                    if (Array.isArray(value)) {
                        local_value = html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["", ""], ["", ""])), value);
                    }
                    if (local_value instanceof drmfTemplate) {
                        var renderedTpl = local_value;
                        this.slotTypes[i][2] = currTpl.replaceWith(renderedTpl);
                        if (typeof (this.baseNodes[i * 2 + 1]) !== 'undefined')
                            this.baseNodes[i * 2 + 1] = this.slotTypes[i][2];
                    }
                    if (value instanceof drmfComponent) {
                        // render the situation now...
                        var renderedComp = value;
                        var rTpl = renderedComp.render();
                        var newTpl = currTpl.replaceWith(rTpl);
                        this.slotTypes[i] = [2, last_root, newTpl, newTpl.rootNodes];
                        if (typeof (this.baseNodes[i * 2 + 1]) !== 'undefined')
                            this.baseNodes[i * 2 + 1] = newTpl;
                    }
                    // transform into txt node
                    if (typeof (value) == 'string') {
                        var txt = document.createTextNode(value);
                        var first = currTpl.getFirstNode();
                        first.parentNode.insertBefore(txt, first);
                        currTpl.removeBaseNodes();
                        this.slotTypes[i] = [3, first.parentNode, txt];
                        if (typeof (this.baseNodes[i * 2 + 1]) !== 'undefined')
                            this.baseNodes[i * 2 + 1] = [txt];
                    }
                    break;
                // last node was text node
                case 3:
                    var text_node = last_slot[2];
                    if (typeof (value) == 'string') {
                        text_node.textContent = value;
                    }
                    var v = value;
                    if (Array.isArray(value)) {
                        v = html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["", ""], ["", ""])), value);
                    }
                    if (v instanceof drmfTemplate) {
                        v.createDOM();
                        v.addAt(text_node.parentNode, text_node);
                        text_node.parentNode.removeChild(text_node);
                        this.slotTypes[i] = [2, last_root, v];
                        // if the slot is base slot...
                        if (typeof (this.baseNodes[i * 2 + 1]) !== 'undefined')
                            this.baseNodes[i * 2 + 1] = v;
                    }
                    if (v instanceof drmfComponent) {
                        var comp = v;
                        var tpl = comp.render();
                        tpl.createDOM();
                        tpl.addAt(text_node.parentNode, text_node);
                        text_node.parentNode.removeChild(text_node);
                        this.slotTypes[i] = [5, last_root, comp, tpl];
                        if (typeof (this.baseNodes[i * 2 + 1]) !== 'undefined')
                            this.baseNodes[i * 2 + 1] = tpl;
                    }
                    break;
                // last node was drmfTemplateCollection
                case 4:
                    var items = Array.isArray(value) ? value : [html(templateObject_4 || (templateObject_4 = __makeTemplateObject(["", ""], ["", ""])), value)];
                    var tpls = items.map(function (item) {
                        if (item instanceof drmfTemplate)
                            return item;
                        return html(templateObject_5 || (templateObject_5 = __makeTemplateObject(["", ""], ["", ""])), item);
                    });
                    var curr_collection = last_slot[2];
                    curr_collection.refreshFrom(tpls);
                    break;
                // last node was drmfComponent        
                case 5:
                    var local_tpl = value;
                    if (Array.isArray(value)) {
                        local_tpl = html(templateObject_6 || (templateObject_6 = __makeTemplateObject(["", ""], ["", ""])), value);
                    }
                    if (typeof (value) == 'string') {
                        var tplNow = last_slot[3];
                        var txt = document.createTextNode(value);
                        var first = tplNow.getFirstNode();
                        first.parentNode.insertBefore(txt, first);
                        tplNow.removeBaseNodes();
                        this.slotTypes[i] = [3, first.parentNode, txt];
                        if (typeof (this.baseNodes[i * 2 + 1]) !== 'undefined')
                            this.baseNodes[i * 2 + 1] = [txt];
                    }
                    if (local_tpl instanceof drmfTemplate) {
                        var comp = last_slot[2];
                        var tplNow = last_slot[3];
                        var tpl_nodes = tplNow.rootNodes;
                        var rTpl = local_tpl;
                        var newTpl = tplNow.replaceWith(rTpl);
                        this.slotTypes[i] = [2, last_root, newTpl, newTpl.rootNodes];
                        if (typeof (this.baseNodes[i * 2 + 1]) !== 'undefined')
                            this.baseNodes[i * 2 + 1] = local_tpl;
                    }
                    if (value instanceof drmfComponent) {
                        var comp = last_slot[2];
                        var tplNow = last_slot[3];
                        var tpl_nodes = tplNow.rootNodes;
                        // render the situation now...
                        var renderedComp = value;
                        var rTpl = renderedComp.render();
                        var newTpl = tplNow.replaceWith(rTpl);
                        if (newTpl === rTpl) {
                            this.slotTypes[i][2] = renderedComp;
                            this.slotTypes[i][3] = newTpl;
                        }
                        if (typeof (this.baseNodes[i * 2 + 1]) !== 'undefined')
                            this.baseNodes[i * 2 + 1] = newTpl;
                    }
                    break;
            }
        }
    };
    drmfTemplate.prototype.createDOM = function () {
        var _this = this;
        var parser = new xmlparser_1.XMLParser(this.valuestream);
        var eof = false;
        var nodetree = [];
        var activeNode;
        var is_svg = false;
        var me = this;
        var callbacks = {
            beginNode: function (name, index) {
                var new_node;
                switch (name) {
                    case "svg":
                        new_node = document.createElementNS(svgNS, "svg");
                        is_svg = true;
                        break;
                    // TODO: add full set of SVG elements
                    case "g":
                    case "rect":
                    case "path":
                    case "image":
                    case "line":
                    case "ellipse":
                    case "circle":
                        is_svg = true;
                    default:
                        if (is_svg) {
                            new_node = document.createElementNS(svgNS, name);
                        }
                        else {
                            new_node = document.createElement(name);
                        }
                }
                if (activeNode instanceof Node && activeNode) {
                    activeNode.appendChild(new_node);
                }
                else {
                    me.rootNodes.push(new_node);
                    if (!me.baseNodes[index])
                        me.baseNodes[index] = [];
                    me.baseNodes[index].push(new_node);
                }
                activeNode = new_node;
                nodetree.push(new_node);
            },
            setAttribute: function (name, value, index) {
                if (!activeNode)
                    return;
                if (value instanceof drfmKey) {
                    return;
                }
                if (index & 1) {
                    me.slotTypes[(index - 1) >> 1] = [1, activeNode, name, value, is_svg];
                }
                if (typeof (value) == 'function') {
                    if (activeNode instanceof Node) {
                        activeNode.addEventListener(name, function (e) {
                            value(e, me);
                        });
                    }
                    if (activeNode instanceof drmfComponent) {
                        activeNode.addEventListener(name, value);
                    }
                    return;
                }
                var node = activeNode;
                if (is_svg) {
                    if (value === 'false' || value === 'true') {
                        var t = value === 'true';
                        if (t) {
                            node.setAttributeNS(null, name, '');
                        }
                    }
                    else {
                        node.setAttributeNS(null, name, value);
                    }
                }
                else {
                    if (value === 'false' || value === 'true') {
                        var t = value === 'true';
                        if (t) {
                            node.setAttribute(name, '');
                        }
                    }
                    else {
                        node.setAttribute(name, value);
                    }
                }
                if (name === 'id')
                    me.ids[value] = node;
                if (name === 'list') {
                    if (!me.list[value])
                        me.list[value] = [];
                    me.list[value].push(node);
                }
            },
            closeNode: function (name) {
                if (name == 'svg') {
                    is_svg = false;
                }
                nodetree.pop();
                if (nodetree.length > 0) {
                    activeNode = nodetree[nodetree.length - 1];
                }
                else {
                    activeNode = null;
                }
            },
            addTextNode: function (value, index) {
                if (value instanceof drfmKey) {
                    return;
                }
                var append = function (new_node) {
                    if (activeNode) {
                        activeNode.appendChild(new_node);
                    }
                    else {
                        me.rootNodes.push(new_node);
                    }
                };
                if (index & 1) {
                    if (value instanceof drmfTemplate) {
                        var tpl = value;
                        var items = tpl.createDOM();
                        var snodes = [];
                        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                            var it = items_1[_i];
                            append(it);
                            snodes.push(it);
                        }
                        // render template
                        me.slotTypes[(index - 1) >> 1] = [2, activeNode, tpl, snodes];
                        if (!activeNode)
                            me.baseNodes[index] = tpl;
                        return;
                    }
                    if (value instanceof drmfComponent) {
                        var comp = value;
                        var tpl = comp.render();
                        var items = tpl.createDOM();
                        var snodes = [];
                        for (var _a = 0, items_2 = items; _a < items_2.length; _a++) {
                            var it = items_2[_a];
                            append(it);
                            snodes.push(it);
                        }
                        // render template
                        me.slotTypes[(index - 1) >> 1] = [5, activeNode, comp, tpl, snodes];
                        if (!activeNode)
                            me.baseNodes[index] = tpl;
                        return;
                    }
                    if (Array.isArray(value)) {
                        var coll = new drmfTemplateCollection;
                        var txtV = document.createTextNode('');
                        coll.node = txtV;
                        append(txtV);
                        var tpls = value.map(function (item) {
                            if (item instanceof drmfTemplate)
                                return item;
                            return html(templateObject_7 || (templateObject_7 = __makeTemplateObject(["", ""], ["", ""])), item);
                        });
                        coll.list = tpls;
                        var snodes = [];
                        for (var idx = 0; idx < tpls.length; idx++) {
                            var cont = tpls[idx];
                            var items = cont.createDOM();
                            for (var _b = 0, items_3 = items; _b < items_3.length; _b++) {
                                var it = items_3[_b];
                                append(it);
                                snodes.push(it);
                            }
                        }
                        me.slotTypes[(index - 1) >> 1] = [4, activeNode, coll, null];
                        if (!activeNode)
                            me.baseNodes[index] = coll;
                        return;
                    }
                }
                // the inserted text could be parsed...
                var v = value;
                if (!isNaN(v))
                    v = v + '';
                var txt = document.createTextNode(v);
                if (index & 1) {
                    // render text
                    me.slotTypes[(index - 1) >> 1] = [3, activeNode, txt];
                }
                if (!activeNode) {
                    if (!me.baseNodes[index])
                        me.baseNodes[index] = [];
                    me.baseNodes[index].push(txt);
                    me.rootNodes.push(txt);
                    return;
                }
                activeNode.appendChild(txt);
            },
            eof: function () {
                eof = true;
            }
        };
        var max_cnt = 100000;
        while (!parser.eof) {
            parser.parse(callbacks);
            if (max_cnt-- < 0)
                break;
        }
        if (this._ready) {
            tickFunctions.push(function () {
                _this._ready(_this);
            });
        }
        return this.rootNodes;
    };
    drmfTemplate.prototype.renderTemplate = function () {
        var parts = [];
        var s = "", i = 0, pcnt = 0;
        for (; i < this.values.length; i++) {
            parts.push(this.strings[i]);
            parts.push("<div placeholder=\"" + pcnt++ + "\" list=\"placeholders\"></div>");
        }
        parts.push(this.strings[i]);
        this.templateStr = parts.join('');
        this.templateDom = this.createDOM();
    };
    return drmfTemplate;
}());
exports.drmfTemplate = drmfTemplate;
function html(strings) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var t = new drmfTemplate();
    t.key = strings.join('&');
    t.strings = strings;
    t.values = values.map(function (value) {
        if (typeof (value) === 'undefined')
            return '';
        if (!isNaN(value) && (!Array.isArray(value)))
            return value.toString();
        return value;
    });
    var kk = t.values.filter(function (_) { return _ instanceof drfmKey; }).map(function (_) { return 'key=' + _.value; }).join('&');
    t.key = t.key + kk;
    var len = strings.length + values.length;
    t.valuestream = new Array(len);
    var i = 0, si = 0, vi = 0;
    while (i < len) {
        t.valuestream[i] = i & 1 ? t.values[vi++] : t.strings[si++];
        i++;
    }
    return t;
}
exports.html = html;
exports.drmf = html;
// the application state for doremifa
var app = {
    state: {
        page: '',
        params: {},
    }
};
function getState() {
    return app.state;
}
exports.getState = getState;
function setState(state) {
    try {
        app.state = __assign({}, app.state, state);
    }
    catch (e) {
    }
}
exports.setState = setState;
function reduce(reducer) {
    try {
        app.state = __assign({}, app.state, reducer(app.state));
    }
    catch (e) {
    }
}
exports.reduce = reduce;
var drmfRouter = /** @class */ (function (_super) {
    __extends(drmfRouter, _super);
    function drmfRouter(routes) {
        var _this = _super.call(this) || this;
        _this.routemap = routes;
        return _this;
    }
    drmfRouter.prototype.render = function () {
        var routermap = this.routemap;
        var page_name = app.state.page || 'default';
        var page = routermap[app.state.page || 'default'] || (page_name = 'default', routermap.default);
        var phase = 'refresh';
        if (page) {
            if (page_name != app.last_page_name) {
                var last_page = routermap[app.last_page_name];
                phase = 'init';
            }
            app.last_page_name = page_name;
            return page(__assign({}, app.state, { phase: phase }));
        }
        return exports.drmf(templateObject_8 || (templateObject_8 = __makeTemplateObject(["<div></div>"], ["<div></div>"])));
    };
    return drmfRouter;
}(drmfComponent));
function router(routermap) {
    return new drmfRouter(routermap);
}
exports.router = router;
var b_render_on = false;
var last_state;
var register_hash = function () {
    var parts = window.location.hash.substring(1).split('/');
    var name = parts.shift();
    var params = {};
    for (var i = 0; i < parts.length; i += 2) {
        params[parts[i]] = parts[i + 1];
    }
    app.state = __assign({}, app.state, { page: name, params: params });
};
var interval = null;
var current_node = null;
var is_registered = false;
var last_items = null;
var lastTpl;
// initialize app using init function...
function mount(root, comp, 
// renderFn : (state:any) => Promise<drmfTemplate>, 
state, options) {
    var _this = this;
    if (!app.is_registered) {
        app.is_registered = true;
        register_hash();
        window.addEventListener("hashchange", register_hash, false);
    }
    if (interval)
        clearInterval(interval);
    var update_delay = (options && options.updateInterval) || 100;
    var retry_cnt = 0;
    if (state)
        app.state = __assign({}, app.state, state);
    var update_application = function () { return __awaiter(_this, void 0, void 0, function () {
        var tpl, _i, tickFunctions_1, f;
        return __generator(this, function (_a) {
            if (b_render_on && (retry_cnt < 5)) {
                retry_cnt++;
                return [2 /*return*/];
            }
            retry_cnt = 0;
            try {
                if (last_state != app.state) {
                    last_state = app.state;
                    b_render_on = true;
                    tpl = void 0;
                    if (typeof (comp) == 'function') {
                        tpl = comp(app.state);
                    }
                    if (comp instanceof drmfComponent) {
                        tpl = comp.render();
                    }
                    if (tpl) {
                        if (lastTpl) {
                            lastTpl = lastTpl.replaceWith(tpl);
                        }
                        else {
                            tpl.createDOM();
                            tpl.addAt(root, root.lastChild);
                            lastTpl = tpl;
                        }
                    }
                    b_render_on = false;
                }
            }
            catch (e) {
                console.error(e);
            }
            window.requestAnimationFrame(update_application);
            for (_i = 0, tickFunctions_1 = tickFunctions; _i < tickFunctions_1.length; _i++) {
                f = tickFunctions_1[_i];
                if (f)
                    f();
            }
            tickFunctions.length = 0;
            return [2 /*return*/];
        });
    }); };
    window.requestAnimationFrame(update_application);
    // interval = setInterval( update_application, update_delay);
}
exports.mount = mount;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;

},{"./xmlparser":3}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
function createDetector(strs) {
    var cached_detectors = new Array(256);
    function cacheDetector(str) {
        var cache_index = str.charCodeAt(0);
        if (!cached_detectors[cache_index])
            cached_detectors[cache_index] = [];
        cached_detectors[cache_index].push(function (buff, index) {
            if ((buff.length - index) < str.length)
                return false;
            for (var i = 0; i < str.length; i++) {
                if (str.charCodeAt(i) != buff.charCodeAt(index + i))
                    return false;
            }
            return true;
        });
    }
    for (var _i = 0, strs_1 = strs; _i < strs_1.length; _i++) {
        var s = strs_1[_i];
        cacheDetector(s);
    }
    return function (buff, index) {
        var detectors = cached_detectors[buff.charCodeAt(index)];
        if (detectors) {
            for (var _i = 0, detectors_1 = detectors; _i < detectors_1.length; _i++) {
                var fn = detectors_1[_i];
                if (fn(buff, index))
                    return true;
            }
        }
        return false;
    };
}
var isSelfClosingTag = createDetector(['area',
    'base',
    'br',
    'col',
    'command',
    'embd',
    'hr',
    'img',
    'input',
    'keygen ',
    'link',
    'menuitem',
    'meta',
    'param',
    'source',
    'track',
    'wbr',
]);
var isCommentStart = createDetector(['<!--']);
var isCommentEnd = createDetector(['-->']);
var XMLParser = /** @class */ (function () {
    function XMLParser(initWith) {
        this.__len = 0;
        this.buff_index = 0;
        this.used_index = 0;
        this.parents = [];
        this.tag_depth = 0;
        this.i = 0;
        this.eof = false;
        this.last_finished = null;
        this.in_tagdef = false;
        this.is_selfclosing = false;
        this.last_tag_name = '';
        this.buffers = initWith;
        this.buff = initWith[0];
        this.i = 0;
        this.buff_index = 0;
        this.used_index = 0;
        this.eof = false;
        if (typeof (this.buff) === 'undefined')
            this.eof = true;
    }
    XMLParser.prototype.code = function (index) {
        if ((this.buff_index & 1) && typeof (this.buff) != 'string') {
            return 0;
        }
        if (this.buff.length <= this.i + index) {
            var next = this.buffers[this.buff_index + 1];
            if (typeof (next) != 'string') {
                return 0;
            }
            if (next) {
                return next.charCodeAt(this.i + index - this.buff.length);
            }
            return 0;
        }
        return this.buff.charCodeAt(this.i + index);
    };
    XMLParser.prototype.here = function () {
        if (typeof (this.buff) != 'string')
            return 0;
        return this.buff.charCodeAt(this.i);
    };
    XMLParser.prototype.isValueBlock = function () {
        return ((this.buff_index & 1) === 1);
    };
    XMLParser.prototype.isHere = function (value) {
        return this.buff.charCodeAt(this.i) == value;
    };
    XMLParser.prototype.step = function (index) {
        this.i += index;
        this.used_index = this.buff_index;
        if (this.buff.length <= this.i) {
            this.i = this.i - this.buff.length;
            this.buff_index = this.buff_index + 1;
            this.used_index = this.buff_index;
            this.buff = this.buffers[this.buff_index];
            if (typeof (this.buff) === 'undefined') {
                this.eof = true;
                return 0;
            }
            else {
                if (typeof (this.buff) != 'string')
                    return 0;
                return this.buff.charCodeAt(0);
            }
        }
        return this.buff.charCodeAt(this.i);
    };
    XMLParser.prototype.stepBuffer = function () {
        this.buff_index = this.buff_index + 1;
        this.used_index = this.buff_index;
        this.buff = this.buffers[this.buff_index];
        this.i = 0;
        if (typeof (this.buff) === 'undefined') {
            this.eof = true;
        }
    };
    XMLParser.prototype.skipspace = function () {
        if (typeof (this.buff) != 'string')
            return;
        var c = this.here();
        while (!this.eof) {
            if (c > 32)
                break;
            c = this.step(1);
            var b = this.buff;
            if (b instanceof index_1.drfmKey) {
                this.stepBuffer();
            }
        }
    };
    XMLParser.prototype.isTagChar = function (c, first) {
        return (((c >= 65) && (c <= 90)) // A - Z
            || ((c >= 97) && (c <= 122)) // a - z
            || (c == 95) // _
            || (c == 58) // :
            || (!first && (c >= 48) && (c <= 57)) // 0 - 9
            || (!first && c == 46) // .
            || (!first && c == 45) // -
        );
    };
    // collects a name like div or attribute name ( a bit simplified version )
    XMLParser.prototype.collectXMLName = function () {
        var sp = this.i;
        var c = this.here();
        var first = true;
        var start_buff = this.buff;
        while (!this.eof && this.isTagChar(c, first)) {
            c = this.step(1);
            first = false;
        }
        if (start_buff == this.buff) {
            return this.buff.substring(sp, this.i);
        }
        return start_buff.substring(sp) + this.buff.substring(0, this.i);
    };
    XMLParser.prototype.colllectText = function () {
        if (this.isValueBlock()) {
            var v = this.buff;
            this.used_index = this.buff_index;
            this.buff_index++;
            this.buff = this.buffers[this.buff_index];
            if (typeof (this.buff) === 'undefined')
                this.eof = true;
            this.i = 0;
            return v;
        }
        var sp = this.i;
        var c1 = this.here();
        var c2 = this.code(1);
        var start_buff = this.buff;
        var curr_buff = this.buff;
        var intermediate = [];
        // read text as long as not <c... or </...
        while (!this.eof && (!(c1 == 60 && // "<"
            ((c2 == 47) || // "/"
                this.isTagChar(c2, true) || // valid tag char
                (c2 == 33)))) // <! comment start...
        ) {
            c1 = this.step(1);
            if (this.eof)
                break;
            c2 = this.code(1);
            if (curr_buff != this.buff) {
                // collect only 
                break;
                // intermediate.push(this.buff)
            }
            curr_buff = this.buff;
        }
        if (start_buff == this.buff) {
            return this.buff.substring(sp, this.i);
        }
        return start_buff.substring(sp);
    };
    XMLParser.prototype.skipUntil = function (fn) {
        var curr_buff = this.buff;
        while ((false === fn(this.buff, this.i)) && !this.eof) {
            this.step(1);
            if (curr_buff != this.buff) {
                if (this.isValueBlock()) {
                    this.stepBuffer();
                }
            }
            curr_buff = this.buff;
        }
    };
    XMLParser.prototype.collectUntil = function (value) {
        var sp = this.i;
        var c = this.here();
        var start_buff = this.buff;
        var curr_buff = this.buff;
        var intermediate = [];
        while (c != value && !this.eof) {
            c = this.step(1);
            if (curr_buff != this.buff) {
                intermediate.push(this.buff);
            }
            curr_buff = this.buff;
        }
        if (start_buff == this.buff) {
            return this.buff.substring(sp, this.i);
        }
        intermediate.pop(); // remove last intermediate because it is this.buff
        return start_buff.substring(sp) + intermediate.join('') + this.buff.substring(0, this.i);
    };
    XMLParser.prototype.collectXMLAttributeValue = function () {
        this.skipspace();
        if (this.isHere(61)) {
            this.step(1);
            this.skipspace();
            // if the current buffer is...
            // setAttributeFunction
            if (typeof (this.buff) != 'string' || (this.isValueBlock())) {
                var v = this.buff;
                this.used_index = this.buff_index;
                this.buff_index++;
                this.buff = this.buffers[this.buff_index];
                if (typeof (this.buff) === 'undefined')
                    this.eof = true;
                return v;
            }
            var quoteChar = this.here();
            if (quoteChar == 34 || quoteChar == 39) {
                this.step(1);
                var value = this.collectUntil(quoteChar); // collect to the "
                this.step(1);
                return value;
            }
            else {
                return this.collectXMLName();
            }
        }
        return '';
    };
    // parse something that is meaningful imperatively and then create a callback
    XMLParser.prototype.parse = function (callback) {
        if (typeof (this.buff) === 'undefined') {
            this.eof = true;
            callback.eof();
            return;
        }
        var cc1 = 0;
        var cc2 = 0;
        while (!this.eof) {
            if (typeof (this.buff) === 'string' && this.buff.length === 0) {
                var idx = this.buff_index;
                callback.addTextNode('', idx);
                this.stepBuffer();
                continue;
            }
            cc1 = this.here();
            if (this.in_tagdef) {
                // <div  something = "..."
                this.skipspace();
                cc1 = this.here();
                // if tag ends immediately like <div/> or <br/>
                if (cc1 == 47) {
                    this.step(2);
                    this.in_tagdef = false;
                    callback.closeNode(this.last_tag_name, this.used_index);
                    return;
                }
                if (cc1 != 62) {
                    var name_1 = this.collectXMLName();
                    var value = this.collectXMLAttributeValue();
                    callback.setAttribute(name_1, value, this.used_index);
                    return;
                }
                // if ">", check if self closing
                if (this.is_selfclosing) {
                    // this.step(1)
                    // this.in_tagdef = false
                    callback.closeNode(this.last_tag_name, this.used_index);
                }
                this.step(1);
                this.in_tagdef = false;
                continue;
            }
            if (this.isValueBlock()) {
                var idx = this.buff_index;
                callback.addTextNode(this.colllectText(), idx);
                continue;
            }
            // <
            if (cc1 == 60) {
                cc2 = this.code(1);
                // </ tag is closing
                if (cc2 == 47) {
                    this.step(2);
                    var tag = this.collectXMLName();
                    this.step(1);
                    callback.closeNode(tag, this.used_index);
                    return;
                }
                if (this.isTagChar(cc2, true)) {
                    this.is_selfclosing = isSelfClosingTag(this.buff, this.i + 1);
                    this.step(1);
                    this.in_tagdef = true;
                    this.last_tag_name = this.collectXMLName();
                    callback.beginNode(this.last_tag_name, this.used_index);
                    return;
                }
                if (isCommentStart(this.buff, this.i)) {
                    this.skipUntil(isCommentEnd);
                    this.step(3); // -->
                    continue;
                }
            }
            // > the div can be closing....
            if (!this.eof) {
                var idx = this.buff_index;
                callback.addTextNode(this.colllectText(), idx);
            }
            return;
        }
        callback.eof();
    };
    return XMLParser;
}());
exports.XMLParser = XMLParser;

},{"./index":2}],4:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],5:[function(require,module,exports){
var nextTick = require('process/browser.js').nextTick;
var apply = Function.prototype.apply;
var slice = Array.prototype.slice;
var immediateIds = {};
var nextImmediateId = 0;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) { timeout.close(); };

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
  var id = nextImmediateId++;
  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

  immediateIds[id] = true;

  nextTick(function onNextTick() {
    if (immediateIds[id]) {
      // fn.call() is faster so we optimize for the common use-case
      // @see http://jsperf.com/call-apply-segu
      if (args) {
        fn.apply(null, args);
      } else {
        fn.call(null);
      }
      // Prevent ids from leaking
      exports.clearImmediate(id);
    }
  });

  return id;
};

exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
  delete immediateIds[id];
};
},{"process/browser.js":4}]},{},[1]);
