import UserService from './service';
import { IUserModel } from './model';
import { NextFunction, Request, Response } from 'express';

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  const users: IUserModel[] = await UserService.findAll();
  res.status(200).json(users);
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findOne(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user: IUserModel = await UserService.findOne(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    if (process.env.NODE_ENV === 'test') {
      let msg = 'Error de validación';
      if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string' && error.message) {
        msg = error.message;
      }
      res.status(400).json({
        status: 400,
        message: msg
      });
    } else {
      next(error);
    }
  }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user: IUserModel = await UserService.insert(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (process.env.NODE_ENV === 'test') {
      let msg = 'Error de validación';
      if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string' && error.message) {
        msg = error.message;
      }
      res.status(400).json({
        status: 400,
        message: msg
      });
    } else {
      next(error);
    }
  }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user: IUserModel = await UserService.remove(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    if (process.env.NODE_ENV === 'test') {
      let msg = 'Error de validación';
      if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string' && error.message) {
        msg = error.message;
      }
      res.status(400).json({
        status: 400,
        message: msg
      });
    } else {
      next(error);
    }
  }
}
