const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/UserModel");
const { CartModel } = require("../models/CartModel");
require("dotenv").config();

const userController = express.Router();
userController.post("/signup", async (req, res) => {
  const { email, name, password } = req.body;

  if (!(email && password && name)) {
    return res.status(400).json({ message: "Please fill all the details" });
  }

  try {
    const userExist = await UserModel.findOne({ email });

    if (userExist) {
      return res.status(400).json({
        message: "User already exists. Please login or sign in with google!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      name,
    });

    const cartCreate = await CartModel.create({
      userId: newUser._id,
      cart: [],
    });

    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.JWT_SECRET
    );

    res.json({ token, name: newUser.name, role: newUser.role });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

userController.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.user._id) {
      const token = jwt.sign(
        { userId: req.user._id, role: req.user.role },
        process.env.JWT_SECRET
      );
      return res.json({ token, name: req.user.name, role: req.user.role });
    }

    return res.status(400).json(req.user);
  }
);

userController.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

userController.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    const token = jwt.sign(
      { userId: req.user._id, role: req.user.role },
      process.env.JWT_SECRET
    );
    res.json({ token, name: req.user.name, role: req.user.role });
  }
);

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async function (email, password, done) {
      try {
        const user = await UserModel.findOne({ email });

        if (!user) {
          return done(null, {
            message: "User not found, please sign up first!",
          });
        }

        bcrypt.compare(password, user.password, function (err, result) {
          if (!result) {
            return done(null, { message: "Incorrect password" });
          }
          return done(null, user);
        });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.BASE_URL || "http://localhost:8080/user/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        const user = await UserModel.findOne({ googleId: profile.id });

        if (user) {
          return cb(null, user);
        }

        const newUser = await UserModel.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
        });

        return cb(null, newUser);
      } catch (error) {
        return cb(error);
      }
    }
  )
);

module.exports = { userController };
