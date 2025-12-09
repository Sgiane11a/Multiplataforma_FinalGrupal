const Libro = require('../models/Libro');

// @desc    Obtener todos los libros
// @route   GET /api/libros
// @access  Public
const getLibros = async (req, res) => {
  try {
    const { page = 1, limit = 10, genero, disponible, buscar } = req.query;
    
    // Construir filtros
    let filtros = {};
    
    if (genero) {
      filtros.genero = genero;
    }
    
    if (disponible !== undefined) {
      filtros.disponible = disponible === 'true';
    }
    
    // Búsqueda por texto en título
    if (buscar) {
      filtros.titulo = { $regex: buscar, $options: 'i' };
    }

    // Paginación
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;

    const total = await Libro.countDocuments(filtros);
    const libros = await Libro.find(filtros)
      .populate('autor', 'nombre apellido nacionalidad')
      .populate('editorial', 'nombre pais')
      .sort({ createdAt: -1 })
      .limit(limitNum)
      .skip(startIndex)
      .exec();

    console.log('📚 Libros encontrados:', libros.length);
    if (libros.length > 0) {
      console.log('📖 Ejemplo de libro:', JSON.stringify(libros[0], null, 2));
    }

    res.status(200).json({
      success: true,
      count: libros.length,
      total,
      data: libros
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener los libros',
      error: error.message
    });
  }
};

// @desc    Obtener un libro por ID
// @route   GET /api/libros/:id
// @access  Public
const getLibro = async (req, res) => {
  try {
    const libro = await Libro.findById(req.params.id)
      .populate('autor', 'nombre apellido nacionalidad fechaNacimiento')
      .populate('editorial', 'nombre pais ciudad anoFundacion');

    if (!libro) {
      return res.status(404).json({
        success: false,
        message: 'Libro no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: libro
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Libro no encontrado'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al obtener el libro',
      error: error.message
    });
  }
};

// @desc    Crear un nuevo libro
// @route   POST /api/libros
// @access  Public
const createLibro = async (req, res) => {
  try {
    console.log('📝 Datos recibidos para crear libro:', req.body);
    
    // Validar que los campos requeridos estén presentes
    const { titulo, autor, editorial, isbn, fechaPublicacion, genero, numeroPaginas, precio } = req.body;
    
    if (!titulo || !autor || !editorial || !isbn || !fechaPublicacion || !genero || !numeroPaginas || !precio) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos requeridos',
        campos_requeridos: ['titulo', 'autor', 'editorial', 'isbn', 'fechaPublicacion', 'genero', 'numeroPaginas', 'precio']
      });
    }

    // Asegurar que el stock tenga un valor por defecto si no se proporciona
    const libroData = {
      ...req.body,
      stock: req.body.stock || 1
    };

    console.log('📝 Datos a guardar:', libroData);
    
    const libro = await Libro.create(libroData);

    console.log('✅ Libro creado exitosamente:', libro._id);

    res.status(201).json({
      success: true,
      message: 'Libro creado exitosamente',
      data: libro
    });
  } catch (error) {
    console.error('❌ Error al crear libro:', error);
    
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
        message: 'Ya existe un libro con este ISBN'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al crear el libro',
      error: error.message
    });
  }
};

// @desc    Actualizar un libro
// @route   PUT /api/libros/:id
// @access  Public
const updateLibro = async (req, res) => {
  try {
    const libro = await Libro.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!libro) {
      return res.status(404).json({
        success: false,
        message: 'Libro no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Libro actualizado exitosamente',
      data: libro
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
        message: 'Libro no encontrado'
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe un libro con este ISBN'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al actualizar el libro',
      error: error.message
    });
  }
};

// @desc    Eliminar un libro
// @route   DELETE /api/libros/:id
// @access  Public
const deleteLibro = async (req, res) => {
  try {
    const libro = await Libro.findByIdAndDelete(req.params.id);

    if (!libro) {
      return res.status(404).json({
        success: false,
        message: 'Libro no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Libro eliminado exitosamente',
      data: {}
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Libro no encontrado'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al eliminar el libro',
      error: error.message
    });
  }
};

module.exports = {
  getLibros,
  getLibro,
  createLibro,
  updateLibro,
  deleteLibro
};