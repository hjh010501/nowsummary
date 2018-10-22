const app = require('electron');
const remote = require('electron').remote;
const ipcRenderer = require('electron').ipcRenderer;
const fs = require('fs');

document.getElementById("close").addEventListener("click", function (e) {
    var window = remote.getCurrentWindow();
    window.close();
}); 

document.getElementById("save").addEventListener("click", function (e) {
    ipcRenderer.send('savehtml' );
});

ipcRenderer.on('result',(event, args)=>{
    alert(args);
});
