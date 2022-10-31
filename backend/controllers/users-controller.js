const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require("../models/http-error");
const User = require("../models/user");
const { jwtKey } = require("../util/encryption");

/* const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (error) {
    return next(new HttpError(
        "Fetching users failed. Please try again.", 
        500
        ));
  }

  res
    .status(200)
    .json({ users: users.map((user) => user.toObject({ getters: true })) });
}; */

const signupUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return next(
      new HttpError(
        "Invalid credentials passed, please checck your data: " + errors,
        422
        ));

  const { firstName, lastName, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError(
        "Signing up failed, please try again.", 
        500
        ));
  }

  if (existingUser)
    return next(new HttpError(
      "User already exists. Please login instead or try another email", 
      400
      ));

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    return next(new HttpError(
      'Could not create user, please try again.',
      500
      ));
  }

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    image: req.file.path,
    cart: [],
    user_data: null
  });

  try {
    await newUser.save();
  } catch (error) {
    return next(new HttpError(
        "Signing up failed, please try again.", 
        500
        ));
  }

  let token;
  try {
    token = jwt.sign({
      userId: newUser.id,
      email: newUser.email
    },
    jwtKey,
    { expiresIn: '1h'});
  } catch (error) {
    return next(new HttpError(
      'Signup failed unexpectadly. Please try again.',
      500
      ));
  }


  res.status(200).json({ 
    userId: newUser.id,
    email: newUser.email,
    token  
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError(
        "Login failed, please try again.", 
        500
        ));
  }

  if (!existingUser)
    return next(new HttpError(
      "Invalid credentials. Could not log you in.",
      403
      ));

  let passwordIsValid = false;
  try {
    passwordIsValid = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    return next(new HttpError(
      'Invalid credentials. Could not log you in.',
      500
      ));
  }

  if(!passwordIsValid)
    return next(new HttpError(
      'Invalid credentials. Could not log you in.',
      500
    ));

  let token;
  try {
    console.log(jwtKey);
    token = jwt.sign({
      userId: existingUser.id,
      email: existingUser.email
    },
    jwtKey,
    { expiresIn: '1h'});
  } catch (error) {
    return next(new HttpError(
      'Login failed unexpectadly. Please try again.',
      500
      ));
  }

  res.status(200).json({  
    userId: existingUser.id,
    email: existingUser.email,
    token
  });
};

/* exports.getUsers    = getUsers; */
exports.signupUser  = signupUser;
exports.login       = login;
