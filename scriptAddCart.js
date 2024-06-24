// Función para agregar un producto al carrito
function addToCart(id, name, price, image) {
    // Obtener el carrito actual del Local Storage o inicializar un arreglo vacío si no hay nada almacenado
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Verificar si el producto ya está en el carrito
    let found = cart.find(item => item.id === id);

    // Si el producto ya está en el carrito, incrementar la cantidad; de lo contrario, agregarlo al carrito
    if (found) {
        found.quantity++;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }

    // Guardar el carrito actualizado en el Local Storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Mostrar la notificación de producto añadido al carrito
    showCartNotification(name);
}

function showCartNotification(productName) {
    const notification = document.createElement('div');
    notification.classList.add('cart-notification');
    notification.textContent = `${productName} added to cart`;

    // Agregar la notificación al body
    document.body.appendChild(notification);

    // Añadir la clase show para hacer visible la notificación
    setTimeout(() => {
        notification.classList.add('show');
    }, 100); // Añadir un pequeño retraso para asegurar que se añada la clase después de que se añada al DOM

    // Desaparecer la notificación después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');

        setTimeout(() => {
            notification.remove();
        }, 500); // Esperar 0.5 segundos después de desvanecerse para removerla del DOM
    }, 3000); // Mostrar la notificación durante 3 segundos
}
