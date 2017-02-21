// See if the URL contain hash

const page = window.location.hash.split("#")[1];

if(page){

    changePage(`http://localhost:${config.port}/getPage/${page}`, data => {
        document.querySelector("#main").innerHTML = data;
    });

}