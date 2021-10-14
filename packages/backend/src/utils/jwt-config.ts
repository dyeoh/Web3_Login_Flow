export const config = {
  algorithms: ["HS256"],
  secret: process.env.JWT_SECRET,
};

export default config;
