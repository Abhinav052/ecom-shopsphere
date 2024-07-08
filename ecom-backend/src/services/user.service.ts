import User, { UserDocument } from "../models/user.model";

class UserService {
  static async getUserByEmail(
    email: string
  ): Promise<UserDocument | null | undefined> {
    return await User.findOne({ email: email });
  }

  static async getUserById(
    userId: string
  ): Promise<UserDocument | null | undefined> {
    return await User.findById(userId);
  }

  static async createUser(
    email: string,
    password: string
  ): Promise<UserDocument> {
    const newUser = new User({ email: email, password: password });
    return await newUser.save();
  }
}

export default UserService;
