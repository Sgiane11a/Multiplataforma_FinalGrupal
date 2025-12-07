// Datos de ejemplo para probar la API

// Primero crear los autores
const autoresEjemplo = [
  {
    nombre: "Gabriel",
    apellido: "García Márquez",
    fechaNacimiento: "1927-03-06",
    nacionalidad: "Colombiano",
    biografia: "Escritor y periodista colombiano, Premio Nobel de Literatura en 1982."
  },
  {
    nombre: "Miguel",
    apellido: "de Cervantes",
    fechaNacimiento: "1547-09-29",
    nacionalidad: "Español",
    biografia: "Escritor español considerado una de las máximas figuras de la literatura española."
  },
  {
    nombre: "George",
    apellido: "Orwell",
    fechaNacimiento: "1903-06-25",
    nacionalidad: "Británico",
    biografia: "Escritor y periodista británico, famoso por sus novelas distópicas."
  },
  {
    nombre: "Antoine",
    apellido: "de Saint-Exupéry",
    fechaNacimiento: "1900-06-29",
    nacionalidad: "Francés",
    biografia: "Escritor y aviador francés, autor de El Principito."
  },
  {
    nombre: "J.K.",
    apellido: "Rowling",
    fechaNacimiento: "1965-07-31",
    nacionalidad: "Británica",
    biografia: "Escritora británica, creadora de la saga Harry Potter."
  },
  {
    nombre: "Yuval Noah",
    apellido: "Harari",
    fechaNacimiento: "1976-02-24",
    nacionalidad: "Israelí",
    biografia: "Historiador israelí, profesor en la Universidad Hebrea de Jerusalén."
  }
];

// Luego crear las editoriales
const editorialesEjemplo = [
  {
    nombre: "Sudamericana",
    pais: "Argentina",
    ciudad: "Buenos Aires",
    anoFundacion: 1939,
    sitioWeb: "https://www.penguinrandomhouse.com.ar"
  },
  {
    nombre: "Francisco de Robles",
    pais: "España",
    ciudad: "Madrid",
    anoFundacion: 1600
  },
  {
    nombre: "Secker & Warburg",
    pais: "Reino Unido",
    ciudad: "Londres",
    anoFundacion: 1936
  },
  {
    nombre: "Reynal & Hitchcock",
    pais: "Estados Unidos",
    ciudad: "Nueva York",
    anoFundacion: 1933
  },
  {
    nombre: "Bloomsbury",
    pais: "Reino Unido",
    ciudad: "Londres",
    anoFundacion: 1986,
    sitioWeb: "https://www.bloomsbury.com"
  },
  {
    nombre: "Harvill Secker",
    pais: "Reino Unido",
    ciudad: "Londres",
    anoFundacion: 2005
  }
];

// Finalmente los libros (necesitarás usar los IDs de autores y editoriales creados)
const librosEjemploTemplate = [
  {
    titulo: "Cien años de soledad",
    // autor: ID_del_autor_Gabriel_García_Márquez,
    // editorial: ID_de_editorial_Sudamericana,
    isbn: "978-84-376-0494-7",
    fechaPublicacion: "1967-06-05",
    genero: "Ficción",
    numeroPaginas: 432,
    precio: 15.99,
    stock: 10
  },
  {
    titulo: "Don Quijote de la Mancha",
    // autor: ID_del_autor_Miguel_de_Cervantes,
    // editorial: ID_de_editorial_Francisco_de_Robles,
    isbn: "978-84-376-0495-8",
    fechaPublicacion: "1605-01-16",
    genero: "Ficción",
    numeroPaginas: 863,
    precio: 18.50,
    stock: 5
  },
  {
    titulo: "1984",
    // autor: ID_del_autor_George_Orwell,
    // editorial: ID_de_editorial_Secker_Warburg,
    isbn: "978-84-376-0496-9",
    fechaPublicacion: "1949-06-08",
    genero: "Ciencia ficción",
    numeroPaginas: 328,
    precio: 12.75,
    stock: 8
  },
  {
    titulo: "El Principito",
    // autor: ID_del_autor_Antoine_de_Saint_Exupery,
    // editorial: ID_de_editorial_Reynal_Hitchcock,
    isbn: "978-84-376-0497-0",
    fechaPublicacion: "1943-04-06",
    genero: "Infantil",
    numeroPaginas: 96,
    precio: 9.99,
    stock: 15
  },
  {
    titulo: "Harry Potter y la Piedra Filosofal",
    // autor: ID_del_autor_JK_Rowling,
    // editorial: ID_de_editorial_Bloomsbury,
    isbn: "978-84-376-0498-1",
    fechaPublicacion: "1997-06-26",
    genero: "Fantasía",
    numeroPaginas: 309,
    precio: 14.99,
    stock: 12
  },
  {
    titulo: "Sapiens: De animales a dioses",
    // autor: ID_del_autor_Yuval_Noah_Harari,
    // editorial: ID_de_editorial_Harvill_Secker,
    isbn: "978-84-376-0499-2",
    fechaPublicacion: "2011-09-04",
    genero: "Historia",
    numeroPaginas: 443,
    precio: 19.99,
    stock: 7
  }
];

// Instrucciones para usar estos datos:
console.log("Para agregar estos datos a tu base de datos:");
console.log("1. Primero crea los autores con POST /api/autores");
console.log("2. Luego crea las editoriales con POST /api/editoriales");
console.log("3. Finalmente crea los libros usando los IDs de autores y editoriales");
console.log("4. O usa estos datos en tu frontend/aplicación");

module.exports = {
  autoresEjemplo,
  editorialesEjemplo,
  librosEjemploTemplate
};