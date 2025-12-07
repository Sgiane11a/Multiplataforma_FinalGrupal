const Autor = require('../models/Autor');

// @desc    Obtener todos los autores
// @route   GET /api/autores
// @access  Public
const getAutores = async (req, res) => {
  try {
    const { page = 1, limit = 10, buscar } = req.query;
    
    let filtros = {};
    
    // Búsqueda por texto en nombre y apellido
    if (buscar) {
      filtros.$or = [
        { nombre: { $regex: buscar, $options: 'i' } },
        { apellido: { $regex: buscar, $options: 'i' } }
      ];
    }

    // Paginación
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;

    const total = await Autor.countDocuments(filtros);
    const autores = await Autor.find(filtros)
      .sort({ apellido: 1, nombre: 1 })
      .limit(limitNum)
      .skip(startIndex)
      .exec();

    res.status(200).json({
      success: true,
      count: autores.length,
      total,
      data: autores
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener los autores',
      error: error.message
    });
  }
};

// @desc    Obtener un autor por ID
// @route   GET /api/autores/:id
// @access  Public
const getAutor = async (req, res) => {
  try {
    const autor = await Autor.findById(req.params.id);

    if (!autor) {
      return res.status(404).json({
        success: false,
        message: 'Autor no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: autor
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Autor no encontrado'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al obtener el autor',
      error: error.message
    });
  }
};

// @desc    Crear un nuevo autor
// @route   POST /api/autores
// @access  Public
const createAutor = async (req, res) => {
  try {
    console.log('📝 Creando nuevo autor:', req.body);
    const autor = await Autor.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Autor creado exitosamente',
      data: autor
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

    res.status(500).json({
      success: false,
      message: 'Error al crear el autor',
      error: error.message
    });
  }
};

// @desc    Actualizar un autor
// @route   PUT /api/autores/:id
// @access  Public
const updateAutor = async (req, res) => {
  try {
    const autor = await Autor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!autor) {
      return res.status(404).json({
        success: false,
        message: 'Autor no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Autor actualizado exitosamente',
      data: autor
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
        message: 'Autor no encontrado'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al actualizar el autor',
      error: error.message
    });
  }
};

// @desc    Eliminar un autor
// @route   DELETE /api/autores/:id
// @access  Public
const deleteAutor = async (req, res) => {
  try {
    const autor = await Autor.findByIdAndDelete(req.params.id);

    if (!autor) {
      return res.status(404).json({
        success: false,
        message: 'Autor no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Autor eliminado exitosamente',
      data: {}
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Autor no encontrado'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al eliminar el autor',
      error: error.message
    });
  }
};

module.exports = {
  getAutores,
  getAutor,
  createAutor,
  updateAutor,
  deleteAutor
};