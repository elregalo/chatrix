/**
 * @author - Moobi Kabelo
 */
import { config } from "../config/config.js";
import jwt from "jsonwebtoken";
import validator from "validator";

export const generateOtp = () => {};

export const generateToken = (id, fullnames) => {
  return jwt.sign(
    {
      userId: id,
      fullNames: fullnames,
    },
    config.auth.jwtSecKey,
    {
      expiresIn: config.auth.expiresIn * 2,
    }
  );
};

export const validateEmail = (email) => {
  return new Promise((resolve, reject) => {
    if (validator.isEmail(email)) {
      resolve(email);
    } else {
      reject("Sorry, invalid email.");
    }
  });
};

export const validatePassword = (password) => {
  return new Promise((resolve, reject) => {
    if (password.length < 8) {
      reject("Sorry, password must be at least 8 characters long.");
    } else if (
      !password.match(/[a-z]/g) ||
      !password.match(/[A-Z]/g) ||
      !password.match(/[0-9]/g)
    ) {
      reject(
        "Password must contain at least one lowercase letter, one uppercase letter, and one number."
      );
    } else {
      resolve(password);
    }
  });
};
