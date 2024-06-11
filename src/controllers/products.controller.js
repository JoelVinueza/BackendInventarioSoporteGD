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
  const { productId } = req.params;
  const product = await Product.findById(productId);
  res.status(200).json(product);
};

export const getProductBySerie = async (req, res) => {
  const { serie } = req.params;
  const product = await Product.find(serie);
  res.status(200).json(product);
};

export const getProductByModelo = async (req, res) => {
  const { modelo } = req.params;
  const product = await Product.find(modelo);
  res.status(200).json(product)
}

export const getProductByMarca = async (req, res) => {
  const { marca } = req.params;
  const product = await Product.find(marca);
  res.status(200).json(product);
};


export const getProductByNombre = async (req, res) => {
  const { nombre } = req.params;
  const product = await Product.find(nombre);
  res.status(200).json(product);
};

export const getProductByBodega = async (req, res) => {
  const { bodega } = req.params;
  const product = await Product.find(bodega);
  res.status(200).json(product);
};

export const getProducts = async (req, res) => {
  const products = await Product.find();
  return res.json(products);
};

export const updateProductById = async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    {
      new: true,
    }
  );
  res.status(204).json(updatedProduct);
};

export const deleteProductById = async (req, res) => {
  const { productId } = req.params;
  await Product.findByIdAndDelete(productId);
  res.status(204).json();
};
