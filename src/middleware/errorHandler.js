// Middleware para manejar errores
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log del error
  console.error(err);

  // Error de mongoose - ID mal formateado
  if (err.name === 'CastError') {
    const message = 'Recurso no encontrado';
    error = { message, statusCode: 404 };
  }

  // Error de mongoose - Duplicado
  if (err.code === 11000) {
    const message = 'Recurso duplicado';
    error = { message, statusCode: 400 };
  }

  // Error de mongoose - Validación
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = { message, statusCode: 400 };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Error del servidor'
  });
};

module.exports = errorHandler;