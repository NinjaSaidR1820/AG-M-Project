function updateSubtotal(input) {
    // Validar si el valor ingresado es un número positivo
    let quantity = parseInt(input.value);
    if (isNaN(quantity) || quantity <= 0) {
        input.value = 1; // Restablecer el valor a 1 si no es un número o es negativo
        quantity = 1;
    }

    const price = parseFloat(input.parentNode.previousElementSibling.textContent.slice(1)); // Obtener el precio del producto
    const subtotal = price * quantity; // Calcular el subtotal
    input.parentNode.nextElementSibling.textContent = `$${subtotal.toFixed(2)}`; // Actualizar el subtotal en la tabla

    updateCartTotal(); // Llamar a la función para actualizar el total del carrito
}

function updateCartTotal() {
    const cartItems = document.querySelectorAll("#cart tbody tr"); // Obtener todas las filas de productos en el carrito
    let subtotal = 0; // Inicializar el subtotal del carrito

    // Calcular el subtotal sumando los subtotales de todos los productos en el carrito
    cartItems.forEach(item => {
        subtotal += parseFloat(item.querySelector("td:nth-child(6)").textContent.slice(1));
    });

    const shipping = 0; // Definir el costo de envío (en este caso, 0)
    const iva = subtotal * 0.15; // Calcular el IVA (15% del subtotal)
    const total = subtotal + shipping + iva; // Calcular el total sumando el subtotal, el costo de envío y el IVA

    // Actualizar los elementos HTML que muestran el subtotal, el IVA y el total del carrito
    document.getElementById("cart-subtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("cart-iva").textContent = `$${iva.toFixed(2)}`; // Actualizar el IVA
    document.getElementById("cart-total").innerHTML = `<strong>$${total.toFixed(2)}</strong>`;
}
