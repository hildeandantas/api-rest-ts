import BcryptUtil from "../utils/bcrypt";
import UserService from "./userService";
import { sign } from "jsonwebtoken";
import "dotenv/config";

export default class AuthService {
  static generateToken(user: any) {
    const payload = { id: user.id, email: user.email };
    return sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" });
  }

  static async login(email: string, password: string) {
    const user = await UserService.getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    await BcryptUtil.hashAndCompare(password, user.password);
    return user;
  }
}
