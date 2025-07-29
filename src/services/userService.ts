import User from "../models/userModel";

export default class UserService {
  static async createUser(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    if (!data.firstName || !data.lastName || !data.email || !data.password) {
      throw new Error("All fields are required");
    }

    if (await User.findOne({ where: { email: data.email } })) {
      throw new Error("Email already in use");
    }

    const user = await User.create(data);
    return user;
  }

  static async getUser(id: string) {
    if (!id) {
      throw new Error("User ID is required");
    }
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (error) {
      throw new Error("User not found");
    }
  }

  static async getUserByEmail(email: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  static async getAllUsers() {
    const users = await User.findAll();
    return users;
  }

  static async updateUser(
    id: string,
    data: Partial<{
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    }>
  ) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    await user.update(data);
    return user;
  }

  static async deleteUser(id: string) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    await user.destroy();
    return user;
  }
}
