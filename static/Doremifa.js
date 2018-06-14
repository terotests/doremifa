(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Doremifa = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
Object.defineProperty(exports, "__esModule", { value: true });
var xmlparser_1 = require("./xmlparser");
// Ideas:
// - https://polymer.github.io/lit-html/guide/writing-templates.html
// idea from lit-html
var envCachesTemplates = (function (t) { return t() === t(); })(function () { return (function (s) { return s; })(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))); });
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
        return exports.drmf(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<div>Hello World</div>"], ["<div>Hello World</div>"])));
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
        var list = new Array(tpls.length);
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
                if (rt.baseNodes.length === 0)
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
        this.rootNodes = [];
        // to get all the root nodes
        this.baseNodes = [];
        this.slotTypes = [];
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
        var _this = this;
        var _loop_1 = function (i) {
            var value = values[i];
            if (typeof (value) === 'undefined')
                return "continue";
            var last_slot = this_1.slotTypes[i];
            if (value instanceof drfmKey) {
                return "continue";
            }
            if (typeof (last_slot) === 'undefined') {
                return "continue";
            }
            var last_type = last_slot[0];
            var last_root = last_slot[1];
            // assuming now that the type stays the same...
            switch (last_type) {
                case 1:
                    var name_1 = last_slot[2];
                    var is_svg = last_slot[4];
                    if (typeof (value) === 'function') {
                        last_root[name_1] = function (e) {
                            value(e, _this);
                        };
                        return "continue";
                    }
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
                            if (name_1 !== 'xmlns' && name_1 !== 'xmlns:xlink') {
                                last_root.setAttributeNS(null, name_1, value);
                            }
                            else {
                                last_root.setAttribute(name_1, value);
                            }
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
                    var local_value = value;
                    if (Array.isArray(value)) {
                        local_value = html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["", ""], ["", ""])), value);
                    }
                    if (local_value instanceof drmfTemplate) {
                        var renderedTpl = local_value;
                        this_1.slotTypes[i][2] = currTpl.replaceWith(renderedTpl);
                        if (typeof (this_1.baseNodes[i * 2 + 1]) !== 'undefined')
                            this_1.baseNodes[i * 2 + 1] = this_1.slotTypes[i][2];
                    }
                    if (value instanceof drmfComponent) {
                        // render the situation now...
                        var renderedComp = value;
                        var rTpl = renderedComp.render();
                        var newTpl = currTpl.replaceWith(rTpl);
                        this_1.slotTypes[i] = [2, last_root, newTpl, newTpl.rootNodes];
                        if (typeof (this_1.baseNodes[i * 2 + 1]) !== 'undefined')
                            this_1.baseNodes[i * 2 + 1] = newTpl;
                    }
                    // transform into txt node
                    if (typeof (value) == 'string') {
                        var txt = document.createTextNode(value);
                        var first = currTpl.getFirstNode();
                        first.parentNode.insertBefore(txt, first);
                        currTpl.removeBaseNodes();
                        this_1.slotTypes[i] = [3, first.parentNode, txt];
                        if (typeof (this_1.baseNodes[i * 2 + 1]) !== 'undefined')
                            this_1.baseNodes[i * 2 + 1] = [txt];
                    }
                    break;
                // last node was text node
                case 3:
                    var text_node = last_slot[2];
                    if (typeof (value) == 'string') {
                        text_node.textContent = value;
                    }
                    else {
                        var v = value;
                        if (Array.isArray(value)) {
                            v = html(templateObject_4 || (templateObject_4 = __makeTemplateObject(["", ""], ["", ""])), value);
                        }
                        if (v instanceof drmfTemplate) {
                            v.createDOM();
                            v.addAt(text_node.parentNode, text_node);
                            text_node.parentNode.removeChild(text_node);
                            this_1.slotTypes[i] = [2, last_root, v];
                            // if the slot is base slot...
                            if (typeof (this_1.baseNodes[i * 2 + 1]) !== 'undefined')
                                this_1.baseNodes[i * 2 + 1] = v;
                        }
                        if (v instanceof drmfComponent) {
                            var comp = v;
                            var tpl = comp.render();
                            tpl.createDOM();
                            tpl.addAt(text_node.parentNode, text_node);
                            text_node.parentNode.removeChild(text_node);
                            this_1.slotTypes[i] = [5, last_root, comp, tpl];
                            if (typeof (this_1.baseNodes[i * 2 + 1]) !== 'undefined')
                                this_1.baseNodes[i * 2 + 1] = tpl;
                        }
                    }
                    break;
                // last node was drmfTemplateCollection
                case 4:
                    var curr_collection = last_slot[2];
                    if (Array.isArray(value)) {
                        var items = value;
                        var b_diff = false;
                        for (var i_1 = 0; i_1 < items.length; i_1++) {
                            var ii = items[i_1];
                            if (!(ii instanceof drmfTemplate)) {
                                b_diff = true;
                                break;
                            }
                        }
                        if (b_diff) {
                            var tpls = new Array(items.length);
                            for (var i_2 = 0; i_2 < items.length; i_2++) {
                                var ii = items[i_2];
                                if (ii instanceof drmfTemplate) {
                                    tpls[i_2] = ii;
                                }
                                else {
                                    tpls[i_2] = html(templateObject_5 || (templateObject_5 = __makeTemplateObject(["", ""], ["", ""])), ii);
                                }
                            }
                            curr_collection.refreshFrom(tpls);
                        }
                        else {
                            curr_collection.refreshFrom(value);
                        }
                    }
                    else {
                        var tpls = [html(templateObject_6 || (templateObject_6 = __makeTemplateObject(["", ""], ["", ""])), value)];
                        curr_collection.refreshFrom(tpls);
                    }
                    break;
                // last node was drmfComponent        
                case 5:
                    var local_tpl = value;
                    if (Array.isArray(value)) {
                        local_tpl = html(templateObject_7 || (templateObject_7 = __makeTemplateObject(["", ""], ["", ""])), value);
                    }
                    if (typeof (value) == 'string') {
                        var tplNow = last_slot[3];
                        var txt = document.createTextNode(value);
                        var first = tplNow.getFirstNode();
                        first.parentNode.insertBefore(txt, first);
                        tplNow.removeBaseNodes();
                        this_1.slotTypes[i] = [3, first.parentNode, txt];
                        if (typeof (this_1.baseNodes[i * 2 + 1]) !== 'undefined')
                            this_1.baseNodes[i * 2 + 1] = [txt];
                    }
                    if (local_tpl instanceof drmfTemplate) {
                        var comp = last_slot[2];
                        var tplNow = last_slot[3];
                        var rTpl = local_tpl;
                        var newTpl = tplNow.replaceWith(rTpl);
                        this_1.slotTypes[i] = [2, last_root, newTpl];
                        if (typeof (this_1.baseNodes[i * 2 + 1]) !== 'undefined')
                            this_1.baseNodes[i * 2 + 1] = local_tpl;
                    }
                    if (value instanceof drmfComponent) {
                        var comp = last_slot[2];
                        var tplNow = last_slot[3];
                        // render the situation now...
                        var renderedComp = value;
                        var rTpl = renderedComp.render();
                        var newTpl = tplNow.replaceWith(rTpl);
                        if (newTpl === rTpl) {
                            this_1.slotTypes[i][2] = renderedComp;
                            this_1.slotTypes[i][3] = newTpl;
                        }
                        if (typeof (this_1.baseNodes[i * 2 + 1]) !== 'undefined')
                            this_1.baseNodes[i * 2 + 1] = newTpl;
                    }
                    break;
            }
        };
        var this_1 = this;
        for (var i = 0; i < values.length; i++) {
            _loop_1(i);
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
            beginNode: function (name_orig, index) {
                var new_node;
                var name = name_orig.toLowerCase();
                switch (name) {
                    case "script":
                        activeNode = document.createElement(name);
                        return;
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
                        activeNode[name] = function (e) {
                            value(e, me);
                        };
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
                        if (name !== 'xmlns' && name !== 'xmlns:xlink') {
                            node.setAttributeNS(null, name, value);
                        }
                        else {
                            node.setAttribute(name, value);
                        }
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
                    (me.ids = me.ids || {})[value] = node;
                if (name === 'list') {
                    if (!me.list[value])
                        (me.list = me.list || {})[value] = [];
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
                            return html(templateObject_8 || (templateObject_8 = __makeTemplateObject(["", ""], ["", ""])), item);
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
    return drmfTemplate;
}());
exports.drmfTemplate = drmfTemplate;
function html(strings) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var t = new drmfTemplate();
    var b_has_key = false;
    var key_v = '';
    for (var _a = 0, values_1 = values; _a < values_1.length; _a++) {
        var v = values_1[_a];
        if (v instanceof drfmKey) {
            b_has_key = true;
            key_v = v.value;
        }
    }
    if (envCachesTemplates && !b_has_key) {
        t.key = strings;
    }
    else {
        if (b_has_key) {
            t.key = key_v;
        }
        else {
            t.key = strings.join('&');
        }
    }
    t.values = values;
    for (var i_3 = 0; i_3 < t.values.length; i_3++) {
        if (typeof (t.values[i_3]) === 'undefined')
            t.values[i_3] = '';
        if (typeof (t.values[i_3]) === 'number')
            t.values[i_3] = t.values[i_3].toString();
    }
    var len = strings.length + values.length;
    t.valuestream = new Array(len);
    var i = 0, si = 0, vi = 0;
    while (i < len) {
        t.valuestream[i] = i & 1 ? t.values[vi++] : strings[si++];
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
        return exports.drmf(templateObject_9 || (templateObject_9 = __makeTemplateObject(["<div></div>"], ["<div></div>"])));
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
// polyfill for really old browsers
(function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
            || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () { callback(currTime + timeToCall); }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
}());
// initialize app using init function...
function mount(root, comp, 
// renderFn : (state:any) => Promise<drmfTemplate>, 
state, options) {
    var interval = null;
    var current_node = null;
    var is_registered = false;
    var last_items = null;
    var lastTpl;
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
    var update_application = function () {
        if (b_render_on && (retry_cnt < 5)) {
            retry_cnt++;
            return;
        }
        retry_cnt = 0;
        // try {
        if (last_state != app.state) {
            last_state = app.state;
            b_render_on = true;
            var tpl = void 0;
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
        //} catch(e) {
        //  console.error(e)
        // }
        window.requestAnimationFrame(update_application);
        for (var _i = 0, tickFunctions_1 = tickFunctions; _i < tickFunctions_1.length; _i++) {
            var f = tickFunctions_1[_i];
            if (f)
                f();
        }
        tickFunctions.length = 0;
    };
    window.requestAnimationFrame(update_application);
    // interval = setInterval( update_application, update_delay);
}
exports.mount = mount;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;

},{"./xmlparser":2}],2:[function(require,module,exports){
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
var namedChars = {
    "Aacute": 193,
    "Aacut": 193,
    "aacute": 225,
    "aacut": 225,
    "Abreve": 258,
    "abreve": 259,
    "ac": 8766,
    "acd": 8767,
    "acE": 8766,
    "Acirc": 194,
    "Acir": 194,
    "acirc": 226,
    "acir": 226,
    "acute": 180,
    "acut": 180,
    "Acy": 1040,
    "acy": 1072,
    "AElig": 198,
    "AEli": 198,
    "aelig": 230,
    "aeli": 230,
    "af": 8289,
    "Afr": 120068,
    "afr": 120094,
    "Agrave": 192,
    "Agrav": 192,
    "agrave": 224,
    "agrav": 224,
    "alefsym": 8501,
    "aleph": 8501,
    "Alpha": 913,
    "alpha": 945,
    "Amacr": 256,
    "amacr": 257,
    "amalg": 10815,
    "amp": 38,
    "am": 38,
    "AMP": 38,
    "AM": 38,
    "andand": 10837,
    "And": 10835,
    "and": 8743,
    "andd": 10844,
    "andslope": 10840,
    "andv": 10842,
    "ang": 8736,
    "ange": 10660,
    "angle": 8736,
    "angmsdaa": 10664,
    "angmsdab": 10665,
    "angmsdac": 10666,
    "angmsdad": 10667,
    "angmsdae": 10668,
    "angmsdaf": 10669,
    "angmsdag": 10670,
    "angmsdah": 10671,
    "angmsd": 8737,
    "angrt": 8735,
    "angrtvb": 8894,
    "angrtvbd": 10653,
    "angsph": 8738,
    "angst": 197,
    "angzarr": 9084,
    "Aogon": 260,
    "aogon": 261,
    "Aopf": 120120,
    "aopf": 120146,
    "apacir": 10863,
    "ap": 8776,
    "apE": 10864,
    "ape": 8778,
    "apid": 8779,
    "apos": 39,
    "ApplyFunction": 8289,
    "approx": 8776,
    "approxeq": 8778,
    "Aring": 197,
    "Arin": 197,
    "aring": 229,
    "arin": 229,
    "Ascr": 119964,
    "ascr": 119990,
    "Assign": 8788,
    "ast": 42,
    "asymp": 8776,
    "asympeq": 8781,
    "Atilde": 195,
    "Atild": 195,
    "atilde": 227,
    "atild": 227,
    "Auml": 196,
    "Aum": 196,
    "auml": 228,
    "aum": 228,
    "awconint": 8755,
    "awint": 10769,
    "backcong": 8780,
    "backepsilon": 1014,
    "backprime": 8245,
    "backsim": 8765,
    "backsimeq": 8909,
    "Backslash": 8726,
    "Barv": 10983,
    "barvee": 8893,
    "barwed": 8965,
    "Barwed": 8966,
    "barwedge": 8965,
    "bbrk": 9141,
    "bbrktbrk": 9142,
    "bcong": 8780,
    "Bcy": 1041,
    "bcy": 1073,
    "bdquo": 8222,
    "becaus": 8757,
    "because": 8757,
    "Because": 8757,
    "bemptyv": 10672,
    "bepsi": 1014,
    "bernou": 8492,
    "Bernoullis": 8492,
    "Beta": 914,
    "beta": 946,
    "beth": 8502,
    "between": 8812,
    "Bfr": 120069,
    "bfr": 120095,
    "bigcap": 8898,
    "bigcirc": 9711,
    "bigcup": 8899,
    "bigodot": 10752,
    "bigoplus": 10753,
    "bigotimes": 10754,
    "bigsqcup": 10758,
    "bigstar": 9733,
    "bigtriangledown": 9661,
    "bigtriangleup": 9651,
    "biguplus": 10756,
    "bigvee": 8897,
    "bigwedge": 8896,
    "bkarow": 10509,
    "blacklozenge": 10731,
    "blacksquare": 9642,
    "blacktriangle": 9652,
    "blacktriangledown": 9662,
    "blacktriangleleft": 9666,
    "blacktriangleright": 9656,
    "blank": 9251,
    "blk12": 9618,
    "blk14": 9617,
    "blk34": 9619,
    "block": 9608,
    "bne": 61,
    "bnequiv": 8801,
    "bNot": 10989,
    "bnot": 8976,
    "Bopf": 120121,
    "bopf": 120147,
    "bot": 8869,
    "bottom": 8869,
    "bowtie": 8904,
    "boxbox": 10697,
    "boxdl": 9488,
    "boxdL": 9557,
    "boxDl": 9558,
    "boxDL": 9559,
    "boxdr": 9484,
    "boxdR": 9554,
    "boxDr": 9555,
    "boxDR": 9556,
    "boxh": 9472,
    "boxH": 9552,
    "boxhd": 9516,
    "boxHd": 9572,
    "boxhD": 9573,
    "boxHD": 9574,
    "boxhu": 9524,
    "boxHu": 9575,
    "boxhU": 9576,
    "boxHU": 9577,
    "boxminus": 8863,
    "boxplus": 8862,
    "boxtimes": 8864,
    "boxul": 9496,
    "boxuL": 9563,
    "boxUl": 9564,
    "boxUL": 9565,
    "boxur": 9492,
    "boxuR": 9560,
    "boxUr": 9561,
    "boxUR": 9562,
    "boxv": 9474,
    "boxV": 9553,
    "boxvh": 9532,
    "boxvH": 9578,
    "boxVh": 9579,
    "boxVH": 9580,
    "boxvl": 9508,
    "boxvL": 9569,
    "boxVl": 9570,
    "boxVL": 9571,
    "boxvr": 9500,
    "boxvR": 9566,
    "boxVr": 9567,
    "boxVR": 9568,
    "bprime": 8245,
    "breve": 728,
    "Breve": 728,
    "brvbar": 166,
    "brvba": 166,
    "bscr": 119991,
    "Bscr": 8492,
    "bsemi": 8271,
    "bsim": 8765,
    "bsime": 8909,
    "bsolb": 10693,
    "bsol": 92,
    "bsolhsub": 10184,
    "bull": 8226,
    "bullet": 8226,
    "bump": 8782,
    "bumpE": 10926,
    "bumpe": 8783,
    "Bumpeq": 8782,
    "bumpeq": 8783,
    "Cacute": 262,
    "cacute": 263,
    "capand": 10820,
    "capbrcup": 10825,
    "capcap": 10827,
    "cap": 8745,
    "Cap": 8914,
    "capcup": 10823,
    "capdot": 10816,
    "CapitalDifferentialD": 8517,
    "caps": 8745,
    "caret": 8257,
    "caron": 711,
    "Cayleys": 8493,
    "ccaps": 10829,
    "Ccaron": 268,
    "ccaron": 269,
    "Ccedil": 199,
    "Ccedi": 199,
    "ccedil": 231,
    "ccedi": 231,
    "Ccirc": 264,
    "ccirc": 265,
    "Cconint": 8752,
    "ccups": 10828,
    "ccupssm": 10832,
    "Cdot": 266,
    "cdot": 267,
    "cedil": 184,
    "cedi": 184,
    "Cedilla": 184,
    "cemptyv": 10674,
    "cent": 162,
    "cen": 162,
    "centerdot": 183,
    "CenterDot": 183,
    "cfr": 120096,
    "Cfr": 8493,
    "CHcy": 1063,
    "chcy": 1095,
    "check": 10003,
    "checkmark": 10003,
    "Chi": 935,
    "chi": 967,
    "circ": 710,
    "circeq": 8791,
    "circlearrowleft": 8634,
    "circlearrowright": 8635,
    "circledast": 8859,
    "circledcirc": 8858,
    "circleddash": 8861,
    "CircleDot": 8857,
    "circledR": 174,
    "circledS": 9416,
    "CircleMinus": 8854,
    "CirclePlus": 8853,
    "CircleTimes": 8855,
    "cir": 9675,
    "cirE": 10691,
    "cire": 8791,
    "cirfnint": 10768,
    "cirmid": 10991,
    "cirscir": 10690,
    "ClockwiseContourIntegral": 8754,
    "CloseCurlyDoubleQuote": 8221,
    "CloseCurlyQuote": 8217,
    "clubs": 9827,
    "clubsuit": 9827,
    "colon": 58,
    "Colon": 8759,
    "Colone": 10868,
    "colone": 8788,
    "coloneq": 8788,
    "comma": 44,
    "commat": 64,
    "comp": 8705,
    "compfn": 8728,
    "complement": 8705,
    "complexes": 8450,
    "cong": 8773,
    "congdot": 10861,
    "Congruent": 8801,
    "conint": 8750,
    "Conint": 8751,
    "ContourIntegral": 8750,
    "copf": 120148,
    "Copf": 8450,
    "coprod": 8720,
    "Coproduct": 8720,
    "copy": 169,
    "cop": 169,
    "COPY": 169,
    "COP": 169,
    "copysr": 8471,
    "CounterClockwiseContourIntegral": 8755,
    "crarr": 8629,
    "cross": 10007,
    "Cross": 10799,
    "Cscr": 119966,
    "cscr": 119992,
    "csub": 10959,
    "csube": 10961,
    "csup": 10960,
    "csupe": 10962,
    "ctdot": 8943,
    "cudarrl": 10552,
    "cudarrr": 10549,
    "cuepr": 8926,
    "cuesc": 8927,
    "cularr": 8630,
    "cularrp": 10557,
    "cupbrcap": 10824,
    "cupcap": 10822,
    "CupCap": 8781,
    "cup": 8746,
    "Cup": 8915,
    "cupcup": 10826,
    "cupdot": 8845,
    "cupor": 10821,
    "cups": 8746,
    "curarr": 8631,
    "curarrm": 10556,
    "curlyeqprec": 8926,
    "curlyeqsucc": 8927,
    "curlyvee": 8910,
    "curlywedge": 8911,
    "curren": 164,
    "curre": 164,
    "curvearrowleft": 8630,
    "curvearrowright": 8631,
    "cuvee": 8910,
    "cuwed": 8911,
    "cwconint": 8754,
    "cwint": 8753,
    "cylcty": 9005,
    "dagger": 8224,
    "Dagger": 8225,
    "daleth": 8504,
    "darr": 8595,
    "Darr": 8609,
    "dArr": 8659,
    "dash": 8208,
    "Dashv": 10980,
    "dashv": 8867,
    "dbkarow": 10511,
    "dblac": 733,
    "Dcaron": 270,
    "dcaron": 271,
    "Dcy": 1044,
    "dcy": 1076,
    "ddagger": 8225,
    "ddarr": 8650,
    "DD": 8517,
    "dd": 8518,
    "DDotrahd": 10513,
    "ddotseq": 10871,
    "deg": 176,
    "de": 176,
    "Del": 8711,
    "Delta": 916,
    "delta": 948,
    "demptyv": 10673,
    "dfisht": 10623,
    "Dfr": 120071,
    "dfr": 120097,
    "dHar": 10597,
    "dharl": 8643,
    "dharr": 8642,
    "DiacriticalAcute": 180,
    "DiacriticalDot": 729,
    "DiacriticalDoubleAcute": 733,
    "DiacriticalGrave": 96,
    "DiacriticalTilde": 732,
    "diam": 8900,
    "diamond": 8900,
    "Diamond": 8900,
    "diamondsuit": 9830,
    "diams": 9830,
    "die": 168,
    "DifferentialD": 8518,
    "digamma": 989,
    "disin": 8946,
    "div": 247,
    "divide": 247,
    "divid": 247,
    "divideontimes": 8903,
    "divonx": 8903,
    "DJcy": 1026,
    "djcy": 1106,
    "dlcorn": 8990,
    "dlcrop": 8973,
    "dollar": 36,
    "Dopf": 120123,
    "dopf": 120149,
    "Dot": 168,
    "dot": 729,
    "DotDot": 8412,
    "doteq": 8784,
    "doteqdot": 8785,
    "DotEqual": 8784,
    "dotminus": 8760,
    "dotplus": 8724,
    "dotsquare": 8865,
    "doublebarwedge": 8966,
    "DoubleContourIntegral": 8751,
    "DoubleDot": 168,
    "DoubleDownArrow": 8659,
    "DoubleLeftArrow": 8656,
    "DoubleLeftRightArrow": 8660,
    "DoubleLeftTee": 10980,
    "DoubleLongLeftArrow": 10232,
    "DoubleLongLeftRightArrow": 10234,
    "DoubleLongRightArrow": 10233,
    "DoubleRightArrow": 8658,
    "DoubleRightTee": 8872,
    "DoubleUpArrow": 8657,
    "DoubleUpDownArrow": 8661,
    "DoubleVerticalBar": 8741,
    "DownArrowBar": 10515,
    "downarrow": 8595,
    "DownArrow": 8595,
    "Downarrow": 8659,
    "DownArrowUpArrow": 8693,
    "DownBreve": 785,
    "downdownarrows": 8650,
    "downharpoonleft": 8643,
    "downharpoonright": 8642,
    "DownLeftRightVector": 10576,
    "DownLeftTeeVector": 10590,
    "DownLeftVectorBar": 10582,
    "DownLeftVector": 8637,
    "DownRightTeeVector": 10591,
    "DownRightVectorBar": 10583,
    "DownRightVector": 8641,
    "DownTeeArrow": 8615,
    "DownTee": 8868,
    "drbkarow": 10512,
    "drcorn": 8991,
    "drcrop": 8972,
    "Dscr": 119967,
    "dscr": 119993,
    "DScy": 1029,
    "dscy": 1109,
    "dsol": 10742,
    "Dstrok": 272,
    "dstrok": 273,
    "dtdot": 8945,
    "dtri": 9663,
    "dtrif": 9662,
    "duarr": 8693,
    "duhar": 10607,
    "dwangle": 10662,
    "DZcy": 1039,
    "dzcy": 1119,
    "dzigrarr": 10239,
    "Eacute": 201,
    "Eacut": 201,
    "eacute": 233,
    "eacut": 233,
    "easter": 10862,
    "Ecaron": 282,
    "ecaron": 283,
    "Ecirc": 202,
    "Ecir": 202,
    "ecirc": 234,
    "ecir": 8790,
    "ecolon": 8789,
    "Ecy": 1069,
    "ecy": 1101,
    "eDDot": 10871,
    "Edot": 278,
    "edot": 279,
    "eDot": 8785,
    "ee": 8519,
    "efDot": 8786,
    "Efr": 120072,
    "efr": 120098,
    "eg": 10906,
    "Egrave": 200,
    "Egrav": 200,
    "egrave": 232,
    "egrav": 232,
    "egs": 10902,
    "egsdot": 10904,
    "el": 10905,
    "Element": 8712,
    "elinters": 9191,
    "ell": 8467,
    "els": 10901,
    "elsdot": 10903,
    "Emacr": 274,
    "emacr": 275,
    "empty": 8709,
    "emptyset": 8709,
    "EmptySmallSquare": 9723,
    "emptyv": 8709,
    "EmptyVerySmallSquare": 9643,
    "emsp13": 8196,
    "emsp14": 8197,
    "emsp": 8195,
    "ENG": 330,
    "eng": 331,
    "ensp": 8194,
    "Eogon": 280,
    "eogon": 281,
    "Eopf": 120124,
    "eopf": 120150,
    "epar": 8917,
    "eparsl": 10723,
    "eplus": 10865,
    "epsi": 949,
    "Epsilon": 917,
    "epsilon": 949,
    "epsiv": 1013,
    "eqcirc": 8790,
    "eqcolon": 8789,
    "eqsim": 8770,
    "eqslantgtr": 10902,
    "eqslantless": 10901,
    "Equal": 10869,
    "equals": 61,
    "EqualTilde": 8770,
    "equest": 8799,
    "Equilibrium": 8652,
    "equiv": 8801,
    "equivDD": 10872,
    "eqvparsl": 10725,
    "erarr": 10609,
    "erDot": 8787,
    "escr": 8495,
    "Escr": 8496,
    "esdot": 8784,
    "Esim": 10867,
    "esim": 8770,
    "Eta": 919,
    "eta": 951,
    "ETH": 208,
    "ET": 208,
    "eth": 240,
    "et": 240,
    "Euml": 203,
    "Eum": 203,
    "euml": 235,
    "eum": 235,
    "euro": 8364,
    "excl": 33,
    "exist": 8707,
    "Exists": 8707,
    "expectation": 8496,
    "exponentiale": 8519,
    "ExponentialE": 8519,
    "fallingdotseq": 8786,
    "Fcy": 1060,
    "fcy": 1092,
    "female": 9792,
    "ffilig": 64259,
    "fflig": 64256,
    "ffllig": 64260,
    "Ffr": 120073,
    "ffr": 120099,
    "filig": 64257,
    "FilledSmallSquare": 9724,
    "FilledVerySmallSquare": 9642,
    "fjlig": 102,
    "flat": 9837,
    "fllig": 64258,
    "fltns": 9649,
    "fnof": 402,
    "Fopf": 120125,
    "fopf": 120151,
    "forall": 8704,
    "ForAll": 8704,
    "fork": 8916,
    "forkv": 10969,
    "Fouriertrf": 8497,
    "fpartint": 10765,
    "frac12": 189,
    "frac1": 188,
    "frac13": 8531,
    "frac14": 188,
    "frac15": 8533,
    "frac16": 8537,
    "frac18": 8539,
    "frac23": 8532,
    "frac25": 8534,
    "frac34": 190,
    "frac3": 190,
    "frac35": 8535,
    "frac38": 8540,
    "frac45": 8536,
    "frac56": 8538,
    "frac58": 8541,
    "frac78": 8542,
    "frasl": 8260,
    "frown": 8994,
    "fscr": 119995,
    "Fscr": 8497,
    "gacute": 501,
    "Gamma": 915,
    "gamma": 947,
    "Gammad": 988,
    "gammad": 989,
    "gap": 10886,
    "Gbreve": 286,
    "gbreve": 287,
    "Gcedil": 290,
    "Gcirc": 284,
    "gcirc": 285,
    "Gcy": 1043,
    "gcy": 1075,
    "Gdot": 288,
    "gdot": 289,
    "ge": 8805,
    "gE": 8807,
    "gEl": 10892,
    "gel": 8923,
    "geq": 8805,
    "geqq": 8807,
    "geqslant": 10878,
    "gescc": 10921,
    "ges": 10878,
    "gesdot": 10880,
    "gesdoto": 10882,
    "gesdotol": 10884,
    "gesl": 8923,
    "gesles": 10900,
    "Gfr": 120074,
    "gfr": 120100,
    "gg": 8811,
    "Gg": 8921,
    "ggg": 8921,
    "gimel": 8503,
    "GJcy": 1027,
    "gjcy": 1107,
    "gla": 10917,
    "gl": 8823,
    "glE": 10898,
    "glj": 10916,
    "gnap": 10890,
    "gnapprox": 10890,
    "gne": 10888,
    "gnE": 8809,
    "gneq": 10888,
    "gneqq": 8809,
    "gnsim": 8935,
    "Gopf": 120126,
    "gopf": 120152,
    "grave": 96,
    "GreaterEqual": 8805,
    "GreaterEqualLess": 8923,
    "GreaterFullEqual": 8807,
    "GreaterGreater": 10914,
    "GreaterLess": 8823,
    "GreaterSlantEqual": 10878,
    "GreaterTilde": 8819,
    "Gscr": 119970,
    "gscr": 8458,
    "gsim": 8819,
    "gsime": 10894,
    "gsiml": 10896,
    "gtcc": 10919,
    "gtcir": 10874,
    "gt": 62,
    "g": 62,
    "GT": 62,
    "G": 62,
    "Gt": 8811,
    "gtdot": 8919,
    "gtlPar": 10645,
    "gtquest": 10876,
    "gtrapprox": 10886,
    "gtrarr": 10616,
    "gtrdot": 8919,
    "gtreqless": 8923,
    "gtreqqless": 10892,
    "gtrless": 8823,
    "gtrsim": 8819,
    "gvertneqq": 8809,
    "gvnE": 8809,
    "Hacek": 711,
    "hairsp": 8202,
    "half": 189,
    "hamilt": 8459,
    "HARDcy": 1066,
    "hardcy": 1098,
    "harrcir": 10568,
    "harr": 8596,
    "hArr": 8660,
    "harrw": 8621,
    "Hat": 94,
    "hbar": 8463,
    "Hcirc": 292,
    "hcirc": 293,
    "hearts": 9829,
    "heartsuit": 9829,
    "hellip": 8230,
    "hercon": 8889,
    "hfr": 120101,
    "Hfr": 8460,
    "HilbertSpace": 8459,
    "hksearow": 10533,
    "hkswarow": 10534,
    "hoarr": 8703,
    "homtht": 8763,
    "hookleftarrow": 8617,
    "hookrightarrow": 8618,
    "hopf": 120153,
    "Hopf": 8461,
    "horbar": 8213,
    "HorizontalLine": 9472,
    "hscr": 119997,
    "Hscr": 8459,
    "hslash": 8463,
    "Hstrok": 294,
    "hstrok": 295,
    "HumpDownHump": 8782,
    "HumpEqual": 8783,
    "hybull": 8259,
    "hyphen": 8208,
    "Iacute": 205,
    "Iacut": 205,
    "iacute": 237,
    "iacut": 237,
    "ic": 8291,
    "Icirc": 206,
    "Icir": 206,
    "icirc": 238,
    "icir": 238,
    "Icy": 1048,
    "icy": 1080,
    "Idot": 304,
    "IEcy": 1045,
    "iecy": 1077,
    "iexcl": 161,
    "iexc": 161,
    "iff": 8660,
    "ifr": 120102,
    "Ifr": 8465,
    "Igrave": 204,
    "Igrav": 204,
    "igrave": 236,
    "igrav": 236,
    "ii": 8520,
    "iiiint": 10764,
    "iiint": 8749,
    "iinfin": 10716,
    "iiota": 8489,
    "IJlig": 306,
    "ijlig": 307,
    "Imacr": 298,
    "imacr": 299,
    "image": 8465,
    "ImaginaryI": 8520,
    "imagline": 8464,
    "imagpart": 8465,
    "imath": 305,
    "Im": 8465,
    "imof": 8887,
    "imped": 437,
    "Implies": 8658,
    "incare": 8453,
    "in": 8712,
    "infin": 8734,
    "infintie": 10717,
    "inodot": 305,
    "intcal": 8890,
    "int": 8747,
    "Int": 8748,
    "integers": 8484,
    "Integral": 8747,
    "intercal": 8890,
    "Intersection": 8898,
    "intlarhk": 10775,
    "intprod": 10812,
    "InvisibleComma": 8291,
    "InvisibleTimes": 8290,
    "IOcy": 1025,
    "iocy": 1105,
    "Iogon": 302,
    "iogon": 303,
    "Iopf": 120128,
    "iopf": 120154,
    "Iota": 921,
    "iota": 953,
    "iprod": 10812,
    "iquest": 191,
    "iques": 191,
    "iscr": 119998,
    "Iscr": 8464,
    "isin": 8712,
    "isindot": 8949,
    "isinE": 8953,
    "isins": 8948,
    "isinsv": 8947,
    "isinv": 8712,
    "it": 8290,
    "Itilde": 296,
    "itilde": 297,
    "Iukcy": 1030,
    "iukcy": 1110,
    "Iuml": 207,
    "Ium": 207,
    "iuml": 239,
    "ium": 239,
    "Jcirc": 308,
    "jcirc": 309,
    "Jcy": 1049,
    "jcy": 1081,
    "Jfr": 120077,
    "jfr": 120103,
    "jmath": 567,
    "Jopf": 120129,
    "jopf": 120155,
    "Jscr": 119973,
    "jscr": 119999,
    "Jsercy": 1032,
    "jsercy": 1112,
    "Jukcy": 1028,
    "jukcy": 1108,
    "Kappa": 922,
    "kappa": 954,
    "kappav": 1008,
    "Kcedil": 310,
    "kcedil": 311,
    "Kcy": 1050,
    "kcy": 1082,
    "Kfr": 120078,
    "kfr": 120104,
    "kgreen": 312,
    "KHcy": 1061,
    "khcy": 1093,
    "KJcy": 1036,
    "kjcy": 1116,
    "Kopf": 120130,
    "kopf": 120156,
    "Kscr": 119974,
    "kscr": 120000,
    "lAarr": 8666,
    "Lacute": 313,
    "lacute": 314,
    "laemptyv": 10676,
    "lagran": 8466,
    "Lambda": 923,
    "lambda": 955,
    "lang": 10216,
    "Lang": 10218,
    "langd": 10641,
    "langle": 10216,
    "lap": 10885,
    "Laplacetrf": 8466,
    "laquo": 171,
    "laqu": 171,
    "larrb": 8676,
    "larrbfs": 10527,
    "larr": 8592,
    "Larr": 8606,
    "lArr": 8656,
    "larrfs": 10525,
    "larrhk": 8617,
    "larrlp": 8619,
    "larrpl": 10553,
    "larrsim": 10611,
    "larrtl": 8610,
    "latail": 10521,
    "lAtail": 10523,
    "lat": 10923,
    "late": 10925,
    "lates": 10925,
    "lbarr": 10508,
    "lBarr": 10510,
    "lbbrk": 10098,
    "lbrace": 123,
    "lbrack": 91,
    "lbrke": 10635,
    "lbrksld": 10639,
    "lbrkslu": 10637,
    "Lcaron": 317,
    "lcaron": 318,
    "Lcedil": 315,
    "lcedil": 316,
    "lceil": 8968,
    "lcub": 123,
    "Lcy": 1051,
    "lcy": 1083,
    "ldca": 10550,
    "ldquo": 8220,
    "ldquor": 8222,
    "ldrdhar": 10599,
    "ldrushar": 10571,
    "ldsh": 8626,
    "le": 8804,
    "lE": 8806,
    "LeftAngleBracket": 10216,
    "LeftArrowBar": 8676,
    "leftarrow": 8592,
    "LeftArrow": 8592,
    "Leftarrow": 8656,
    "LeftArrowRightArrow": 8646,
    "leftarrowtail": 8610,
    "LeftCeiling": 8968,
    "LeftDoubleBracket": 10214,
    "LeftDownTeeVector": 10593,
    "LeftDownVectorBar": 10585,
    "LeftDownVector": 8643,
    "LeftFloor": 8970,
    "leftharpoondown": 8637,
    "leftharpoonup": 8636,
    "leftleftarrows": 8647,
    "leftrightarrow": 8596,
    "LeftRightArrow": 8596,
    "Leftrightarrow": 8660,
    "leftrightarrows": 8646,
    "leftrightharpoons": 8651,
    "leftrightsquigarrow": 8621,
    "LeftRightVector": 10574,
    "LeftTeeArrow": 8612,
    "LeftTee": 8867,
    "LeftTeeVector": 10586,
    "leftthreetimes": 8907,
    "LeftTriangleBar": 10703,
    "LeftTriangle": 8882,
    "LeftTriangleEqual": 8884,
    "LeftUpDownVector": 10577,
    "LeftUpTeeVector": 10592,
    "LeftUpVectorBar": 10584,
    "LeftUpVector": 8639,
    "LeftVectorBar": 10578,
    "LeftVector": 8636,
    "lEg": 10891,
    "leg": 8922,
    "leq": 8804,
    "leqq": 8806,
    "leqslant": 10877,
    "lescc": 10920,
    "les": 10877,
    "lesdot": 10879,
    "lesdoto": 10881,
    "lesdotor": 10883,
    "lesg": 8922,
    "lesges": 10899,
    "lessapprox": 10885,
    "lessdot": 8918,
    "lesseqgtr": 8922,
    "lesseqqgtr": 10891,
    "LessEqualGreater": 8922,
    "LessFullEqual": 8806,
    "LessGreater": 8822,
    "lessgtr": 8822,
    "LessLess": 10913,
    "lesssim": 8818,
    "LessSlantEqual": 10877,
    "LessTilde": 8818,
    "lfisht": 10620,
    "lfloor": 8970,
    "Lfr": 120079,
    "lfr": 120105,
    "lg": 8822,
    "lgE": 10897,
    "lHar": 10594,
    "lhard": 8637,
    "lharu": 8636,
    "lharul": 10602,
    "lhblk": 9604,
    "LJcy": 1033,
    "ljcy": 1113,
    "llarr": 8647,
    "ll": 8810,
    "Ll": 8920,
    "llcorner": 8990,
    "Lleftarrow": 8666,
    "llhard": 10603,
    "lltri": 9722,
    "Lmidot": 319,
    "lmidot": 320,
    "lmoustache": 9136,
    "lmoust": 9136,
    "lnap": 10889,
    "lnapprox": 10889,
    "lne": 10887,
    "lnE": 8808,
    "lneq": 10887,
    "lneqq": 8808,
    "lnsim": 8934,
    "loang": 10220,
    "loarr": 8701,
    "lobrk": 10214,
    "longleftarrow": 10229,
    "LongLeftArrow": 10229,
    "Longleftarrow": 10232,
    "longleftrightarrow": 10231,
    "LongLeftRightArrow": 10231,
    "Longleftrightarrow": 10234,
    "longmapsto": 10236,
    "longrightarrow": 10230,
    "LongRightArrow": 10230,
    "Longrightarrow": 10233,
    "looparrowleft": 8619,
    "looparrowright": 8620,
    "lopar": 10629,
    "Lopf": 120131,
    "lopf": 120157,
    "loplus": 10797,
    "lotimes": 10804,
    "lowast": 8727,
    "lowbar": 95,
    "LowerLeftArrow": 8601,
    "LowerRightArrow": 8600,
    "loz": 9674,
    "lozenge": 9674,
    "lozf": 10731,
    "lpar": 40,
    "lparlt": 10643,
    "lrarr": 8646,
    "lrcorner": 8991,
    "lrhar": 8651,
    "lrhard": 10605,
    "lrm": 8206,
    "lrtri": 8895,
    "lsaquo": 8249,
    "lscr": 120001,
    "Lscr": 8466,
    "lsh": 8624,
    "Lsh": 8624,
    "lsim": 8818,
    "lsime": 10893,
    "lsimg": 10895,
    "lsqb": 91,
    "lsquo": 8216,
    "lsquor": 8218,
    "Lstrok": 321,
    "lstrok": 322,
    "ltcc": 10918,
    "ltcir": 10873,
    "lt": 60,
    "l": 60,
    "LT": 60,
    "L": 60,
    "Lt": 8810,
    "ltdot": 8918,
    "lthree": 8907,
    "ltimes": 8905,
    "ltlarr": 10614,
    "ltquest": 10875,
    "ltri": 9667,
    "ltrie": 8884,
    "ltrif": 9666,
    "ltrPar": 10646,
    "lurdshar": 10570,
    "luruhar": 10598,
    "lvertneqq": 8808,
    "lvnE": 8808,
    "macr": 175,
    "mac": 175,
    "male": 9794,
    "malt": 10016,
    "maltese": 10016,
    "Map": 10501,
    "map": 8614,
    "mapsto": 8614,
    "mapstodown": 8615,
    "mapstoleft": 8612,
    "mapstoup": 8613,
    "marker": 9646,
    "mcomma": 10793,
    "Mcy": 1052,
    "mcy": 1084,
    "mdash": 8212,
    "mDDot": 8762,
    "measuredangle": 8737,
    "MediumSpace": 8287,
    "Mellintrf": 8499,
    "Mfr": 120080,
    "mfr": 120106,
    "mho": 8487,
    "micro": 181,
    "micr": 181,
    "midast": 42,
    "midcir": 10992,
    "mid": 8739,
    "middot": 183,
    "middo": 183,
    "minusb": 8863,
    "minus": 8722,
    "minusd": 8760,
    "minusdu": 10794,
    "MinusPlus": 8723,
    "mlcp": 10971,
    "mldr": 8230,
    "mnplus": 8723,
    "models": 8871,
    "Mopf": 120132,
    "mopf": 120158,
    "mp": 8723,
    "mscr": 120002,
    "Mscr": 8499,
    "mstpos": 8766,
    "Mu": 924,
    "mu": 956,
    "multimap": 8888,
    "mumap": 8888,
    "nabla": 8711,
    "Nacute": 323,
    "nacute": 324,
    "nang": 8736,
    "nap": 8777,
    "napE": 10864,
    "napid": 8779,
    "napos": 329,
    "napprox": 8777,
    "natural": 9838,
    "naturals": 8469,
    "natur": 9838,
    "nbsp": 160,
    "nbs": 160,
    "nbump": 8782,
    "nbumpe": 8783,
    "ncap": 10819,
    "Ncaron": 327,
    "ncaron": 328,
    "Ncedil": 325,
    "ncedil": 326,
    "ncong": 8775,
    "ncongdot": 10861,
    "ncup": 10818,
    "Ncy": 1053,
    "ncy": 1085,
    "ndash": 8211,
    "nearhk": 10532,
    "nearr": 8599,
    "neArr": 8663,
    "nearrow": 8599,
    "ne": 8800,
    "nedot": 8784,
    "NegativeMediumSpace": 8203,
    "NegativeThickSpace": 8203,
    "NegativeThinSpace": 8203,
    "NegativeVeryThinSpace": 8203,
    "nequiv": 8802,
    "nesear": 10536,
    "nesim": 8770,
    "NestedGreaterGreater": 8811,
    "NestedLessLess": 8810,
    "NewLine": 10,
    "nexist": 8708,
    "nexists": 8708,
    "Nfr": 120081,
    "nfr": 120107,
    "ngE": 8807,
    "nge": 8817,
    "ngeq": 8817,
    "ngeqq": 8807,
    "ngeqslant": 10878,
    "nges": 10878,
    "nGg": 8921,
    "ngsim": 8821,
    "nGt": 8811,
    "ngt": 8815,
    "ngtr": 8815,
    "nGtv": 8811,
    "nharr": 8622,
    "nhArr": 8654,
    "nhpar": 10994,
    "ni": 8715,
    "nis": 8956,
    "nisd": 8954,
    "niv": 8715,
    "NJcy": 1034,
    "njcy": 1114,
    "nlarr": 8602,
    "nlArr": 8653,
    "nldr": 8229,
    "nlE": 8806,
    "nle": 8816,
    "nleftarrow": 8602,
    "nLeftarrow": 8653,
    "nleftrightarrow": 8622,
    "nLeftrightarrow": 8654,
    "nleq": 8816,
    "nleqq": 8806,
    "nleqslant": 10877,
    "nles": 10877,
    "nless": 8814,
    "nLl": 8920,
    "nlsim": 8820,
    "nLt": 8810,
    "nlt": 8814,
    "nltri": 8938,
    "nltrie": 8940,
    "nLtv": 8810,
    "nmid": 8740,
    "NoBreak": 8288,
    "NonBreakingSpace": 160,
    "nopf": 120159,
    "Nopf": 8469,
    "Not": 10988,
    "not": 172,
    "no": 172,
    "NotCongruent": 8802,
    "NotCupCap": 8813,
    "NotDoubleVerticalBar": 8742,
    "NotElement": 8713,
    "NotEqual": 8800,
    "NotEqualTilde": 8770,
    "NotExists": 8708,
    "NotGreater": 8815,
    "NotGreaterEqual": 8817,
    "NotGreaterFullEqual": 8807,
    "NotGreaterGreater": 8811,
    "NotGreaterLess": 8825,
    "NotGreaterSlantEqual": 10878,
    "NotGreaterTilde": 8821,
    "NotHumpDownHump": 8782,
    "NotHumpEqual": 8783,
    "notin": 8713,
    "notindot": 8949,
    "notinE": 8953,
    "notinva": 8713,
    "notinvb": 8951,
    "notinvc": 8950,
    "NotLeftTriangleBar": 10703,
    "NotLeftTriangle": 8938,
    "NotLeftTriangleEqual": 8940,
    "NotLess": 8814,
    "NotLessEqual": 8816,
    "NotLessGreater": 8824,
    "NotLessLess": 8810,
    "NotLessSlantEqual": 10877,
    "NotLessTilde": 8820,
    "NotNestedGreaterGreater": 10914,
    "NotNestedLessLess": 10913,
    "notni": 8716,
    "notniva": 8716,
    "notnivb": 8958,
    "notnivc": 8957,
    "NotPrecedes": 8832,
    "NotPrecedesEqual": 10927,
    "NotPrecedesSlantEqual": 8928,
    "NotReverseElement": 8716,
    "NotRightTriangleBar": 10704,
    "NotRightTriangle": 8939,
    "NotRightTriangleEqual": 8941,
    "NotSquareSubset": 8847,
    "NotSquareSubsetEqual": 8930,
    "NotSquareSuperset": 8848,
    "NotSquareSupersetEqual": 8931,
    "NotSubset": 8834,
    "NotSubsetEqual": 8840,
    "NotSucceeds": 8833,
    "NotSucceedsEqual": 10928,
    "NotSucceedsSlantEqual": 8929,
    "NotSucceedsTilde": 8831,
    "NotSuperset": 8835,
    "NotSupersetEqual": 8841,
    "NotTilde": 8769,
    "NotTildeEqual": 8772,
    "NotTildeFullEqual": 8775,
    "NotTildeTilde": 8777,
    "NotVerticalBar": 8740,
    "nparallel": 8742,
    "npar": 8742,
    "nparsl": 11005,
    "npart": 8706,
    "npolint": 10772,
    "npr": 8832,
    "nprcue": 8928,
    "nprec": 8832,
    "npreceq": 10927,
    "npre": 10927,
    "nrarrc": 10547,
    "nrarr": 8603,
    "nrArr": 8655,
    "nrarrw": 8605,
    "nrightarrow": 8603,
    "nRightarrow": 8655,
    "nrtri": 8939,
    "nrtrie": 8941,
    "nsc": 8833,
    "nsccue": 8929,
    "nsce": 10928,
    "Nscr": 119977,
    "nscr": 120003,
    "nshortmid": 8740,
    "nshortparallel": 8742,
    "nsim": 8769,
    "nsime": 8772,
    "nsimeq": 8772,
    "nsmid": 8740,
    "nspar": 8742,
    "nsqsube": 8930,
    "nsqsupe": 8931,
    "nsub": 8836,
    "nsubE": 10949,
    "nsube": 8840,
    "nsubset": 8834,
    "nsubseteq": 8840,
    "nsubseteqq": 10949,
    "nsucc": 8833,
    "nsucceq": 10928,
    "nsup": 8837,
    "nsupE": 10950,
    "nsupe": 8841,
    "nsupset": 8835,
    "nsupseteq": 8841,
    "nsupseteqq": 10950,
    "ntgl": 8825,
    "Ntilde": 209,
    "Ntild": 209,
    "ntilde": 241,
    "ntild": 241,
    "ntlg": 8824,
    "ntriangleleft": 8938,
    "ntrianglelefteq": 8940,
    "ntriangleright": 8939,
    "ntrianglerighteq": 8941,
    "Nu": 925,
    "nu": 957,
    "num": 35,
    "numero": 8470,
    "numsp": 8199,
    "nvap": 8781,
    "nvdash": 8876,
    "nvDash": 8877,
    "nVdash": 8878,
    "nVDash": 8879,
    "nvge": 8805,
    "nvgt": 62,
    "nvHarr": 10500,
    "nvinfin": 10718,
    "nvlArr": 10498,
    "nvle": 8804,
    "nvlt": 60,
    "nvltrie": 8884,
    "nvrArr": 10499,
    "nvrtrie": 8885,
    "nvsim": 8764,
    "nwarhk": 10531,
    "nwarr": 8598,
    "nwArr": 8662,
    "nwarrow": 8598,
    "nwnear": 10535,
    "Oacute": 211,
    "Oacut": 211,
    "oacute": 243,
    "oacut": 243,
    "oast": 8859,
    "Ocirc": 212,
    "Ocir": 212,
    "ocirc": 244,
    "ocir": 8858,
    "Ocy": 1054,
    "ocy": 1086,
    "odash": 8861,
    "Odblac": 336,
    "odblac": 337,
    "odiv": 10808,
    "odot": 8857,
    "odsold": 10684,
    "OElig": 338,
    "oelig": 339,
    "ofcir": 10687,
    "Ofr": 120082,
    "ofr": 120108,
    "ogon": 731,
    "Ograve": 210,
    "Ograv": 210,
    "ograve": 242,
    "ograv": 242,
    "ogt": 10689,
    "ohbar": 10677,
    "ohm": 937,
    "oint": 8750,
    "olarr": 8634,
    "olcir": 10686,
    "olcross": 10683,
    "oline": 8254,
    "olt": 10688,
    "Omacr": 332,
    "omacr": 333,
    "Omega": 937,
    "omega": 969,
    "Omicron": 927,
    "omicron": 959,
    "omid": 10678,
    "ominus": 8854,
    "Oopf": 120134,
    "oopf": 120160,
    "opar": 10679,
    "OpenCurlyDoubleQuote": 8220,
    "OpenCurlyQuote": 8216,
    "operp": 10681,
    "oplus": 8853,
    "orarr": 8635,
    "Or": 10836,
    "or": 8744,
    "ord": 186,
    "order": 8500,
    "orderof": 8500,
    "ordf": 170,
    "ordm": 186,
    "origof": 8886,
    "oror": 10838,
    "orslope": 10839,
    "orv": 10843,
    "oS": 9416,
    "Oscr": 119978,
    "oscr": 8500,
    "Oslash": 216,
    "Oslas": 216,
    "oslash": 248,
    "oslas": 248,
    "osol": 8856,
    "Otilde": 213,
    "Otild": 213,
    "otilde": 245,
    "otild": 245,
    "otimesas": 10806,
    "Otimes": 10807,
    "otimes": 8855,
    "Ouml": 214,
    "Oum": 214,
    "ouml": 246,
    "oum": 246,
    "ovbar": 9021,
    "OverBar": 8254,
    "OverBrace": 9182,
    "OverBracket": 9140,
    "OverParenthesis": 9180,
    "para": 182,
    "par": 8741,
    "parallel": 8741,
    "parsim": 10995,
    "parsl": 11005,
    "part": 8706,
    "PartialD": 8706,
    "Pcy": 1055,
    "pcy": 1087,
    "percnt": 37,
    "period": 46,
    "permil": 8240,
    "perp": 8869,
    "pertenk": 8241,
    "Pfr": 120083,
    "pfr": 120109,
    "Phi": 934,
    "phi": 966,
    "phiv": 981,
    "phmmat": 8499,
    "phone": 9742,
    "Pi": 928,
    "pi": 960,
    "pitchfork": 8916,
    "piv": 982,
    "planck": 8463,
    "planckh": 8462,
    "plankv": 8463,
    "plusacir": 10787,
    "plusb": 8862,
    "pluscir": 10786,
    "plus": 43,
    "plusdo": 8724,
    "plusdu": 10789,
    "pluse": 10866,
    "PlusMinus": 177,
    "plusmn": 177,
    "plusm": 177,
    "plussim": 10790,
    "plustwo": 10791,
    "pm": 177,
    "Poincareplane": 8460,
    "pointint": 10773,
    "popf": 120161,
    "Popf": 8473,
    "pound": 163,
    "poun": 163,
    "prap": 10935,
    "Pr": 10939,
    "pr": 8826,
    "prcue": 8828,
    "precapprox": 10935,
    "prec": 8826,
    "preccurlyeq": 8828,
    "Precedes": 8826,
    "PrecedesEqual": 10927,
    "PrecedesSlantEqual": 8828,
    "PrecedesTilde": 8830,
    "preceq": 10927,
    "precnapprox": 10937,
    "precneqq": 10933,
    "precnsim": 8936,
    "pre": 10927,
    "prE": 10931,
    "precsim": 8830,
    "prime": 8242,
    "Prime": 8243,
    "primes": 8473,
    "prnap": 10937,
    "prnE": 10933,
    "prnsim": 8936,
    "prod": 8719,
    "Product": 8719,
    "profalar": 9006,
    "profline": 8978,
    "profsurf": 8979,
    "prop": 8733,
    "Proportional": 8733,
    "Proportion": 8759,
    "propto": 8733,
    "prsim": 8830,
    "prurel": 8880,
    "Pscr": 119979,
    "pscr": 120005,
    "Psi": 936,
    "psi": 968,
    "puncsp": 8200,
    "Qfr": 120084,
    "qfr": 120110,
    "qint": 10764,
    "qopf": 120162,
    "Qopf": 8474,
    "qprime": 8279,
    "Qscr": 119980,
    "qscr": 120006,
    "quaternions": 8461,
    "quatint": 10774,
    "quest": 63,
    "questeq": 8799,
    "quot": 34,
    "quo": 34,
    "QUOT": 34,
    "QUO": 34,
    "rAarr": 8667,
    "race": 8765,
    "Racute": 340,
    "racute": 341,
    "radic": 8730,
    "raemptyv": 10675,
    "rang": 10217,
    "Rang": 10219,
    "rangd": 10642,
    "range": 10661,
    "rangle": 10217,
    "raquo": 187,
    "raqu": 187,
    "rarrap": 10613,
    "rarrb": 8677,
    "rarrbfs": 10528,
    "rarrc": 10547,
    "rarr": 8594,
    "Rarr": 8608,
    "rArr": 8658,
    "rarrfs": 10526,
    "rarrhk": 8618,
    "rarrlp": 8620,
    "rarrpl": 10565,
    "rarrsim": 10612,
    "Rarrtl": 10518,
    "rarrtl": 8611,
    "rarrw": 8605,
    "ratail": 10522,
    "rAtail": 10524,
    "ratio": 8758,
    "rationals": 8474,
    "rbarr": 10509,
    "rBarr": 10511,
    "RBarr": 10512,
    "rbbrk": 10099,
    "rbrace": 125,
    "rbrack": 93,
    "rbrke": 10636,
    "rbrksld": 10638,
    "rbrkslu": 10640,
    "Rcaron": 344,
    "rcaron": 345,
    "Rcedil": 342,
    "rcedil": 343,
    "rceil": 8969,
    "rcub": 125,
    "Rcy": 1056,
    "rcy": 1088,
    "rdca": 10551,
    "rdldhar": 10601,
    "rdquo": 8221,
    "rdquor": 8221,
    "rdsh": 8627,
    "real": 8476,
    "realine": 8475,
    "realpart": 8476,
    "reals": 8477,
    "Re": 8476,
    "rect": 9645,
    "reg": 174,
    "re": 174,
    "REG": 174,
    "RE": 174,
    "ReverseElement": 8715,
    "ReverseEquilibrium": 8651,
    "ReverseUpEquilibrium": 10607,
    "rfisht": 10621,
    "rfloor": 8971,
    "rfr": 120111,
    "Rfr": 8476,
    "rHar": 10596,
    "rhard": 8641,
    "rharu": 8640,
    "rharul": 10604,
    "Rho": 929,
    "rho": 961,
    "rhov": 1009,
    "RightAngleBracket": 10217,
    "RightArrowBar": 8677,
    "rightarrow": 8594,
    "RightArrow": 8594,
    "Rightarrow": 8658,
    "RightArrowLeftArrow": 8644,
    "rightarrowtail": 8611,
    "RightCeiling": 8969,
    "RightDoubleBracket": 10215,
    "RightDownTeeVector": 10589,
    "RightDownVectorBar": 10581,
    "RightDownVector": 8642,
    "RightFloor": 8971,
    "rightharpoondown": 8641,
    "rightharpoonup": 8640,
    "rightleftarrows": 8644,
    "rightleftharpoons": 8652,
    "rightrightarrows": 8649,
    "rightsquigarrow": 8605,
    "RightTeeArrow": 8614,
    "RightTee": 8866,
    "RightTeeVector": 10587,
    "rightthreetimes": 8908,
    "RightTriangleBar": 10704,
    "RightTriangle": 8883,
    "RightTriangleEqual": 8885,
    "RightUpDownVector": 10575,
    "RightUpTeeVector": 10588,
    "RightUpVectorBar": 10580,
    "RightUpVector": 8638,
    "RightVectorBar": 10579,
    "RightVector": 8640,
    "ring": 730,
    "risingdotseq": 8787,
    "rlarr": 8644,
    "rlhar": 8652,
    "rlm": 8207,
    "rmoustache": 9137,
    "rmoust": 9137,
    "rnmid": 10990,
    "roang": 10221,
    "roarr": 8702,
    "robrk": 10215,
    "ropar": 10630,
    "ropf": 120163,
    "Ropf": 8477,
    "roplus": 10798,
    "rotimes": 10805,
    "RoundImplies": 10608,
    "rpar": 41,
    "rpargt": 10644,
    "rppolint": 10770,
    "rrarr": 8649,
    "Rrightarrow": 8667,
    "rsaquo": 8250,
    "rscr": 120007,
    "Rscr": 8475,
    "rsh": 8625,
    "Rsh": 8625,
    "rsqb": 93,
    "rsquo": 8217,
    "rsquor": 8217,
    "rthree": 8908,
    "rtimes": 8906,
    "rtri": 9657,
    "rtrie": 8885,
    "rtrif": 9656,
    "rtriltri": 10702,
    "RuleDelayed": 10740,
    "ruluhar": 10600,
    "rx": 8478,
    "Sacute": 346,
    "sacute": 347,
    "sbquo": 8218,
    "scap": 10936,
    "Scaron": 352,
    "scaron": 353,
    "Sc": 10940,
    "sc": 8827,
    "sccue": 8829,
    "sce": 10928,
    "scE": 10932,
    "Scedil": 350,
    "scedil": 351,
    "Scirc": 348,
    "scirc": 349,
    "scnap": 10938,
    "scnE": 10934,
    "scnsim": 8937,
    "scpolint": 10771,
    "scsim": 8831,
    "Scy": 1057,
    "scy": 1089,
    "sdotb": 8865,
    "sdot": 8901,
    "sdote": 10854,
    "searhk": 10533,
    "searr": 8600,
    "seArr": 8664,
    "searrow": 8600,
    "sect": 167,
    "sec": 167,
    "semi": 59,
    "seswar": 10537,
    "setminus": 8726,
    "setmn": 8726,
    "sext": 10038,
    "Sfr": 120086,
    "sfr": 120112,
    "sfrown": 8994,
    "sharp": 9839,
    "SHCHcy": 1065,
    "shchcy": 1097,
    "SHcy": 1064,
    "shcy": 1096,
    "ShortDownArrow": 8595,
    "ShortLeftArrow": 8592,
    "shortmid": 8739,
    "shortparallel": 8741,
    "ShortRightArrow": 8594,
    "ShortUpArrow": 8593,
    "shy": 173,
    "sh": 173,
    "Sigma": 931,
    "sigma": 963,
    "sigmaf": 962,
    "sigmav": 962,
    "sim": 8764,
    "simdot": 10858,
    "sime": 8771,
    "simeq": 8771,
    "simg": 10910,
    "simgE": 10912,
    "siml": 10909,
    "simlE": 10911,
    "simne": 8774,
    "simplus": 10788,
    "simrarr": 10610,
    "slarr": 8592,
    "SmallCircle": 8728,
    "smallsetminus": 8726,
    "smashp": 10803,
    "smeparsl": 10724,
    "smid": 8739,
    "smile": 8995,
    "smt": 10922,
    "smte": 10924,
    "smtes": 10924,
    "SOFTcy": 1068,
    "softcy": 1100,
    "solbar": 9023,
    "solb": 10692,
    "sol": 47,
    "Sopf": 120138,
    "sopf": 120164,
    "spades": 9824,
    "spadesuit": 9824,
    "spar": 8741,
    "sqcap": 8851,
    "sqcaps": 8851,
    "sqcup": 8852,
    "sqcups": 8852,
    "Sqrt": 8730,
    "sqsub": 8847,
    "sqsube": 8849,
    "sqsubset": 8847,
    "sqsubseteq": 8849,
    "sqsup": 8848,
    "sqsupe": 8850,
    "sqsupset": 8848,
    "sqsupseteq": 8850,
    "square": 9633,
    "Square": 9633,
    "SquareIntersection": 8851,
    "SquareSubset": 8847,
    "SquareSubsetEqual": 8849,
    "SquareSuperset": 8848,
    "SquareSupersetEqual": 8850,
    "SquareUnion": 8852,
    "squarf": 9642,
    "squ": 9633,
    "squf": 9642,
    "srarr": 8594,
    "Sscr": 119982,
    "sscr": 120008,
    "ssetmn": 8726,
    "ssmile": 8995,
    "sstarf": 8902,
    "Star": 8902,
    "star": 9734,
    "starf": 9733,
    "straightepsilon": 1013,
    "straightphi": 981,
    "strns": 175,
    "sub": 8834,
    "Sub": 8912,
    "subdot": 10941,
    "subE": 10949,
    "sube": 8838,
    "subedot": 10947,
    "submult": 10945,
    "subnE": 10955,
    "subne": 8842,
    "subplus": 10943,
    "subrarr": 10617,
    "subset": 8834,
    "Subset": 8912,
    "subseteq": 8838,
    "subseteqq": 10949,
    "SubsetEqual": 8838,
    "subsetneq": 8842,
    "subsetneqq": 10955,
    "subsim": 10951,
    "subsub": 10965,
    "subsup": 10963,
    "succapprox": 10936,
    "succ": 8827,
    "succcurlyeq": 8829,
    "Succeeds": 8827,
    "SucceedsEqual": 10928,
    "SucceedsSlantEqual": 8829,
    "SucceedsTilde": 8831,
    "succeq": 10928,
    "succnapprox": 10938,
    "succneqq": 10934,
    "succnsim": 8937,
    "succsim": 8831,
    "SuchThat": 8715,
    "sum": 8721,
    "Sum": 8721,
    "sung": 9834,
    "sup1": 185,
    "sup": 8835,
    "sup2": 178,
    "sup3": 179,
    "Sup": 8913,
    "supdot": 10942,
    "supdsub": 10968,
    "supE": 10950,
    "supe": 8839,
    "supedot": 10948,
    "Superset": 8835,
    "SupersetEqual": 8839,
    "suphsol": 10185,
    "suphsub": 10967,
    "suplarr": 10619,
    "supmult": 10946,
    "supnE": 10956,
    "supne": 8843,
    "supplus": 10944,
    "supset": 8835,
    "Supset": 8913,
    "supseteq": 8839,
    "supseteqq": 10950,
    "supsetneq": 8843,
    "supsetneqq": 10956,
    "supsim": 10952,
    "supsub": 10964,
    "supsup": 10966,
    "swarhk": 10534,
    "swarr": 8601,
    "swArr": 8665,
    "swarrow": 8601,
    "swnwar": 10538,
    "szlig": 223,
    "szli": 223,
    "Tab": 9,
    "target": 8982,
    "Tau": 932,
    "tau": 964,
    "tbrk": 9140,
    "Tcaron": 356,
    "tcaron": 357,
    "Tcedil": 354,
    "tcedil": 355,
    "Tcy": 1058,
    "tcy": 1090,
    "tdot": 8411,
    "telrec": 8981,
    "Tfr": 120087,
    "tfr": 120113,
    "there4": 8756,
    "therefore": 8756,
    "Therefore": 8756,
    "Theta": 920,
    "theta": 952,
    "thetasym": 977,
    "thetav": 977,
    "thickapprox": 8776,
    "thicksim": 8764,
    "ThickSpace": 8287,
    "ThinSpace": 8201,
    "thinsp": 8201,
    "thkap": 8776,
    "thksim": 8764,
    "THORN": 222,
    "THOR": 222,
    "thorn": 254,
    "thor": 254,
    "tilde": 732,
    "Tilde": 8764,
    "TildeEqual": 8771,
    "TildeFullEqual": 8773,
    "TildeTilde": 8776,
    "timesbar": 10801,
    "timesb": 8864,
    "times": 215,
    "timesd": 10800,
    "tint": 8749,
    "toea": 10536,
    "topbot": 9014,
    "topcir": 10993,
    "top": 8868,
    "Topf": 120139,
    "topf": 120165,
    "topfork": 10970,
    "tosa": 10537,
    "tprime": 8244,
    "trade": 8482,
    "TRADE": 8482,
    "triangle": 9653,
    "triangledown": 9663,
    "triangleleft": 9667,
    "trianglelefteq": 8884,
    "triangleq": 8796,
    "triangleright": 9657,
    "trianglerighteq": 8885,
    "tridot": 9708,
    "trie": 8796,
    "triminus": 10810,
    "TripleDot": 8411,
    "triplus": 10809,
    "trisb": 10701,
    "tritime": 10811,
    "trpezium": 9186,
    "Tscr": 119983,
    "tscr": 120009,
    "TScy": 1062,
    "tscy": 1094,
    "TSHcy": 1035,
    "tshcy": 1115,
    "Tstrok": 358,
    "tstrok": 359,
    "twixt": 8812,
    "twoheadleftarrow": 8606,
    "twoheadrightarrow": 8608,
    "Uacute": 218,
    "Uacut": 218,
    "uacute": 250,
    "uacut": 250,
    "uarr": 8593,
    "Uarr": 8607,
    "uArr": 8657,
    "Uarrocir": 10569,
    "Ubrcy": 1038,
    "ubrcy": 1118,
    "Ubreve": 364,
    "ubreve": 365,
    "Ucirc": 219,
    "Ucir": 219,
    "ucirc": 251,
    "ucir": 251,
    "Ucy": 1059,
    "ucy": 1091,
    "udarr": 8645,
    "Udblac": 368,
    "udblac": 369,
    "udhar": 10606,
    "ufisht": 10622,
    "Ufr": 120088,
    "ufr": 120114,
    "Ugrave": 217,
    "Ugrav": 217,
    "ugrave": 249,
    "ugrav": 249,
    "uHar": 10595,
    "uharl": 8639,
    "uharr": 8638,
    "uhblk": 9600,
    "ulcorn": 8988,
    "ulcorner": 8988,
    "ulcrop": 8975,
    "ultri": 9720,
    "Umacr": 362,
    "umacr": 363,
    "uml": 168,
    "um": 168,
    "UnderBar": 95,
    "UnderBrace": 9183,
    "UnderBracket": 9141,
    "UnderParenthesis": 9181,
    "Union": 8899,
    "UnionPlus": 8846,
    "Uogon": 370,
    "uogon": 371,
    "Uopf": 120140,
    "uopf": 120166,
    "UpArrowBar": 10514,
    "uparrow": 8593,
    "UpArrow": 8593,
    "Uparrow": 8657,
    "UpArrowDownArrow": 8645,
    "updownarrow": 8597,
    "UpDownArrow": 8597,
    "Updownarrow": 8661,
    "UpEquilibrium": 10606,
    "upharpoonleft": 8639,
    "upharpoonright": 8638,
    "uplus": 8846,
    "UpperLeftArrow": 8598,
    "UpperRightArrow": 8599,
    "upsi": 965,
    "Upsi": 978,
    "upsih": 978,
    "Upsilon": 933,
    "upsilon": 965,
    "UpTeeArrow": 8613,
    "UpTee": 8869,
    "upuparrows": 8648,
    "urcorn": 8989,
    "urcorner": 8989,
    "urcrop": 8974,
    "Uring": 366,
    "uring": 367,
    "urtri": 9721,
    "Uscr": 119984,
    "uscr": 120010,
    "utdot": 8944,
    "Utilde": 360,
    "utilde": 361,
    "utri": 9653,
    "utrif": 9652,
    "uuarr": 8648,
    "Uuml": 220,
    "Uum": 220,
    "uuml": 252,
    "uum": 252,
    "uwangle": 10663,
    "vangrt": 10652,
    "varepsilon": 1013,
    "varkappa": 1008,
    "varnothing": 8709,
    "varphi": 981,
    "varpi": 982,
    "varpropto": 8733,
    "varr": 8597,
    "vArr": 8661,
    "varrho": 1009,
    "varsigma": 962,
    "varsubsetneq": 8842,
    "varsubsetneqq": 10955,
    "varsupsetneq": 8843,
    "varsupsetneqq": 10956,
    "vartheta": 977,
    "vartriangleleft": 8882,
    "vartriangleright": 8883,
    "vBar": 10984,
    "Vbar": 10987,
    "vBarv": 10985,
    "Vcy": 1042,
    "vcy": 1074,
    "vdash": 8866,
    "vDash": 8872,
    "Vdash": 8873,
    "VDash": 8875,
    "Vdashl": 10982,
    "veebar": 8891,
    "vee": 8744,
    "Vee": 8897,
    "veeeq": 8794,
    "vellip": 8942,
    "verbar": 124,
    "Verbar": 8214,
    "vert": 124,
    "Vert": 8214,
    "VerticalBar": 8739,
    "VerticalLine": 124,
    "VerticalSeparator": 10072,
    "VerticalTilde": 8768,
    "VeryThinSpace": 8202,
    "Vfr": 120089,
    "vfr": 120115,
    "vltri": 8882,
    "vnsub": 8834,
    "vnsup": 8835,
    "Vopf": 120141,
    "vopf": 120167,
    "vprop": 8733,
    "vrtri": 8883,
    "Vscr": 119985,
    "vscr": 120011,
    "vsubnE": 10955,
    "vsubne": 8842,
    "vsupnE": 10956,
    "vsupne": 8843,
    "Vvdash": 8874,
    "vzigzag": 10650,
    "Wcirc": 372,
    "wcirc": 373,
    "wedbar": 10847,
    "wedge": 8743,
    "Wedge": 8896,
    "wedgeq": 8793,
    "weierp": 8472,
    "Wfr": 120090,
    "wfr": 120116,
    "Wopf": 120142,
    "wopf": 120168,
    "wp": 8472,
    "wr": 8768,
    "wreath": 8768,
    "Wscr": 119986,
    "wscr": 120012,
    "xcap": 8898,
    "xcirc": 9711,
    "xcup": 8899,
    "xdtri": 9661,
    "Xfr": 120091,
    "xfr": 120117,
    "xharr": 10231,
    "xhArr": 10234,
    "Xi": 926,
    "xi": 958,
    "xlarr": 10229,
    "xlArr": 10232,
    "xmap": 10236,
    "xnis": 8955,
    "xodot": 10752,
    "Xopf": 120143,
    "xopf": 120169,
    "xoplus": 10753,
    "xotime": 10754,
    "xrarr": 10230,
    "xrArr": 10233,
    "Xscr": 119987,
    "xscr": 120013,
    "xsqcup": 10758,
    "xuplus": 10756,
    "xutri": 9651,
    "xvee": 8897,
    "xwedge": 8896,
    "Yacute": 221,
    "Yacut": 221,
    "yacute": 253,
    "yacut": 253,
    "YAcy": 1071,
    "yacy": 1103,
    "Ycirc": 374,
    "ycirc": 375,
    "Ycy": 1067,
    "ycy": 1099,
    "yen": 165,
    "ye": 165,
    "Yfr": 120092,
    "yfr": 120118,
    "YIcy": 1031,
    "yicy": 1111,
    "Yopf": 120144,
    "yopf": 120170,
    "Yscr": 119988,
    "yscr": 120014,
    "YUcy": 1070,
    "yucy": 1102,
    "yuml": 255,
    "yum": 255,
    "Yuml": 376,
    "Zacute": 377,
    "zacute": 378,
    "Zcaron": 381,
    "zcaron": 382,
    "Zcy": 1047,
    "zcy": 1079,
    "Zdot": 379,
    "zdot": 380,
    "zeetrf": 8488,
    "ZeroWidthSpace": 8203,
    "Zeta": 918,
    "zeta": 950,
    "zfr": 120119,
    "Zfr": 8488,
    "ZHcy": 1046,
    "zhcy": 1078,
    "zigrarr": 8669,
    "zopf": 120171,
    "Zopf": 8484,
    "Zscr": 119989,
    "zscr": 120015,
    "zwj": 8205,
    "zwnj": 8204
};
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
        var last_i = this.i;
        var did_step = false;
        // read text as long as not <c... or </...
        while (!this.eof && (!(c1 == 60 && // "<"
            ((c2 == 47) || // "/"
                this.isTagChar(c2, true) || // valid tag char
                (c2 == 33)))) // <! comment start...
        ) {
            if (curr_buff != this.buff) {
                break;
            }
            if (c1 === 38) {
                if (c2 === 35) {
                    // &#
                    intermediate.push(this.buff.substring(sp, this.i));
                    this.step(2);
                    var code = this.collectUntil(59);
                    var cc = parseInt('0' + code);
                    if (isNaN(cc)) {
                        intermediate.push('&#' + code + ';');
                    }
                    else {
                        intermediate.push(String.fromCharCode(cc));
                    }
                    this.step(1);
                    if (this.eof)
                        break;
                    c1 = this.code(0);
                    c2 = this.code(1);
                    sp = this.i;
                    did_step = true;
                }
                else {
                    // named charater references...
                    // store what we have so far...
                    if ((c2 >= 65 && c2 <= 90) || (c2 >= 97 && c2 <= 122)) {
                        intermediate.push(this.buff.substring(sp, this.i));
                        this.step(1);
                        var name_1 = this.collectUntil(59);
                        var cc = namedChars[name_1];
                        if (cc) {
                            intermediate.push(String.fromCharCode(cc));
                        }
                        else {
                            intermediate.push('&' + name_1 + ';');
                        }
                        this.step(1);
                        if (this.eof)
                            break;
                        c1 = this.code(0);
                        c2 = this.code(1);
                        sp = this.i;
                        did_step = true;
                    }
                }
            }
            if (!did_step) {
                c1 = this.step(1);
                if (this.eof)
                    break;
                c2 = this.code(1);
                if (this.eof)
                    break;
                if (curr_buff != this.buff) {
                    break;
                }
            }
            did_step = false;
            curr_buff = this.buff;
        }
        if (intermediate.length > 0) {
            if (start_buff == this.buff) {
                return intermediate.join('') + this.buff.substring(sp, this.i);
            }
            else {
                return intermediate.join('') + start_buff.substring(sp);
            }
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
                    var name_2 = this.collectXMLName();
                    var value = this.collectXMLAttributeValue();
                    callback.setAttribute(name_2, value, this.used_index);
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

},{"./index":1}]},{},[1])(1)
});
