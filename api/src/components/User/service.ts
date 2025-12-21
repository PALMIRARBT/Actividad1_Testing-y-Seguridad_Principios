import Joi from 'joi';
import UserModel, { IUserModel } from './model';
import UserValidation from './validation';
import { IUserService } from './interface';
import { Types } from 'mongoose';
import HttpError from '../../config/error';

/**
 * @export
 * @implements {IUserModelService}
 */
/**
 * @export
 * @implements {IUserModelService}
 */
const UserService: IUserService = {
  /**
   * Busca un usuario por email
   * @param {string} email
   * @returns {Promise<IUserModel | null>}
   */
  async findByEmail(email: string): Promise<IUserModel | null> {
    try {
      return await UserModel.findOne({ email });
    } catch (error) {
      throw new Error(error.message);
    }
  },
  /**
   * @returns {Promise < IUserModel[] >}
   * @memberof UserService
   */
  async findAll(): Promise<IUserModel[]> {
    try {
      return await UserModel.find({});
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {string} id
   * @returns {Promise < IUserModel >}
   * @memberof UserService
   */
  async findOne(id: string): Promise<IUserModel> {
    try {
      const validate: Joi.ValidationResult<{
        id: string;
      }> = UserValidation.getUser({
        id
      });

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      return await UserModel.findOne(
        {
          _id: new Types.ObjectId(id)
        },
        {
          password: 0
        }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {IUserModel} user
   * @returns {Promise < IUserModel >}
   * @memberof UserService
   */
  async insert(body: IUserModel): Promise<any> {
    try {
      const validate: Joi.ValidationResult<IUserModel> = UserValidation.createUser(body);
      if (validate.error) {
        throw new HttpError(400, 'Error de validación: ' + validate.error.message);
      }
  const user = await UserModel.create(body);
  return user;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      throw new HttpError(400, error?.message || 'Error de validación');
    }
  },

  /**
   * @param {string} id
   * @returns {Promise < IUserModel >}
   * @memberof UserService
   */
  async remove(id: string): Promise<any> {
    try {
      const validate: Joi.ValidationResult<{
        id: string;
      }> = UserValidation.removeUser({
        id
      });

      if (validate.error) {
        throw new Error(validate.error.message);
      }

    const user = await UserModel.findByIdAndDelete(new Types.ObjectId(id));
    return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export default UserService;
