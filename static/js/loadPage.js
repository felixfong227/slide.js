// See if the URL contain hash

function page() {
    return window.location.hash.split("#")[1] - 1;
}

if(page){

    changePage(`http://localhost:${config.port}/getPage/${page()}`, data => {
        document.querySelector("#main").innerHTML = data;
    });

    // If the user change the hash on fly

    window.addEventListener('hashchange', e => {
        changePage(`http://localhost:${config.port}/getPage/${page()}`, data => {
            document.querySelector("#main").innerHTML = data;
        });
    })

}