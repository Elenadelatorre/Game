const Juego = require('../models/juegos');
const { deleteFile } = require('../../utils/deleteFile');

//! GET todos los juegos
//http://localhost:3000/api/v1/juegos/
const getJuegos = async (req, res, next) => {
  try {
    const juegos = await Juego.find({ verified: true });
    return res.status(200).json(juegos);
  } catch (error) {
    return res.status(400).json('Error en la solicitud');
  }
};

//! GET todos los juegos pendientes de verificación (administradores):
//http://localhost:3000/api/v1/juegos/
const getJuegosAdmin = async (req, res, next) => {
  try {
    const juegos = await Juego.find({ verified: false });
    return res.status(200).json(juegos);
  } catch (error) {
    return res.status(400).json('Error en la solicitud');
  }
};

//! GET un juego por id
//http://localhost:3000/api/v1/juegos/:id
const getJuegoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const juego = await Juego.findById(id);
    return res.status(200).json(juego);
  } catch (error) {
    return res.status(400).json('Error en la solicitud');
  }
};

//! GET un juego por categoría:
//http://localhost:3000/api/v1/juegos/categoria/plataformas
const getJuegosByCategory = async (req, res, next) => {
  try {
    const { categoria } = req.params;
    const juegos = await Juego.find({ categoria });
    return res.status(200).json(juegos);
  } catch (error) {
    return res.status(400).json('Error en la solicitud');
  }
};

//! GET un juego por precio:
//http://localhost:3000/api/v1/juegos/precio/20
const getJuegosByPrice = async (req, res, next) => {
  try {
    const { precio } = req.params;
    const juegos = await Juego.find({ precio: { $lte: precio } });
    return res.status(200).json(juegos);
  } catch (error) {
    return res.status(400).json('Error en la solicitud');
  }
};

//! POST un nuevo juego:
const postJuego = async (req, res, next) => {
  try {
    const newJuego = new Juego(req.body);

    if (req.file) {
      newJuego.imagen = req.file.path;
    }

    // queremos que el juego si lo está creando un usuario normal el campo verified esté obligatoriamente en false
    // cuando lo crea un admin está en true
    if (req.user.rol === 'admin') {
      newJuego.verified = true;
    } else {
      newJuego.verified = false;
    }

    const juegoSaved = await newJuego.save();

    return res.status(201).json(juegoSaved);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

//! PUT un juego(modificar) por id:
const putJuego = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newJuego = new Juego(req.body);
    newJuego._id = id;

    if (req.file) {
      newJuego.imagen = req.file.path;

      const oldJuego = await Juego.findById(id);
      deleteFile(oldJuego.imagen);
    }

    const juegoUpdated = await Juego.findByIdAndUpdate(id, newJuego, {
      new: true
    });
    return res.status(200).json(juegoUpdated);
  } catch (error) {
    console.log(error);
    return res.status(400).json('Error en la solicitud');
  }
};

//! DELETE un juego por id:
const deleteJuego = async (req, res, next) => {
  try {
    const { id } = req.params;
    const juegoDeleted = await Juego.findByIdAndDelete(id);
    deleteFile(juegoDeleted.imagen);
    return res.status(200).json(juegoDeleted);
  } catch (error) {
    console.log(error);
    return res.status(400).json('Error en la solicitud');
  }
};

module.exports = {
  getJuegos,
  getJuegoById,
  getJuegosByCategory,
  getJuegosByPrice,
  postJuego,
  putJuego,
  deleteJuego,
  getJuegosAdmin
};
