import { Request, Response } from "express";

import { User } from "../../models/User.model";
import web3 from "../../utils/web3-client";

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

export const verify = async (
  req: CustomRequest<{ publicAddress: string; signature: string }>,
  res: Response
): Promise<void> => {
  try {
    const whereClause =
      req.body && req.body.publicAddress
        ? {
            where: { publicAddress: req.body.publicAddress.toLowerCase() },
          }
        : undefined;

    const user = await User.findOne(whereClause);
    if (!user?.nonce) throw new Error("user not found");
    //TODO: fetch nonce from backend
    //verify signature
    const recoveredAddress = web3.eth.accounts.recover(
      user?.nonce.toString(),
      req.body.signature
    );
    if (
      recoveredAddress.toLowerCase() === req.body.publicAddress.toLowerCase()
    ) {
      res.status(200).send("Success!");
    } else {
      throw new Error("Public address doesn't match");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
};
