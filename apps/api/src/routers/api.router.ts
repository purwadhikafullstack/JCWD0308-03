import { Router } from 'express';
import { PropertyRouter } from './property.router';

export class ApiRouter {
  private propertyRouter: PropertyRouter;
  private router: Router;

  constructor() {
    this.router = Router();
    this.propertyRouter = new PropertyRouter();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.use('/properties', this.propertyRouter.getRouter());
  }
  getRouter(): Router {
    return this.router;
  }
}
