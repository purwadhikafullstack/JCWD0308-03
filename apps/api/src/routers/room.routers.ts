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
    this.router.post('/:id',this.roomController.createRoom)
    this.router.get('/room/:id', this.roomController.getRoomById);
    this.router.patch('/:id', this.roomController.updateRoom);
    this.router.delete('/:id', this.roomController.deleteRoom);
    this.router.post('/:id/peak-season' , this.roomController.roomPeakSeasom);
    this.router.post('/:/set-availability' , this.roomController.setRooomAvailability)
    this.router.post('/:id/uploadPictures', uploader('IMG', '/images').array('files') ,this.pictureController.uploadPicturesRoom)
  }

  getRouter(): Router {
    return this.router;
  }
}