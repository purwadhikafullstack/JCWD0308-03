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
        this.router.post("/", this.validatorMiddleware.validateRegisterUser,this.userController.registerUser)
        this.router.post("/login", this.validatorMiddleware.validateLogin,this.userController.loginUser )
        this.router.post('/signIn-with-google' , this.userController.singInGoogle)
        this.router.post('/resend-verify', this.validatorMiddleware.validateEmail,this.userController.resendEmailVerification)
        this.router.patch('/send-update-email', this.userMiddleware.verifyToken,this.userController.updateEmail)

        // account (user&tenant)
        this.router.patch('/verify' ,this.userMiddleware.verifyToken, this.validatorMiddleware.validateSetupAccount,this.accountController.setupAccount,  this.accountController.verifyAccount)
        this.router.get("/profile" , this.userMiddleware.verifyToken, this.accountController.getProfileById)
        this.router.get("/accountRole", this.userMiddleware.verifyToken, this.accountController.getAccountRole)
        this.router.patch('/upload-profile' ,this.userMiddleware.verifyToken,uploader("IMG", "/images").single("image"),this.accountController.uploadProfileImage)
    }
    getRouter()  {
        return this.router
    }
}