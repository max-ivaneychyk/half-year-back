
let scribe = require('scribe-js')({createDefaultConsole: false, logWriter: false}); //loads Scribe
let cons = scribe.console({logWriter: false});

class Logger {

    static logRequest(req, res, next) {
        cons.time()
            .tag(
                { msg: 'Request', colors: 'blue'},
                { msg: req.method, colors: 'green' },
                { msg: req.url, colors: 'grey' }
            )
            .log();

        cons.log(req.body);
        
        next();
    }

    static webPanel () {
        return scribe.webPanel();
    }

    static logResponse  (req, res, next) {
        cons.time()
            .tag(
                { msg: 'Response', colors: 'yellow'},
                { msg: req.method, colors: 'green' },
                { msg: req.url, colors: 'grey' }
            )
            .log();

        console.log(JSON.stringify(res.ans.get()));
        
        next && next();
    }

    static sqlQuery (query) {
        cons
            .tag(
                { msg: 'SQL', colors: 'green'}
            )
            .log(query);
    }

    static errorLogger(err, req, res, next) {
        cons
            .time()
            .tag(
                { msg: 'Response', colors: 'red' },
                { msg: req.method, colors: 'green' },
                { msg: req.url, colors: 'grey' }
            )
            .log();

            
        cons.log(err);
            
        next(err);
    }
}

module.exports = Logger;

