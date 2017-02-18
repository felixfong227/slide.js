// Load the fist slide page
const ajax = new XMLHttpRequest();

ajax.open("GET", `http://localhost:${config.port}/api?load=init`);
ajax.setRequestHeader("Content-Type", "application/json");
ajax.send();
ajax.onreadystatechange = () => {
    if (ajax.status === 200 && ajax.readyState === 4) {
        document.querySelector("#main").innerHTML = ajax.response;
    }
}