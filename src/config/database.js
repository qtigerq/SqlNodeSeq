module.exports = {
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'docker',
    database: 'sqlnode',
    define: {
        timestamps: true,
        underscored: true,      //Nome no formato Snake Case. Ex: user_group
    },
};