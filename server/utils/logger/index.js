
let scribe = require('scribe-js')({createDefaultConsole: false, logWriter: false}); //loads Scribe
let console = scribe.console({logWriter: false});

class Logger {

    static logRequest(req, res, next) {
        console.time()
            .tag(
                { msg: 'Request', colors: 'blue'},
                { msg: req.method, colors: 'green' },
                { msg: req.url, colors: 'grey' }
            )
            .log();

        console.log(req.body);
        
        next();
    }

    static webPanel () {
        return scribe.webPanel();
    }

    static logResponse  (req, res, next) {
        console.time()
            .tag(
                { msg: 'Response', colors: 'yellow'},
                { msg: req.method, colors: 'green' },
                { msg: req.url, colors: 'grey' }
            )
            .log();

        console.log(res.ans.get())
        
        next && next();
    }

    static sqlQuery (query) {
        console
            .tag(
                { msg: 'SQL', colors: 'green'}
            )
            .log(query);
    }

    static errorLogger(err, req, res, next) {
        console
            .time()
            .tag(
                { msg: 'Response', colors: 'red' },
                { msg: req.method, colors: 'green' },
                { msg: req.url, colors: 'grey' }
            )
            .log();

            
        console.log(err)
            
        next(err);
    }
}

module.exports = Logger;

