import { TenantManagement } from '@/controllers/tenantManagement/tenant.management.controllers';
import { Router } from 'express';

export class RoomRouter {
  private router: Router;
  private tenantManagament: TenantManagement;

  constructor() {
    this.tenantManagament = new TenantManagement();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/order/?id', this.tenantManagament.getOrderList);
  }

  getRouter(): Router {
    return this.router;
  }
}
