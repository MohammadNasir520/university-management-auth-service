import express, { Application, Request, Response } from 'express'
import userRouter from '../src/app/modules/users/users.route'

import cors from 'cors'
const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes
app.use('/api/v1/users', userRouter)

app.get('/', async (req: Request, res: Response) => {
  res.send('university management server is running')
})

export default app
