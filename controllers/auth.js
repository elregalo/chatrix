/**
 * @author - Moobi Kabelo
 */
import bcrypt from "bcrypt";
import { config } from "../config/config.js";
import { saveUser, getUser } from "../helpers/user.js";
import {
  generateToken,
  validateEmail,
  validatePassword,
} from "../libs/auth.js";

export const register = (req, res) => {
  const { email, fullNames, password } = req.body;

  if (!email || !fullNames || !password) {
    return res.status(400).json({
      message: "All fields are required.",
      status: 400,
    });
  }

  // TODO check if user exist
  getUser(email)
    .then((foundUser) => {
      if (foundUser) {
        return res.status(400).json({
          message: "Sorry, you already have an account.",
          status: 400,
        });
      }
      // TODO: validate email and password
      validateEmail(email)
        .then((isEmail) => {
          // TODO: validate password
          validatePassword(password)
            .then((isPassword) => {
              // TODO: hash password
              bcrypt
                .hash(isPassword, 15)
                .then((hashedPassword) => {
                  // TODO: save password
                  saveUser(isEmail, fullNames, hashedPassword)
                    .then((user) => {
                      // TODO: generate token, cookie and send user details
                      const cookieToken = generateToken(
                        user._id,
                        user.full_names
                      );
                      res.cookie("cookie", cookieToken, {
                        httpOnly: true,
                        maxAge: config.auth.expiresIn * 72,
                        sameSite: "strict",
                        secure: true,
                      });
                      // return user id
                      return res.status(201).json({
                        message: {
                          id: user._id,
                        },
                        status: 201,
                      });
                    })
                    .catch((err) => {
                      console.log(err);
                      return res.status(500).json({
                        message: "Sorry, failed to create account. Try again.",
                        status: 500,
                      });
                    });
                })
                .catch((err) => {
                  console.log(err);
                  return res.status(500).json({
                    message: "Sorry, failed to create account. Try again.",
                    status: 500,
                  });
                });
            })
            .catch((err) => {
              console.log(err);
              return res.status(500).json({
                message: err,
                status: 500,
              });
            });
        })
        .catch((err) => {
          return res.status(500).json({
            message: err,
            status: 500,
          });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        message: "Sorry, failed to create account.",
        status: 500,
      });
    });
};
