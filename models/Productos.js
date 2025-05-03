const mongoose = require('mongoose');
const ProductoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  // En models/Producto.js
  categoria_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categorias', // DEBE coincidir exactamente con el nombre del modelo de categorías
    required: true
  


  
  },
  stock: {
    type: Number,
    required: true,
  },
  caracteristicas: {
    type: Object,
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
});

mmodule.exports = mongoose.model('Productos', ProductoSchema);
