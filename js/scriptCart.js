// Función para cargar el carrito desde localStorage y mostrar los elementos en la tabla
function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItems = document.getElementById('cart-items');
    let subtotal = 0;

    // Limpiar el contenido previo
    cartItems.innerHTML = '';

    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        // Crear una nueva fila para cada artículo en el carrito
        let row = document.createElement('tr');
        row.innerHTML = `
            <td><button onclick="removeFromCart(${item.id})"><i class="fas fa-trash-alt"></i></button></td>
            <td><img src="${item.image}" alt=""></td>
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)"></td>
            <td>$${itemTotal.toFixed(2)}</td>
        `;
        cartItems.appendChild(row);
    });

    updateCartTotal(subtotal); // Actualizar subtotal, IVA y total del carrito
}

// Función para eliminar un elemento del carrito
function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let updatedCart = cart.filter(item => item.id !== id); // Filtrar todos los elementos excepto el que se quiere eliminar

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    loadCart(); // Volver a cargar el carrito después de eliminar un elemento

    // Mostrar notificación de producto eliminado
    const notification = document.createElement('div');
    notification.className = 'remove-notification';
    notification.textContent = 'Product removed from cart';
    document.body.appendChild(notification);

    // Eliminar la notificación después de unos segundos
    setTimeout(function() {
        notification.remove();
    }, 3000); // Notificación visible por 3 segundos
}

// Función para actualizar la cantidad de un producto en el carrito
function updateQuantity(id, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let product = cart.find(item => item.id === id);
    if (product) {
        product.quantity = parseInt(quantity);
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart(); // Volver a cargar el carrito después de actualizar la cantidad
    }

    // Validar y ajustar valores de cantidad
}

// Función para actualizar el total del carrito (subtotal, IVA y total)
function updateCartTotal(subtotal) {
    let iva = subtotal * 0.16; // Calculamos el IVA al 16%
    let service = 2.5;
    let total = subtotal + service + iva; // Sumamos el subtotal más el IVA

    // Actualizar los elementos en el DOM
    document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('cart-iva').textContent = `$${iva.toFixed(2)}`;
    document.getElementById('cart-shipping').textContent = `$${service.toFixed(2)}`;
    document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
}


// Evento para cargar el carrito cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
});

// Mensaje de Hecho al momento de realizar el pago

function mostrar()
{
    sweetAlert('', '¡Hola¡ Se han enviado los datos de tu pedido', 'success')
}

// Limpiar tablas
function emptyCart() {
    localStorage.removeItem('cart'); // Eliminar el carrito de localStorage
    let cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // Limpiar el contenido de la tabla

    updateCartTotal(0); // Actualizar los totales a 0
}