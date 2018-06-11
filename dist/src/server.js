function _start_server() {
    var express = require('express');
    var app = express();
    app.use(express.static('static'));
    app.listen(3000);
}
_start_server();
//# sourceMappingURL=server.js.map