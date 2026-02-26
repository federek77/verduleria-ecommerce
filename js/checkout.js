// Leer carrito de localStorage
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function agruparCarrito(carrito) {
    const resumen = {};
    carrito.forEach(prod => {
        if (!resumen[prod.id]) resumen[prod.id] = {...prod, cantidad: 0};
        resumen[prod.id].cantidad++;
    });
    return Object.values(resumen);
}

function renderizarTabla() {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    const productos = agruparCarrito(carrito);
    let total = 0;
    productos.forEach(prod => {
        total += prod.precio * prod.cantidad;
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td style='font-size:2em;'>${prod.imagen}</td>
            <td>${prod.nombre} x${prod.cantidad}</td>
            <td>$${prod.precio * prod.cantidad}</td>
            <td><button class='button button-small button-delete' onclick='eliminarDelCheckout(${prod.id})'>🗑️</button></td>
        `;
        tbody.appendChild(fila);
    });
    // Total
    const filaTotal = document.createElement('tr');
    filaTotal.innerHTML = `<td colspan='2' style='text-align:right;font-weight:bold;'>TOTAL</td><td style='font-weight:bold;'>$${total}</td><td></td>`;
    tbody.appendChild(filaTotal);
}

window.eliminarDelCheckout = function(id) {
    const idx = carrito.findIndex(prod => prod.id === id);
    if (idx !== -1) {
        carrito.splice(idx, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderizarTabla();
    }
}

document.addEventListener('DOMContentLoaded', renderizarTabla);

document.getElementById('btnComprar').addEventListener('click', () => {
    if (carrito.length === 0) {
        Swal.fire('El carrito está vacío', '', 'warning');
        return;
    }
    Swal.fire('¡Compra realizada!', 'Gracias por tu compra', 'success');
    localStorage.removeItem('carrito');
    setTimeout(() => location.href = 'index.html', 1500);
});