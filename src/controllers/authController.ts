import { Request, Response } from "express";
import AuthService from "../services/authService";
import { formatUser } from "../utils/formatUser";
export default class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password }: { email: string; password: string } = req.body;
    try {
      const user = await AuthService.login(email, password);
      const token = AuthService.generateToken(user);
      return res.json({ user: formatUser(user), token });
    } catch (error: any) {
      return res.status(401).json({ error: "Email or password is incorrect" });
    }
  }
}
