import Product from "../models/Product.js";
import xlsx from "xlsx";
import fs from "fs";

export const createProduct = async (req, res) => {
  const { serie, modelo, marca, nombre, bodega, observacion, } = req.body;

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

export const importProductsFromExcel = async (req, res) =>{
  const filePath = req.file.path;

  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const datos = xlxs.utils.sheet_to_json(worksheet);

    const savedData = await Product.insertMany(datos);
    fs.unlinkSync(filePath);
    res.status(200).json(savedData);

  } catch (error) {
    fs.unlinkSync(filePath);
    console.log(error);
    return res.status(500).json(error);
  }

};