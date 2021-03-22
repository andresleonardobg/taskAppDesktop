const{ BrowserWindow, Notification } = require('electron')
const{ getConnection } = require('./database')

//------------------------------------Base de datos----------------------------------//
async function createProduct(producto){
    try {
        const conn = await getConnection()
        producto.price = parseFloat(producto.price)
        const result = await conn.query('INSERT INTO product SET ?',producto)

        producto.id = result.insertId

        new Notification({
            title: 'Notificación',
            body: 'Nuevo producto creado satisfactoriamente'
        }).show()


        return producto

    } catch (error) {
       console.log(error) 
    }
}

async function getProduct(){
    try {
        const conn = await getConnection()
        const result = await conn.query('SELECT * FROM product ORDER BY id DESC')
        console.log(result)
        return result
    } catch (error) {
        console.log(error) 
    }
}

async function deleteProduct(id){
    const conn = await getConnection()
    const result = await conn.query('DELETE FROM product WHERE id = ?', id)
    console.log(result)
    return(result)
}


//Revisar el dato que se quiere actualizar
async function getProductById(id){
    const conn = await getConnection()
    const result = await conn.query('SELECT * FROM product WHERE ID = ?', id)
    return(result[0])
}

async function updateProduct(id, product){
    const conn = await getConnection()
    const result = await conn.query('UPDATE product SET ? WHERE id = ?', [product, id])
    return(result)
}
//------------------------------------Base de datos----------------------------------//




//------------------------------------Crear ventana---------------------------------//
let window

function createWindow(){
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    })
    //cargar pagina principal
    window.loadFile("src/ui/index.html")

    //Ejemplo para cargar alguna pagina de internet
    //window.loadURL("https://www.youtube.com/watch?v=0h2LBY5M8y4")
}
//------------------------------------Crear ventana---------------------------------//


//Exportar funciones
module.exports = {
    createWindow,
    createProduct,
    getProduct,
    deleteProduct,
    getProductById,
    updateProduct
}