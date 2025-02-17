const Muestra = require("./../database/models/Muestra");

const getMuestras = async () => {
  try {
    return await Muestra.findAll();
  } catch (error) {
    throw new Error("Error al pedir todas las muestras: " + error.message);
  }
};

// obtener muestras por el id del cassette
const getMuestraByIdCassete = async (id) => {
  try {
    return await Muestra.findAll({
      where: { cassette_id: id }
    });
  } catch (error) {
    throw new Error("Error al pedir una muestra por id: " + error.message);
  }
};

// obtener una muestra por el id 

const getMuestraById = async (id) =>{
  try {
    return await Muestra.findByPk(id)
  } catch (error) {
    throw new Error("Error al pedir una muestra por id: " + error.message);
  }
}


const crearMuestra = async (muestraData) => {
  try {
    return await Muestra.create(muestraData);
  } catch (error) {
    throw new Error("Error al crear la muestra: " + error.message);
  }
};

const actualizarMuestra = async (id,muestraData) => {
    const muestra = await Muestra.update(muestraData,{
      where: {id:id}
    });
    return muestra
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
  getMuestraByIdCassete
};