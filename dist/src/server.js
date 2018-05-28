function start_server() {
    var express = require('express');
    var app = express();
    app.use(express.static('static'));
    app.listen(3000);
}
start_server();
//# sourceMappingURL=server.js.map