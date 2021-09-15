import { User } from "../../models/User.model";
import recoverAddress from "../../utils/recover-sig";

export const verify = async (
  publicAddress: string,
  signature: string
): Promise<boolean> => {
  const whereClause = {
    where: { publicAddress: publicAddress.toLowerCase() },
  };
  const user = await User.findOne(whereClause);
  if (!user?.nonce) throw new Error("user not found");
  const recoveredAddress = recoverAddress(user?.nonce.toString(), signature);
  if (recoveredAddress.toLowerCase() === publicAddress.toLowerCase())
    return true;

  return false;
};
