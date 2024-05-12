const cloudinary = require('cloudinary').v2;

const deleteFile = (url) => {
  const imgSplited = url.split('/');

  const folderName = imgSplited.at(-2);
  const imgName = imgSplited.at(-1).split(".")[0];

  cloudinary.uploader.destroy( `${folderName}/${imgName}`, () => {
    console.log('Imagen eliminada');
  });
  };

  module.exports = { deleteFile };

