import { Router } from "express";
import { UserTransactionRouter } from "./transaction.routers";

export class ApiRouter{
    private userTransactionRouter: UserTransactionRouter
    private router: Router
    constructor() {
        this.router = Router()
        this.userTransactionRouter = new UserTransactionRouter()
        this.initializeRoutes()
    }
    private initializeRoutes(): void {
        this.router.use('/transactions', this.userTransactionRouter.getRouter())
    }
    getRouter() : Router {
        return this.router
    }
}