import { Router } from "express";
import EntregaController from "../controllers/EntregaController.js";

const router = Router();

// Listar todas as entregas
router.get("/", EntregaController.index);

// Buscar entrega por ID
router.get("/:id", EntregaController.show);

// Buscar entrega por pedido_id
router.get("/pedido/:pedidoId", EntregaController.findByPedido);

// Criar uma nova entrega
router.post("/", EntregaController.store);

// Atualizar uma entrega
router.put("/:id", EntregaController.update);

// Deletar uma entrega (soft delete)
router.delete("/:id", EntregaController.delete);

// Restaurar uma entrega deletada
router.put("/restore/:id", EntregaController.restore);

export default router;
