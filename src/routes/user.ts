import e from "express";
import UserController from "../controllers/userController";
import { requireToken } from "../middlewares/requireToken";

const userRoutes = () => {
  const router = e.Router();

  router.get("/:id", requireToken, UserController.getUser);
  router.get("/", requireToken, UserController.getAllUsers);
  router.post("/create", UserController.createUser);
  router.put("/:id", requireToken, UserController.updateUser);
  router.delete("/:id", requireToken, UserController.deleteUser);

  return router;
};

export default userRoutes;
