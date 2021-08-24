require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: ["@dyeoh/eslint-config"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
