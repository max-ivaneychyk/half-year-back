let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let server = require('./server');
let config = require('./config');

let app = express();

// parse cookies
// we need this because "cookie" is true in csrfProtection
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());





app.listen(config.server.PORT, server.start.bind(server, app));

