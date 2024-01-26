import { Sequelize, Model, DataTypes } from 'sequelize';

// Define el modelo User
class Usermodel extends Model {
  public uuid!: string;
  public name!: string;
  public email!: string;
  public phone_number!: string;
  public password!: string;

  // Añade otros campos según sea necesario

  // Campos automáticos de timestamp (createdAt, updatedAt)
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Configura el modelo
const initUserModel = (sequelize: Sequelize) => {
  Usermodel.init(
    {
      uuid: {
        type: DataTypes.STRING(128),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
      },
      phone_number: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      // Añade otros campos según sea necesario
    },
    {
      sequelize,
      modelName: 'Usermodel', // Nombre del modelo, que se utilizará en las consultas
      tableName: 'users', // Nombre de la tabla en la base de datos
      timestamps: true, // Si deseas habilitar campos de timestamp (createdAt, updatedAt)
    }
  );
};

export { Usermodel, initUserModel };
