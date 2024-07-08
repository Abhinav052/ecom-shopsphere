import { Request, Response, NextFunction } from "express";
import errorStatus from "../utils/error/error.status";
import bcrypt from "bcryptjs";
import User, { UserDocument } from "../models/user.model";
import { generateToken } from "../utils/auth/auth.token";
import UserService from "../services/user.service";
export const testController = (req: Request, res: Response): void => {
  try {
    res.status(200).send("Server run successfully");
  } catch (error) {
    res.status(500).json(errorStatus.internalServerError);
  }
};

interface SignUpReqBody {
  email?: string;
  password?: string;
}

export const signUpController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userData: SignUpReqBody = req.body;

    if (!userData.email || !userData.password) {
      res.status(400).send(errorStatus.invalidRequestBody);
      return;
    }

    const oldUser = await UserService.getUserByEmail(userData.email);

    if (oldUser) {
      res.status(400).send(errorStatus.userAlreadyExist);
      return;
    }

    const hashedPassword: string = await bcrypt.hash(userData.password, 10);

    const newUser: UserDocument = await UserService.createUser(
      userData.email,
      hashedPassword
    );
    const token = generateToken(
      newUser._id as string,
      newUser.email as string,
      newUser.role as string
    );

    res
      .status(200)
      .cookie("access-token", token, {
        httpOnly: true,
      })
      .send(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(errorStatus.internalServerError);
  }
};

interface SignInReqBody {
  email?: string;
  password?: string;
}

export const loginController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userData: SignInReqBody = req.body;
    if (!userData.email || !userData.password) {
      res.status(400).json(errorStatus.invalidRequestBody);
      return;
    }

    const user: UserDocument | null | undefined =
      await UserService.getUserByEmail(userData.email);
    if (!user) {
      res.status(401).json(errorStatus.userDoesNotExist);
      return;
    }
    const passwordMatched = await bcrypt.compare(
      userData.password,
      user.password as string
    );
    if (!passwordMatched) {
      res.status(401).json(errorStatus.invalidUserDetails);
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(errorStatus.internalServerError);
  }
};
