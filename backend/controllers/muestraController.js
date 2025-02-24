// getMuestras, crearMuestra

const muestraService = require("./../services/muestraService");

// Obtener todas las muestras
const getMuestras = async (req, res) => {
  try {
    const muestras = await muestraService.getMuestras();
    res.status(200).json(muestras);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una muestra por ID de cassette
const getMuestraByIdCassete = async (req, res) => {
  try {
    const muestra = await muestraService.getMuestraByIdCassete(req.params.id);
    if (muestra) {
      res.status(200).json(muestra);
    } else {
      res.status(404).json({ message: "Muestra no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una muestra segun su id

const getMuestraById = async (req,res) => {
  try {
    const muestra = await muestraService.getMuestraById(req.params.id);
    if (muestra) {
      res.status(200).json(muestra);
    } else {
      res.status(404).json({ message: "Muestra no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// Crear una nueva muestra
const crearMuestra = async (req, res) => {
    const createdMuestra = await muestraService.crearMuestra({
      descripcion: req.body.descripcion,
      fecha: req.body.fecha,
      tincion: req.body.tincion,
      observaciones: req.body.observaciones,
      qr_muestra: req.body.qr_muestra,
      cassette_id: req.body.cassette_id,})
      
    res.status(201).json(createdMuestra);
 
};

// Actualizar una muestra existente
const actualizarMuestra = async (req, res) => {
  
    const updatedMuestra = await muestraService.actualizarMuestra(
      req.params.id,
      {
      descripcion: req.body.descripcion,
      fecha: req.body.fecha,
      tincion: req.body.tincion,
      observaciones: req.body.observaciones,
    });
    if (updatedMuestra) {
      res.status(200).json(updatedMuestra);
    } else {
      res.status(404).json({ message: "Muestra no encontrada" });
    }
  
};

// Eliminar una muestra
const eliminarMuestra = async (req, res) => {
  try {
    const deleted = await muestraService.eliminarMuestra(req.params.id);
    if (deleted) {
      res.status(204).json({ message: "Muestra eliminada" });
    } else {
      res.status(404).json({ message: "Muestra no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
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