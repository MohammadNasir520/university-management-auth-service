import mongoose from 'mongoose'
import app from './app'
import config from './config/index'

async function bootstrap() {
  try {
    mongoose.connect(config.database_url as string)
    console.log('database connect successfully')

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`)
    })
  } catch (err) {
    console.log('fail to connect database', err)
  }
}
bootstrap()
