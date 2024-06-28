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
        this.router.post("/login", this.tenantController.loginTenant )
<<<<<<< HEAD
        this.router.patch('/profile' ,this.userMiddleware.verifyToken, this.validatorMiddleware.uploadImage,uploader("IMG", "/images").single("file"),  this.tenantController.uploadProfileImage)
        this.router.get("/:id" , this.userMiddleware.verifyToken, this.tenantController.getProfileById)
        // this.router.get("/orderList/:id" , this.userMiddleware.verifyToken, this.tenantController.getOrderList)
=======
        this.router.patch('/profile' ,this.userMiddleware.verifyToken,uploader("IMG", "/images").single("file"),  this.tenantController.uploadProfileImage)
>>>>>>> e1d29bfbc92f2783daf8fb225e744c8e213e2cbb
    }

    getRouter()  {
        return this.router
    }
}