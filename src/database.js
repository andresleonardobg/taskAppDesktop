const mysql = require('promise-mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'electrondb'
})

function getConnection(){
    return connection
}

//Para exportar a otros documentos
module.exports = { getConnection }