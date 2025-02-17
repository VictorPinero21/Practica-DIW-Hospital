//getImagenes, crearImagen
const multer = require("multer");
// Configuración de almacenamiento en memoria (para guardar en la BD)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const imagenService = require("./../services/imagenService");

// Obtener todas las imágenes
const getImagenes = async (req, res) => {
  try {
    const imagenes = await imagenService.getImagenes();
    res.status(200).json(imagenes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una imagen por ID
const getImagenById = async (req, res) => {
  try {
    const imagenes = await imagenService.getImagenById(req.params.id);
    if (imagenes) {
      res.status(200).json(imagenes);
    } else {
      res.status(404).json({ message: "Imagen no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear una nueva imagen
// const crearImagen = async (req, res) => {
//   try {
//     const createdImagen = await imagenService.crearImagen({
//       imagen: req.body.imagen,
//       muestra_id: req.body.muestra_id,
//     });
//     res.status(201).json(createdImagen);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// Crear una nueva imagen
const crearImagen = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No se subió ninguna imagen" });
    }

    // Guardar la imagen en la base de datos como binario (BLOB)
    const createdImagen = await imagenService.crearImagen({
      imagen: req.file.buffer, // Aquí guardamos el binario de la imagen
      muestra_id: req.body.muestra_id,
    });

    res.status(201).json({ mensaje: "Imagen subida con éxito", id: createdImagen.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Actualizar un casette existente
const actualizarImagen = async (req, res) => {
  try {
    const updatedImagen = await imagenService.actualizarImagen(req.params.id, req.body);
    if (updatedImagen) {
      res.status(200).json(updatedImagen);
    } else {
      res.status(404).json({ message: "Imagen no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un cassette
const eliminarImagen = async (req, res) => {
  try {
    const deleted = await imagenService.eliminarImagen(req.params.id);
    if (deleted) {
      res.status(204).json({ message: "Imagen eliminada" });
    } else {
      res.status(404).json({ message: "Imagen no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getImagenByMuestra = async (req, res) => {
  const imagenes = await imagenService.getImagenByMuestra(req.params.id)
  res.send(imagenes).status(200)
}

module.exports = {
  getImagenes,
  getImagenById,
  crearImagen,
  actualizarImagen,
  eliminarImagen,
  getImagenByMuestra
};