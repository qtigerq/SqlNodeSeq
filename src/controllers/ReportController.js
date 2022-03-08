const { Op } = require('sequelize');            //Operators do sequelize (https://sequelize.org/v6/manual/model-querying-basics.html#operators)
const User = require('../models/User');

module.exports = {
    async show(req, res) {
        //1 - Encontrar todos os usuários que tem email @gmail.com.br
        //2 - Destes, buscar todos que moram na Av. Brasil.
        //3 - Destes, buscar as tecnologias que começam com React

        //Buscar todos os usuários
        const users = await User.findAll({
            attributes: ['name', 'email'],                  //Somente pegar atributos name e email
            where: {
                email: {
                    [Op.like]: '%gmail.com.br'              //Como Op.like é uma variável, colocamos entre [] para que o JS coloque o valor da variavel como chave do objeto. Sem os []'s o JS iria pensar que o nome se trata de uma string
                }
            },
            include: [
                { association: 'addresses', where: { street: 'Av. Brasil' } },          //Onde a rua seja Av. Brasil
                {
                    association: 'techs',
                    required: false,                        //Faz que este filtro não seja exclusivo, ou seja, se o usuário não tiver nenhuma tecnologia que comece com React, ele ainda vai permanecer nos resultados, mas sem nenhuma tecnologia listada.
                    where: {
                        name: {
                            [Op.like]: 'React%'                                         //Onde a tech comece com React
                        }
                    }
                },
            ]
        })

        return res.json(users);
    }
};