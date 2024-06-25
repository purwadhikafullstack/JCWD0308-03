import { Response } from 'express';

export const responseError = (res: Response, error: any) => {
  return res.status(400).send({
    status: 'error',
    message: error,
  });
};
