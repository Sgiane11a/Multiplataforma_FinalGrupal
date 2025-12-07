# Backend API - Biblioteca

Backend desarrollado con Node.js, Express y Mongoose para la gestión de una biblioteca con sistema de autores y editoriales.

## 🚀 Características

- **CRUD completo** para libros, autores y editoriales
- **Relaciones** entre libros, autores y editoriales
- **Validación de datos** con Mongoose
- **Paginación y filtros** en consultas
- **Búsqueda por texto** en diferentes campos
- **Middleware personalizado** para logging y manejo de errores
- **Configuración para despliegue** en Render

## 📁 Estructura del Proyecto

```
backend/
├── src/
│   ├── config/
│   │   └── database.js         # Configuración de MongoDB
│   ├── controllers/
│   │   ├── libroController.js  # Lógica de negocio - Libros
│   │   ├── autorController.js  # Lógica de negocio - Autores
│   │   └── editorialController.js # Lógica de negocio - Editoriales
│   ├── middleware/
│   │   ├── errorHandler.js     # Manejo de errores
│   │   └── logger.js           # Logging de requests
│   ├── models/
│   │   ├── Libro.js           # Schema de Mongoose - Libros
│   │   ├── Autor.js           # Schema de Mongoose - Autores
│   │   └── Editorial.js       # Schema de Mongoose - Editoriales
│   ├── routes/
│   │   ├── libros.js          # Rutas de la API - Libros
│   │   ├── autores.js         # Rutas de la API - Autores
│   │   └── editoriales.js     # Rutas de la API - Editoriales
│   └── app.js                 # Aplicación principal
├── data/
│   └── ejemplos.js            # Datos de ejemplo
├── .env                       # Variables de entorno
├── .gitignore
├── package.json
└── README.md
```

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd backend
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno en `.env`:
```env
MONGODB_URI=mongodb+srv://admin:admin123@biblioteca.zptzoo4.mongodb.net/biblioteca
PORT=5000
NODE_ENV=development
```

4. Inicia el servidor:
```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## 🔗 Endpoints de la API

### Libros

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/libros` | Obtener todos los libros |
| POST | `/api/libros` | Crear un nuevo libro |
| GET | `/api/libros/:id` | Obtener un libro específico |
| PUT | `/api/libros/:id` | Actualizar un libro |
| DELETE | `/api/libros/:id` | Eliminar un libro |

### Autores

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/autores` | Obtener todos los autores |
| POST | `/api/autores` | Crear un nuevo autor |
| GET | `/api/autores/:id` | Obtener un autor específico |
| PUT | `/api/autores/:id` | Actualizar un autor |
| DELETE | `/api/autores/:id` | Eliminar un autor |

### Editoriales

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/editoriales` | Obtener todas las editoriales |
| POST | `/api/editoriales` | Crear una nueva editorial |
| GET | `/api/editoriales/:id` | Obtener una editorial específica |
| PUT | `/api/editoriales/:id` | Actualizar una editorial |
| DELETE | `/api/editoriales/:id` | Eliminar una editorial |

### Parámetros de Consulta

#### Para Libros:
- `page`: Número de página (default: 1)
- `limit`: Elementos por página (default: 10)
- `genero`: Filtrar por género
- `disponible`: Filtrar por disponibilidad (true/false)
- `buscar`: Búsqueda de texto en título

#### Para Autores:
- `page`: Número de página (default: 1)
- `limit`: Elementos por página (default: 10)
- `buscar`: Búsqueda de texto en nombre y apellido

#### Para Editoriales:
- `page`: Número de página (default: 1)
- `limit`: Elementos por página (default: 10)
- `buscar`: Búsqueda de texto en nombre
- `pais`: Filtrar por país

### Ejemplo de uso:
```
GET /api/libros?page=1&limit=5&genero=Ficción&disponible=true&buscar=garcía
GET /api/autores?buscar=garcía
GET /api/editoriales?pais=España
```

## 📚 Modelos de Datos

