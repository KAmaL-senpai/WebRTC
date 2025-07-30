const { Schema } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Your email address is required"],
      uniqui: true,
    },
    username: {
      type: String,
      required: [true, "Your username is required"],
      uniqui: true,
    },
    password: {
      type: String,
      required: [true, "Your password is required"],
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(this.password, salt);
  this.password = hashPassword;
});

module.exports = { UserSchema };