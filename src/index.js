const { request } = require("express");
const express = require("express");

const { v4: uuidv4} = require ('uuid');

const app = express();  

app.use(express.json());

let users = [];

app.post("/create", (request, response) => {
    const { name, cargo, salario, telefone, email } = request.body;

    const user = {
        name,
        id: uuidv4(),
        cargo,
        salario,
        telefone,
        email
    };

    users.push(user)
    
    return response.send(user);
});

app.get("/user", (request, response) => {
    return response.json(users);
});

app.put("/alter/:id", (request, response) => {
    const { salario, cargo, telefone, email } = request.body;
    const { id } = request.params;

    const user = users.find((user) => user.id === id)

    if (!user) {
        return response.status(400).json({erro: "user not exists !! "})
    }

    user.salario = salario;
    user.cargo = cargo;
    user.telefone = telefone;
    user.email = email;

    return response.status(200).send()

});

app.delete("/delete/:id", (request, response) => {
    const { id } = request.params;
    const newUsers = users.filter(function (user) {
        return user.id !== id
    })

    users = newUsers
   
    return response.status(200).json(users)
})

app.get('/downFile', function(request, response){
    const pathFile = "conduta-de-etica/file/teste.pdf"
    response.download(pathFile);
});

app.listen(3333)

