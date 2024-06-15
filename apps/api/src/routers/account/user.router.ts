import { AccountController } from "@/controllers/account/account.controller";
import { UserController } from "@/controllers/account/user.controller";
import { uploader } from "@/helpers/uploader";
import { UserMiddleware } from "@/middlewares/account/user.middleware";
import { Router } from "express";

export class UserRouter{
    private router: Router;
    private userController: UserController
    private userMiddleware : UserMiddleware
    private accountController : AccountController

    constructor() {
        this.router = Router();
        this.userController = new UserController();
        this.userMiddleware = new UserMiddleware()
        this.accountController = new AccountController()
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get("/", this.userController.getUsers)
        this.router.post("/", this.userController.registerUser)
        this.router.patch('/verify' ,this.userMiddleware.verifyToken, this.accountController.setupAccount ,  this.accountController.verifyAccount)
        this.router.post("/login", this.userController.loginUser )
        this.router.get("/:id" , this.userMiddleware.verifyToken, this.userController.getProfileById)
        this.router.patch('/profile' ,this.userMiddleware.verifyToken, uploader("IMG", "/images").single("file"),  this.userController.uploadProfileImage)
    }

    getRouter()  {
        return this.router
    }
}