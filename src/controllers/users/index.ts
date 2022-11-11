import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../../models/user";
import { generateAccessToken, generateRefreshToken } from "../../middleware/auth";

export const getUser = async (req: Request, res: Response) => {

}

export const registerUser = async (req: Request, res: Response) => {
  const { body } = req;

  let existingUser = await User.findOne({ $or: [{ email: body.email }, { username: body.username }] });

  if (existingUser) return res.status(200).send({ message: "User is Already Registered" });

  try {
    const user = new User(body);

    const salt = await bcrypt.genSalt(15);

    user.password = await bcrypt.hash(user.password, salt);
    user
      .save()
      .then(() => {
        res.status(201).send({ message: "User Created Successfully" })
      });

  } catch (err) {
    console.log(err, '[ERROR ON REGISTER]')
  }
}

export const loginUser = async (req: Request, res: Response) => {
  const { body } = req;

  let existingUser = await User.findOne({ $or: [{ email: body.identifier }, { username: body.identifier }] });
  if (!existingUser) return res.status(404).send({ message: "User not Found" });


  let passwordIsValid = await bcrypt.compare(
    body.password,
    existingUser.password
  );

  if (!passwordIsValid) return res.status(406).send({ message: "Credentials are Incorrect" });

  const accessToken = generateAccessToken(existingUser);
  const refreshToken = generateRefreshToken(existingUser);

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  });
  res.set({
    "Authorization": `Bearer: ${accessToken}`
  });

  return res.status(200).send({message: "Authenticated"});
}