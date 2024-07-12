import { TenantManagement } from '@/controllers/tenantManagement/tenant.management.controllers';
import { UserMiddleware } from '@/middlewares/account/user.middleware';
import { Router } from 'express';

export class TenantManagementRouter {
  private router: Router;
  private tenantManagement: TenantManagement;
  private userMiddleware: UserMiddleware;

  constructor() {
    this.tenantManagement = new TenantManagement();
    this.userMiddleware = new UserMiddleware();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/sales', this.tenantManagement.salesReport)
  }

  getRouter(): Router {
    return this.router;
  }
}
