const fs = require("fs").promises


class ProductManager {

    static ItemId = 1

    constructor(path) {
        this.products = [],
            this.path = path
    }

    async addProduct(product) {

        let { title, description, price, thumbnail, code, stock } = product


        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Existen campos vacios,por favor, completarlos")
            return
        }

        if (this.products.some(item => item.code === code)) {
            console.log("El codigo ya existe")
            return
        }

        const newProduct = {
            id: ProductManager.ItemId++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        this.products.push(newProduct)

        await this.saveFile(this.products)



    }

  async getProducts() {
   
     return this.products=await this.readFile()
        

    }

    async getProductById(id) {

        try {
            const arrayProducts = await this.readFile()
            const product = await arrayProducts.find(item => item.id === id)
            if (!product) {
                console.log("No se a encontrado ningún producto con ese id")
            }
            else {
                console.log("El producto con ese id es")
                return product

            }
        } catch (error) {
            console.log("Error al leer los archivos", error)
        }



    }

    async readFile() {

        try {
            const respuesta = await fs.readFile(this.path, "utf-8")
            const arrayProducts = JSON.parse(respuesta)
            return arrayProducts

        } catch (error) {
            console.log("Error al leer el archivo", error)
        }
    }

    async saveFile(arrayProducts) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProducts, null, 2))

        } catch (error) {
            console.log("No se pudo guardar el archivo", error)
        }
    }

    async updateProduct(id, updatedProduct) {
        try {
            const arrayProducts = await this.readFile()
            const index = await arrayProducts.findIndex(item => item.id === id)
            if (index !== -1) {
                arrayProducts.splice(index, 1, updatedProduct)
                await this.saveFile(arrayProducts)
            } else {
                console.log("No se encontro el producto")
            }

        } catch (error) {
            console.log("Error al actualizar", error)
        }
    }


    async deleteProduct(id) {
        try {
            const arrayProducts = await this.readFile()
            const index = await arrayProducts.findIndex(item => item.id === id)
            if (index !== -1) {
                arrayProducts.splice(index, 1)
                await this.saveFile(arrayProducts)
            } else {
                console.log("No se encontro el producto")
            }

        } catch (error) {
            console.log("Error al borrar", error)
        }
    }

}

//  const manager = new ProductManager("./products.json")

//  manager.getProducts()

// const coca = {
//     title: "coca",
//     description: "gaseosa cola",
//     price: 200,
//     thumbnail: "Sin imagen",
//     code: "aaa",
//     stock: 25
// }

// const pepsi = {
//     title: "pepsi",
//     description: "gaseosa cola",
//     price: 200,
//     thumbnail: "Sin imagen",
//     code: "aab",
//     stock: 25
// } 

//  const sprite={
//     "title": "sprite",
//     "description": "gaseosa limalimon",
//     "price": 200,
//     "thumbnail": "Sin imagen",
//     "code": "aac",
//     "stock": 25
//   }

//   const sevenUp={
//     "title": "sevenUp",
//     "description": "gaseosa limalimon",
//     "price": 200,
//     "thumbnail": "Sin imagen",
//     "code": "aad",
//     "stock": 25
//   }

//   const fanta={
//     "title": "fanta",
//     "description": "gaseosa limalimon",
//     "price": 200,
//     "thumbnail": "Sin imagen",
//     "code": "aae",
//     "stock": 25
//   }

//   const mirinda={
//     "title": "mirinda",
//     "description": "gaseosa limalimon",
//     "price": 200,
//     "thumbnail": "Sin imagen",
//     "code": "aaf",
//     "stock": 25
//   }

  
//   const monster={
//     "title": "monster",
//     "description": "gaseosa limalimon",
//     "price": 200,
//     "thumbnail": "Sin imagen",
//     "code": "aag",
//     "stock": 25
//   }

  
//   const speed={
//     "title": "speed",
//     "description": "gaseosa limalimon",
//     "price": 200,
//     "thumbnail": "Sin imagen",
//     "code": "aah",
//     "stock": 25
//   }

//   const fernet={
//     "title": "fernet",
//     "description": "gaseosa limalimon",
//     "price": 200,
//     "thumbnail": "Sin imagen",
//     "code": "aai",
//     "stock": 25
//   }

  
//   const campari={
//     "title": "campari",
//     "description": "gaseosa limalimon",
//     "price": 200,
//     "thumbnail": "Sin imagen",
//     "code": "aaj",
//     "stock": 25
//   }



//   manager.addProduct(coca)
//   manager.addProduct(pepsi)
//   manager.addProduct(sprite)
//   manager.addProduct(fanta)
//   manager.addProduct(mirinda)
//   manager.addProduct(sevenUp)
//   manager.addProduct(speed)
//   manager.addProduct(monster)
//   manager.addProduct(fernet)
//   manager.addProduct(campari)
 


module.exports=ProductManager


