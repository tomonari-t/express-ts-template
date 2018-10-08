import * as bodyParser from 'body-parser'
import * as compression from 'compression'  // compresses requests
import * as dotenv from 'dotenv'
import * as errorHandler from 'errorhandler'
import * as express from 'express'
import * as flash from 'express-flash'
import * as lusca from 'lusca'
import * as logger from 'morgan'
import expressValidator = require('express-validator')

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: '.env.example' })

/**
 * Routes
 */
import apiRouter from './routes/api'

class App {

  // ref to Express instance
  public express: express.Application

  constructor() {
    this.express = express()
    this.middleware()
    this.routes()
    this.launchConf()
  }
  private middleware(): void {
    this.express.set('port', process.env.PORT || 3000)
    this.express.use(compression())
    this.express.use(logger('dev'))
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: true }))
    this.express.use(expressValidator())
    this.express.use(flash())
    this.express.use(lusca.xframe('SAMEORIGIN'))
    this.express.use(lusca.xssProtection(true))
  }

  /**
   * Primary app routes.
   */
  private routes(): void {
    this.express.use('/hoo', apiRouter)
  }

  private launchConf() {

    this.express.use(errorHandler())

    /**
     * Start Express server.
     */
    this.express.listen(this.express.get('port'), () => {
      global.console.log(('  App is running at http://localhost:%d \
      in %s mode'), this.express.get('port'), this.express.get('env'))
      global.console.log('  Press CTRL-C to stop\n')
    })
  }
}

export default new App().express
