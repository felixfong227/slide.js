// Load the fist slide page

function ajax(url,callback) {
    document.querySelector("#main").classList.add("new");
    const ajax = new XMLHttpRequest();
    ajax.open("GET", url);
    ajax.send();
    ajax.onreadystatechange = () => {
        if (ajax.status === 200 && ajax.readyState === 4) {
            setTimeout( () => {
                callback(ajax.response);
                document.querySelector("#main").classList.remove("new");
            },200);
        }
    }
}

ajax(`http://localhost:${config.port}/init`, data => {
    document.querySelector("#main").innerHTML = data;
});


// If the user is reloading the browser, then send a request to restart the API
window.onbeforeunload = e => {
    ajax(`http://localhost:${config.port}/reload`);
};