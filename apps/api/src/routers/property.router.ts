import { PropertyController } from '@/controllers/property.controller';
import { Router } from 'express';

export class PropertyRouter {
  private router: Router;
  private propertyController: PropertyController;

  constructor() {
    this.propertyController = new PropertyController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.propertyController.getProperties);
    this.router.post('/', this.propertyController.createProperty);
    this.router.get('/:id', this.propertyController.getPropertyById);
    this.router.patch('/:id', this.propertyController.updateProperty);
    this.router.delete('/:id', this.propertyController.deleteProperty);
  }

  getRouter(): Router {
    return this.router;
  }
}
