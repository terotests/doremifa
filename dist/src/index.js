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
//# sourceMappingURL=index.js.map