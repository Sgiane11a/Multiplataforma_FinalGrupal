require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');

const app = express();

// Middleware básico
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de logging
app.use(logger);

console.log('🔧 Middlewares configurados');

// Rutas de la API
console.log('📚 Cargando rutas...');
app.use('/api/libros', require('./routes/libros'));
app.use('/api/autores', require('./routes/autores'));
app.use('/api/editoriales', require('./routes/editoriales'));
console.log('✅ Rutas cargadas correctamente');

// Ruta de prueba
app.get('/', (req, res) => {
  console.log('📍 Acceso a ruta raíz');
  res.json({
    success: true,
    message: 'API de Biblioteca funcionando correctamente',
    version: '1.0.0',
    endpoints: {
      libros: {
        base: '/api/libros',
        methods: {
          'GET /': 'Obtener todos los libros (con filtros y paginación)',
          'POST /': 'Crear un nuevo libro',
          'GET /:id': 'Obtener un libro específico',
          'PUT /:id': 'Actualizar un libro',
          'DELETE /:id': 'Eliminar un libro'
        }
      },
      autores: {
        base: '/api/autores',
        methods: {
          'GET /': 'Obtener todos los autores',
          'POST /': 'Crear un nuevo autor',
          'GET /:id': 'Obtener un autor específico',
          'PUT /:id': 'Actualizar un autor',
          'DELETE /:id': 'Eliminar un autor'
        }
      },
      editoriales: {
        base: '/api/editoriales',
        methods: {
          'GET /': 'Obtener todas las editoriales',
          'POST /': 'Crear una nueva editorial',
          'GET /:id': 'Obtener una editorial específica',
          'PUT /:id': 'Actualizar una editorial',
          'DELETE /:id': 'Eliminar una editorial'
        }
      }
    }
  });
});

// Ruta de health check
app.get('/health', (req, res) => {
  console.log('❤️ Health check solicitado');
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Middleware para rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Ruta ${req.originalUrl} no encontrada`
  });
});

// Middleware de manejo de errores
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en el puerto ${PORT}`);
  console.log(`📚 API disponible en: http://localhost:${PORT}`);
  console.log(`❤️  Health check en: http://localhost:${PORT}/health`);
});

// Conectar a la base de datos después de que el servidor esté corriendo
connectDB();