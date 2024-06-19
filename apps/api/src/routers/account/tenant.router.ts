import { AccountController } from "@/controllers/account/account.controller";
import { TenantController } from "@/controllers/account/tenant.controller";
import { UserMiddleware } from "@/middlewares/account/user.middleware";
import { ValidatorMiddleware } from "@/middlewares/account/validator.middleware";
import { uploader } from "@/helpers/uploader";

import { Router } from "express";

export class TenantRouter{
    private router: Router;
    private tenantController: TenantController
    private userMiddleware : UserMiddleware
    private accountController : AccountController
    private validatorMiddleware : ValidatorMiddleware


    constructor() {
        this.router = Router();
        this.tenantController = new TenantController();
        this.userMiddleware = new UserMiddleware()
        this.accountController = new AccountController()
        this.validatorMiddleware = new ValidatorMiddleware()

        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get("/", this.tenantController.getTenants)
        this.router.post("/", this.validatorMiddleware.validateRegister,this.tenantController.registerTenant)
        this.router.patch('/verify' ,this.userMiddleware.verifyToken, this.validatorMiddleware.validateSetupAccount,this.accountController.setupAccount ,  this.accountController.verifyAccount)
        this.router.post("/login", this.tenantController.loginTenant )
        this.router.patch('/profile' ,this.userMiddleware.verifyToken, this.validatorMiddleware.uploadImage,uploader("IMG", "/images").single("file"),  this.tenantController.uploadProfileImage)
        this.router.get("/:id" , this.userMiddleware.verifyToken, this.tenantController.getProfileById)
    }

    getRouter()  {
        return this.router
    }
}