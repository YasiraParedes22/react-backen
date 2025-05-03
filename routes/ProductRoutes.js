const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');

// Obtener todos los productos con nombre de categoría
// Agrega esta ruta temporal en productRoutes.js
// En productRoutes.js
router.get('/', async (req, res) => {
    try {
      const productos = await Producto.find();
      const productosConCategoria = await Promise.all(
        productos.map(async (producto) => {
          const categoria = await Categoria.findById(producto.categoria_id);
          return {
            ...producto._doc,
            categoria_id: categoria // Reemplazamos el ID con el objeto completo
          };
        })
      );
      res.json(productosConCategoria);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


// Agregar nuevo producto
router.post('/', async (req, res) => {
    try {
        // Asegúrate de que el campo categoria_id esté presente en la solicitud
        const { nombre, precio, categoria_id, stock, caracteristicas } = req.body;
        
        // Verificar que categoria_id esté presente
        if (!categoria_id) {
            return res.status(400).json({ error: "La categoría es obligatoria" });
        }

        // Crear el nuevo producto
        const nuevoProducto = new Producto({
            nombre,
            precio,
            categoria_id, // Aquí estamos guardando el ObjectId de la categoría
            stock,
            caracteristicas,
        });

        // Guardar el producto en la base de datos
        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Otros endpoints...

module.exports = router;
