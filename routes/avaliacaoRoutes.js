import { Router } from "express";
import AvaliacaoController from "../controllers/AvaliacaoController.js";

const router = Router();

// Listar todas as avaliações
router.get("/", AvaliacaoController.index);

// Buscar avaliação por ID
router.get("/:id", AvaliacaoController.show);

// Buscar avaliações por pedido
router.get("/pedido/:pedidoId", AvaliacaoController.findByPedido);

// Criar uma nova avaliação
router.post("/", AvaliacaoController.store);

// Atualizar uma avaliação
router.put("/:id", AvaliacaoController.update);

// Deletar uma avaliação (soft delete)
router.delete("/:id", AvaliacaoController.delete);

// Restaurar uma avaliação deletada
router.put("/restore/:id", AvaliacaoController.restore);

export default router;
