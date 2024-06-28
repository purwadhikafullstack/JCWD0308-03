import { responseError } from '@/helpers/responseError';
import { Request, Response, NextFunction } from 'express';
import { TokenExpiredError, verify } from 'jsonwebtoken';

export class UserMiddleware {
  async verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      let token = req.headers.authorization?.replace('Bearer ','');
      if (token === undefined) throw 'Token empty';

      let verifyUser = verify(token, process.env.KEY_JWT!);
      req.user = verifyUser as User;
      next();
    } catch (error:any) {
      if (error instanceof TokenExpiredError) {
        return res.status(401).json({ status: 'error', message: 'Token expired' });
      }
      console.log('error verify token : ', error);
      responseError(res, error);
    }
  }
}