### Libro
```json
{
  "titulo": "String (requerido, max: 100)",
  "autor": "ObjectId (referencia a Autor, requerido)",
  "editorial": "ObjectId (referencia a Editorial, requerido)", 
  "isbn": "String (requerido, único)",
  "fechaPublicacion": "Date (requerido)",
  "genero": "String (requerido, enum)",
  "numeroPaginas": "Number (requerido, min: 1)",
  "precio": "Number (requerido, min: 0)",
  "stock": "Number (requerido, min: 0, default: 1)",
  "disponible": "Boolean (default: true)"
}
```

### Autor
```json
{
  "nombre": "String (requerido, max: 50)",
  "apellido": "String (requerido, max: 50)",
  "fechaNacimiento": "Date (requerido)",
  "nacionalidad": "String (requerido, max: 30)",
  "biografia": "String (opcional, max: 1000)",
  "nombreCompleto": "String (virtual)"
}
```

### Editorial
```json
{
  "nombre": "String (requerido, único, max: 100)",
  "pais": "String (requerido, max: 30)",
  "ciudad": "String (requerido, max: 50)",
  "anoFundacion": "Number (requerido, 1000-actualidad)",
  "sitioWeb": "String (opcional, URL válida)",
  "telefono": "String (opcional)",
  "email": "String (opcional, email válido)"
}
```

### Géneros disponibles:
- Ficción
- No ficción  
- Ciencia
- Historia
- Biografía
- Poesía
- Drama
- Misterio
- Romance
- Fantasía
- Ciencia ficción
- Terror
- Aventura
- Infantil
- Juvenil
- Otro

## 📝 Relaciones

- Un **Libro** pertenece a un **Autor** (Many-to-One)
- Un **Libro** pertenece a una **Editorial** (Many-to-One)
- Un **Autor** puede tener muchos **Libros** (One-to-Many)
- Una **Editorial** puede tener muchos **Libros** (One-to-Many)

## 📚 Modelo de Libro

```json
{
  "titulo": "String (requerido, max: 100)",
  "autor": "String (requerido, max: 50)",
  "isbn": "String (requerido, único)",
  "fechaPublicacion": "Date (requerido)",
  "genero": "String (requerido, enum)",
  "editorial": "String (requerido, max: 50)",
  "numeroPaginas": "Number (requerido, min: 1)",
  "descripcion": "String (opcional, max: 500)",
  "disponible": "Boolean (default: true)",
  "precio": "Number (requerido, min: 0)",
  "stock": "Number (requerido, min: 0, default: 1)"
}
```

### Géneros disponibles:
- Ficción
- No ficción
- Ciencia
- Historia
- Biografía
- Poesía
- Drama
- Misterio
- Romance
- Fantasía
- Ciencia ficción
- Terror
- Aventura
- Infantil
- Juvenil
- Otro

## 🚀 Despliegue en Render

### Configuración automática:

1. **Conecta tu repositorio** a Render
2. **Configuración del servicio**:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: Node
   - Node Version: 18+

3. **Variables de entorno** en Render:
   ```
   MONGODB_URI=mongodb+srv://admin:admin123@biblioteca.zptzoo4.mongodb.net/biblioteca
   NODE_ENV=production
   ```

4. **Health Check**: El endpoint `/health` está configurado para verificación de estado

### URLs importantes:
- **API Base**: `https://tu-app.onrender.com`
- **Health Check**: `https://tu-app.onrender.com/health`
- **Documentación**: `https://tu-app.onrender.com/`

## 📊 Respuestas de la API

### Respuesta exitosa:
```json
{
  "success": true,
  "count": 10,
  "total": 50,
  "pagination": {
    "next": { "page": 2, "limit": 10 },
    "prev": { "page": 1, "limit": 10 }
  },
  "data": [...]
}
```

### Respuesta de error:
```json
{
  "success": false,
  "message": "Descripción del error",
  "errors": ["Lista de errores específicos"]
}
```

## 🔧 Tecnologías

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **Mongoose** - ODM para MongoDB
- **MongoDB Atlas** - Base de datos en la nube
- **dotenv** - Gestión de variables de entorno
- **cors** - Middleware para CORS

## 📝 Características Adicionales

- ✅ Validación de datos robusta
- ✅ Manejo de errores centralizado
- ✅ Logging de requests
- ✅ Paginación eficiente
- ✅ Búsqueda y filtros
- ✅ Estadísticas en tiempo real
- ✅ Optimización con índices
- ✅ Health checks
- ✅ Configuración para producción

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.