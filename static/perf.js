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
        var is_svg = false;
        var me = this;
        var svgNS = "http://www.w3.org/2000/svg";
        var callbacks = {
            beginNode: function (name, index) {
                var new_node;
                switch (name) {
                    case "svg":
                        new_node = document.createElementNS(svgNS, "svg");
                        is_svg = true;
                        break;
                    case "g":
                    case "rect":
                    case "path":
                    case "image":
                    case "line":
                    case "ellipse":
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
                // console.log('attribute', name, index)
                if (typeof (value) == 'function') {
                    // console.log('Binding function')
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
                        for (var idx = 0; idx < tpls.length; idx++) {
                            var cont = tpls[idx];
                            var items = cont.createDOM();
                            for (var _b = 0, items_3 = items; _b < items_3.length; _b++) {
                                var it = items_3[_b];
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
        if (!isNaN(value) && (!Array.isArray(value)))
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
var lastTpl;
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
        var tpl, items, _i, items_4, item, items, _a, items_5, item, _b, last_items_1, last;
        return __generator(this, function (_c) {
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
            return [2 /*return*/];
        });
    }); };
    window.requestAnimationFrame(update_application);
    // interval = setInterval( update_application, update_delay);
}
exports.mount = mount;
var templateObject_1, templateObject_2;

},{"./xmlparser":3}],2:[function(require,module,exports){
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
var myList = [];
this.state = { myList: myList };
for (var i = 0; i < 1000; i++) {
    myList.push(i);
}
index_1.setState({ myList: myList });
setInterval(function () {
    myList.splice(0, 1);
    myList.reverse();
    index_1.setState({ myList: myList });
}, 60);
var Benchmark = /** @class */ (function (_super) {
    __extends(Benchmark, _super);
    function Benchmark() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Benchmark.prototype.render = function () {
        var state = index_1.getState();
        return index_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<ul>", "</ul>"], ["<ul>", "</ul>"])), state.myList.map(function (item) { return index_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<li>Item ", "</li>"], ["<li>Item ", "</li>"])), item); }));
    };
    return Benchmark;
}(index_1.drmfComponent));
index_1.mount(document.body, new Benchmark());
var templateObject_2, templateObject_1;

},{"./index":1}],3:[function(require,module,exports){
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

},{"./index":1}]},{},[2]);
