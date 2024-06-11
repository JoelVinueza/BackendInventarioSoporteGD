import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    serie:{
      type: String,
      required: true,
      trim: true,
    },

    modelo:{
      type: String,
      required: true,
      trim: true,
    },

    marca:{
      type: String,
      required: true,
      trim: true,
    },

    nombre:{
      type: String,
      required: true,
    },

    bodega:{
      type: String,
      required: true,
    },

    observacion: String,

  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Product", productSchema);
