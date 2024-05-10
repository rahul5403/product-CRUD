import { v4 as uuid } from "uuid";

let products = [];

export const getProducts = (req, res) =>{
    res.send(products);
}



export const createProduct = (req , res)=>{
    const product = req.body;

    products.push({...product, id:uuid()});
    res.send("Product Added Successfully");
}


export const getProduct = (req, res) =>{
    const { id } = req.params;
    const singleProduct = products.find((product) => product.id === id);
    res.send(singleProduct);
}

export const deleteProduct = (req, res) =>{
    const { id } = req.params;
    products = products.filter((product) => product.id !== id);
    res.send('Deleted Product Successfully');
}

export const updateProduct = (req, res)=>{
    const { id } = req.params;
    const product = products.find((product) => product.id===id);
    
    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;

    res.send("Product Updated Successfully");
  

}