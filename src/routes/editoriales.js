const express = require('express');
const router = express.Router();
const {
  getEditoriales,
  getEditorial,
  createEditorial,
  updateEditorial,
  deleteEditorial
} = require('../controllers/editorialController');

// Rutas principales CRUD
router.route('/')
  .get(getEditoriales)    // GET /api/editoriales - Obtener todas las editoriales
  .post(createEditorial); // POST /api/editoriales - Crear una nueva editorial

router.route('/:id')
  .get(getEditorial)      // GET /api/editoriales/:id - Obtener una editorial por ID
  .put(updateEditorial)   // PUT /api/editoriales/:id - Actualizar una editorial
  .delete(deleteEditorial); // DELETE /api/editoriales/:id - Eliminar una editorial

module.exports = router;