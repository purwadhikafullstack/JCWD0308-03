import { Router } from 'express';
import { UserTransactionRouter } from './transaction.routers';
import { PropertyRouter } from './property.router';
import { UserRouter } from './account/user.router';
import { TenantRouter } from './account/tenant.router';
import { RoomRouter } from './room.routers';

export class ApiRouter {
  private userTransactionRouter: UserTransactionRouter;
  private propertyRouter: PropertyRouter;
  private userRouter: UserRouter;
  private tenantRouter: TenantRouter;
  private roomRouter: RoomRouter;
  private router: Router;
  constructor() {
    this.router = Router();
    this.userTransactionRouter = new UserTransactionRouter();
    this.propertyRouter = new PropertyRouter();
    this.userRouter = new UserRouter();
    this.tenantRouter = new TenantRouter();
    this.roomRouter = new RoomRouter();
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.router.use('/transactions', this.userTransactionRouter.getRouter());
    this.router.use('/properties', this.propertyRouter.getRouter());
    this.router.use('/users', this.userRouter.getRouter());
    this.router.use('/tenants', this.tenantRouter.getRouter());
    this.router.use('/rooms', this.roomRouter.getRouter());
  }
  getRouter(): Router {
    return this.router;
  }
}
