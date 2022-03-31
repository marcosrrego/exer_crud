const { request } = require("express");
const express = require("express"); 
const database = require("./database");

const { v4: uuidv4} = require ('uuid');

const app = express();  

app.use(express.json());

app.post("/create", async(request, response) => {
    const { name, cpf, cargo, salario, telefone, email } = request.body;

    const user = {
        name,
        cpf,
        id: uuidv4(),
        cargo,
        salario,
        telefone,
        email
    };

    const query = await database.insert(user).into("dbo.tb_user").returning("*");

    return response.send(query);

});

app.get("/user", async(request, response) => {

    const users = await database.select().table("tb_user").orderBy("name").returning("*");

    return response.json(users);
});

app.put("/alter/:id", async(request, response) => {
    const { name, cpf, cargo, salario, telefone, email} = request.body;
    const { id } = request.params;

    const updateuser = await database.where({id}).update({name, salario, cargo, telefone, email, cpf}).table("tb_user").returning("*");

    return response.status(200).send()

});

app.delete("/delete/:id", async (request, response) => {
    const { id } = request.params;
    
    const deleteUser = await database.where({id}).delete().table("dbo.tb_user"); 
   
    return response.status(200).json(deleteUser)
})

app.get('/downFile', function(request, response){
    const pathFile = "conduta-de-etica/file/teste.pdf"
    response.download(pathFile);
});

app.listen(3333)

