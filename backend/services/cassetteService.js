const Cassette = require("./../models/Cassette");

const getCassettes = async () => {
  try {
    return await Cassette.findAll();
  } catch (error) {
    throw new Error("Error al pedir todos los cassettes: " + error.message);
  }
};

const getCassetteById = async (id) => {
  try {
    return await Cassette.findByPk(id);
  } catch (error) {
    throw new Error("Error al pedir un cassette por id: " + error.message);
  }
};

const crearCassette = async (cassetteData) => {
  try {
    return await Cassette.create(cassetteData);
  } catch (error) {
    throw new Error("Error al crear el cassette: " + error.message);
  }
};

const actualizarCassette = async (id, cassetteData) => {
  try {
    const cassette = await Cassette.findByPk(id);
    if (!cassette) {
      throw new Error("Cassette no encontrado");
    }
    return await cassette.update(cassetteData);
  } catch (error) {
    throw new Error("Error al modificar el cassette: " + error.message);
  }
};

const eliminarCassette = async (id) => {
  try {
    const cassette = await Cassette.findByPk(id);
    if (!cassette) {
      throw new Error("El cassette no existe");
    }
    return await cassette.destroy();
  } catch (error) {
    throw new Error("Error al borrar el cassette: " + error.message);
  }
};

module.exports = {
  getCassettes,
  getCassetteById,
  crearCassette,
  actualizarCassette,
  eliminarCassette,
};
