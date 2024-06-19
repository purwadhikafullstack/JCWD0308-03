
import { Router } from "express";
import { UserTransactionRouter } from "./transaction.routers";
import { PropertyRouter } from "./property.router";
import { UserRouter } from "./account/user.router";

export class ApiRouter{
    private userTransactionRouter: UserTransactionRouter
    private propertyRouter : PropertyRouter
    private userRouter : UserRouter
    private router: Router
    constructor() {
        this.router = Router()
        this.userTransactionRouter = new UserTransactionRouter()
        this.propertyRouter = new PropertyRouter()
        this.userRouter = new UserRouter()
        this.initializeRoutes()
    }
    private initializeRoutes(): void {
        this.router.use('/transactions', this.userTransactionRouter.getRouter())
        this.router.use('/properties', this.propertyRouter.getRouter())
        this.router.use("/users", this.userRouter.getRouter() ) 
    }
    getRouter() : Router {
        return this.router
    }
}
