import { User } from "../models/UserModel.js";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { Request, Response } from "express";


export const registerUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { firstName, lastName, userName, email, password } = req.body;
    //check existingUser
    const ifUserExist = await User.findOne({ email });
    if (ifUserExist) {
      return res.status(409).json({ message: `User already exist` });
    }

    const newUser = await User.create({
      firstName,
      lastName,
      userName,
      email,
      password,
    });

    return res.status(201).json({
      message: `User Created Successfully`,
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        userName: newUser.userName,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.log(`Error in registering User:`, error);
    return res.status(500).json({
      message: `Sever Error`,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    //check if user exists || n

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        message: `Invalid credentials`,
      });
    }

    //generate jwt user token key and send it back
    const signOptions: SignOptions = ({
      expiresIn: process.env.EXPIRES_IN ?? "7d",
    } as unknown) as SignOptions;

    const userToken = jwt.sign({ userId: user._id }, process.env.JWT_USER_KEY as Secret, signOptions);

    //set userToken in httpOnly cookies
    res.cookie("userToken", userToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, //7days
    });

    return res.status(200).json({
      message: "User Logged In Successfully",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(`Error in Login User:`, error);
    return res.status(500).json({
        sucess: false,
      message: `Sever Error`,
    });
  }
};

export const logOut = async (req: Request, res: Response) => {
  //to logout we will set the token to null and clear it's value
  //set the expiration date to a time in the past

  try {
    res.clearCookie("userToken", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};