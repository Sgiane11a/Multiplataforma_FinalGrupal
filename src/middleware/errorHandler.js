// Middleware para manejar errores
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log detallado del error
  console.error('🚨 Error capturado:', {
    name: err.name,
    message: err.message,
    stack: err.stack,
    code: err.code
  });

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

  // Error genérico
  if (!error.statusCode) {
    error.statusCode = 500;
    error.message = error.message || 'Error interno del servidor';
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;