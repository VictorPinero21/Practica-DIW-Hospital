const Muestra = require("./../models/Muestra");

const getMuestras = async () => {
  try {
    return await Muestra.findAll();
  } catch (error) {
    throw new Error("Error al pedir todas las muestras: " + error.message);
  }
};

const getMuestraById = async (id) => {
  try {
    return await Muestra.findByPk(id);
  } catch (error) {
    throw new Error("Error al pedir una muestra por id: " + error.message);
  }
};

const crearMuestra = async (muestraData) => {
  try {
    return await Muestra.create(muestraData);
  } catch (error) {
    throw new Error("Error al crear la muestra: " + error.message);
  }
};

const actualizarMuestra = async (id, muestraData) => {
  try {
    const muestra = await Muestra.findByPk(id);
    if (!muestra) {
      throw new Error("Muestra no encontrado");
    }
    return await muestra.update(muestraData);
  } catch (error) {
    throw new Error("Error al modificar la muestra: " + error.message);
  }
};

const eliminarMuestra = async (id) => {
  try {
    const muestra = await Muestra.findByPk(id);
    if (!muestra) {
      throw new Error("La muestra no existe");
    }
    return await muestra.destroy();
  } catch (error) {
    throw new Error("Error al borrar la muestra: " + error.message);
  }
};

module.exports = {
  getMuestras,
  getMuestraById,
  crearMuestra,
  actualizarMuestra,
  eliminarMuestra,
};
