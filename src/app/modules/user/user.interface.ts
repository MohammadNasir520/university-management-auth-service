import { Model } from 'mongoose'

export type IUser = {
  id: string
  role: string
  password: string
}

export type UserModel = Model<IUser, Record<string, unknown>> // we can use Object instead of  Record<string, unknown>
