import { Model, DataTypes } from "sequelize";
import connection from "./Connection.js";

class Avaliacao extends Model {
  static associate(models) {
    Avaliacao.belongsTo(models.Pedido, {
      foreignKey: "pedidoId",
      as: "pedido",
    });
  }
}

Avaliacao.init(
  {
    nota: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comentario: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    pedidoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Pedidos",
        key: "id",
      },
    },
  },
  {
    sequelize: connection,
    modelName: "Avaliacao",
    tableName: "Avaliacoes",
    paranoid: true, // soft delete
    timestamps: true,
  },
);

export default Avaliacao;
