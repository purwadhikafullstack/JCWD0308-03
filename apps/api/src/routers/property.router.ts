import { PropertyController } from '@/controllers/property.controller';
import { uploader } from '@/helpers/uploader';
import { UserMiddleware } from '@/middlewares/account/user.middleware';
import { Router } from 'express';

export class PropertyRouter {
  private router: Router;
  private propertyController: PropertyController;
  private userMiddleware: UserMiddleware

  constructor() {
    this.propertyController = new PropertyController();
    this.userMiddleware = new UserMiddleware();
    this.router = Router();

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.propertyController.getProperties);
    this.router.post('/', this.userMiddleware.verifyToken, this.propertyController.createProperty);
    // this.router.post('/:id/uploadImages', this.userMiddleware.verifyToken, uploader('property_', 'images').array('files' ,10) ,this.propertyController.uploadPropertyImages);

    this.router.get('/:id', this.propertyController.getPropertyById);
    this.router.patch('/:id', this.propertyController.updateProperty);
    this.router.delete('/:id', this.propertyController.deleteProperty);
  }

  getRouter(): Router {
    return this.router;
  }
}
