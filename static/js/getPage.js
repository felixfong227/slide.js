// When the user click the web page

// Get forward page
window.addEventListener("click", e => {

    ajax(`http://localhost:${config.port}/forward`, data => {
        document.querySelector("#main").innerHTML = data;
    });


});

// Get backward page
window.addEventListener("contextmenu", e => {
    e.preventDefault();
    ajax(`http://localhost:${config.port}/backward`, data => {
        document.querySelector("#main").innerHTML = data;
    });

});