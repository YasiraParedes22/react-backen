
// Ejecuta esto en tu ruta de productos temporalmente
const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');
const Categoria = require('../models/Categorias');

// Obtener todos los productos con categorías pobladas
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find()
      .populate({
        path: 'categoria_id',
        select: 'nombre descripcion',
        model: 'Categorias' // Asegúrate que coincida con tu modelo
      });
      
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Resto de tus rutas...


router.post('/', async (req, res) => {
    try {
        const nuevaCategoria = new Category(req.body);
        await nuevaCategoria.save();
        res.status(201).json(nuevaCategoria);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const actualizado = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, overwrite: true, runValidators: true }
        );
        res.status(200).json(actualizado);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


router.patch('/:id', async (req, res) => {
    try{
        const actualizado =  await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true}
        );
        res.status(200).json(actualizado);
    } catch(e){
        res.status(500).json({ error: e.message });
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const eliminado = await Category.findByIdAndDelete(req.params.id);
        res.status(200).json(eliminado);
    }catch(e){
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;