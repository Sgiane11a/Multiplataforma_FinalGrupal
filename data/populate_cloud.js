const fetch = require('node-fetch');

const API_BASE_URL = 'https://multiplataforma-finalgrupal.onrender.com/api';

// Datos de autores
const autoresData = [
  {
    nombre: 'Isabel',
    apellido: 'Allende',
    nacionalidad: 'Chilena',
    fechaNacimiento: '1942-08-02',
    biografia: 'Escritora chilena con nacionalidad estadounidense. Autora de best-sellers mundiales.'
  },
  {
    nombre: 'Mario',
    apellido: 'Vargas Llosa',
    nacionalidad: 'Peruano',
    fechaNacimiento: '1936-03-28',
    biografia: 'Escritor peruano. Premio Nobel de Literatura 2010.'
  },
  {
    nombre: 'Julio',
    apellido: 'Cortázar',
    nacionalidad: 'Argentino',
    fechaNacimiento: '1914-08-26',
    biografia: 'Escritor, traductor e intelectual argentino nacionalizado francés.'
  },
  {
    nombre: 'Jorge Luis',
    apellido: 'Borges',
    nacionalidad: 'Argentino',
    fechaNacimiento: '1899-08-24',
    biografia: 'Escritor argentino, uno de los autores más destacados de la literatura del siglo XX.'
  }
];

// Primero vamos a actualizar las editoriales existentes
async function updateEditorial(id, data) {
  try {
    const response = await fetch(`${API_BASE_URL}/editoriales/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log(`✅ Editorial actualizada: ${data.nombre}`);
      return result;
    } else {
      console.log(`❌ Error actualizando editorial: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    return null;
  }
}

// Función para crear autor
async function createAutor(autor) {
  try {
    const response = await fetch(`${API_BASE_URL}/autores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(autor)
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log(`✅ Autor creado: ${autor.nombre} ${autor.apellido}`);
      return result.data;
    } else {
      const error = await response.text();
      console.log(`❌ Error creando autor: ${error}`);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    return null;
  }
}

// Función para crear libro
async function createLibro(libro) {
  try {
    const response = await fetch(`${API_BASE_URL}/libros`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(libro)
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log(`✅ Libro creado: ${libro.titulo} - $${libro.precio}`);
      return result.data;
    } else {
      const error = await response.text();
      console.log(`❌ Error creando libro: ${error}`);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    return null;
  }
}

// Función para obtener datos existentes
async function getExistingData() {
  try {
    const [autoresResponse, editorialesResponse] = await Promise.all([
      fetch(`${API_BASE_URL}/autores`),
      fetch(`${API_BASE_URL}/editoriales`)
    ]);
    
    const autores = await autoresResponse.json();
    const editoriales = await editorialesResponse.json();
    
    return {
      autores: autores.data || [],
      editoriales: editoriales.data || []
    };
  } catch (error) {
    console.error(`❌ Error obteniendo datos: ${error.message}`);
    return { autores: [], editoriales: [] };
  }
}

async function populateCloudDatabase() {
  try {
    console.log('🌐 Conectando a la API en la nube...');
    
    // 1. Actualizar editoriales existentes con direcciones y contactos
    console.log('🏢 Actualizando editoriales...');
    
    // Actualizar Editorial Planeta
    await updateEditorial('6937a0c9d55a9d9f8c161ceb', {
      nombre: 'Editorial PlanetaS',
      pais: 'España',
      ciudad: 'Madrid',
      anoFundacion: 1952,
      direccion: 'Avenida Diagonal 662-664, 08034 Barcelona',
      contacto: 'info@planeta.es - +34 93 492 80 00'
    });
    
    // Actualizar Editorial Santillana
    await updateEditorial('69379d89d55a9d9f8c161cdd', {
      nombre: 'Editorial Santillana',
      pais: 'Colombia',
      ciudad: 'Bogotá',
      anoFundacion: 1960,
      direccion: 'Calle Torrelaguna 60, 28043 Madrid',
      contacto: 'contacto@santillana.es - +34 91 744 90 60'
    });

    // 2. Crear nuevos autores
    console.log('👥 Creando autores...');
    const autoresCreados = [];
    for (const autorData of autoresData) {
      const autor = await createAutor(autorData);
      if (autor) {
        autoresCreados.push(autor);
      }
    }

    // 3. Obtener datos actuales para crear libros
    const datosExistentes = await getExistingData();
    console.log(`📊 Autores disponibles: ${datosExistentes.autores.length}`);
    console.log(`📊 Editoriales disponibles: ${datosExistentes.editoriales.length}`);

    // 4. Crear libros con los autores y editoriales disponibles
    console.log('📚 Creando libros...');
    
    const librosData = [
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

    // Asignar autores y editoriales a los libros
    for (let i = 0; i < librosData.length; i++) {
      const libro = librosData[i];
      const autor = datosExistentes.autores[i % datosExistentes.autores.length];
      const editorial = datosExistentes.editoriales[i % datosExistentes.editoriales.length];
      
      if (autor && editorial) {
        libro.autor = autor._id || autor.id;
        libro.editorial = editorial._id || editorial.id;
        await createLibro(libro);
      }
    }

    console.log('\n🎉 ¡Base de datos en la nube actualizada exitosamente!');
    console.log('📱 Ahora recarga la aplicación en tu teléfono para ver los nuevos datos');
    
  } catch (error) {
    console.error('❌ Error general:', error);
  }
}

// Ejecutar el script
populateCloudDatabase();