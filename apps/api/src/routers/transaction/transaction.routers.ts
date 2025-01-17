import { Router } from 'express';
import { UserTransaction } from '@/controllers/transaction/user.transaction.controllers';
import { UserMiddleware } from '@/middlewares/account/user.middleware';

export class UserTransactionRouter {
  private router: Router;
  private userTransaction: UserTransaction;
  private userMiddleware: UserMiddleware;

  constructor() {
    this.userTransaction = new UserTransaction();
    this.userMiddleware = new UserMiddleware();
    this.router = Router();
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.router.get('/user/reservation', this.userMiddleware.verifyToken , this.userTransaction.getUserReservationsById,);
    this.router.post('/reservation' , this.userTransaction.createReservation);
    this.router.post('/status', this.userTransaction.getTransactionStatus);
  }
  getRouter() {
    return this.router;
  }
}
