const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true,
    maxLength: [100, 'El título no puede exceder 100 caracteres']
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Autor',
    required: [true, 'El autor es obligatorio']
  },
  editorial: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Editorial',
    required: [true, 'La editorial es obligatoria']
  },
  isbn: {
    type: String,
    required: [true, 'El ISBN es obligatorio'],
    unique: true,
    trim: true
  },
  fechaPublicacion: {
    type: Number,
    required: [true, 'El año de publicación es obligatorio'],
    min: [1000, 'El año debe ser válido'],
    max: [new Date().getFullYear(), 'El año no puede ser futuro']
  },
  genero: {
    type: String,
    required: [true, 'El género es obligatorio'],
    enum: ['Ficción', 'No ficción', 'Ciencia', 'Historia', 'Biografía', 'Poesía', 'Drama', 'Misterio', 'Romance', 'Fantasía', 'Ciencia ficción', 'Terror', 'Aventura', 'Infantil', 'Juvenil', 'Otro'],
    default: 'Otro'
  },
  numeroPaginas: {
    type: Number,
    required: [true, 'El número de páginas es obligatorio'],
    min: [1, 'El número de páginas debe ser mayor a 0']
  },
  precio: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: [0, 'El precio no puede ser negativo']
  },
  stock: {
    type: Number,
    required: [true, 'El stock es obligatorio'],
    min: [0, 'El stock no puede ser negativo'],
    default: 1
  },
  disponible: {
    type: Boolean,
    default: true
  },
  descripcion: {
    type: String,
    trim: true,
    maxLength: [1000, 'La descripción no puede exceder 1000 caracteres']
  }
}, {
  timestamps: true
});

// Índices para optimizar búsquedas
libroSchema.index({ titulo: 'text', genero: 1 });
libroSchema.index({ disponible: 1 });

module.exports = mongoose.model('Libro', libroSchema);