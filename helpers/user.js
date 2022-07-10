/**
 * @author - Moobi Kabelo
 */
import { User } from "../models/User.js";
import { Op } from "sequelize";
import { uuid } from "uuidv4";

// TODO: CRUD

export const saveUser = (email, fullNames, password) => {
  return User.create({
    _id: uuid(),
    email: email,
    fullNames: fullNames,
    password: password,
  });
};

export const findUser = (email) => {
  return User.findOne({
    where: {
      email: {
        [Op.eq]: email,
      },
    },
  });
};

export const getUser = (id) => {
  return User.findOne({
    where: {
      _id: {
        [Op.eq]: id,
      },
    },
  });
};

export const updateUser = () => {};

export const deleteUser = () => {};
