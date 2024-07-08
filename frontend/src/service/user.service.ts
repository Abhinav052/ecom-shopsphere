import { User } from "../models/user.model";
import baseUrl from "../utils/constants/api.constants";

class UserService {
  private static getUserFromResponse(data: any): User {
    console.log(data);
    const user: User = {
      email: data.email,
      role: data.role,
      userId: data._id,
    };
    console.log("user");
    console.log(user);
    return user;
  }

  static login = async (email: string, password: string) => {
    const response = await fetch(`${baseUrl}/api/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Sign In Failed");
    }
    console.log("response");
    return this.getUserFromResponse(await response.json());
  };
}

export default UserService;
