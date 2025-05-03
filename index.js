require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const categoryRoutes = require('./routes/CategoryRoutes');
const productRoutes = require('./routes/ProductRoutes');
const VentasRoutes = require('./routes/VentasRoutes');
const ClientesRoutes = require('./routes/ClientesRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas (usa solo minúsculas y plural por convención REST)
app.use('/api/categorias', categoryRoutes);
app.use('/api/productos', productRoutes);
app.use('/api/ventas', VentasRoutes);
app.use('/api/clientes', ClientesRoutes);

// Conexión a MongoDB y arranque del servidr
mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('✅ Conectado correctamente a MongoDB');
        app.listen(process.env.PORT || 4000, () =>
            console.log(`🚀 Servidor corriendo en http://localhost:${process.env.PORT || 4000}`)
        );
    })
    .catch(err => console.error('❌ Error al conectar a MongoDB: ', err.message));
