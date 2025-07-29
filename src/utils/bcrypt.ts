import bcrypt from "bcrypt";

export default class BcryptUtil {
  static async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  static async comparePasswords(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  static async hashAndCompare(password: string, hash: string) {
    const isMatch = await BcryptUtil.comparePasswords(password, hash);
    if (!isMatch) {
      throw new Error("Password does not match");
    }
    return true;
  }
}
