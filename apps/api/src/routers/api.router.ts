import { Router } from 'express';

export class ApiRouter {
  private router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
  }
  getRouter(): Router {
    return this.router;
  }
}
