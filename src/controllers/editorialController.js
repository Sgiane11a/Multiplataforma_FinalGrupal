const Editorial = require('../models/Editorial');

// @desc    Obtener todas las editoriales
// @route   GET /api/editoriales
// @access  Public
const getEditoriales = async (req, res) => {
  try {
    const { page = 1, limit = 10, buscar, pais } = req.query;
    
    let filtros = {};
    
    // Filtro por país
    if (pais) {
      filtros.pais = { $regex: pais, $options: 'i' };
    }
    
    // Búsqueda por texto en nombre
    if (buscar) {
      filtros.nombre = { $regex: buscar, $options: 'i' };
    }

    // Paginación
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;

    const total = await Editorial.countDocuments(filtros);
    const editoriales = await Editorial.find(filtros)
      .sort({ nombre: 1 })
      .limit(limitNum)
      .skip(startIndex)
      .exec();

    console.log('🏢 Editoriales encontradas:', editoriales.length);
    if (editoriales.length > 0) {
      console.log('📖 Ejemplo de editorial:', JSON.stringify(editoriales[0], null, 2));
    }

    res.status(200).json({
      success: true,
      count: editoriales.length,
      total,
      data: editoriales
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener las editoriales',
      error: error.message
    });
  }
};

// @desc    Obtener una editorial por ID
// @route   GET /api/editoriales/:id
// @access  Public
const getEditorial = async (req, res) => {
  try {
    const editorial = await Editorial.findById(req.params.id);

    if (!editorial) {
      return res.status(404).json({
        success: false,
        message: 'Editorial no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      data: editorial
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Editorial no encontrada'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al obtener la editorial',
      error: error.message
    });
  }
};

// @desc    Crear una nueva editorial
// @route   POST /api/editoriales
// @access  Public
const createEditorial = async (req, res) => {
  try {
    const editorial = await Editorial.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Editorial creada exitosamente',
      data: editorial
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors: messages
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe una editorial con este nombre'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al crear la editorial',
      error: error.message
    });
  }
};

// @desc    Actualizar una editorial
// @route   PUT /api/editoriales/:id
// @access  Public
const updateEditorial = async (req, res) => {
  try {
    const editorial = await Editorial.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!editorial) {
      return res.status(404).json({
        success: false,
        message: 'Editorial no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Editorial actualizada exitosamente',
      data: editorial
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors: messages
      });
    }

    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Editorial no encontrada'
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe una editorial con este nombre'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al actualizar la editorial',
      error: error.message
    });
  }
};

// @desc    Eliminar una editorial
// @route   DELETE /api/editoriales/:id
// @access  Public
const deleteEditorial = async (req, res) => {
  try {
    const editorial = await Editorial.findByIdAndDelete(req.params.id);

    if (!editorial) {
      return res.status(404).json({
        success: false,
        message: 'Editorial no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Editorial eliminada exitosamente',
      data: {}
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Editorial no encontrada'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al eliminar la editorial',
      error: error.message
    });
  }
};

module.exports = {
  getEditoriales,
  getEditorial,
  createEditorial,
  updateEditorial,
  deleteEditorial
};