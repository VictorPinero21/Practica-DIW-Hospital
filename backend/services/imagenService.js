const Imagen = require("./../database/models/Imagen");

const getImagenes = async () => {
  try {
    return await Imagen.findAll();
  } catch (error) {
    throw new Error("Error al pedir todas las imágenes: " + error.message);
  }
};

const getImagenById = async (id) => {
  try {
    return await Imagen.findByPk(id);
  } catch (error) {
    throw new Error("Error al pedir una imagen por id: " + error.message);
  }
};

const crearImagen = async (imagenData) => {
  try {
    return await Imagen.create(imagenData);
  } catch (error) {
    throw new Error("Error al crear la imagen: " + error.message);
  }
};

const actualizarImagen = async (id, imagenData) => {
  try {
    const imagen = await Imagen.findByPk(id);
    if (!imagen) {
      throw new Error("Imagen no encontrada");
    }
    return await imagen.update(imagenData);
  } catch (error) {
    throw new Error("Error al modificar la imagen: " + error.message);
  }
};

const eliminarImagen = async (id) => {
  try {
    const imagen = await Imagen.findByPk(id);
    if (!imagen) {
      throw new Error("El cassette no existe");
    }
    return await imagen.destroy();
  } catch (error) {
    throw new Error("Error al borrar el cassette: " + error.message);
  }
};

// recoger las imagenes de una muestra (muestra_id)
const getImagenByMuestra = async (id) =>{
    const imagenes = await Imagen.findAll({
      where:{ muestra_id: id}
    });

    return imagenes;
}

module.exports = {
  getImagenes,
  getImagenById,
  crearImagen,
  actualizarImagen,
  eliminarImagen,
  getImagenByMuestra
};