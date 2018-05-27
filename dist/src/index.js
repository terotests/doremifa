"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var escapedHtml = /** @class */ (function () {
    function escapedHtml(value) {
        this.str = value;
    }
    return escapedHtml;
}());
exports.escapedHtml = escapedHtml;
var cache_of = {};
setInterval(function () {
    var keys = Object.keys(cache_of);
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        var o = cache_of[key];
        if (!o.parentNode) {
            delete cache_of[key];
        }
    }
}, 100);
function _dom(str, fn) {
    var cached = cache_of[str];
    if (cached) {
        if (fn) {
            _forElem(cached, fn);
        }
        return cached;
    }
    var elem = document.createElement('div');
    elem.innerHTML = str.trim();
    var v = (cache_of[str] = elem.firstChild);
    elem.removeChild(v);
    if (fn) {
        _forElem(v, fn);
    }
    return v;
}
function _build_dom(str, fn) {
    var elem = document.createElement('div');
    elem.innerHTML = str.trim();
    var v = (cache_of[str] = elem.firstChild);
    if (fn) {
        setTimeout(function () { return _forElem(v, fn); }, 1);
    }
    return v;
}
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
function html(strings) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var results = [];
    var f_values = [];
    var s = "", i = 0;
    for (; i < values.length; i++) {
        var v = values[i];
        if (!isNaN(v)) {
            s += strings[i] + v;
        }
        else {
            s += strings[i] + escapeXml(v);
        }
    }
    s += strings[i];
    return new escapedHtml(s);
}
exports.html = html;
var element_cache = {};
setInterval(function () {
    var keys = Object.keys(element_cache);
    for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
        var key = keys_2[_i];
        var o = element_cache[key];
        if (!o.elem.parentNode) {
            delete element_cache[key];
        }
    }
}, 100);
function element(strings) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var results = [];
    var f_values = [];
    var s = "", i = 0, pcnt = 0;
    var key = strings.join('');
    for (; i < values.length; i++) {
        var v = values[i];
        var is_string = typeof (v) == "string";
        var is_number = !isNaN(v);
        if (typeof (v) == "string" || !isNaN(v)) {
            if (is_string) {
                s += strings[i] + escapeXml(v);
            }
            else {
                s += strings[i] + v;
            }
        }
        else {
            if (v instanceof escapedHtml) {
                s += strings[i] + v.str;
                continue;
            }
            // mapping several elements would be problematic
            if (Array.isArray(v)) {
                var to_join = [];
                for (var _a = 0, v_1 = v; _a < v_1.length; _a++) {
                    var item = v_1[_a];
                    if (item instanceof escapedHtml) {
                        to_join.push(item.str);
                    }
                    else {
                        if (item instanceof Element) {
                            var placeholder = "<div placeholder=\"" + pcnt++ + "\" list=\"placeholders\"></div>";
                            to_join.push(placeholder);
                            f_values.push(item);
                        }
                        else {
                            throw "HTML must be escaped";
                        }
                    }
                }
                s += strings[i] + to_join.join('');
            }
            else {
                if (typeof (v) == "object") {
                    var placeholder = "<div placeholder=\"" + pcnt++ + "\" list=\"placeholders\"></div>";
                    s += strings[i] + placeholder;
                    f_values.push(v);
                }
            }
        }
    }
    s += strings[i];
    s = s.trim();
    var obj;
    var elem;
    var thedom = _dom(s, function (o) {
        obj = element_cache[s] = element_cache[s] || {
            first: true,
            elem: o.elem,
            placeholders: o.placeholders
        };
        elem = o.elem;
        if (obj.placeholders) {
            for (var i_1 = 0; i_1 < f_values.length; i_1++) {
                if (f_values[i_1] && (obj.first || f_values[i_1] !== obj.placeholders[i_1])) {
                    var v = f_values[i_1];
                    if (v.parentNode && (v.parentNode != obj.placeholders[i_1].parentNode)) {
                        // we have to make a copy of this node...
                        console.log('clone');
                        var clone = v.cloneNode(true);
                        obj.placeholders[i_1].parentNode.replaceChild(clone, obj.placeholders[i_1]);
                        obj.placeholders[i_1] = clone;
                    }
                    else {
                        obj.placeholders[i_1].parentNode.replaceChild(f_values[i_1], obj.placeholders[i_1]);
                        obj.placeholders[i_1] = f_values[i_1];
                    }
                }
            }
        }
        obj.first = false;
    });
    return thedom;
}
exports.element = element;
// export let html = element;
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
// reduce( _ => {} )
function reduce(reducer) {
    try {
        app.state = __assign({}, app.state, reducer(app.state));
    }
    catch (e) {
    }
}
exports.reduce = reduce;
function router(routermap) {
    return __awaiter(this, void 0, void 0, function () {
        var page_name, page, phase, last_page;
        return __generator(this, function (_a) {
            page_name = app.state.page || 'default';
            page = routermap[app.state.page || 'default'] || (page_name = 'default', routermap.default);
            phase = 'refresh';
            if (page) {
                if (page_name != app.last_page_name) {
                    last_page = routermap[app.last_page_name];
                    if (last_page) {
                        last_page(__assign({}, app.state, { phase: 'close' }));
                    }
                    phase = 'init';
                }
                app.last_page_name = page_name;
                return [2 /*return*/, page(__assign({}, app.state, { phase: phase }))];
            }
            return [2 /*return*/, element(templateObject_1 || (templateObject_1 = __makeTemplateObject(["route not found"], ["route not found"])))];
        });
    });
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
// initialize app using init function...
function start(root, renderFn, state, options) {
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
        var el, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (b_render_on && (retry_cnt < 5)) {
                        retry_cnt++;
                        return [2 /*return*/];
                    }
                    retry_cnt = 0;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    if (!(last_state != app.state)) return [3 /*break*/, 3];
                    last_state = app.state;
                    b_render_on = true;
                    return [4 /*yield*/, renderFn(app.state)];
                case 2:
                    el = _a.sent();
                    if (!current_node) {
                        root.appendChild(el);
                    }
                    else {
                        if (el != current_node) {
                            current_node.parentNode.replaceChild(el, current_node);
                        }
                    }
                    current_node = el;
                    b_render_on = false;
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    e_1 = _a.sent();
                    console.error(e_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    setInterval(update_application, update_delay);
}
exports.start = start;
var templateObject_1;
//# sourceMappingURL=index.js.map