import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  const { serie, modelo, marca, nombre, observacion, } = req.body;

  try {
    const newProduct = new Product({
      serie,
      modelo,
      marca,
      nombre,
      bodega,
      observacion,
    });

    const productSaved = await newProduct.save();

    res.status(201).json(productSaved);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getProductById = async (req, res) => {
  const { serie } = req.params;
  const product = await Product.find(serie);
  res.status(200).json(product);
};

export const getProducts = async (req, res) => {
  const products = await Product.find();
  return res.json(products);
};

export const updateProductById = async (req, res) => {
  const updatedProduct = await Product.findOneAndUpdate(
    req.params.serie,
    req.body,
    {
      new: true,
    }
  );
  res.status(204).json(updatedProduct);
};

export const deleteProductById = async (req, res) => {
  const { serie } = req.params;

  await Product.findOneAndDelete(serie);

  res.status(204).json();
};
