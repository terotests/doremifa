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
        default: function (state) { return index_1.html(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n<div>\n  This is the default route. Click show list to edit list of items.\n  Currently the list of items is ", "\n  <div>\n    ", "\n  </div>\n</div>\n    "], ["\n<div>\n  This is the default route. Click show list to edit list of items.\n  Currently the list of items is ",
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
//# sourceMappingURL=client.js.map