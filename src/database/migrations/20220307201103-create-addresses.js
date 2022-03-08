'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('addresses', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },         //Referencia a tabela Users, na coluna ID (chave estrangeira/CONTRAINS)
        onUpdate: 'CASCADE',      //Sempre que o ID do usuário for alterado, aqui também será alterado
        onDelete: 'CASCADE',      //Se o usuário for deletado, deletar tambem os endereços dele.
      },
      zipcode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      street: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('addresses');

  }
};
