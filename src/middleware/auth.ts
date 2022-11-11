import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors, VerifyOptions } from "jsonwebtoken";
import { User } from "../models/user";
import { IUser } from "../interfaces";

export function verify(req: Request, res: Response, next: NextFunction) {
  const accessToken = req.header("Authorization")?.split(" ")[1];

  if (!accessToken) return res.status(401).send({ message: "Not Authorized" });

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!, (error, user) => {
    if (error) {
      return res.status(401).send({ message: "Not Authorized" });
    }
    next();
  });
};

export async function refreshToken(req: Request, res: Response) {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) return res.status(401).send({ message: "Not Authorized" });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, async (error: any, user: any) => {
    if (error) {
      return res.status(401).send({ message: "Not Authorized" });
    }

    let userObject = await User.find({ username: user.username });

    let newAccessToken = generateAccessToken(userObject);

    res.set({
      "Authorization": `Bearer: ${newAccessToken}`
    });

    res.status(201).send({ message: "Token Updated" });
  })
}

export function generateAccessToken(existingUser: IUser) {
  return jwt.sign({
    username: existingUser.username,
    email: existingUser.email
  }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "10m"
  });
}

export function generateRefreshToken(existingUser: IUser) {
  return jwt.sign({
    username: existingUser.username
  }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "1d"
  });
}