import express from "express";
const appRootRouter = express.Router()

import authRouter from "./AuthRoutes";
import userRouter from "./UserRoutes";
import adminRouter from "./AdminRoutes";
import homeRouter from "./HomeRoutes"

appRootRouter.use(authRouter)
appRootRouter.use(userRouter)
appRootRouter.use(adminRouter)
appRootRouter.use(homeRouter)

export default appRootRouter;