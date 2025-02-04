//getUsuarios, getUsuarioById, crearUsuario, actualizarUsuario, eliminarUsuario
//El Victor del pasado le dice a la Estela del futuro que los nombres de los controladores sean asi ma o meno que para las rutas me hacen falta parece ser
const bcrypt = require("bcrypt");

//código de David, revisar todos los nombres y ver si esto tienes que aplicarlo al crear de otros controladores y demás
const crearUsuario = async (req, res) => {
  try {
    const createdUser = await usersService.createUser({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      centro: req.body.centro,
      rol: req.body.rol,
    });
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
