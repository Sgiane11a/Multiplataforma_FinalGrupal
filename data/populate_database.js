const mongoose = require('mongoose');
const Autor = require('../src/models/Autor');
const Editorial = require('../src/models/Editorial');
const Libro = require('../src/models/Libro');

// Datos de autores
const autoresData = [
  {
    nombre: 'Gabriel',
    apellido: 'García Márquez',
    nacionalidad: 'Colombiano',
    fechaNacimiento: new Date('1927-03-06'),
    biografia: 'Escritor, novelista, cuentista, guionista, editor y periodista colombiano. Conocido familiarmente y por sus amigos como Gabo.'
  },
  {
    nombre: 'Isabel',
    apellido: 'Allende',
    nacionalidad: 'Chilena',
    fechaNacimiento: new Date('1942-08-02'),
    biografia: 'Escritora chilena con nacionalidad estadounidense. Autora de best-sellers mundiales.'
  },
  {
    nombre: 'Mario',
    apellido: 'Vargas Llosa',
    nacionalidad: 'Peruano',
    fechaNacimiento: new Date('1936-03-28'),
    biografia: 'Escritor peruano. Premio Nobel de Literatura 2010.'
  },
  {
    nombre: 'Julio',
    apellido: 'Cortázar',
    nacionalidad: 'Argentino',
    fechaNacimiento: new Date('1914-08-26'),
    biografia: 'Escritor, traductor e intelectual argentino nacionalizado francés.'
  },
  {
    nombre: 'Jorge Luis',
    apellido: 'Borges',
    nacionalidad: 'Argentino',
    fechaNacimiento: new Date('1899-08-24'),
    biografia: 'Escritor argentino, uno de los autores más destacados de la literatura del siglo XX.'
  }
];

// Datos de editoriales (con direcciones y contactos)
const editorialesData = [
  {
    nombre: 'Editorial Planeta',
    pais: 'España',
    ciudad: 'Barcelona',
    anoFundacion: 1949,
    direccion: 'Avenida Diagonal 662-664, 08034 Barcelona',
    contacto: 'info@planeta.es - +34 93 492 80 00'
  },
  {
    nombre: 'Editorial Santillana',
    pais: 'España',
    ciudad: 'Madrid',
    anoFundacion: 1960,
    direccion: 'Calle Torrelaguna 60, 28043 Madrid',
    contacto: 'contacto@santillana.es - +34 91 744 90 60'
  },
  {
    nombre: 'Editorial Sudamericana',
    pais: 'Argentina',
    ciudad: 'Buenos Aires',
    anoFundacion: 1939,
    direccion: 'Humberto Primo 555, C1103ACK Buenos Aires',
    contacto: 'info@sudamericana.com.ar - +54 11 4361 8444'
  },
  {
    nombre: 'Editorial Anagrama',
    pais: 'España',
    ciudad: 'Barcelona',
    anoFundacion: 1969,
    direccion: 'Carrer de Pedró de la Creu 58, 08034 Barcelona',
    contacto: 'anagrama@anagrama-ed.es - +34 93 280 22 65'
  }
];

