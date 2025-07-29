import e from "express";
import UserController from "../controllers/userController";

const userRoutes = () => {
  const router = e.Router();

  router.get("/:id", UserController.getUser);
  router.get("/", UserController.getAllUsers);
  router.post("/create", UserController.createUser);
  router.put("/:id", UserController.updateUser);
  router.delete("/:id", UserController.deleteUser);

  return router;
};

export default userRoutes;
