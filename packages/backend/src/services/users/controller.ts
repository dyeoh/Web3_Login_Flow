import { Request, Response } from "express";

import { User } from "../../models/User.model";

export const find = async (req :Request, res:Response) : Promise<void> => {
	const whereClause =
		req.query && req.query.publicAddress
			? {
				where: { publicAddress: req.query.publicAddress },
			}
			: undefined;

	try {
		const users = await User.findAll(whereClause);
		res.json(users);
	}
	catch(err){
		res.status(400).send("bad");
	}
};

interface CustomRequest<T> extends Request {
  body: T
}

export const create = async (req :CustomRequest<{publicAddress:string}>, res:Response) : Promise<void> => {
	try{
		if(req.body.publicAddress){
			await User.create({ publicAddress: req.body.publicAddress.toLowerCase() });
			res.status(200).send("Success");
		}
		else{
			throw new Error("missing public address");
		}
	}
	catch(err){
		res.status(400).send(err.message);
	}
  
};