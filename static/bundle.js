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
// mount application into some node
Doremifa.mount(document.body, function (state) {
    return index_1.html(templateObject_11 || (templateObject_11 = __makeTemplateObject(["Fooo...\n\n  <div>", "</div>\n  <!-- navigation -->\n  <a href=\"#\">Default</a> \n  <a href=\"#itemlist\">Show List</a> \n  <a href=\"#page2\">Show Page 2</a>\n  ", "\n\n"], ["Fooo...\n\n  <div>", "</div>\n  <!-- navigation -->\n  <a href=\"#\">Default</a> \n  <a href=\"#itemlist\">Show List</a> \n  <a href=\"#page2\">Show Page 2</a>\n  ",
        "\n\n"])), state.time, Doremifa.router({
        default: function (state) { return index_1.html(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n<div>\n  <hr><br><br>\n  This is the default route. Click show list to edit list of items.\n  Currently the list of items is ", "\n  <div>\n    ", "\n  </div>\n</div>\n    "], ["\n<div>\n  <hr><br><br>\n  This is the default route. Click show list to edit list of items.\n  Currently the list of items is ",
            "\n  <div>\n    ", "\n  </div>\n</div>\n    "])), state
            .items.map(function (item, i) {
            return index_1.html(templateObject_13 || (templateObject_13 = __makeTemplateObject(["", " ", ""], ["", " ", ""])), i > 0 ? ', ' : '', item.name);
        }), state.items.length === 4 ? 'Four' : index_1.html(templateObject_14 || (templateObject_14 = __makeTemplateObject(["<b>NOT FOUR!</b>"], ["<b>NOT FOUR!</b>"])))); },
        // route for #page2 
        page2: function () { return index_1.html(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n  <h2>Route for page 2</h2>\n  <hr>\n  <div>\n    The state is now \n    <pre>", "</pre>\n  </div>\n"], ["\n  <h2>Route for page 2</h2>\n  <hr>\n  <div>\n    The state is now \n    <pre>", "</pre>\n  </div>\n"])), JSON.stringify(state, null, 2)); },
        // route for #itemlist
        itemlist: function () {
            return index_1.html(templateObject_16 || (templateObject_16 = __makeTemplateObject(["\n        <h2>Items</h2>\n        <button click=", ">+ item</button>\n        <div>\n          ", "\n        </div>\n      "], ["\n        <h2>Items</h2>\n        <button click=", ">+ item</button>\n        <div>\n          ",
                "\n        </div>\n      "])), add_item, state.items.map(function (item) {
                return index_1.html(templateObject_17 || (templateObject_17 = __makeTemplateObject(["<div>", "<a href=", ">Edit</div>"], ["<div>", "<a href=", ">Edit</div>"])), item.name, "#details/id/" + item.id);
            }));
        },
        // route for #details/id/xxxx  
        details: function (state) {
            var item = state
                .items.filter(function (item) { return item.id == state.params.id; }).pop();
            return index_1.html(templateObject_18 || (templateObject_18 = __makeTemplateObject(["<h2>Item ", "</h2>\n        <input value=", " id=\"name\">\n        <button click=", ">Save</button>\n        <button click=", ">Delete</button>\n      "], ["<h2>Item ", "</h2>\n        <input value=", " id=\"name\">\n        <button click=",
                ">Save</button>\n        <button click=",
                ">Delete</button>\n      "])), item.id, item.name, function (e, tpl) {
                item.name = tpl.ids.name.value;
                window.location.hash = "#itemlist";
            }, function (_) {
                delete_item(item);
                window.location.hash = "#itemlist";
            });
        }
    }));
});
var templateObject_2, templateObject_3, templateObject_1, templateObject_4, templateObject_6, templateObject_5, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_13, templateObject_14, templateObject_12, templateObject_15, templateObject_17, templateObject_16, templateObject_18, templateObject_11;
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

},{"./index":2}],2:[function(require,module,exports){
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
    drmfComponent.prototype.toDom = function () {
        var tpl = this.render();
        // if not rendered at all or different template
        if (!this.lastRender || (this.lastRender.key != tpl.key)) {
            var elems = tpl.createDOM();
            this.lastRender = tpl;
            return elems;
        }
        var last = this.lastRender;
        last.updateValues(tpl.values);
        // TODO: does not work always, root nodes can change
        return last.rootNodes;
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
    return drmfTemplateCollection;
}());
exports.drmfTemplateCollection = drmfTemplateCollection;
var drmfTemplate = /** @class */ (function () {
    function drmfTemplate() {
        this.children = {};
        this.doms = {};
        this.rootNodes = [];
        this.slotTypes = [];
        this.ids = {};
        this.list = {};
    }
    drmfTemplate.prototype.onReady = function (fn) {
        this._ready = fn;
        return this;
    };
    drmfTemplate.prototype.replaceWith = function (renderedTpl) {
        if (this.key == renderedTpl.key) {
            this.updateValues(renderedTpl.values);
            return this;
        }
        var currTpl = this;
        var nodes = currTpl.rootNodes;
        var renderNodes;
        var new_nodes = renderedTpl.createDOM();
        // replace current with new
        var pNode = nodes[0].parentNode;
        var first = nodes[0];
        for (var _i = 0, new_nodes_1 = new_nodes; _i < new_nodes_1.length; _i++) {
            var n = new_nodes_1[_i];
            pNode.insertBefore(n, first);
        }
        for (var _a = 0, nodes_1 = nodes; _a < nodes_1.length; _a++) {
            var n = nodes_1[_a];
            pNode.removeChild(n);
        }
        return renderedTpl;
    };
    drmfTemplate.prototype.updateValues = function (values) {
        var _loop_1 = function (i) {
            var value = values[i];
            if (typeof (value) === 'undefined')
                return "continue";
            var last_slot = this_1.slotTypes[i];
            if (!last_slot)
                return "continue";
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
                case 2:
                    // simple content template was the last type...
                    var currTpl = last_slot[2];
                    var nodes = currTpl.rootNodes;
                    if (value instanceof drmfTemplate) {
                        var renderedTpl = value;
                        this_1.slotTypes[i][2] = currTpl.replaceWith(renderedTpl);
                    }
                    if (value instanceof drmfComponent) {
                        // render the situation now...
                        var renderedComp = value;
                        var rTpl = renderedComp.render();
                        var newTpl = currTpl.replaceWith(rTpl);
                        this_1.slotTypes[i] = [2, last_root, newTpl, newTpl.rootNodes];
                    }
                    // transform into txt node
                    if (typeof (value) == 'string') {
                        var txt = document.createTextNode(value);
                        var nodes_2 = currTpl.rootNodes;
                        var pNode = nodes_2[0].parentNode;
                        var first = nodes_2[0];
                        pNode.insertBefore(txt, first);
                        for (var _i = 0, nodes_3 = nodes_2; _i < nodes_3.length; _i++) {
                            var n = nodes_3[_i];
                            pNode.removeChild(n);
                        }
                        this_1.slotTypes[i] = [3, pNode, txt];
                    }
                    break;
                case 3:
                    var text_node = last_slot[2];
                    if (typeof (value) == 'string') {
                        text_node.textContent = value;
                    }
                    if (value instanceof drmfTemplate) {
                        var new_nodes = value.createDOM();
                        // replace current with new
                        var pNode = text_node.parentNode;
                        for (var _a = 0, new_nodes_2 = new_nodes; _a < new_nodes_2.length; _a++) {
                            var n = new_nodes_2[_a];
                            pNode.insertBefore(n, text_node);
                        }
                        pNode.removeChild(text_node);
                        this_1.slotTypes[i] = [2, last_root, value, new_nodes];
                    }
                    if (value instanceof drmfComponent) {
                        var comp = value;
                        var tpl = comp.render();
                        var new_nodes = tpl.createDOM();
                        var pNode = text_node.parentNode;
                        for (var _b = 0, new_nodes_3 = new_nodes; _b < new_nodes_3.length; _b++) {
                            var n = new_nodes_3[_b];
                            pNode.insertBefore(n, text_node);
                        }
                        pNode.removeChild(text_node);
                        this_1.slotTypes[i] = [5, last_root, comp, tpl, new_nodes];
                        return { value: void 0 };
                    }
                    break;
                case 4:
                    var tpls = value;
                    var curr_collection = last_slot[2];
                    var curr_tpls = curr_collection.list;
                    var prevNode_1 = curr_collection.node;
                    var len = Math.max(tpls.length, curr_tpls.length);
                    if (len === 0)
                        return { value: void 0 };
                    if (tpls.length === 0) {
                        curr_tpls.forEach(function (d) {
                            d.rootNodes.forEach(function (n) { return n.parentNode.removeChild(n); });
                        });
                        curr_collection.list = [];
                        return { value: void 0 };
                    }
                    var ii = 0;
                    var list = [];
                    for (var ii_1 = 0; ii_1 < len; ii_1++) {
                        var ct = curr_tpls[ii_1];
                        var rt = tpls[ii_1];
                        if (ct && rt) {
                            var p = ct.replaceWith(rt);
                            list[ii_1] = p;
                            prevNode_1 = p.rootNodes[p.rootNodes.length - 1];
                            continue;
                        }
                        if (ct && !rt) {
                            ct.rootNodes.forEach(function (n) { return n.parentNode.removeChild(n); });
                            continue;
                        }
                        if (!ct && rt) {
                            if (rt.rootNodes.length === 0)
                                rt.createDOM();
                            rt.rootNodes.forEach(function (n) {
                                prevNode_1.parentNode.insertBefore(n, prevNode_1.nextSibling);
                                prevNode_1 = n;
                            });
                            list[ii_1] = rt;
                            continue;
                        }
                    }
                    curr_collection.list = list;
                    break;
                case 5:
                    if (typeof (value) == 'string') {
                        var tplNow = last_slot[3];
                        var txt = document.createTextNode(value);
                        var nodes_4 = tplNow.rootNodes;
                        var pNode = nodes_4[0].parentNode;
                        var first = nodes_4[0];
                        pNode.insertBefore(txt, first);
                        for (var _c = 0, nodes_5 = nodes_4; _c < nodes_5.length; _c++) {
                            var n = nodes_5[_c];
                            pNode.removeChild(n);
                        }
                        this_1.slotTypes[i] = [3, pNode, txt];
                    }
                    if (value instanceof drmfTemplate) {
                        var comp = last_slot[2];
                        var tplNow = last_slot[3];
                        var tpl_nodes = tplNow.rootNodes;
                        var rTpl = value;
                        var newTpl = tplNow.replaceWith(rTpl);
                        this_1.slotTypes[i] = [2, last_root, newTpl, newTpl.rootNodes];
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
                            this_1.slotTypes[i][2] = renderedComp;
                            this_1.slotTypes[i][3] = newTpl;
                        }
                    }
                    break;
            }
        };
        var this_1 = this;
        for (var i = 0; i < values.length; i++) {
            var state_1 = _loop_1(i);
            if (typeof state_1 === "object")
                return state_1.value;
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
                        return;
                    }
                    if (Array.isArray(value)) {
                        var coll = new drmfTemplateCollection;
                        var txtV = document.createTextNode('');
                        coll.node = txtV;
                        append(txtV); // placeholder in case empty list
                        var tpls = value;
                        coll.list = tpls;
                        var snodes = [];
                        for (var idx = 0; idx < tpls.length; idx++) {
                            var cont = tpls[idx];
                            if (!cont || !cont.createDOM) {
                                throw "Array or result of map must contain valid template elements:\n " + value + " \n----------------------------\n " + me.valuestream;
                            }
                            if (!activeNode) {
                                throw "Array can not be root node of html:\n " + value + " \n----------------------------\n " + me.valuestream;
                            }
                            var items = cont.createDOM();
                            for (var _b = 0, items_3 = items; _b < items_3.length; _b++) {
                                var it = items_3[_b];
                                append(it);
                                snodes.push(it);
                            }
                        }
                        // render templates
                        me.slotTypes[(index - 1) >> 1] = [4, activeNode, coll, snodes];
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
        return exports.drmf(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<div></div>"], ["<div></div>"])));
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
        var tpl, items, _i, items_4, item, items, _a, items_5, item, _b, last_items_1, last, _c, tickFunctions_1, f;
        return __generator(this, function (_d) {
            if (b_render_on && (retry_cnt < 5)) {
                retry_cnt++;
                return [2 /*return*/];
            }
            retry_cnt = 0;
            try {
                if (last_state != app.state) {
                    last_state = app.state;
                    b_render_on = true;
                    if (typeof (comp) == 'function') {
                        tpl = comp(app.state);
                        if (lastTpl) {
                            lastTpl = lastTpl.replaceWith(tpl);
                        }
                        else {
                            items = tpl.createDOM();
                            for (_i = 0, items_4 = items; _i < items_4.length; _i++) {
                                item = items_4[_i];
                                if (!item.parentNode)
                                    document.body.appendChild(item);
                            }
                            lastTpl = tpl;
                        }
                    }
                    if (comp instanceof drmfComponent) {
                        items = comp.toDom();
                        for (_a = 0, items_5 = items; _a < items_5.length; _a++) {
                            item = items_5[_a];
                            if (!item.parentNode)
                                document.body.appendChild(item);
                        }
                        if (last_items) {
                            for (_b = 0, last_items_1 = last_items; _b < last_items_1.length; _b++) {
                                last = last_items_1[_b];
                                if (last.parentNode && items.indexOf(last) < 0) {
                                    last.parentNode.removeChild(last);
                                }
                            }
                        }
                        last_items = items;
                    }
                    b_render_on = false;
                }
            }
            catch (e) {
                console.error(e);
            }
            window.requestAnimationFrame(update_application);
            for (_c = 0, tickFunctions_1 = tickFunctions; _c < tickFunctions_1.length; _c++) {
                f = tickFunctions_1[_c];
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
var templateObject_1, templateObject_2;

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

},{"./index":2}]},{},[1]);
