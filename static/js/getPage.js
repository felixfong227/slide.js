// When the user click the web page

// Get forward page
window.addEventListener("click", e => {

    ajax.open("GET",`http://localhost:${config.port}/api?load=forward`);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send();
    ajax.onreadystatechange = () => {

        if(ajax.status === 200 && ajax.readyState === 4) {

            document.querySelector("#main").innerHTML = ajax.response;

        }

    }


});

// Get backward page
window.addEventListener("contextmenu", e => {
    e.preventDefault();
    ajax.open("GET",`http://localhost:${config.port}/api?load=backward`);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send();
    ajax.onreadystatechange = () => {

        if(ajax.status === 200 && ajax.readyState === 4) {

            document.querySelector("#main").innerHTML = ajax.response;

        }

    }


});