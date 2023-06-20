import { User } from './user.model';
import { IUser } from './user.interface';
import config from '../../../config';
import { generatedUserId } from './user.utils';
import ApiError from '../../../errors/ApiError';

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremental Id
  const id = await generatedUserId();

  user.id = id;

  // default password
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user');
  }
  return createdUser;
};

export const UserService = {
  createUser,
};