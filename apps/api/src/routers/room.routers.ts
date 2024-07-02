// import { PropertyController } from '@/controllers/property.controller';
import { PictureController } from '@/controllers/picture.controller';
import { RoomController } from '@/controllers/room.controller';
import { uploader } from '@/helpers/uploader';
import { Router } from 'express';

export class RoomRouter {
  private router: Router;
  private roomController: RoomController;
  private pictureController : PictureController

  constructor() {
    this.roomController = new RoomController();
    this.pictureController = new PictureController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/:id/', this.roomController.createRoom)
    this.router.get('/room/:id', this.roomController.getRooms);

    this.router.post('/:id/uploadPictures', uploader('IMG', '/images').array('files' ,10) ,this.pictureController.uploadPicturesRoom)
  }

  getRouter(): Router {
    return this.router;
  }
}