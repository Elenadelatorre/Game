const juegosRouter = require("./juegos");
const plataformasRouter = require("./plataformas");
const usersRouter = require("./user");
const mainRouter = require("express").Router();

mainRouter.use('/juegos', juegosRouter);
mainRouter.use('/plataformas', plataformasRouter);
mainRouter.use('/users', usersRouter);

module.exports = mainRouter;
