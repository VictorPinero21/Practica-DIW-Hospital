//getCassettes, getCassetteById, crearCassette, actualizarCassette, eliminarCassette

const casetteService = require("./../services/casseteService");

// Obtener todos los casettes
const getCassettes = async (req, res) => {
  try {
    const casettes = await casetteService.getCassettes();
    res.status(200).json(casettes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un casette por ID
const getCassetteById = async (req, res) => {
  try {
    const casettes = await casetteService.getCassetteById(req.params.id);
    if (casettes) {
      res.status(200).json(casettes);
    } else {
      res.status(404).json({ message: "Cassette no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo casette
const crearCassette = async (req, res) => {
  try {
    const createdCassette = await casetteService.crearCassette({
      descripcion: req.body.descripcion,
      fecha: req.body.fecha,
      organo: req.body.organo,
      caracteristicas: req.body.caracteristicas,
      observaciones: req.body.observaciones,
      qr_cassette: req.body.qr_cassette,
      usuario_id: req.body.usuario_id,
    });
    res.status(201).json(createdCassette);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un casette existente
const actualizarCassette = async (req, res) => {
  try {
    const updatedCassette = await casetteService.actualizarCassette(req.params.id, req.body);
    if (updatedCassette) {
      res.status(200).json(updatedCassette);
    } else {
      res.status(404).json({ message: "Cassette no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un cassette
const eliminarCassette = async (req, res) => {
  try {
      // Intenta eliminar el cassette usando el servicio
      const deleted = await casetteService.eliminarCassette(req.params.id);

      // Verifica si se eliminó correctamente
      if (deleted) {
          // Respuesta exitosa, no hay contenido para devolver
          res.status(204).send(); // 204 No Content es apropiado aquí
      } else {
          // Si no se encontró el cassette
          res.status(404).json({ message: "Cassette no encontrado" });
      }
  } catch (error) {
      // Manejo de errores en caso de una excepción
      console.error("Error al eliminar el cassette:", error); // Log para el servidor
      res.status(500).json({ error: error.message }); // Respuesta de error
  }
};


module.exports = {
  getCassettes,
  getCassetteById,
  crearCassette,
  actualizarCassette,
  eliminarCassette,
};