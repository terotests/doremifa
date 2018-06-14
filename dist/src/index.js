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
var svgTagMap = [
    "a",
    "altGlyph",
    "altGlyphDef",
    "altGlyphItem",
    "animate",
    "animateColor",
    "animateMotion",
    "animateTransform",
    "animation",
    "audio",
    "canvas",
    "circle",
    "clipPath",
    "color-profile",
    "cursor",
    "defs",
    "desc",
    "discard",
    "ellipse",
    "feBlend",
    "feColorMatrix",
    "feComponentTransfer",
    "feComposite",
    "feConvolveMatrix",
    "feDiffuseLighting",
    "feDisplacementMap",
    "feDistantLight",
    "feDropShadow",
    "feFlood",
    "feFuncA",
    "feFuncB",
    "feFuncG",
    "feFuncR",
    "feGaussianBlur",
    "feImage",
    "feMerge",
    "feMergeNode",
    "feMorphology",
    "feOffset",
    "fePointLight",
    "feSpecularLighting",
    "feSpotLight",
    "feTile",
    "feTurbulence",
    "filter",
    "font",
    "font-face",
    "font-face-format",
    "font-face-name",
    "font-face-src",
    "font-face-uri",
    "foreignObject",
    "g",
    "glyph",
    "glyphRef",
    "handler",
    "hatch",
    "hatchpath",
    "hkern",
    "iframe",
    "image",
    "line",
    "linearGradient",
    "listener",
    "marker",
    "mask",
    "mesh",
    "meshgradient",
    "meshpatch",
    "meshrow",
    "metadata",
    "missing-glyph",
    "mpath",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "prefetch",
    "radialGradient",
    "rect",
    "script",
    "set",
    "solidColor",
    "solidcolor",
    "stop",
    "style",
    "svg",
    "switch",
    "symbol",
    "tbreak",
    "text",
    "textArea",
    "textPath",
    "title",
    "tref",
    "tspan",
    "unknown",
    "use",
    "video",
    "view",
    "vkern"
].reduce(function (prev, curr) {
    return (__assign({}, prev, (_a = {}, _a[curr] = true, _a)));
    var _a;
}, {});
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
                if (svgTagMap[name])
                    is_svg = true;
                switch (name) {
                    case "script":
                        activeNode = document.createElement(name);
                        return;
                    case "svg":
                        new_node = document.createElementNS(svgNS, "svg");
                        is_svg = true;
                        break;
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
    var b_render_on = false;
    var last_state;
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
//# sourceMappingURL=index.js.map