'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('user_techs', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },        //Referencia a tabela Users, na coluna ID (chave estrangeira/CONTRAINS)
        onUpdate: 'CASCADE',                              //Sempre que o ID do usuário for alterado, aqui também será alterado
        onDelete: 'CASCADE',                              //Se o usuário for deletado, deletar tambem os relacionamentos com as tecnologias dele.
      },
      tech_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'techs', key: 'id' },        //Referencia a tabela techs, na coluna ID (chave estrangeira/CONTRAINS)
        onUpdate: 'CASCADE',                              //Sempre que o ID de uma tecnologia for alterado, aqui também será alterado
        onDelete: 'CASCADE',                              //Se uma tecnologia for deletada, deletar tambem os relacionamentos dela com os usuários.
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
    await queryInterface.dropTable('user_techs');

  }
};
