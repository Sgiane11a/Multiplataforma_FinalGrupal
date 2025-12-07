const express = require('express');
const router = express.Router();
const {
  getAutores,
  getAutor,
  createAutor,
  updateAutor,
  deleteAutor
} = require('../controllers/autorController');

// Rutas principales CRUD
router.route('/')
  .get(getAutores)    // GET /api/autores - Obtener todos los autores
  .post(createAutor); // POST /api/autores - Crear un nuevo autor

router.route('/:id')
  .get(getAutor)      // GET /api/autores/:id - Obtener un autor por ID
  .put(updateAutor)   // PUT /api/autores/:id - Actualizar un autor
  .delete(deleteAutor); // DELETE /api/autores/:id - Eliminar un autor

module.exports = router;