import express, { Application } from 'express'

import cors from 'cors'
import globalErrorHandlar from './app/middlewares/globalErrorHandlar'
import { UserRoutes } from './app/modules/users/user.route'

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes
app.use('/api/v1/users', UserRoutes)

// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   throw new ApiError(400, 'something went wrong')
//   next('error') // if I send parameter to next. it assumed next as error
// })

//global error handling
app.use(globalErrorHandlar)

// app.get('/', async (req: Request, res: Response) => {
//   res.send('university management server is running')
// })

export default app
