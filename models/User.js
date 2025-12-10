import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Id se maneja como _id en MongoDB; Mongoose lo gestiona automáticamente
    nombre: { type: String, required: true, trim: true, maxlength: 100 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 200,
      match: /.+@.+\..+/
    },
    rol: { type: Number, min: 0, default: 0 },
    hash: { type: String },
    mustChangePassword: { type: Boolean, default: false }
  },
  { timestamps: true, collection: "Usuarios" }
);

export default mongoose.model("User", userSchema);
