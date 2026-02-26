// Array de productos disponibles (rutas apuntan a la carpeta images/productos/)
const productos = [
    // Usamos las imágenes que ya existen en la carpeta `images/productos` cuando están disponibles.
    { id: 1, imagen: "images/productos/banana.png", nombre: "Bananas", precio: 2200, unidad: "1kg" },
    { id: 2, imagen: "images/productos/manzana.png", nombre: "Manzanas", precio: 2000, unidad: "1kg" },
    { id: 3, imagen: "images/productos/kiwis.png", nombre: "Kiwis", precio: 2800, unidad: "1kg" },
    { id: 4, imagen: "images/productos/melon.png", nombre: "Melón", precio: 3500, unidad: "1kg" },
    { id: 5, imagen: "images/productos/pina.png", nombre: "Piñas", precio: 3200, unidad: "1kg" },
    { id: 6, imagen: "images/productos/tomate.png", nombre: "Tomates", precio: 1400, unidad: "1kg" },
    { id: 7, imagen: "images/productos/coco.png", nombre: "Cocos", precio: 2700, unidad: "1kg" },
    { id: 8, imagen: "images/productos/sandia.png", nombre: "Sandias", precio: 2000, unidad: "1kg" },
    { id: 9, imagen: "images/productos/durazno.png", nombre: "Duraznos", precio: 3100, unidad: "1kg" },
    { id: 10, imagen: "images/productos/arandano.png", nombre: "Arandanos", precio: 6500, unidad: "1kg" },
    { id: 11, imagen: "images/productos/mango.png", nombre: "Mango", precio: 2900, unidad: "1kg" },
    { id: 12, imagen: "images/productos/uvas.png", nombre: "Uvas", precio: 7000, unidad: "1kg" },
    { id: 13, imagen: "images/productos/pera.png", nombre: "Peras", precio: 3200, unidad: "1kg" },
    { id: 14, imagen: "images/productos/cereza.png", nombre: "Cerezas", precio: 11000, unidad: "1kg" },
    { id: 15, imagen: "images/productos/frutilla.png", nombre: "Frutillas", precio: 6000, unidad: "1kg" },
    { id: 16, imagen: "images/productos/limon.png", nombre: "Limones", precio: 2600, unidad: "1kg" }
];

// Exportar el array para usarlo en index.js
export default productos;