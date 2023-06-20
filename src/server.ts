import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { errorLogger, logger } from './shared/logger'
import { Server } from 'http'

async function bootstrap() {
  let server: Server
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('database connect successfully')

    server = app.listen(config.port, () => {
      logger.info(`server is running on port ${config.port}`)
    })
  } catch (err) {
    errorLogger.error('fail to connect database', err)
  }

  process.on('unhandledRejection', error => {
    console.log(
      `Un handled Rejection is detected . we are closing our server.......`
    )
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}
bootstrap()
