let knex = require("knex") ({
    client: "mssql",
    connection: {
        host: "192.168.100.8",
        user: "marcos.roberto",
        password: "@mr1q2w3e4r@",
        database: "Estagio",
        port: 49273
    }
}); 

module.exports = knex;