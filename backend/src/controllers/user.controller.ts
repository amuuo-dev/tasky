import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const client = new PrismaClient();

export async function registerUser(req: Request, res: Response) {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      avatar = null,
      userName,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    await client.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        avatar,
        userName,
      },
    });
    res.status(201).send({ message: "you have successfully being registered" });
  } catch (error) {
    res.status(500).send({ message: "failed to sign you up" });
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await client.user.findFirst({
      where: { email },
    });

    if (!user) {
      res.status(401).send({ message: "wrong email or password" });
      return;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).send({ message: "wrong password or password" });
      return;
    }

    const { password: userPassword, ...otherProperities } = user;

    const token = jwt.sign(otherProperities, process.env.JWT_SECRET!);

    res
      .cookie("taskytoken", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      })
      .status(200)
      .send(otherProperities);
  } catch (error) {
    res.status(500).send({ message: "failed to login" });
  }
}

export function logOut(_req: Request, res: Response) {
  try {
    res.clearCookie("taskytoken");
    res.status(200).send({ message: "you have successfully logout" });
  } catch (error) {
    res.status(500).send({ message: "failed logging you out" });
  }
}

export async function getLoggedinUserDetails(req: Request, res: Response) {
  try {
    const { ...alldetails } = req.user;
    res.status(200).send({
      message: "successfully fetced the details for the user logged in",
      alldetails,
    });
  } catch (error) {
    res.status(500).send({
      message: "error getting information about this user",
    });
  }
}

export async function updateLoggedInUserInfo(req: Request, res: Response) {
  try {
    const { firstName, lastName, avatar, email, userName } = req.body;
    const { id } = req.user;

    const updatededUser = await client.user.update({
      where: { id },
      data: {
        firstName: firstName && firstName,
        lastName: lastName && lastName,
        avatar: avatar && avatar,
        email: email && email,
        userName: userName && userName,
      },
    });
    res
      .status(200)
      .send({ message: "updated user successfully", updatededUser });
  } catch (error) {
    res.status(500).send({ message: " error updating this logged in user" });
  }
}
