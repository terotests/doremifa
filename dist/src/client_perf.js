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
// BTW.
// https://parceljs.org/
var helloComponent = /** @class */ (function (_super) {
    __extends(helloComponent, _super);
    function helloComponent(initValue) {
        var _this = _super.call(this) || this;
        _this.cnt = 0;
        _this.txt = 'Hello World from Component';
        _this.cnt = initValue;
        setInterval(function () {
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
        // is the component just updated with some new parameters ? 
        return index_1.drmf(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    <div>\n      <h1>Hello World!</h1>\n        <ul >\n          ", "\n        </ul>\n      </div>\n    </div>\n    "], ["\n    <div>\n      <h1>Hello World!</h1>\n        <ul >\n          ", "\n        </ul>\n      </div>\n    </div>\n    "])), this.myList.map(function (item, idx) { return index_1.drmf(templateObject_4 || (templateObject_4 = __makeTemplateObject(["<li >item ", "</li>"], ["<li >item ", "</li>"])), item + ''); }));
    };
    return testComponent;
}(index_1.drmfComponent));
exports.testComponent = testComponent;
console.time('xml parser');
var _loop_1 = function (i) {
    var size = 100;
    var el_style = "position:absolute;left:" + (i + '') + "px;top:" + i * 450 + "px;";
    // ? list of dynamic elements may have to be diffed
    // element 1 -> template + values
    // -> the event handlers will be different
    // -> possibly rebind always to the actual DOM
    // --> the DOM tree
    // --> set the value for each position 
    // --> each of the templates are re-rendered and rendering is re-used
    // NOTE: cache key will be strings + the slots...
    // must be exactly the same template so can use the same DOM view...
    //  1) what if the position of the template changes in the array ? 
    //  2) must walk the array of templates and insert to new position
    // What if there is some field which is edited <textarea></textarea>
    // 
    // could implement some local states if wants...
    var state = {};
    // The function which creates the object...
    var obj = new testComponent();
    console.log(obj);
    var items = obj.toDom();
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        document.body.appendChild(item);
    }
    for (var i_1 = 0; i_1 < 1000; i_1++) {
        obj.myList.push(i_1);
    }
    setInterval(function () {
        obj.myList.splice(0, 1);
        var items2 = obj.toDom();
        for (var _i = 0, items2_1 = items2; _i < items2_1.length; _i++) {
            var item = items2_1[_i];
            if (!item.parentNode)
                document.body.appendChild(item);
        }
    }, 60);
};
for (var i = 0; i < 1; i++) {
    _loop_1(i);
}
console.timeEnd('xml parser');
var templateObject_1, templateObject_2, templateObject_4, templateObject_3;
//# sourceMappingURL=client_perf.js.map