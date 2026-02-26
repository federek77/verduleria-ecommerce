// Importar los productos
import productos from './productos.js';

// Estado del carrito
let carrito = [];

// Función para mostrar los productos en la página
function mostrarProductos() {
    const contenedor = document.getElementById('productos-container');
    const template = document.getElementById('template-producto');
    
    // Obtener y guardar la plantilla
    const templateOriginal = template.cloneNode(true);
    
    // Limpiar el contenedor
    contenedor.innerHTML = '';
    
    // Volver a añadir la plantilla
    contenedor.appendChild(template);
    
    productos.forEach((producto, index) => {
        // Clonar la plantilla original
        const card = templateOriginal.cloneNode(true);
        card.id = `producto-${index + 1}`;
        card.style.display = 'flex';
        
        // Llenar los datos
        const imgElem = document.createElement('img');
        imgElem.src = producto.imagen;
        imgElem.alt = producto.nombre;
        imgElem.style.width = '60px';
        imgElem.style.height = '60px';
        imgElem.style.objectFit = 'cover';
        imgElem.style.borderRadius = '50%';
        const imageContainer = card.querySelector('.card-image');
        imageContainer.textContent = '';
        imageContainer.appendChild(imgElem);
        card.querySelector('.card-name').textContent = producto.nombre;
        card.querySelector('.card-price').textContent = `$ ${producto.precio}`;
        
        // Configurar el botón
        const boton = card.querySelector('.button-add');
        boton.id = `btn-${index + 1}`;
        boton.addEventListener('click', () => agregarAlCarrito(producto));
        
        // Agregar al contenedor (después del template)
        contenedor.appendChild(card);
    });
}

// Función para agregar productos al carrito
function agregarAlCarrito(producto) {
    carrito.push(producto);
    actualizarContadorCarrito();
    renderizarCarrito();
    
    // Animación del botón
    const boton = document.getElementById(`btn-${producto.id}`);
    if (boton) {
        boton.textContent = '✓';
        setTimeout(() => {
            boton.textContent = '+';
        }, 1000);
    }
}

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    // Guardar carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Mostrar el carrito en el panel visual
function renderizarCarrito() {
    const panel = document.getElementById('carrito-panel');
    const lista = document.getElementById('carrito-lista');
    const totalDiv = document.getElementById('carrito-total');
    lista.innerHTML = '';
    if (carrito.length === 0) {
        lista.innerHTML = '<li>El carrito está vacío.</li>';
        totalDiv.textContent = '';
        return;
    }
    // Agrupar productos por id
    const resumen = {};
    carrito.forEach(prod => {
        if (!resumen[prod.id]) resumen[prod.id] = {...prod, cantidad: 0};
        resumen[prod.id].cantidad++;
    });
    let total = 0;
    Object.values(resumen).forEach(prod => {
        total += prod.precio * prod.cantidad;
        lista.innerHTML += `<li style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <span><img src="${prod.imagen}" alt="${prod.nombre}" style="width:32px;height:32px;object-fit:cover;border-radius:50%;vertical-align:middle;margin-right:8px;"> ${prod.nombre} x${prod.cantidad}</span>
            <span>$${prod.precio * prod.cantidad}</span>
            <button class='button button-small button-delete' onclick='window.eliminarDelCarrito(${prod.id})'>🗑️</button>
        </li>`;
    });
    totalDiv.textContent = `Total: $${total}`;
}

// Eliminar producto del carrito
window.eliminarDelCarrito = function(id) {
    carrito = carrito.filter(prod => prod.id !== id);
    actualizarContadorCarrito();
    renderizarCarrito();
}

// Abrir/cerrar panel carrito
const btnAbrir = document.getElementById('carrito-abrir');
const panel = document.getElementById('carrito-panel');
let carritoAbierto = false;
btnAbrir.addEventListener('click', e => {
    e.preventDefault();
    carritoAbierto = !carritoAbierto;
    panel.style.display = carritoAbierto ? 'block' : 'none';
    if (carritoAbierto) renderizarCarrito();
});

// Finalizar compra
const btnFinalizar = document.getElementById('carrito-finalizar');
btnFinalizar.addEventListener('click', () => {
    window.location.href = 'checkout.html';
});

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Cargar carrito guardado
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
    
    // Mostrar los productos
    mostrarProductos();
});

// --- Selector de fondo: aplicar y guardar opción ---
const BG_KEY = 'siteBackground';

function applyBackground(name) {
    const body = document.body;
    switch (name) {
        case 'svg':
            // 'svg' option now uses the PNG inside images/productos
            body.style.background = "url('images/productos/fruits-bg.png') center/cover no-repeat fixed";
            body.style.backgroundColor = '';
            break;
        case 'gradient':
            body.style.background = 'linear-gradient(135deg,#f6d365 0%,#fda085 100%)';
            body.style.backgroundAttachment = '';
            break;
        case 'pattern':
            body.style.background = "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.8) 0 8%, transparent 9%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.7) 0 10%, transparent 11%), linear-gradient(180deg,#fffaf0,#f6fff6)";
            break;
        default:
            // fallback to svg
            body.style.background = "url('images/fruits-bg.svg') center/cover no-repeat fixed";
    }
    // marcar visualmente la opción activa
    const buttons = document.querySelectorAll('#bg-selector .bg-option');
    buttons.forEach(b => b.classList.toggle('active', b.dataset.bg === name));
    localStorage.setItem(BG_KEY, name);
}

function initBackgroundSelector() {
    const container = document.getElementById('bg-selector');
    if (!container) return;
    container.querySelectorAll('.bg-option').forEach(btn => {
        btn.addEventListener('click', e => {
            const name = btn.dataset.bg;
            applyBackground(name);
        });
    });

    // aplicar fondo guardado (si existe)
    const saved = localStorage.getItem(BG_KEY) || 'svg';
    applyBackground(saved);
}

// Integrar con la inicialización existente
function inicializar() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
    
    // Mostrar los productos
    mostrarProductos();
    // Inicializar selector de fondo
    initBackgroundSelector();
}
// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializar);
