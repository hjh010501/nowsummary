document.getElementById("close").addEventListener("click", function (e) {
    var window = remote.getCurrentWindow();
    window.minimize(); 
});