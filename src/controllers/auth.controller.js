import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Role from "../models/Role.js";
import { SECRET } from "../config.js";

export const signupHandler = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    const trimmedPassword = password.trim();

    if (trimmedPassword.length === 0) {
      return res.status(400).json({ message: "La contraseña no puede estar vacía o contener solo espacios." });
    }

    const newUser = new User({
      username,
      email,
      password: trimmedPassword,
    });

    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }

    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, SECRET, {
      expiresIn: 86400,
    });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const signinHandler = async (req, res) => {
  try {
    const userFound = await User.findOne({ email: req.body.email }).populate(
      "roles"
    );

    if (!userFound) return res.status(400).json({ message: "User Not Found" });

    const trimmedPassword = req.body.password.trim();

    if (trimmedPassword.length === 0) {
      return res.status(400).json({ message: "La contraseña no puede estar vacía o contener solo espacios." });
    }
    
    const matchPassword = await User.comparePassword(
      trimmedPassword,
      userFound.password
    );

    if (!matchPassword)
      return res.status(401).json({
        token: null,
        message: "Invalid Password",
      });

    const token = jwt.sign({ id: userFound._id }, SECRET, {
      expiresIn: 86400,
    });

    res.json({ token });
  } catch (error) {
    console.log(error);
  }
};