// Datos de libros
const librosData = [
  {
    titulo: 'Cien años de soledad',
    isbn: '978-84-376-0494-7',
    fechaPublicacion: 1967,
    genero: 'Ficción',
    numeroPaginas: 471,
    precio: 25.99,
    stock: 15,
    disponible: true,
    descripcion: 'La obra cumbre del realismo mágico que narra la historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo.'
  },
  {
    titulo: 'El amor en los tiempos del cólera',
    isbn: '978-84-376-0495-4',
    fechaPublicacion: 1985,
    genero: 'Romance',
    numeroPaginas: 464,
    precio: 23.50,
    stock: 12,
    disponible: true,
    descripcion: 'Una historia de amor que transcurre a lo largo de más de cincuenta años entre Florentino Ariza y Fermina Daza.'
  },
  {
    titulo: 'La casa de los espíritus',
    isbn: '978-84-376-0496-1',
    fechaPublicacion: 1982,
    genero: 'Ficción',
    numeroPaginas: 448,
    precio: 24.75,
    stock: 8,
    disponible: true,
    descripcion: 'Primera novela de Isabel Allende que narra la saga familiar de los del Valle y los Trueba a lo largo de cuatro generaciones.'
  },
  {
    titulo: 'Paula',
    isbn: '978-84-376-0497-8',
    fechaPublicacion: 1994,
    genero: 'Biografía',
    numeroPaginas: 330,
    precio: 21.90,
    stock: 10,
    disponible: true,
    descripcion: 'Libro autobiográfico escrito por Isabel Allende para su hija Paula mientras esta se encontraba en coma.'
  },
  {
    titulo: 'La ciudad y los perros',
    isbn: '978-84-376-0498-5',
    fechaPublicacion: 1963,
    genero: 'Drama',
    numeroPaginas: 384,
    precio: 22.30,
    stock: 6,
    disponible: true,
    descripcion: 'Primera novela de Mario Vargas Llosa que retrata la vida en una academia militar limeña.'
  },
  {
    titulo: 'Rayuela',
    isbn: '978-84-376-0499-2',
    fechaPublicacion: 1963,
    genero: 'Ficción',
    numeroPaginas: 635,
    precio: 28.50,
    stock: 7,
    disponible: true,
    descripcion: 'Novela experimental de Julio Cortázar que puede leerse de múltiples formas, siguiendo diferentes órdenes de capítulos.'
  },
  {
    titulo: 'Bestiario',
    isbn: '978-84-376-0500-5',
    fechaPublicacion: 1951,
    genero: 'Ficción',
    numeroPaginas: 192,
    precio: 18.75,
    stock: 9,
    disponible: true,
    descripcion: 'Primer libro de cuentos de Julio Cortázar que incluye el famoso relato "Casa tomada".'
  },
  {
    titulo: 'Ficciones',
    isbn: '978-84-376-0501-2',
    fechaPublicacion: 1944,
    genero: 'Ficción',
    numeroPaginas: 174,
    precio: 19.95,
    stock: 11,
    disponible: true,
    descripcion: 'Colección de cuentos de Jorge Luis Borges que incluye "El jardín de senderos que se bifurcan" y "Artificios".'
  },
  {
    titulo: 'El Aleph',
    isbn: '978-84-376-0502-9',
    fechaPublicacion: 1949,
    genero: 'Ficción',
    numeroPaginas: 208,
    precio: 20.45,
    stock: 13,
    disponible: true,
    descripcion: 'Libro de relatos de Jorge Luis Borges que incluye el cuento homónimo "El Aleph", una de sus obras más conocidas.'
  },
  {
    titulo: 'Conversación en La Catedral',
    isbn: '978-84-376-0503-6',
    fechaPublicacion: 1969,
    genero: 'Ficción',
    numeroPaginas: 728,
    precio: 32.80,
    stock: 5,
    disponible: true,
    descripcion: 'Novela de Mario Vargas Llosa que retrata la corrupción política en el Perú durante la dictadura de Manuel A. Odría.'
  }
];

async function populateDatabase() {
  try {
    // Conectar a MongoDB
    await mongoose.connect('mongodb://localhost:27017/libreria_db');
    console.log('✅ Conectado a MongoDB');

    // Crear autores
    console.log('📚 Creando autores...');
    await Autor.deleteMany({}); // Limpiar autores existentes
    const autores = await Autor.insertMany(autoresData);
    console.log(`✅ ${autores.length} autores creados`);

    // Crear/actualizar editoriales
    console.log('🏢 Actualizando editoriales...');
    const editoriales = [];
    for (const editorialData of editorialesData) {
      const editorial = await Editorial.findOneAndUpdate(
        { nombre: editorialData.nombre },
        editorialData,
        { upsert: true, new: true }
      );
      editoriales.push(editorial);
    }
    console.log(`✅ ${editoriales.length} editoriales actualizadas`);

    // Crear libros
    console.log('📖 Creando libros...');
    await Libro.deleteMany({}); // Limpiar libros existentes
    
    const librosCompletos = [];
    for (let i = 0; i < librosData.length; i++) {
      const libroData = librosData[i];
      const autor = autores[i % autores.length]; // Rotar autores
      const editorial = editoriales[i % editoriales.length]; // Rotar editoriales
      
      const libro = await Libro.create({
        ...libroData,
        autor: autor._id,
        editorial: editorial._id
      });
      librosCompletos.push(libro);
    }
    
    console.log(`✅ ${librosCompletos.length} libros creados`);

    // Mostrar resumen
    console.log('\n📊 RESUMEN DE LA BASE DE DATOS:');
    console.log(`👥 Autores: ${autores.length}`);
    console.log(`🏢 Editoriales: ${editoriales.length}`);
    console.log(`📚 Libros: ${librosCompletos.length}`);
    
    console.log('\n📋 LIBROS CREADOS:');
    for (const libro of librosCompletos) {
      console.log(`  📖 ${libro.titulo} - $${libro.precio}`);
    }

    console.log('\n🎉 ¡Base de datos poblada exitosamente!');
    
  } catch (error) {
    console.error('❌ Error al poblar la base de datos:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Desconectado de MongoDB');
  }
}

// Ejecutar el script
populateDatabase();