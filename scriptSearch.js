document.getElementById("search-icon").addEventListener("click", function() {
    var searchBar = document.getElementById("search-bar");
    searchBar.classList.toggle("active");
    var input = document.getElementById("search-input");
    
    if (searchBar.classList.contains("active")) {
        input.focus();
    } else {
        // Si la barra de búsqueda se cierra, limpiamos el valor y no realizamos la búsqueda
        input.value = "";
        return;
    }

    var query = input.value.toLowerCase().trim();
    if (query) {
        searchProducts(query);
    }
});

document.getElementById("search-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        var query = this.value.toLowerCase().trim();
        if (query) {
            searchProducts(query);
        }
    }
});

function searchProducts(query) {
    var products = document.querySelectorAll('.pro');
    var found = false;
    
    products.forEach(function(product) {
        var productName = product.querySelector('h5').textContent.toLowerCase();
        if (productName.includes(query)) {
            found = true;
            product.scrollIntoView({ behavior: 'smooth' });
            // Opcionalmente, resaltar el producto encontrado
            product.style.border = '2px solid red';
            setTimeout(() => product.style.border = '', 2000);
        }
    });

    if (!found) {
        alert("Producto no encontrado");
    }
}
