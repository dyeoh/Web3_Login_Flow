import { Request, Response, NextFunction } from "express"

import { User } from '../../models/User.model';

export const find = (req :Request, res:Response, next: NextFunction) : Response => {
  const whereClause =
		req.query && req.query.publicAddress
			? {
					where: { publicAddress: req.query.publicAddress },
        }
			: undefined;

	return User.findAll(whereClause)
		.then((users: User[]) => res.json(users))
		.catch(next);
};