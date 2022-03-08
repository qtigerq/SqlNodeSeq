const User = require('../models/User');
const Tech = require('../models/Tech');

module.exports = {
    //Buscar
    async index(req, res){
        //Recebe os parametros do usuario
        const { user_id } = req.params;
        
        //Busca o usuário com ID igual user_id e também a associação techs que traz as tecnologias que ele tem cadastradas
        const user = await User.findByPk(user_id, {
            include: { 
                association: 'techs', 
                attributes: ['name'],                       //Traz somente os atributos que estiverem explicitados
                through: {                                  //through se refere a tabela pivo (user_techs)
                    attributes: []                              //Não traz nenhum atributo, pois o array está vazio []
                }
            }
        });

        //Retorna as tecnologias que o usuário possui
        return res.json(user.techs);
    },

    //Escrever
    async store(req, res){
        //Recebe os parametros do usuario
        const { user_id } = req.params;
        const { name } = req.body;

        //Verifica se o usuário com ID user_id existe
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        //Procura ou cria uma tech; findOrCreate (Se nao encontra, vai criar)
        const [ tech ] = await Tech.findOrCreate({          //A desestruturação [ tech ] ocorre pois este método tem dois parâmetros, o segundo neste caso seria o created, um booleano que diz se a tech foi criada agora (TRUE) ou ja existia (FALSE), mas não vai ser usado neste momento
            where: { name }                                 //Procurando uma tech onde (where) o nome seja este que ele está tentando criar
        });

        //Adiciona a tech ao usuário
        //Sempre que se cria um associate do tipo belongsToMany como foi feito entre users e techs, o Sequelize automaticamente cria vários métodos dentro do user (no caso) como addTech, getTech, setTech, etc...
        await user.addTech(tech);                           //Promise

        return res.json(tech);
    },

    //Excluir
    async delete(req, res) {
        //Recebe os parametros do usuario
        const { user_id } = req.params;
        const { name } = req.body;

        //Verifica se o usuário com ID user_id existe
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        //Procura uma única Tech (findOne), com o nome { name }
        const tech = await Tech.findOne({
            where: { name }
        });

        //Remove a tech do user com o método autogerado pelo Sequelize.
        await user.removeTech(tech);

        return res.json();
    },
};