import { Request, Response } from "express";
import UserService from "../services/userService";
import { formatUser } from "../utils/formatUser";

export default class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      const user = await UserService.createUser(req.body);
      return res
        .status(201)
        .json({ message: "User created successfully", user: formatUser(user) });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async getUser(req: Request, res: Response) {
    try {
      const user = await UserService.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(formatUser(user));
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      return res.status(200).json(users);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const user = await UserService.updateUser(req.params.id, req.body);
      return res
        .status(200)
        .json({ message: "User updated successfully", user: formatUser(user) });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      await UserService.deleteUser(req.params.id);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
