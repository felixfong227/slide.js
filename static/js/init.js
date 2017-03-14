// Load the fist slide page

function changePage(url,callback) {
    const ajax = new XMLHttpRequest();
    ajax.open("GET", url);
    ajax.send();
    ajax.onreadystatechange = () => {
        if (ajax.status === 200 || ajax.status === 304  && ajax.readyState === 4) {
            setTimeout( () => {

                try{
                    const response = JSON.parse(ajax.response);
                }catch (e){
                    document.querySelector("#main").classList.add("new");
                    setTimeout( () => {
                        callback(ajax.response);
                        document.querySelector("#main").classList.remove("new");
                    },200);

                }

            },200);
        }else{
            notification('The back end is close, please restart it again.')
        }
    }
}

function notification(message) {
    const notificatinoElement = document.querySelector("#notification");
    notificatinoElement.innerHTML = message;
    notificatinoElement.classList.add("open");
    setTimeout( () => {
        notificatinoElement.classList.remove("open");
    },4500)
}

changePage(`http://localhost:${config.port}/init`, data => {
    document.querySelector("#main").innerHTML = data;
});


// If the user is reloading the browser, then send a request to restart the API
window.onbeforeunload = function() {
    const ajax = new XMLHttpRequest();
    ajax.open('GET',`http://localhost:${config.port}/reload`);
    ajax.send();
};