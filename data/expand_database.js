const fetch = require('node-fetch');

const API_BASE_URL = 'https://multiplataforma-finalgrupal.onrender.com/api';

// Más autores
const nuevosAutores = [
  {
    nombre: 'Pablo',
    apellido: 'Neruda',
    nacionalidad: 'Chileno',
    fechaNacimiento: '1904-07-12',
    biografia: 'Poeta chileno, Premio Nobel de Literatura 1971. Considerado entre los mejores y más influyentes poetas del siglo XX.'
  },
  {
    nombre: 'Octavio',
    apellido: 'Paz',
    nacionalidad: 'Mexicano',
    fechaNacimiento: '1914-03-31',
    biografia: 'Poeta, escritor, ensayista y diplomático mexicano. Premio Nobel de Literatura 1990.'
  },
  {
    nombre: 'Rubén',
    apellido: 'Darío',
    nacionalidad: 'Nicaragüense',
    fechaNacimiento: '1867-01-18',
    biografia: 'Poeta nicaragüense, máximo representante del modernismo literario en lengua española.'
  },
  {
    nombre: 'José',
    apellido: 'Martí',
    nacionalidad: 'Cubano',
    fechaNacimiento: '1853-01-28',
    biografia: 'Político, pensador, escritor, periodista, filósofo y poeta cubano. Héroe nacional de Cuba.'
  },
  {
    nombre: 'Gabriela',
    apellido: 'Mistral',
    nacionalidad: 'Chilena',
    fechaNacimiento: '1889-04-07',
    biografia: 'Poetisa, diplomática, feminista y pedagoga chilena. Primera latinoamericana en ganar el Premio Nobel de Literatura.'
  },
  {
    nombre: 'Federico',
    apellido: 'García Lorca',
    nacionalidad: 'Español',
    fechaNacimiento: '1898-06-05',
    biografia: 'Poeta, dramaturgo y prosista español, también conocido por su destreza en muchas otras artes.'
  },
  {
    nombre: 'Miguel',
    apellido: 'de Cervantes',
    nacionalidad: 'Español',
    fechaNacimiento: '1547-09-29',
    biografia: 'Escritor español. Es ampliamente considerado como la máxima figura de la literatura española y universalmente conocido por haber escrito Don Quijote de la Mancha.'
  },
  {
    nombre: 'Roberto',
    apellido: 'Bolaño',
    nacionalidad: 'Chileno',
    fechaNacimiento: '1953-04-28',
    biografia: 'Escritor chileno. Considerado uno de los grandes renovadores de la literatura hispanoamericana.'
  }
];

// Más editoriales
const nuevasEditoriales = [
  {
    nombre: 'Fondo de Cultura Económica',
    pais: 'México',
    ciudad: 'Ciudad de México',
    anoFundacion: 1934,
    direccion: 'Carretera Picacho-Ajusco 227, Bosques del Pedregal, 14738 Ciudad de México',
    contacto: 'info@fce.com.mx - +52 55 5227 4672'
  },
  {
    nombre: 'Editorial Tusquets',
    pais: 'España',
    ciudad: 'Barcelona',
    anoFundacion: 1969,
    direccion: 'Carrer de Cesare Cantù 8, 08023 Barcelona',
    contacto: 'info@tusquets.com - +34 93 253 09 00'
  },
  {
    nombre: 'Alfaguara',
    pais: 'España',
    ciudad: 'Madrid',
    anoFundacion: 1964,
    direccion: 'Calle Juan Ignacio Luca de Tena 15, 28027 Madrid',
    contacto: 'contacto@alfaguara.com - +34 91 744 90 60'
  },
  {
    nombre: 'Editorial Seix Barral',
    pais: 'España',
    ciudad: 'Barcelona',
    anoFundacion: 1956,
    direccion: 'Avinguda Diagonal 662-664, 08034 Barcelona',
    contacto: 'info@seixbarral.es - +34 93 492 81 36'
  },
  {
    nombre: 'Penguin Random House',
    pais: 'Estados Unidos',
    ciudad: 'Nueva York',
    anoFundacion: 2013,
    direccion: '1745 Broadway, Nueva York, NY 10019',
    contacto: 'info@penguinrandomhouse.com - +1 212 782 9000'
  }
];

