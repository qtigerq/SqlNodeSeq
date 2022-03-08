const { Model, DataTypes } = require('sequelize');

class Tech extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
        }, {
            sequelize: connection,
            tableName: 'techs',             //Se não indicar explicitamente, o Sequelize vai tentar pluralizar, mas pode errar, neste caso ele colocaria teches, e nao techs, por isso colocamos explícitamente aqui
        })
    }

    static associate(models) {
        this.belongsToMany(models.User, { through: 'user_techs', foreignKey: 'tech_id', as: 'users' })
        //belongToMany (Pertence a muitos, relação NxN)
        //foreingKey: nome da chave dentro da tabela user_techs que armazena a tecnologia
        //through: nome da tabela que relaciona Users com Techs
        //as: nomeia a associação (geralmente o nome se refere ao model que está se associando a este(tech))
    }
}

module.exports = Tech;