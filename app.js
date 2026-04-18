import express from "express";
import categoriaRoutes from "./routes/categoriaRoutes.js";
import produtoRoutes from "./routes/produtoRoutes.js";
import pedidoRoutes from "./routes/pedidoRoutes.js";
import entregaRoutes from "./routes/entregaRoutes.js";
import avaliacaoRoutes from "./routes/avaliacaoRoutes.js";

// Importar associações
import "./models/associations.js";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Rotas
app.use("/categorias", categoriaRoutes);
app.use("/produtos", produtoRoutes);
app.use("/pedidos", pedidoRoutes);
app.use("/entregas", entregaRoutes);
app.use("/avaliacoes", avaliacaoRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