// Muchos más libros
const nuevosLibros = [
  {
    titulo: 'Veinte poemas de amor y una canción desesperada',
    isbn: '978-84-376-0510-4',
    fechaPublicacion: 1924,
    genero: 'Poesía',
    numeroPaginas: 96,
    precio: 15.99,
    stock: 20,
    disponible: true,
    descripcion: 'Una de las obras más leídas de Pablo Neruda, que reúne algunos de los versos más románticos de la literatura.'
  },
  {
    titulo: 'Canto General',
    isbn: '978-84-376-0511-1',
    fechaPublicacion: 1950,
    genero: 'Poesía',
    numeroPaginas: 400,
    precio: 28.99,
    stock: 12,
    disponible: true,
    descripcion: 'Obra épica de Pablo Neruda que abarca la historia de América Latina desde una perspectiva poética.'
  },
  {
    titulo: 'El laberinto de la soledad',
    isbn: '978-84-376-0512-8',
    fechaPublicacion: 1950,
    genero: 'Ensayo',
    numeroPaginas: 352,
    precio: 22.50,
    stock: 15,
    disponible: true,
    descripcion: 'Ensayo de Octavio Paz sobre la identidad del mexicano y su relación con la historia.'
  },
  {
    titulo: 'Azul',
    isbn: '978-84-376-0513-5',
    fechaPublicacion: 1888,
    genero: 'Poesía',
    numeroPaginas: 128,
    precio: 18.75,
    stock: 18,
    disponible: true,
    descripcion: 'Libro de cuentos y poemas de Rubén Darío que marca el inicio del modernismo en la literatura hispanoamericana.'
  },
  {
    titulo: 'Versos sencillos',
    isbn: '978-84-376-0514-2',
    fechaPublicacion: 1891,
    genero: 'Poesía',
    numeroPaginas: 112,
    precio: 16.90,
    stock: 22,
    disponible: true,
    descripcion: 'Poemario de José Martí que incluye el famoso poema "Guantanamera".'
  },
  {
    titulo: 'Desolación',
    isbn: '978-84-376-0515-9',
    fechaPublicacion: 1922,
    genero: 'Poesía',
    numeroPaginas: 180,
    precio: 19.50,
    stock: 14,
    disponible: true,
    descripcion: 'Primer libro de poemas de Gabriela Mistral, que la consagró como una de las grandes poetisas de América.'
  },
  {
    titulo: 'Romancero gitano',
    isbn: '978-84-376-0516-6',
    fechaPublicacion: 1928,
    genero: 'Poesía',
    numeroPaginas: 144,
    precio: 17.99,
    stock: 16,
    disponible: true,
    descripcion: 'Obra cumbre de Federico García Lorca que recrea el mundo gitano andaluz.'
  },
  {
    titulo: 'La casa de Bernarda Alba',
    isbn: '978-84-376-0517-3',
    fechaPublicacion: 1936,
    genero: 'Drama',
    numeroPaginas: 96,
    precio: 14.50,
    stock: 25,
    disponible: true,
    descripcion: 'Drama rural de Federico García Lorca sobre la represión en una familia andaluza.'
  },
  {
    titulo: 'Don Quijote de la Mancha',
    isbn: '978-84-376-0518-0',
    fechaPublicacion: 1605,
    genero: 'Ficción',
    numeroPaginas: 1200,
    precio: 45.99,
    stock: 8,
    disponible: true,
    descripcion: 'La obra maestra de Miguel de Cervantes, considerada la primera novela moderna.'
  },
  {
    titulo: 'Los detectives salvajes',
    isbn: '978-84-376-0519-7',
    fechaPublicacion: 1998,
    genero: 'Ficción',
    numeroPaginas: 672,
    precio: 35.50,
    stock: 10,
    disponible: true,
    descripcion: 'Novela de Roberto Bolaño sobre un grupo de jóvenes poetas en México y Europa.'
  },
  {
    titulo: '2666',
    isbn: '978-84-376-0520-3',
    fechaPublicacion: 2004,
    genero: 'Ficción',
    numeroPaginas: 1200,
    precio: 42.90,
    stock: 6,
    disponible: true,
    descripcion: 'Obra póstuma y cumbre de Roberto Bolaño, una novela compleja sobre la violencia contemporánea.'
  },
  {
    titulo: 'La región más transparente',
    isbn: '978-84-376-0521-0',
    fechaPublicacion: 1958,
    genero: 'Ficción',
    numeroPaginas: 432,
    precio: 26.99,
    stock: 12,
    disponible: true,
    descripcion: 'Primera novela de Carlos Fuentes que retrata la sociedad mexicana post-revolucionaria.'
  },
  {
    titulo: 'Pedro Páramo',
    isbn: '978-84-376-0522-7',
    fechaPublicacion: 1955,
    genero: 'Ficción',
    numeroPaginas: 128,
    precio: 18.50,
    stock: 20,
    disponible: true,
    descripcion: 'Obra maestra de Juan Rulfo sobre fantasmas y memorias en un pueblo mexicano.'
  },
  {
    titulo: 'El llano en llamas',
    isbn: '978-84-376-0523-4',
    fechaPublicacion: 1953,
    genero: 'Ficción',
    numeroPaginas: 192,
    precio: 20.75,
    stock: 17,
    disponible: true,
    descripcion: 'Colección de cuentos de Juan Rulfo sobre la vida rural mexicana.'
  },
  {
    titulo: 'La muerte de Artemio Cruz',
    isbn: '978-84-376-0524-1',
    fechaPublicacion: 1962,
    genero: 'Ficción',
    numeroPaginas: 368,
    precio: 24.50,
    stock: 11,
    disponible: true,
    descripcion: 'Novela de Carlos Fuentes sobre la Revolución Mexicana y sus consecuencias.'
  }
];

