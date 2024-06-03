import Role from "../models/Role.js";
import User from "../models/User.js";
import { ADMIN_EMAIL, ADMIN_USERNAME, ADMIN_PASSWORD } from "../config.js";

export const createRoles = async () => {
  try {

    const count = await Role.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "moderator" }).save(),
      new Role({ name: "admin" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};

export const createAdmin = async () => {
  const userFound = await User.findOne({ email: ADMIN_EMAIL });
  console.log(userFound);
  if (userFound) return;

  const roles = await Role.find({ name: { $in: ["admin", "moderator"] } });
  
  if (roles.length === 0) {
    console.log("No se encontraron roles con los nombres especificados.");
  }
  
  const newUser = await User.create({
    username: ADMIN_USERNAME,
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    roles: roles.map((role) => role._id),
  });

  console.log(`new user created: ${newUser.email}`);
};

createRoles();
createAdmin();
