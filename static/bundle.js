(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var timers_1 = require("timers");
var helloComponent = /** @class */ (function (_super) {
    __extends(helloComponent, _super);
    function helloComponent(initValue) {
        var _this = _super.call(this) || this;
        _this.cnt = 0;
        _this.txt = 'Hello World from Component';
        _this.cnt = initValue;
        timers_1.setInterval(function () {
            _this.cnt++;
        }, 1000);
        return _this;
    }
    helloComponent.prototype.reset = function () {
        this.cnt = 0;
    };
    helloComponent.prototype.setText = function (v) {
        this.txt = v;
        return this;
    };
    helloComponent.prototype.render = function () {
        if (this.cnt > 10) {
            return index_1.drmf(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<div style=\"padding:10px;background-color:#eeeeee\">\n        <h2>", " ", "</h2>\n      </div>"], ["<div style=\"padding:10px;background-color:#eeeeee\">\n        <h2>", " ", "</h2>\n      </div>"])), this.txt, this.cnt + '');
        }
        return index_1.drmf(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<div>\n      <h2>", " ", "</h2>\n    </div>"], ["<div>\n      <h2>", " ", "</h2>\n    </div>"])), this.txt, this.cnt + '');
    };
    return helloComponent;
}(index_1.drmfComponent));
exports.helloComponent = helloComponent;
var render_counter = 0;
// So here it is, not really inside the component Tree!!!
var myHelloComponent = new helloComponent(0);
var myHelloComponent2 = new helloComponent(12);
var myHelloComponent3 = new helloComponent(12);
var myHelloComponent4 = new helloComponent(5);
var testComponent = /** @class */ (function (_super) {
    __extends(testComponent, _super);
    function testComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.myValue = '';
        _this.mySize = 100;
        _this.myList = [1, 2, 3, 4];
        return _this;
    }
    testComponent.prototype.render = function () {
        var _this = this;
        var i = 0;
        var size = 100;
        var upd_value = function (e) {
            _this.myValue = e.target.value;
            console.log(e.target.value);
        };
        var swap = Math.floor(render_counter / 10) & 1;
        // is the component just updated with some new parameters ? 
        return index_1.drmf(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    <div >\n      ", "\n      <div>", "</div>\n      <div>", "</div>\n      <div><textarea class=\"foobar\"/></div>\n      <h1 click=", ">Hello ", "</h1>\n      \n      <div> \n        <div>Swap 1</div>\n        ", "\n      </div>\n      <div> \n        <div>Swap 2</div>\n        ", "\n      </div>\n\n      <div> \n        <div>Swap 3</div>\n        ", "\n      </div>      \n\n      ", "\n    </div>\n    "], ["\n    <div >\n      ", "\n      <div>", "</div>\n      <div>", "</div>\n      <div><textarea class=\"foobar\"/></div>\n      <h1 click=",
            ">Hello ", "</h1>\n      \n      <div> \n        <div>Swap 1</div>\n        ", "\n      </div>\n      <div> \n        <div>Swap 2</div>\n        ", "\n      </div>\n\n      <div> \n        <div>Swap 3</div>\n        ", "\n      </div>      \n\n      ",
            "\n    </div>\n    "])), myHelloComponent, 0, index_1.getState().time ? index_1.getState().time.toString() : '', function (e) {
            console.log('round ', i);
        }, 'World' + (render_counter++) + this.myValue, swap ? index_1.drmf(templateObject_4 || (templateObject_4 = __makeTemplateObject(["<div>This is a <b>test...", "</b></div>"], ["<div>This is a <b>test...", "</b></div>"])), render_counter) : '<div>OK!!!</div>', swap ? myHelloComponent3 : '... text ...', swap ? index_1.drmf(templateObject_5 || (templateObject_5 = __makeTemplateObject(["<div><b>text</b> swap component <-> html</div>"], ["<div><b>text</b> swap component <-> html</div>"]))) : myHelloComponent4, Math.floor(render_counter / 100) & 1 ? index_1.drmf(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n      <div>\n        <h2>Second Page</h2>\n        <div style=\"color:green;\">\n          ", "\n        </div>\n        <div>Some text here...", "</div>\n        <button click=", ">Reset counter</button>\n        <textarea/>\n      </div>\n      "], ["\n      <div>\n        <h2>Second Page</h2>\n        <div style=\"color:green;\">\n          ", "\n        </div>\n        <div>Some text here...", "</div>\n        <button click=", ">Reset counter</button>\n        <textarea/>\n      </div>\n      "])), myHelloComponent2.setText('Toinen Hello Comp'), render_counter, function () { return myHelloComponent2.reset(); }) : index_1.drmf(templateObject_7 || (templateObject_7 = __makeTemplateObject(["<textarea keyup=", ">", "</textarea>\n      <div>\n        <input value=", " keyup=", "/>\n        ", "\n      </div>\n      <div>\n        <button click=", ">Click Me</button>\n        <button click=", ">Remove</button>\n\n        <div><button>Something 1</button><button>Something 2</button></div>\n      </div>\n  \n      <img height=", " width=", " src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Wikipedia-logo-v2-fr.svg/500px-Wikipedia-logo-v2-fr.svg.png\"/>\n  \n      <p>Here is <b>Some</b> test</p>\n      <div style=\"color:blue;\"> \n        <ul style=", ">\n          ", "\n        </ul>\n        <div>Footnote</div>\n      </div>"], ["<textarea keyup=", ">", "</textarea>\n      <div>\n        <input value=", " keyup=",
            "/>\n        ", "\n      </div>\n      <div>\n        <button click=",
            ">Click Me</button>\n        <button click=",
            ">Remove</button>\n\n        <div><button>Something 1</button><button>Something 2</button></div>\n      </div>\n  \n      <img height=", " width=", " src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Wikipedia-logo-v2-fr.svg/500px-Wikipedia-logo-v2-fr.svg.png\"/>\n  \n      <p>Here is <b>Some</b> test</p>\n      <div style=\"color:blue;\"> \n        <ul style=", ">\n          ",
            "\n        </ul>\n        <div>Footnote</div>\n      </div>"])), upd_value, 'somevalue...', '123', function (e) {
            if (!isNaN(e.target.value)) {
                _this.mySize = parseInt(e.target.value);
                console.log(_this.myList);
            }
        }, myHelloComponent2.setText('Toinen Hello Comp, toisella sivulla'), function () {
            _this.myList.push(_this.mySize);
        }, function () {
            _this.myList.splice(0, 1);
        }, this.mySize, this.mySize, this.myList.length > 6 ? 'color:red;' : 'color:green;', this.myList.map(function (item, idx) { return index_1.drmf(templateObject_8 || (templateObject_8 = __makeTemplateObject(["<li >item ", " <b>Bold</b> \n              <input keyup=", "/></li>"], ["<li >item ", " <b>Bold</b> \n              <input keyup=",
            "/></li>"])), item + '', function (e) {
            // this.myList[idx] = parseInt(e.target.value)
        }); })));
    };
    return testComponent;
}(index_1.drmfComponent));
exports.testComponent = testComponent;
var WestWorld = /** @class */ (function (_super) {
    __extends(WestWorld, _super);
    function WestWorld() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.testc = new testComponent();
        return _this;
    }
    WestWorld.prototype.render = function () {
        var _this = this;
        var links = [1, 2, 3, 4, 5];
        return index_1.html(templateObject_9 || (templateObject_9 = __makeTemplateObject(["<div>\n      <h4>Hello World, it is ", "</h4>\n        ", "\n\n        <a class=\"waves-effect waves-light btn\" click=", ">Moro</a>\n        <div class=\"collection\">\n          ", "\n        </div>  \n        \n        <h4>Links to second page</h4>\n        <div class=\"collection\">\n          ", "\n        </div>         \n\n        ", "        \n      </div>\n    \n    "], ["<div>\n      <h4>Hello World, it is ", "</h4>\n        ",
            "\n\n        <a class=\"waves-effect waves-light btn\" click=", ">Moro</a>\n        <div class=\"collection\">\n          ", "\n        </div>  \n        \n        <h4>Links to second page</h4>\n        <div class=\"collection\">\n          ", "\n        </div>         \n\n        ",
            "        \n      </div>\n    \n    "])), (new Date).toString(), index_1.router({
            default: function (_) { return index_1.html(templateObject_10 || (templateObject_10 = __makeTemplateObject(["<div>Default Page</div>"], ["<div>Default Page</div>"]))); },
            test: function (_) { return index_1.html(templateObject_11 || (templateObject_11 = __makeTemplateObject(["<div>Test Page\n                ", "\n                <div>", "</div>\n            </div>"], ["<div>Test Page\n                ", "\n                <div>", "</div>\n            </div>"])), myHelloComponent4, _.page); },
            second: function (_) { return index_1.html(templateObject_12 || (templateObject_12 = __makeTemplateObject(["<div>Second Page\n            ", "\n                <div>", "</div>\n            </div>"], ["<div>Second Page\n            ", "\n                <div>", "</div>\n            </div>"])), myHelloComponent4, _.page); },
        }), function (_) { return alert("Moro"); }, links.map(function (item) { return index_1.html(templateObject_13 || (templateObject_13 = __makeTemplateObject(["<a href=\"#test/", "\" class=\"collection-item\">Item ", "</a>"], ["<a href=\"#test/", "\" class=\"collection-item\">Item ", "</a>"])), item, item); }), links.map(function (item) { return index_1.html(templateObject_14 || (templateObject_14 = __makeTemplateObject(["<a href=\"#second/", "\" class=\"collection-item\">Item ", "</a>"], ["<a href=\"#second/", "\" class=\"collection-item\">Item ", "</a>"])), item, item); }), index_1.router({
            second: function (_) { return index_1.html(templateObject_15 || (templateObject_15 = __makeTemplateObject(["<div>End of Second Page\n                ", "\n            </div>"], ["<div>End of Second Page\n                ", "\n            </div>"])), _this.testc); },
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
        return index_1.html(templateObject_16 || (templateObject_16 = __makeTemplateObject(["<h4>Hello World, it is ", "</h4>"], ["<h4>Hello World, it is ", "</h4>"])), (new Date).toString());
    };
    return HelloWorld;
}(index_1.drmfComponent));
exports.HelloWorld = HelloWorld;
index_1.mount(document.body, new WestWorld());
timers_1.setInterval(function () {
    index_1.setState({ time: new Date() });
}, 100);
var templateObject_1, templateObject_2, templateObject_4, templateObject_5, templateObject_6, templateObject_8, templateObject_7, templateObject_3, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_9, templateObject_16;

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
var component_registry;
function escapeXml(unsafe) {
    return unsafe.replace(/[<>&'"]/g, function (c) {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
        }
    });
}
function registerComponent(name, component) {
    component_registry[name] = component;
}
exports.registerComponent = registerComponent;
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
var escapedHtml = /** @class */ (function () {
    function escapedHtml(value) {
        this.str = value;
    }
    return escapedHtml;
}());
exports.escapedHtml = escapedHtml;
var drmfComponent = /** @class */ (function () {
    function drmfComponent() {
    }
    drmfComponent.prototype.setAttribute = function (name, value) {
    };
    drmfComponent.prototype.appendChild = function (node) {
    };
    drmfComponent.prototype.addEventListener = function (name, value) {
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
        // 0,1,2,3...
        this.nodesForValues = [];
    }
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
            if (!value)
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
                    last_root.setAttribute(name_1, value);
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
                        this_1.slotTypes[i] = [3, last_root, txt];
                        var nodes_2 = currTpl.rootNodes;
                        var pNode = nodes_2[0].parentNode;
                        var first = nodes_2[0];
                        pNode.insertBefore(txt, first);
                        for (var _i = 0, nodes_3 = nodes_2; _i < nodes_3.length; _i++) {
                            var n = nodes_3[_i];
                            pNode.removeChild(n);
                        }
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
                        this_1.slotTypes[i] = [3, last_root, txt];
                        var nodes_4 = tplNow.rootNodes;
                        var pNode = nodes_4[0].parentNode;
                        var first = nodes_4[0];
                        pNode.insertBefore(txt, first);
                        for (var _c = 0, nodes_5 = nodes_4; _c < nodes_5.length; _c++) {
                            var n = nodes_5[_c];
                            pNode.removeChild(n);
                        }
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
        var parser = new xmlparser_1.XMLParser(this.valustream);
        var eof = false;
        var nodetree = [];
        var activeNode;
        // let activeComponent:drmfComponent
        var me = this;
        var callbacks = {
            beginNode: function (name, index) {
                var new_node;
                if (name == 'script') {
                    new_node = document.createElement('pre');
                }
                else {
                    new_node = document.createElement(name);
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
                    me.slotTypes[(index - 1) >> 1] = [1, activeNode, name, value];
                }
                // console.log('attribute', name, index)
                if (typeof (value) == 'function') {
                    // console.log('Binding function')
                    if (activeNode instanceof Node) {
                        activeNode.addEventListener(name, value);
                    }
                    if (activeNode instanceof drmfComponent) {
                        activeNode.addEventListener(name, value);
                    }
                    return;
                }
                var node = activeNode;
                node.setAttribute(name, value);
            },
            closeNode: function (name) {
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
                if (index & 1) {
                    if (value instanceof drmfTemplate) {
                        var tpl = value;
                        var items = tpl.createDOM();
                        var snodes = [];
                        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                            var it = items_1[_i];
                            activeNode.appendChild(it);
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
                            activeNode.appendChild(it);
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
                        activeNode.appendChild(txtV); // placeholder in case empty list
                        var tpls = value;
                        coll.list = tpls;
                        var snodes = [];
                        for (var _b = 0, tpls_1 = tpls; _b < tpls_1.length; _b++) {
                            var cont = tpls_1[_b];
                            var items = cont.createDOM();
                            for (var _c = 0, items_3 = items; _c < items_3.length; _c++) {
                                var it = items_3[_c];
                                activeNode.appendChild(it);
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
        var max_cnt = 10000;
        while (!parser.eof) {
            parser.parse(callbacks);
            if (max_cnt-- < 0)
                break;
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
    drmfTemplate.prototype.replaceNodes = function (index, elems) {
        if (!this.nodesForValues[index])
            this.nodesForValues[index] = [];
        for (var i = 0; i < elems.length; i++) {
        }
    };
    drmfTemplate.prototype.render = function () {
        for (var i = 0; i < this.values.length; i++) {
            var value = this.values[i];
            if (typeof (value) === 'string' || !isNaN(value)) {
                // this is going to be a constant, so if rendered do not render again
                if (!this.nodesForValues[i]) {
                    var txtNode = document.createTextNode(value);
                    this.replaceNodes(i, [txtNode]);
                }
            }
        }
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
    t.key = strings.join('<>');
    t.strings = strings;
    t.values = values.map(function (value) {
        if (!isNaN(value))
            return value.toString();
        return value;
    });
    var kk = t.values.filter(function (_) { return _ instanceof drfmKey; }).map(function (_) { return 'key=' + _.value; }).join('&');
    t.key = t.key + kk;
    var len = strings.length + values.length;
    t.valustream = new Array(len);
    var i = 0, si = 0, vi = 0;
    while (i < len) {
        t.valustream[i] = i & 1 ? t.values[vi++] : t.strings[si++];
        i++;
    }
    return t;
}
exports.html = html;
exports.drmf = html;
function getelem(parent, id) {
    var matches = parent.querySelectorAll("#" + id);
    return matches.item(0);
}
function _forElem(parent, fn) {
    var res = {};
    var lists = {};
    var walk_tree = function (elem) {
        if (!elem)
            return;
        if (!elem.getAttribute)
            return;
        var elem_id = elem.getAttribute('id');
        var list_id = elem.getAttribute('list');
        if (elem_id) {
            res[elem_id] = elem;
        }
        if (list_id) {
            (lists[list_id] = lists[list_id] || []).push(elem);
        }
        var list = Array.prototype.slice.call(elem.childNodes);
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var ch = list_1[_i];
            walk_tree(ch);
        }
    };
    walk_tree(parent);
    res = __assign({}, res, lists, { elem: parent });
    fn(res);
    return parent;
}
function forElem(parent, fn) {
    setTimeout(function () { return _forElem(parent, fn); }, 1);
    return parent;
}
exports.forElem = forElem;
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
                //if(last_page) {
                //  last_page({...app.state, phase:'close'})
                //}
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
// initialize app using init function...
function mount(root, comp, 
// renderFn : (state:any) => Promise<drmfTemplate>, 
state, options) {
    var _this = this;
    if (!app.is_registered) {
        console.log('registering app');
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
        var items, _i, items_4, item, _a, last_items_1, last;
        return __generator(this, function (_b) {
            if (b_render_on && (retry_cnt < 5)) {
                retry_cnt++;
                return [2 /*return*/];
            }
            retry_cnt = 0;
            try {
                if (last_state != app.state) {
                    last_state = app.state;
                    b_render_on = true;
                    items = comp.toDom();
                    for (_i = 0, items_4 = items; _i < items_4.length; _i++) {
                        item = items_4[_i];
                        if (!item.parentNode)
                            document.body.appendChild(item);
                    }
                    if (last_items) {
                        for (_a = 0, last_items_1 = last_items; _a < last_items_1.length; _a++) {
                            last = last_items_1[_a];
                            if (last.parentNode && items.indexOf(last) < 0) {
                                last.parentNode.removeChild(last);
                            }
                        }
                    }
                    last_items = items;
                    b_render_on = false;
                }
            }
            catch (e) {
                console.error(e);
            }
            return [2 /*return*/];
        });
    }); };
    interval = setInterval(update_application, update_delay);
}
exports.mount = mount;
var templateObject_1, templateObject_2;

},{"./xmlparser":3}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
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
        this.last_tag_name = '';
        this.buffers = initWith;
        this.buff = initWith[0];
        this.i = 0;
        this.buff_index = 0;
        this.used_index = 0;
        this.eof = false;
        if (!this.buff)
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
                this.isTagChar(c2, true)))) // valid tag char
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
        if (typeof (this.buff) === 'undefined')
            return '';
        if (start_buff == this.buff) {
            return this.buff.substring(sp, this.i);
        }
        return start_buff.substring(sp);
        // the old, only return one buffer at time...
        /*
        intermediate.pop() // remove last intermediate because it is this.buff
        return start_buff.substring( sp ) + intermediate.join('') + this.buff.substring( 0, this.i )
        */
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
            if (this.isHere(34)) {
                this.step(1);
                var value = this.collectUntil(34); // collect to the "
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
                    this.step(1);
                    this.in_tagdef = true;
                    this.last_tag_name = this.collectXMLName();
                    callback.beginNode(this.last_tag_name, this.used_index);
                    return;
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