// Funciones auxiliares (mismas que antes)
async function createAutor(autor) {
  try {
    const response = await fetch(`${API_BASE_URL}/autores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(autor)
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log(`✅ Autor creado: ${autor.nombre} ${autor.apellido}`);
      return result.data;
    } else {
      console.log(`❌ Error creando autor: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    return null;
  }
}

async function createEditorial(editorial) {
  try {
    const response = await fetch(`${API_BASE_URL}/editoriales`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editorial)
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log(`✅ Editorial creada: ${editorial.nombre}`);
      return result.data;
    } else {
      console.log(`❌ Error creando editorial: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    return null;
  }
}

async function createLibro(libro) {
  try {
    const response = await fetch(`${API_BASE_URL}/libros`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(libro)
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log(`✅ Libro creado: ${libro.titulo} - $${libro.precio}`);
      return result.data;
    } else {
      console.log(`❌ Error creando libro: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    return null;
  }
}

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

async function expandDatabase() {
  try {
    console.log('🚀 Expandiendo la base de datos...');
    
    // 1. Crear nuevos autores
    console.log('👥 Creando más autores...');
    const autoresCreados = [];
    for (const autorData of nuevosAutores) {
      const autor = await createAutor(autorData);
      if (autor) autoresCreados.push(autor);
    }

    // 2. Crear nuevas editoriales
    console.log('🏢 Creando más editoriales...');
    const editorialesCreadas = [];
    for (const editorialData of nuevasEditoriales) {
      const editorial = await createEditorial(editorialData);
      if (editorial) editorialesCreadas.push(editorial);
    }

    // 3. Obtener todos los datos actuales
    const datosActuales = await getExistingData();
    console.log(`📊 Total autores: ${datosActuales.autores.length}`);
    console.log(`📊 Total editoriales: ${datosActuales.editoriales.length}`);

    // 4. Crear más libros
    console.log('📚 Creando muchos más libros...');
    for (let i = 0; i < nuevosLibros.length; i++) {
      const libro = nuevosLibros[i];
      const autor = datosActuales.autores[i % datosActuales.autores.length];
      const editorial = datosActuales.editoriales[i % datosActuales.editoriales.length];
      
      if (autor && editorial) {
        libro.autor = autor._id || autor.id;
        libro.editorial = editorial._id || editorial.id;
        await createLibro(libro);
      }
    }

    console.log('\n🎉 ¡Base de datos expandida exitosamente!');
    console.log(`📊 RESUMEN FINAL:`);
    console.log(`👥 Autores: ${datosActuales.autores.length}`);
    console.log(`🏢 Editoriales: ${datosActuales.editoriales.length}`);
    console.log(`📚 Libros: Muchos más agregados!`);
    
  } catch (error) {
    console.error('❌ Error general:', error);
  }
}

expandDatabase();