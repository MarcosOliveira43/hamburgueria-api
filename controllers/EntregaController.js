import Entrega from "../models/Entrega.js";
import Pedido from "../models/Pedido.js";

class EntregaController {
  async index(req, res) {
    try {
      const entregas = await Entrega.findAll({
        include: [{ model: Pedido, as: "pedido" }],
      });
      res.status(200).json(entregas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const entrega = await Entrega.findByPk(id, {
        include: [{ model: Pedido, as: "pedido" }],
      });
      if (!entrega) {
        return res.status(404).json({ error: "Entrega não encontrada" });
      }
      res.status(200).json(entrega);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async findByPedido(req, res) {
    try {
      const { pedidoId } = req.params;
      const entrega = await Entrega.findOne({
        where: { pedido_id: pedidoId },
        include: [{ model: Pedido, as: "pedido" }],
      });
      if (!entrega) {
        return res
          .status(404)
          .json({ error: "Entrega não encontrada para este pedido" });
      }
      res.status(200).json(entrega);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async store(req, res) {
    try {
      const { pedido_id, codigo_rastreio, endereco } = req.body;

      // Verificar se o pedido existe
      const pedido = await Pedido.findByPk(pedido_id);
      if (!pedido) {
        return res.status(404).json({ error: "Pedido não encontrado" });
      }

      const entrega = await Entrega.create({
        pedido_id,
        codigo_rastreio,
        endereco,
      });
      res.status(201).json(entrega);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const entrega = await Entrega.findByPk(id);
      if (!entrega) {
        return res.status(404).json({ error: "Entrega não encontrada" });
      }
      await entrega.update(req.body);
      res.status(200).json(entrega);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const entrega = await Entrega.findByPk(id);
      if (!entrega) {
        return res.status(404).json({ error: "Entrega não encontrada" });
      }
      await entrega.destroy();
      res.status(200).json({ message: "Entrega excluída com sucesso" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async restore(req, res) {
    try {
      const { id } = req.params;
      const entrega = await Entrega.findByPk(id, { paranoid: false });
      if (!entrega) {
        return res.status(404).json({ error: "Entrega não encontrada" });
      }
      await entrega.restore();
      res.status(200).json({ message: "Entrega restaurada com sucesso" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new EntregaController();
