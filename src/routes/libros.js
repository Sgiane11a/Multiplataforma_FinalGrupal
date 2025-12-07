const express = require('express');
const router = express.Router();
const {
  getLibros,
  getLibro,
  createLibro,
  updateLibro,
  deleteLibro
} = require('../controllers/libroController');

// Rutas principales CRUD
router.route('/')
  .get(getLibros)     // GET /api/libros - Obtener todos los libros
  .post(createLibro); // POST /api/libros - Crear un nuevo libro

router.route('/:id')
  .get(getLibro)      // GET /api/libros/:id - Obtener un libro por ID
  .put(updateLibro)   // PUT /api/libros/:id - Actualizar un libro
  .delete(deleteLibro); // DELETE /api/libros/:id - Eliminar un libro

module.exports = router;