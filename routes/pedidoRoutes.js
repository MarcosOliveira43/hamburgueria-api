import { Router } from "express";
import PedidoController from "../controllers/PedidoController.js";

const router = Router();

// Listar todos os pedidos (com Eager Loading de entregas e avaliações)
router.get("/", PedidoController.index);

// Buscar pedido por ID (com Eager Loading)
router.get("/:id", PedidoController.show);

// Criar um novo pedido
router.post("/", PedidoController.store);

// Atualizar um pedido
router.put("/:id", PedidoController.update);

// Deletar um pedido (soft delete)
router.delete("/:id", PedidoController.delete);

// Restaurar um pedido deletado
router.put("/restore/:id", PedidoController.restore);

export default router;
