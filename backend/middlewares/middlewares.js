const jwt = require("jwt-simple");
const moment = require('moment');


const SECRET_KEY = "frase secreta"; // Clave secreta

// Middleware para verificar el token
const checkToken = (req, res, next) => {
  const token = req.headers["user-token"];
  if (!token) {
    return res.status(401).json({ error: "Token is required" });
  }

  let payload = {};
  try {
    payload = jwt.decode(token, SECRET_KEY);
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }

  if (payload.expiresAt < moment().unix()) {
    return res.status(401).json({ error: "Token has expired" });
  }

  req.usuario = { id: payload.usuarioId, rol: payload.usuarioRol };
  next();
};

// Middleware para obtener el rol
const verificarRol = (req, res) => {
  if (!req.usuario || !req.usuario.rol) {
    return res.status(403).json({ mensaje: "Rol no definido" });
  }
  res.json({ rol: req.usuario.rol });
};

module.exports = { checkToken, verificarRol };