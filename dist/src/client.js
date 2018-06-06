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
//# sourceMappingURL=client.js.map