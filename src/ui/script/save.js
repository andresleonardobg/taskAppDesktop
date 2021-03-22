const { remote } = require("electron");
const { accessSync } = require("fs");
const main = remote.require("./main");

const productForm = document.getElementById('productoFormulario')
const productName = document.getElementById('name')
const productPrice = document.getElementById('price')
const productDescription = document.getElementById('description')

const productsList = document.getElementById('productsList')

let products = []
let editingStatus = false
let editProductId = ''

async function editProducts(id){
   
    const product = await main.getProductById(id)

   productName.value = product.name
   productPrice.value = product.price
   productDescription.value = product.description

   editingStatus = true
   editProductId = id
}

// Toma los datos del formulario y los guarda en la base de datos
productForm.addEventListener('submit', async (e) => {

    try {
        // e.preventDefault()

        const newProduct = {
            name: productName.value,
            price: productPrice.value,
            description: productDescription.value,
        }


        if(!editingStatus){
            const result = await main.createProduct(newProduct)
            console.log(result)
        }else{
            const result = await main.updateProduct(editProductId, newProduct)
            console.log(result)

            editProductId = ''
            editingStatus = false
        }
        

        productForm.reset()

        getProducts()
    } catch (error) {
        console.log(error)
    }

    
})


//Elimina los productos
async function deleteProducts(id){

    const response = confirm('Seguro que quieres eliminarlo')
    if(response){
        await main.deleteProduct(id)
        getProducts()
    }
    
}

var bill = 0
var total = document.getElementById("totalSum")

function cancel(){
    bill = 0
    total.innerHTML = bill
}

function sum(item){
    bill += item
    total.innerHTML = bill
    count.innerHTML =1
}

function res(item){
    if (bill != 0){
        bill -= item
        total.innerHTML = bill
    }
    
}

//Crea los datos de la db en el index.html
function renderProducts(product){
    productsList.innerHTML = ''
    products.forEach(product => {
        productsList.innerHTML += /*html*/`
            <div class="card card-body my-2 animate__animated animate__fadeInUp m-2" style="width: 18rem;">
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <h3>Precio ${product.price}</h3>
                <div>
                    <button class="btn btn-secondary" onclick="deleteProducts(${product.id})">
                        DELETE
                    </button>
                    <button class="btn btn-secondary" onclick="editProducts(${product.id})">
                        EDIT
                    </button>
                    <button class="btn btn-secondary" onclick="sum(${product.price})">
                        +
                    </button>
                    <button class="btn btn-secondary" onclick="res(${product.price})">
                        -
                    </button>
                </div>
            </div>
        `
        
    });

}

//Trae los datos de la db y los asigna en la función renderProducts
const getProducts = async () => {
    products = await main.getProduct()
    renderProducts(products)
}


// ejecuta las funciones principales
async function init(){
    await getProducts()
}

init()