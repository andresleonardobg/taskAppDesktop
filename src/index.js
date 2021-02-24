const {createWindow} = require('./main')
const {app} = require('electron')

require('./database')

//Recarga cada vez que se realice un nuevo cambio
require('electron-reload')(__dirname)

app.allowRendererProcessReuse = false
app.whenReady().then(createWindow)