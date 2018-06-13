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
var Doremifa = require("../src/");
var html = Doremifa.html;
var setState = Doremifa.setState;
var getState = Doremifa.getState;
var someClass = /** @class */ (function (_super) {
    __extends(someClass, _super);
    function someClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    someClass.prototype.render = function () {
        return html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<div>Object test with render()</div>"], ["<div>Object test with render()</div>"])));
    };
    return someClass;
}(Doremifa.drmfComponent));
var obj = new someClass();
function renderType(state) {
    switch (state.type) {
        case 0:
            return 'Just a Text <b>HTML not rendered</b>';
        case 1:
            return ['Array ', html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<b>Of</b> "], ["<b>Of</b> "]))), [3, ' Different elems']];
        case 2:
            return obj;
        case 3:
            return html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["<div>HTML <u>template</u> built with literal</div>"], ["<div>HTML <u>template</u> built with literal</div>"])));
    }
}
// initial state
setState({
    editable: false,
    type: 0,
    time: (new Date).toTimeString(),
    items: [1, 2, 3, 4].map(function (id) { return ({ id: id, name: 'item ' + id }); })
});
var idcnt = 4;
var add_item = function () {
    var state = getState();
    idcnt++;
    setState({
        items: state.items.concat([{ id: idcnt, name: 'item ' + idcnt }])
    });
};
var delete_item = function (item) {
    var state = getState();
    setState({
        items: state.items.filter(function (i) { return i.id != item.id; }).slice()
    });
};
function editable_row(item) {
    return html(templateObject_4 || (templateObject_4 = __makeTemplateObject(["<li ", " class=\"list-group-item\"><input value=", " oninput=", "/><a \nclass=\"btn btn-light float-right\" role=\"button\" href=", ">Edit</a>\n<button type=\"button\" class=\"btn btn-light float-right\" \n  onclick=", "\n>Remove</button>   \n</li>"], ["<li ", " class=\"list-group-item\"><input value=", " oninput=",
        "/><a \nclass=\"btn btn-light float-right\" role=\"button\" href=", ">Edit</a>\n<button type=\"button\" class=\"btn btn-light float-right\" \n  onclick=", "\n>Remove</button>   \n</li>"])), Doremifa.key(item.id), item.name, function (e) {
        item.name = e.target.value;
    }, "#details/id/" + item.id, function (_) { return delete_item(item); });
}
function std_row(item) {
    return html(templateObject_5 || (templateObject_5 = __makeTemplateObject(["<li class=\"list-group-item\">", "</li>"], ["<li class=\"list-group-item\">", "</li>"])), item.name);
}
// &#x20AC;&heartsuit;&#8364;
// mount application into some node
Doremifa.mount(document.body, function (state) {
    return html(templateObject_6 || (templateObject_6 = __makeTemplateObject([" \n\n  <div>Time now is: ", "</div>\n  <a href=\"#\">Show List</a> \n  <a href=\"#page2\">Show Page 2</a>\n  <a href=\"#page3\">Chartest</a>\n  ", "\n</div>\n"], [" \n\n  <div>Time now is: ", "</div>\n  <a href=\"#\">Show List</a> \n  <a href=\"#page2\">Show Page 2</a>\n  <a href=\"#page3\">Chartest</a>\n  ",
        "\n</div>\n"])), state.time, Doremifa.router({
        page3: function () { return html(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n\n    <div>&#x20AC;&heartsuit;&#8364;&time;&times;&auml;&Auml;</div>\n    <h2>&#x20AC;&heartsuit;&#8364;</h2>\n    &#x20AC;&heartsuit;&#8364;&#x20AC;&heartsuit;&#8364;  \n  \n    <svg xmlns=\"http://www.w3.org/2000/svg\"\n      xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n      <rect x=\"10\" y=\"20\" width=\"30\" height=\"20\"/>\n      <text x=\"40\" y=\"20\">&auml;</text>\n    </svg>     \n    "], ["\n\n    <div>&#x20AC;&heartsuit;&#8364;&time;&times;&auml;&Auml;</div>\n    <h2>&#x20AC;&heartsuit;&#8364;</h2>\n    &#x20AC;&heartsuit;&#8364;&#x20AC;&heartsuit;&#8364;  \n  \n    <svg xmlns=\"http://www.w3.org/2000/svg\"\n      xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n      <rect x=\"10\" y=\"20\" width=\"30\" height=\"20\"/>\n      <text x=\"40\" y=\"20\">&auml;</text>\n    </svg>     \n    "]))); },
        // route for #page2 
        page2: function (state) { return html(templateObject_8 || (templateObject_8 = __makeTemplateObject(["<h2>Route for page 2</h2>\n  <!-- table render example -->\n  <table class=\"table\">\n    ", "\n  </table>\n  <div>\n    The state is now \n    <pre>", "</pre>\n  </div>\n"], ["<h2>Route for page 2</h2>\n  <!-- table render example -->\n  <table class=\"table\">\n    ",
            "\n  </table>\n  <div>\n    The state is now \n    <pre>", "</pre>\n  </div>\n"])), [[1, 2], [3, 4]].map(function (tr) {
            return html(templateObject_9 || (templateObject_9 = __makeTemplateObject(["<tr>\n      ", "\n    </tr>"], ["<tr>\n      ", "\n    </tr>"])), tr.map(function (text) { return html(templateObject_10 || (templateObject_10 = __makeTemplateObject(["<td>Cell ", "</td>"], ["<td>Cell ", "</td>"])), text); }));
        }), JSON.stringify(state, null, 2)); },
        // route for #itemlist
        default: function (state) {
            return html(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n   <div>", "</div>\n   ", "\n\n<h2>Items ", " &#x20AC;</h2>\n\n<button type=\"button\" \n class=\"btn btn-primary\" onclick=", ">+ item</button>\n<button type=\"button\" \n class=\"btn btn-warning\" onclick=", ">Reverse</button>\n<button type=\"button\" \n class=\"btn btn-warning\" onclick=", ">", "</button>\n<ul class=\"list-group\">\n        ", "\n</ul>\n"], ["\n   <div>", "</div>\n   ", "\n\n<h2>Items ", " &#x20AC;</h2>\n\n<button type=\"button\" \n class=\"btn btn-primary\" onclick=", ">+ item</button>\n<button type=\"button\" \n class=\"btn btn-warning\" onclick=",
                ">Reverse</button>\n<button type=\"button\" \n class=\"btn btn-warning\" onclick=",
                ">", "</button>\n<ul class=\"list-group\">\n        ",
                "\n</ul>\n"])), [0, 1, 2, 3].map(function (ti) { return html(templateObject_12 || (templateObject_12 = __makeTemplateObject(["<button onclick=", ">type ", "</button>"], ["<button onclick=", ">type ", "</button>"])), function (_) { return setState({ type: ti }); }, ti); }), renderType(state), state.items.length, add_item, function (_) {
                setState({ items: state.items.reverse() });
            }, function (_) {
                setState({ editable: !state.editable });
            }, state.editable ? 'Hide Edits' : 'Toggle Editable', state.items.length ? state.items.map(function (item) {
                return state.editable ? editable_row(item) : std_row(item);
            }) : html(templateObject_13 || (templateObject_13 = __makeTemplateObject(["<li class=\"list-group-item\">List is empty</li>"], ["<li class=\"list-group-item\">List is empty</li>"]))));
        },
        // route for #details/id/xxxx  
        details: function (state) {
            var item = state
                .items.filter(function (item) { return item.id == state.params.id; }).pop();
            return html(templateObject_14 || (templateObject_14 = __makeTemplateObject(["<h2>Item ", "</h2>\n        <input value=", " id=\"name\">\n        <button onclick=", ">Save</button>\n        <button onclick=", ">Delete</button>      "], ["<h2>Item ", "</h2>\n        <input value=", " id=\"name\">\n        <button onclick=",
                ">Save</button>\n        <button onclick=",
                ">Delete</button>      "])), item.id, item.name, function (e, tpl) {
                item.name = tpl.ids.name.value;
                window.location.hash = "#";
            }, function (_) {
                delete_item(item);
                window.location.hash = "#";
            });
        }
    }));
});
// update the clock
setInterval(function (_) {
    setState({ time: (new Date).toTimeString() });
}, 1000);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_7, templateObject_10, templateObject_9, templateObject_8, templateObject_12, templateObject_13, templateObject_11, templateObject_14, templateObject_6;
//# sourceMappingURL=client.js.map