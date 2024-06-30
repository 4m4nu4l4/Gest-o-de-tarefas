const { Sequelize } = require('sequelize')
 
class Database { 
    constructor() {
        this.init()
    }
 
    init() {
        this.db = new Sequelize({ // agr coloquei o sequelize na varialvel db, assim acesso o sequelize pela database :)
            database: 'gestao_de_tarefas',
            host: 'localhost',
            username: 'root',
            dialect: 'mysql'
        })
    }
}
 
module.exports = new Database()