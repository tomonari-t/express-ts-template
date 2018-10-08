"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const compression = require("compression"); // compresses requests
const dotenv = require("dotenv");
const errorHandler = require("errorhandler");
const express = require("express");
const flash = require("express-flash");
const lusca = require("lusca");
const logger = require("morgan");
const expressValidator = require("express-validator");
/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: '.env.example' });
/**
 * Routes
 */
const api_1 = require("./routes/api");
class App {
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.launchConf();
    }
    middleware() {
        this.express.set('port', process.env.PORT || 3000);
        this.express.use(compression());
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(expressValidator());
        this.express.use(flash());
        this.express.use(lusca.xframe('SAMEORIGIN'));
        this.express.use(lusca.xssProtection(true));
    }
    /**
     * Primary app routes.
     */
    routes() {
        this.express.use('/hoo', api_1.default);
    }
    launchConf() {
        this.express.use(errorHandler());
        /**
         * Start Express server.
         */
        this.express.listen(this.express.get('port'), () => {
            global.console.log(('  App is running at http://localhost:%d \
      in %s mode'), this.express.get('port'), this.express.get('env'));
            global.console.log('  Press CTRL-C to stop\n');
        });
    }
}
exports.default = new App().express;
//# sourceMappingURL=server.js.map