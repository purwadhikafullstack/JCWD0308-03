import { PictureController } from '@/controllers/picture.controller';
import { PropertyController } from '@/controllers/property.controller';
import { uploader } from '@/helpers/uploader';
import { UserMiddleware } from '@/middlewares/account/user.middleware';
import { Router } from 'express';

export class PropertyRouter {
  private router: Router;
  private propertyController: PropertyController;
  private userMiddleware: UserMiddleware
  private pictureController: PictureController

  constructor() {
    this.propertyController = new PropertyController();
    this.userMiddleware = new UserMiddleware();
    this.pictureController = new PictureController()
    this.router = Router();

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.propertyController.getProperties);
    this.router.get('/by-tenant-id', this.userMiddleware.verifyToken, this.propertyController.getPropertyByTenantId)
    this.router.post('/', this.userMiddleware.verifyToken, uploader('IMG', '/images').array('files' ,10),this.propertyController.createProperty);
    this.router.post('/:id/uploadPictures', uploader('IMG', '/images').array('files' ,10) ,this.pictureController.uploadPicturesProperty);
    

    this.router.get('/:id', this.propertyController.getPropertyById);
    this.router.patch('/:id', this.propertyController.updateProperty);
    this.router.delete('/:id', this.propertyController.deleteProperty);
  }

  getRouter(): Router {
    return this.router;
  }
}
