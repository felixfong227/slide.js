// When the user click the web page

// Get forward page

// Open link with new window


window.addEventListener("click", e => {

    changePage(`http://localhost:${config.port}/forward`, data => {
        document.querySelector("#main").innerHTML = data;
    });

});

// Get backward page
window.addEventListener("contextmenu", e => {
    e.preventDefault();
    changePage(`http://localhost:${config.port}/backward`, data => {
        document.querySelector("#main").innerHTML = data;
    });

});