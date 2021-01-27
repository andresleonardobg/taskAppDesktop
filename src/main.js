const{BrowserWindow} = require('electron')

let window

function createWindow(){
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })
    window.loadFile("ui/index.html")
    //window.loadURL("https://www.youtube.com/watch?v=0h2LBY5M8y4")
}

module.exports = {
    createWindow
}