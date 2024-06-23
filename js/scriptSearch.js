document.getElementById("search-icon").addEventListener("click", function() {
    var searchBar = document.getElementById("search-bar");
    searchBar.classList.toggle("active");
    var input = document.getElementById("search-input");
    if (searchBar.classList.contains("active")) {
        input.focus();
    } else {
        input.value = "";
    }
});
