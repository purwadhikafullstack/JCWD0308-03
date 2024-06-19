import { AccountController } from "@/controllers/account/account.controller";
import { UserController } from "@/controllers/account/user.controller";
import { uploader } from "@/helpers/uploader";
import { UserMiddleware } from "@/middlewares/account/user.middleware";
import { ValidatorMiddleware } from "@/middlewares/account/validator.middleware";
import { Router } from "express";

export class UserRouter{
    private router: Router;
    private userController: UserController
    private userMiddleware : UserMiddleware
    private accountController : AccountController
    private validatorMiddleware : ValidatorMiddleware

    constructor() {
        this.router = Router();
        this.userController = new UserController();
        this.userMiddleware = new UserMiddleware()
        this.accountController = new AccountController()
        this.validatorMiddleware = new ValidatorMiddleware()

        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get("/", this.userController.getUsers)
        this.router.post("/", this.validatorMiddleware.validateRegister,this.userController.registerUser)
        this.router.patch('/verify' ,this.userMiddleware.verifyToken, this.validatorMiddleware.validateSetupAccount,this.accountController.setupAccount ,  this.accountController.verifyAccount)
        this.router.post("/login", this.userController.loginUser )
        this.router.patch('/profile' ,this.userMiddleware.verifyToken, this.validatorMiddleware.uploadImage,uploader("IMG", "/images").single("file"),  this.userController.uploadProfileImage)
        this.router.get("/:id" , this.userMiddleware.verifyToken, this.userController.getProfileById)
    }

    getRouter()  {
        return this.router
    }
}