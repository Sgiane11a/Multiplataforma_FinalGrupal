const mongoose = require('mongoose');

const editorialSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
    unique: true,
    maxLength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  pais: {
    type: String,
    required: [true, 'El país es obligatorio'],
    trim: true,
    maxLength: [30, 'El país no puede exceder 30 caracteres']
  },
  ciudad: {
    type: String,
    required: [true, 'La ciudad es obligatoria'],
    trim: true,
    maxLength: [50, 'La ciudad no puede exceder 50 caracteres']
  },
  anoFundacion: {
    type: Number,
    required: [true, 'El año de fundación es obligatorio'],
    min: [1000, 'Año de fundación no válido'],
    max: [new Date().getFullYear(), 'El año no puede ser futuro']
  },
  sitioWeb: {
    type: String,
    trim: true,
    match: [/^https?:\/\/.+/, 'Por favor ingrese una URL válida']
  },
  telefono: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingrese un email válido']
  }
}, {
  timestamps: true
});

// Índice para búsquedas
editorialSchema.index({ nombre: 'text', pais: 1 });

module.exports = mongoose.model('Editorial', editorialSchema);