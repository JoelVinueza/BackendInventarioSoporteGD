import User from "../models/User.js";
import Role from "../models/Role.js";

export const createUser = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    const rolesFound = await Role.find({ name: { $in: roles } });

    const user = new User({
      username,
      email,
      password,
      roles: rolesFound.map((role) => role._id),
    });

    user.password = await User.encryptPassword(user.password);

    const savedUser = await user.save();

    return res.status(200).json({
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      roles: savedUser.roles,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("roles", "name");

    const usersWithoutRoleIds = users.map(user => ({
      _id: user._id,
      username: user.username,
      email: user.email,
      roles: user.roles.map(role => role.name),
    }));

    return res.status(200).json(usersWithoutRoleIds);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener los usuarios" });
  }
};

export const getUserByID = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("roles", "name");

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const userWithoutRoleIds = {
      _id: user._id,
      username: user.username,
      email: user.email,
      roles: user.roles.map(role => role.name),
    };

    return res.status(200).json(userWithoutRoleIds);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener el usuario" });
  }
};
