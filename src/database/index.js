const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Address = require('../models/Address');
const Tech = require('../models/Tech');

const connection = new Sequelize(dbConfig);

User.init(connection);
Address.init(connection);
Tech.init(connection);

User.associate(connection.models);              //Sempre que executa um .init, ele cadastra o model na conexão. Entao posso passar models como parametro
Address.associate(connection.models);           //Cada associação feita, precisa ser declarada aqui.
Tech.associate(connection.models);

module.exports = connection;