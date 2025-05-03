const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true
  },
  descripcion: {
    type: String
  },
  caracteristicas: {
    marca: String,
    color: String,
    almacenamiento: String
  },
  date_created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Categorias', CategoriaSchema); // Plural conservado