const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
        }, {
            sequelize: connection
        })
    }

    static associate(models) {
        this.hasMany(models.Address, { foreignKey: 'user_id', as: 'addresses'});                            //Um usuário tem muitos endereços (hasMany)
        this.belongsToMany(models.Tech, { through: 'user_techs', foreignKey: 'user_id', as: 'techs' })
    }
}

module.exports = User;