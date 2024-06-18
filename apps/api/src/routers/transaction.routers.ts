import { Router } from "express";
import { UserTransaction } from "../controllers/transaction/user.transaction.controllers";

export class UserTransactionRouter {
    private router: Router
    private userTransaction : UserTransaction

    constructor() {
        this.userTransaction = new UserTransaction()
        this.router = Router()
        this.initializeRoutes()
    }
    private initializeRoutes(): void{
        this.router.get('/users/:userId/reservations', this.userTransaction.getUserReservations)
        this.router.post('/reservation', this.userTransaction.createReservation)
        this.router.patch('/reservation/:reservationId/upload-proof', this.userTransaction.uploadPaymentProof)
        this.router.patch('/reservations/:reservationId/cancel', this.userTransaction.cancelReservation)
    }
    getRouter() {
        return this.router
        
    }
}