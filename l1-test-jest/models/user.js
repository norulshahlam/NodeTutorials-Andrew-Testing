const mongoose = require("mongoose");
const chalk = require("chalk");
const validator = require("validator");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./task");

/*********************FOR USERS *********************/

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,

      required: true,
    },
    age: {
      type: Number,

      validate(value) {
        if (value < 0) {
          throw new Error("Age cant bbe below 0");
        }
      },
    },
    email: {
      type: String,
      unique: true,

      trim: true,
      lowercase: true,

      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      trim: true,
      required: true,

      minlength: 7,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Password cannot caontains password");
        }
      },
    },

    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],

    avatar: {
      type: Buffer,
    },
  },
  {
    //1
    timestamps: true,
  }
);

userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  delete userObject.avatar;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  // f)
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

//login user
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Email not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    console.log(chalk.red("pswd no match"));
    throw new Error("Password not matched");
  }

  return user;
};

/* added code - hash pswd b4 save */
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// del all user tasks whe user is removed
userSchema.pre("remove", async function (next) {
  const user = this;
  await Task.deleteMany({ owner: user._id });
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
