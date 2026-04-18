import Avaliacao from "../models/Avaliacao.js";
import Pedido from "../models/Pedido.js";

class AvaliacaoController {
  // Criar avaliação
  async store(req, res) {
    try {
      const { nota, comentario, pedidoId } = req.body;

      // Verificar se o pedido existe
      const pedido = await Pedido.findByPk(pedidoId);
      if (!pedido) {
        return res.status(404).json({ error: "Pedido não encontrado" });
      }

      // Verificar se já existe avaliação para este pedido (opcional, se for 1 por pedido)
      const avaliacaoExistente = await Avaliacao.findOne({
        where: { pedidoId },
      });
      if (avaliacaoExistente) {
        return res
          .status(400)
          .json({ error: "Este pedido já possui uma avaliação" });
      }

      const avaliacao = await Avaliacao.create({ nota, comentario, pedidoId });
      return res.status(201).json(avaliacao);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Listar todas as avaliações
  async index(req, res) {
    try {
      const avaliacoes = await Avaliacao.findAll({
        include: [{ model: Pedido, as: "pedido" }],
      });
      return res.status(200).json(avaliacoes);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Buscar avaliação por ID
  async show(req, res) {
    try {
      const { id } = req.params;
      const avaliacao = await Avaliacao.findByPk(id, {
        include: [{ model: Pedido, as: "pedido" }],
      });

      if (!avaliacao) {
        return res.status(404).json({ error: "Avaliação não encontrada" });
      }

      return res.status(200).json(avaliacao);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Buscar avaliações por pedido
  async findByPedido(req, res) {
    try {
      const { pedidoId } = req.params;
      const avaliacoes = await Avaliacao.findAll({
        where: { pedidoId },
        include: [{ model: Pedido, as: "pedido" }],
      });

      return res.status(200).json(avaliacoes);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Atualizar avaliação
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nota, comentario } = req.body;

      const avaliacao = await Avaliacao.findByPk(id);
      if (!avaliacao) {
        return res.status(404).json({ error: "Avaliação não encontrada" });
      }

      await avaliacao.update({ nota, comentario });
      return res.status(200).json(avaliacao);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Deletar avaliação (soft delete)
  async delete(req, res) {
    try {
      const { id } = req.params;
      const avaliacao = await Avaliacao.findByPk(id);

      if (!avaliacao) {
        return res.status(404).json({ error: "Avaliação não encontrada" });
      }

      await avaliacao.destroy();
      return res
        .status(200)
        .json({ message: "Avaliação excluída com sucesso" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Restaurar avaliação deletada
  async restore(req, res) {
    try {
      const { id } = req.params;
      const avaliacao = await Avaliacao.findByPk(id, { paranoid: false });

      if (!avaliacao) {
        return res.status(404).json({ error: "Avaliação não encontrada" });
      }

      await avaliacao.restore();
      return res
        .status(200)
        .json({ message: "Avaliação restaurada com sucesso" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new AvaliacaoController();
