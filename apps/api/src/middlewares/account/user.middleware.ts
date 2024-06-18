import { responseError } from '@/helpers/responseError';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export class UserMiddleware {
  async verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      let token = req.headers.authorization?.replace('Bearer ','');
      if (token === undefined) throw 'Token empty';

      let verifyUser = verify(token, process.env.KEY_JWT!);
      req.user = verifyUser as User;
      next();
    } catch (error) {
      console.log('error verify token : ', error);
      responseError(res, error);
    }
  }
}
