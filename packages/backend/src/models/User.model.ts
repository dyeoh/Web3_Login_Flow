const { Model } = require('sequelize-typescript');

interface UserAttributes {
  id: number;
  nonce: number;
  publicAddress: string;
  username?: string
}

export class User extends Model<UserAttributes> {}

module.exports = { User }