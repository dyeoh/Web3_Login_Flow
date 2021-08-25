import { Model } from "sequelize";

interface UserAttributes {
  nonce?: number;
  publicAddress: string;
  username?: string;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  public nonce!: number;
  public publicAddress!: string;
  public username!: string;
}

module.exports = { User };
