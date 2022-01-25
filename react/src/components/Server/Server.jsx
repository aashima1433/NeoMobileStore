
(async () => {
    if(localStorage.getItem("server") === null){
        localStorage.setItem("server", window.location.protocol + ((window.location.hostname.indexOf("8081-") !== -1)?"//8080-" + window.location.hostname.substr(5): "//" + window.location.hostname + ":8080") )
    }
})();