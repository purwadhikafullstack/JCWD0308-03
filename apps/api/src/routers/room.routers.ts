// import { PropertyController } from '@/controllers/property.controller';
import { RoomController } from '@/controllers/room.controller';
import { Router } from 'express';

export class RoomRouter {
  private router: Router;
  private roomController: RoomController;

  constructor() {
    this.roomController = new RoomController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/room/:id', this.roomController.getRooms);
    this.router.post('/room', this.roomController.createRoom)
  }

  getRouter(): Router {
    return this.router;
  }
}
