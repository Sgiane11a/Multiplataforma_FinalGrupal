const mongoose = require('mongoose');

const autorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
    maxLength: [50, 'El nombre no puede exceder 50 caracteres']
  },
  apellido: {
    type: String,
    required: [true, 'El apellido es obligatorio'],
    trim: true,
    maxLength: [50, 'El apellido no puede exceder 50 caracteres']
  },
  fechaNacimiento: {
    type: Date,
    required: [true, 'La fecha de nacimiento es obligatoria']
  },
  nacionalidad: {
    type: String,
    required: [true, 'La nacionalidad es obligatoria'],
    trim: true,
    maxLength: [30, 'La nacionalidad no puede exceder 30 caracteres']
  },
  biografia: {
    type: String,
    trim: true,
    maxLength: [1000, 'La biografía no puede exceder 1000 caracteres']
  }
}, {
  timestamps: true
});

// Virtual para nombre completo
autorSchema.virtual('nombreCompleto').get(function() {
  return `${this.nombre} ${this.apellido}`;
});

// Asegurar que los virtuals se incluyan en JSON
autorSchema.set('toJSON', { virtuals: true });
autorSchema.set('toObject', { virtuals: true });

// Índice para búsquedas
autorSchema.index({ nombre: 'text', apellido: 'text' });

module.exports = mongoose.model('Autor', autorSchema);