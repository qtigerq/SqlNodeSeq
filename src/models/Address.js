const { Model, DataTypes } = require('sequelize');

class Address extends Model {
    static init(connection) {
        super.init({
            zipcode: DataTypes.STRING,
            street: DataTypes.STRING,
            number: DataTypes.INTEGER,
        }, {
            sequelize: connection
        })
    }

    static associate(models) {                                                   //Recebe todos os models da app
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })       //Vai associar o Address ao User pela coluna user_id, e chamar este relacionamento de user. Um address pertence (belongsTo) a um user
    }                                                                            //... Precisa fazer a associação contrária (em User.js) também caso queira otimizar as querys com joins por exemplo
}

module.exports = Address;