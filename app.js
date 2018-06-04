let express = require('express');
let cors = require('cors');
let server = require('./server');
let config = require('./config');
let app = express();

// parse cookies
// we need this because "cookie" is true in csrfProtection
app.use(cors());
app.listen(config.server.PORT, server.start.call(server, app));

