import { Router } from "express";
import { UserTransactionRouter } from "./transaction.routers";
import { PropertyRouter } from "./property.router";

export class ApiRouter{
    private userTransactionRouter: UserTransactionRouter
    private propertyRouter : PropertyRouter
    private router: Router
    constructor() {
        this.router = Router()
        this.userTransactionRouter = new UserTransactionRouter()
        this.propertyRouter = new PropertyRouter()
        this.initializeRoutes()
    }
    private initializeRoutes(): void {
        this.router.use('/transactions', this.userTransactionRouter.getRouter())
        this.router.use('/properties', this.propertyRouter.getRouter())
    }
    getRouter() : Router {
        return this.router
    }
}