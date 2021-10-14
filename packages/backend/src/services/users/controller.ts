import { Request, Response } from "express";

import { User } from "../../models/User.model";
import { verify } from "./utils";
import jwt from "jsonwebtoken";
import config from "../../utils/jwt-config";

export const find = async (req: Request, res: Response): Promise<void> => {
  const whereClause =
    req.query && req.query.publicAddress
      ? {
          where: { publicAddress: req.query.publicAddress },
        }
      : undefined;

  try {
    const users = await User.findAll(whereClause);
    res.json(users);
  } catch (err) {
    res.status(400).send("bad");
  }
};

interface CustomRequest<T> extends Request {
  body: T;
}

export const create = async (
  req: CustomRequest<{ publicAddress: string }>,
  res: Response
): Promise<void> => {
  try {
    if (req.body.publicAddress) {
      await User.create({
        publicAddress: req.body.publicAddress.toLowerCase(),
      });
      res.status(200).send("Success");
    } else {
      throw new Error("missing public address");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
};

//TODO: rename to login + generate session token
export const login = async (
  req: CustomRequest<{ publicAddress: string; signature: string }>,
  res: Response
): Promise<void> => {
  try {
    if (!req.body || !req.body.publicAddress || !req.body.signature)
      throw new Error("Please specify a pubAddress");

    if (await verify(req.body.publicAddress, req.body.signature)) {
      //REGEN NONCE AND UPDATE HERE
      await User.update(
        {
          nonce: Math.floor(Math.random() * 10000),
          publicAddress: req.body.publicAddress.toLowerCase(),
        },
        {
          where: { publicAddress: req.body.publicAddress.toLowerCase() },
        }
      );
      res.status(200).send(
        jwt.sign(
          {
            publicAddress: req.body.publicAddress,
          },
          config.secret,
          {
            algorithm: config.algorithms[0],
            expiresIn: 3000,
          }
        )
      );
    } else {
      throw new Error("Invalid signature");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const setName = async (
  req: CustomRequest<{
    username: string;
  }>,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) throw new Error("missing user");
    const { username } = req.body;
    const { publicAddress } = req.user as any;
    console.log(publicAddress);
    await User.update(
      {
        nonce: Math.floor(Math.random() * 10000),
        publicAddress,
        username,
      },
      {
        where: { publicAddress: publicAddress.toLowerCase() },
      }
    );
    res.status(200).send();
  } catch (err) {
    res.status(400).send(err.message);
  }
};
