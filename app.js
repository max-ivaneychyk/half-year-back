let express = require('express');
let cors = require('cors');
let server = require('./server');
let config = require('./config');
let app = express();

// parse cookies
// we need this because "cookie" is true in csrfProtection
//app.use(console.webPanel()); 
//app.use(console.express.logger()); 
app.use('/docs', express.static('docs'));
app.use('/public', express.static('public'));


app.use(cors());
app.listen(config.server.PORT, server.start.call(server, app));

