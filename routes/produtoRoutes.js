import { Router } from "express";
import * as ProdutoController from "../controllers/ProdutoController.js";

const router = Router();

// Listar todos os produtos
router.get("/", ProdutoController.listar);

// Buscar produto por ID
router.get("/:id", ProdutoController.obterPorId);

// Buscar produtos por categoria
router.get("/categoria/:categoriaId", ProdutoController.listarPorCategoria);

// Criar um novo produto
router.post("/", ProdutoController.criar);

// Atualizar um produto
router.put("/:id", ProdutoController.atualizar);

// Deletar um produto (soft delete)
router.delete("/:id", ProdutoController.deletar);

// Restaurar um produto deletado
router.put("/restore/:id", ProdutoController.restaurar);

export default router;
