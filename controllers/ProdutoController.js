import Produto from "../models/Produto.js";
import Categoria from "../models/Categoria.js";

export const criar = async (req, res) => {
  try {
    const produto = await Produto.create(req.body);
    res.status(201).json(produto);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

export const listar = async (req, res) => {
  try {
    const produtos = await Produto.findAll({
      include: [{ model: Categoria, as: "categoria" }],
    });
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

export const obterPorId = async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id, {
      include: [{ model: Categoria, as: "categoria" }],
    });
    if (!produto) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }
    res.status(200).json(produto);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

export const listarPorCategoria = async (req, res) => {
  try {
    const { categoriaId } = req.params;
    const produtos = await Produto.findAll({
      where: { categoriaId },
      include: [{ model: Categoria, as: "categoria" }],
    });
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

export const atualizar = async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }
    await produto.update(req.body);
    res.status(200).json(produto);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

export const deletar = async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }
    await produto.destroy();
    res.status(200).json({ message: "Produto excluído com sucesso" });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

export const restaurar = async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id, { paranoid: false });
    if (!produto) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }
    await produto.restore();
    res.status(200).json({ message: "Produto restaurado com sucesso" });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};
