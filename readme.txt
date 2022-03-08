SEQUELIZE:

Criar uma tabela USERS:
yarn sequelize migration:create --name=create-users

Executa as migrations criadas:
yarn sequelize db:migrate