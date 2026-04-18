import sequelize from "./Database.js";
import { DataTypes, Model } from "sequelize";

export default class Pedido extends Model {
  static associate(models) {
    Pedido.hasOne(models.Entrega, {
      foreignKey: "pedido_id",
      as: "entrega",
    });
    // Adicionar esta relação
    Pedido.hasMany(models.Avaliacao, {
      foreignKey: "pedidoId",
      as: "avaliacoes",
    });
  }
}

Pedido.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    mesa: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nome_cliente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  sequelize,
  {
    tableName: "pedidos",
    timestamps: true,
    paranoid: true,
  },
);
