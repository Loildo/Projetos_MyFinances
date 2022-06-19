
const express = require('express');
const cors = require('cors');
const db = require('./db');
/* Iniciar a função do express */
const app = express();

/* Permitir a manipulação de dados em formato JSON */
app.use(cors())
app.use(express.json());


// ========================================================
//  USUÁRIOS    
// ========================================================

/* Busca Todos os Usuários */
app.get("/usuarios", async (req, res, next) => {
    return await db.selectCustomers()
        .then(resp => res.send(resp))
        .catch(err => res.send(err))

});

/* Cadastro de Usuário */
app.post("/novo_usuario", async (req, res, next) => {
    // return await db.insertCustomer(req.body)
    //     .then(resp => res.send({data: resp}))
    //     .catch(err => res.send(err))

    let result = ''
    await db.insertCustomer(req.body)
        .then(resp => res.status(201).json({success: resp}))
        .catch(err => res.status(400).json(err))
    // return res.json(result)
});

app.delete("/usuarios/:id", async (req, res, next) => {
    const id = req.params.id
    return await db.deleteCustomer(id)
        .then(resp => res.send(resp))
        .catch(err => res.send(err))

});

/* Busca um Usuario pelo id */
app.get("/usuarios/:id", async (req, res, next) => {
    const id = req.params.id
    return await db.getCustomer(id)
        .then(resp => res.send(resp))
        .catch(err => res.send(err))

});

/* Atualiza o campo Senha do Usuario */
app.put("/redefinir/:id", async (req, res, next) => {
    const id = req.params.id
    return await db.updateSenha(id, req.body)
        .then(resp => res.send(resp))
        .catch(err => res.send(err))

});

// ========================================================
//  CATEGORIAS    
// ========================================================

/* Busca Todas as Categorias */
app.get("/categorias", async (req, res, next) => {
    return await db.selectCategorias()
        .then(resp => res.send(resp))
        .catch(err => res.send(err))

});

/* Cadastra uma Categoria */
app.post("/categorias", async (req, res, next) => {
    // return await db.insertCustomer(req.body)
    //     .then(resp => res.send({data: resp}))
    //     .catch(err => res.send(err))

    // return res.send(req.body);
    let result = ''
    await db.insertCategoria(req.body)
        .then(resp => res.status(201).json({success: resp}))
        .catch(err => res.status(400).json(err))
    // return res.json(result)
});

/* Remove uma Categoria */
app.delete("/categorias/:id", async (req, res, next) => {
    const id = req.params.id
    return await db.deleteCategoria(id)
        .then(resp => res.send(resp))
        .catch(err => res.send(err))

});


// ========================================================
//  CONTAS    
// ========================================================

/* Busca Todas as Contas */
app.get("/conta", async (req, res, next) => {
    return await db.selectContas()
        .then(resp => res.send(resp))
        .catch(err => res.send(err))

});

/* Cadastra uma Conta */
app.post("/conta", async (req, res, next) => {
    // return await db.insertCustomer(req.body)
    //     .then(resp => res.send({data: resp}))
    //     .catch(err => res.send(err))

    // return res.send(req.body);
    let result = ''
    await db.insertConta(req.body)
        .then(resp => res.status(201).json({success: resp}))
        .catch(err => res.status(400).json(err))
    // return res.json(result)
});

/* Busca uma Conta pelo id da Conta */
app.get("/conta/:id", async (req, res, next) => {
    const id = req.params.id
    return await db.getConta(id)
        .then(resp => res.send(resp))
        .catch(err => res.send(err))

});

/* Remove uma Conta */
app.delete("/conta/:id", async (req, res, next) => {
    const id = req.params.id
    return await db.deleteConta(id)
        .then(resp => res.send(resp))
        .catch(err => res.send(err))

});

/* Atualiza os dados da Conta */
app.put("/conta/:id", async (req, res, next) => {
    const id = req.params.id
    return await db.updateConta(id, req.body)
        .then(resp => res.send(resp))
        .catch(err => res.send(err))

});

/* Atualiza o campo Valor da Conta */
app.put("/conta_valor/:id", async (req, res, next) => {
    const id = req.params.id
    return await db.updateValorConta(id, req.body)
        .then(resp => res.send(resp))
        .catch(err => res.send(err))

});


// ========================================================
//  LIMITES    
// ========================================================

/* Busca Todos os Limites */
app.get("/limites", async (req, res, next) => {
    return await db.selectLimites()
        .then(resp => res.send(resp))
        .catch(err => res.send(err))

});

/* Cadastra um Limite */
app.post("/limites", async (req, res, next) => {
    let result = ''
    await db.insertLimite(req.body)
        .then(resp => res.status(201).json({success: resp}))
        .catch(err => res.status(400).json(err))

});

/* Desativa os Limites */
app.put("/desativa_limites", async (req, res, next) => {
    return await db.desativaLimite()
        .then(resp => res.send(resp))
        .catch(err => res.send(err))

});

/* Desativa os Limites */
app.put("/ativar_limite/:id", async (req, res, next) => {
    const id = req.params.id
    return await db.ativarLimite(id)
        .then(resp => res.send(resp))
        .catch(err => res.send(err))

});


// ========================================================
//  TRANSAÇÕES    
// ========================================================

/* Busca Todos os Transação */
app.get("/transacoes/:id", async (req, res, next) => {
    const id = req.params.id
    return await db.selectTransacoes(id)
        .then(resp => res.send(resp))
        .catch(err => res.send(err))

});

/* Cadastra uma Transação */
app.post("/transacoes", async (req, res, next) => {
    return await db.insertTransacoes(req.body)
        .then(resp => res.send(resp))
        .catch(err => res.send(err))

});

/* Verifica se há Transações cadastras para uma determinada Conta */
app.get("/transacoes_contas/:id", async (req, res, next) => {
    const id = req.params.id
    return await db.getTransacoesConta(id)
        .then(resp => res.send(resp))
        .catch(err => res.send(err))
});

/* Verifica se há Transações cadastras para uma determinada Categoria */
app.get("/transacoes_categorias/:id", async (req, res, next) => {
    const id = req.params.id
    return await db.getTransacoesCategoria(id)
        .then(resp => res.send(resp))
        .catch(err => res.send(err))
});


/* Rodar o projeto na porta 8080 */
app.listen(8080, () =>{
    console.log("Servidor iniciado na porta 8080: http://localhost:8080/");
});
