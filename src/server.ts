
function _start_server()  {
  const express = require('express');
  const app = express();
  app.use(express.static('static'))
  app.listen(3000)
}
_start_server()