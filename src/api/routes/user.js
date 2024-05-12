const { isAdmin } = require("../../middlewares/auth");
const { getUsers, register, login } = require("../controllers/user");

const usersRouter = require("express").Router();

usersRouter.get("/", [isAdmin], getUsers);
usersRouter.post("/register", register);
usersRouter.post("/login", login);

module.exports = usersRouter;