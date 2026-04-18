import Pedido from "../models/Pedido.js";
import Avaliacao from "../models/Avaliacao.js";
import Entrega from "../models/Entrega.js";

class PedidoController {
  async index(req, res) {
    try {
      const pedidos = await Pedido.findAll({
        include: [
          { model: Entrega, as: "entrega" },
          { model: Avaliacao, as: "avaliacoes" },
        ],
        order: [["createdAt", "DESC"]],
      });
      return res.status(200).json(pedidos);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const pedido = await Pedido.findByPk(id, {
        include: [
          { model: Entrega, as: "entrega" },
          { model: Avaliacao, as: "avaliacoes" },
        ],
      });

      if (!pedido) {
        return res.status(404).json({ erro: "Pedido não encontrado" });
      }

      return res.status(200).json(pedido);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  }

  async store(req, res) {
    try {
      const { data, mesa, nome_cliente } = req.body;
      const pedido = await Pedido.create({ data, mesa, nome_cliente });
      return res.status(201).json(pedido);
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const pedido = await Pedido.findByPk(id);

      if (!pedido) {
        return res.status(404).json({ erro: "Pedido não encontrado" });
      }

      await pedido.update(req.body);
      return res.status(200).json(pedido);
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const pedido = await Pedido.findByPk(id);

      if (!pedido) {
        return res.status(404).json({ erro: "Pedido não encontrado" });
      }

      await pedido.destroy();
      return res.status(200).json({ message: "Pedido excluído com sucesso" });
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  }

  async restore(req, res) {
    try {
      const { id } = req.params;
      const pedido = await Pedido.findByPk(id, { paranoid: false });

      if (!pedido) {
        return res.status(404).json({ erro: "Pedido não encontrado" });
      }

      await pedido.restore();
      return res.status(200).json({ message: "Pedido restaurado com sucesso" });
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  }
}

export default new PedidoController();
