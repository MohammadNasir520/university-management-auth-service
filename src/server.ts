import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { errorLogger, logger } from './shared/logger'

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('database connect successfully')

    app.listen(config.port, () => {
      logger.info(`server is running on port ${config.port}`)
    })
  } catch (err) {
    errorLogger.error('fail to connect database', err)
  }
}
bootstrap()
