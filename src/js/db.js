// import mysql from '../mysql2/promise';
// import {mysql} from '../../node_modules/mysql2/promise';


async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
 
    mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:root@localhost:3306/my_finances");
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}

async function selectCustomers(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM usuarios;');
    return rows;
}

async function insertCustomer(customer){
    // return customer
    const conn = await connect();
    const sql = 'INSERT INTO usuarios(nome,email,senha) VALUES (?,?,?);';
    const values = [customer.nome, customer.email, customer.senha];
    return await conn.query(sql, values);
}
	
async function updateCustomer(id, customer){
    const conn = await connect();
    const sql = 'UPDATE usuarios SET nome=?, email=?, senha=? WHERE id=?';
    const values = [customer.nome, customer.email, customer.senha, id];
    return await conn.query(sql, values);
}

async function deleteCustomer(id){
    const conn = await connect();
    const sql = 'DELETE FROM usuarios where id=?;';
    return await conn.query(sql, [id]);
}

async function getCustomer(id){
    const conn = await connect();
    const sql = 'SELECT * FROM usuarios where id=?;';
    const [rows] = await conn.query(sql, id);
    return rows;
}

async function updateSenha(id, customer){
    const conn = await connect();
    const sql = 'UPDATE usuarios SET senha=? WHERE id=?';
    const values = [customer.senha, id];
    return await conn.query(sql, values);
}

// ============================================================
//  CATEGORIAS    
// ============================================================
async function selectCategorias(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM categoria;');
    return rows;
}

async function insertCategoria(categoria){
    const conn = await connect();
    const sql = 'INSERT INTO categoria(nome) VALUES (?);';
    const values = [categoria.nome];
    return await conn.query(sql, values);
}

async function deleteCategoria(id){
    const conn = await connect();
    const sql = 'DELETE FROM categoria where id=?;';
    return await conn.query(sql, [id]);
}

// ============================================================
//  CONTAS    
// ============================================================
async function selectContas(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM conta;');
    return rows;
}

async function getConta(id){
    const conn = await connect();
    const sql = 'SELECT * FROM conta where id=?;';
    const [rows] = await conn.query(sql, id);
    return rows;
}

async function insertConta(conta){
    const conn = await connect();
    const sql = 'INSERT INTO conta(nome, valor) VALUES (?,?);';
    const values = [conta.nome, conta.valor];
    return await conn.query(sql, values);
}

async function deleteConta(id){
    const conn = await connect();
    const sql = 'DELETE FROM conta where id=?;';
    return await conn.query(sql, [id]);
}

async function updateConta(id, conta){
    const conn = await connect();
    const sql = 'UPDATE conta SET nome=?, valor=? WHERE id=?';
    const values = [conta.nome, conta.valor, id];
    return await conn.query(sql, values);
}

async function updateValorConta(id, conta){
    const conn = await connect();
    const sql = 'UPDATE conta SET valor=? WHERE id=?';
    const values = [conta.valor, id];
    return await conn.query(sql, values);
}


// ============================================================
//  LIMITES    
// ============================================================
async function selectLimites(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM limite;');
    return rows;
}

async function insertLimite(limite){
    const conn = await connect();
    await desativaLimite();
    await deleteNovosLimites();
    const sql = 'INSERT INTO limite(valor, ativo, usuarios_id) VALUES (?,?,?);';
    const values = [limite.valor, limite.ativo, limite.usuarios_id];


    return await conn.query(sql, values);
}

async function desativaLimite(){
    const conn = await connect();
    await deleteNovosLimites();
    const sql = 'UPDATE limite SET ativo=0';
    return await conn.query(sql);
}

async function ativarLimite(id){
    const conn = await connect();
    const sql = 'UPDATE limite SET ativo=1 WHERE id=?';
    const values = [id];
    return await conn.query(sql, values);
}

async function deleteNovosLimites(id){
    const conn = await connect();
    const sql = 'DELETE FROM limite WHERE id > 4';
    const values = [id];
    return await conn.query(sql, values);
}


// ============================================================
//  TRANSAÇÕES    
// ============================================================
async function selectTransacoes(id){
    const conn = await connect();
    const sql = 'SELECT id, tipo, valor, descricao, DATE_FORMAT(data, "%d-%m-%Y") as data, conta_id, categoria_id, usuarios_id, created_at, update_at FROM my_finances.transacoes WHERE usuarios_id=?;'
    const [rows] = await conn.query(sql, id);
    return rows;
}

async function insertTransacoes(transacao){
    const conn = await connect();
    const sql = 'INSERT INTO transacoes( tipo, valor, descricao, data, conta_id, categoria_id, usuarios_id) VALUES (?,?,?,?,?,?,?);';
    const values = [transacao.tipo, transacao.valor, transacao.descricao, transacao.data, transacao.conta_id, transacao.categoria_id, transacao.usuarios_id];
    return await conn.query(sql, values);
}

async function getTransacoesConta(id){
    const conn = await connect();
    const sql = 'SELECT * FROM transacoes where conta_id=?;';
    const [rows] = await conn.query(sql, id);
    return rows;
}

async function getTransacoesCategoria(id){
    const conn = await connect();
    const sql = 'SELECT * FROM transacoes where categoria_id=?;';
    const [rows] = await conn.query(sql, id);
    return rows;
}

module.exports = {
    selectCustomers,
    insertCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomer,
    updateSenha,

    selectCategorias,
    insertCategoria,
    deleteCategoria,

    selectContas,
    getConta,
    insertConta,
    deleteConta,
    updateConta,
    updateValorConta,

    selectLimites,
    insertLimite,
    desativaLimite,
    ativarLimite,

    selectTransacoes,
    insertTransacoes,
    getTransacoesConta,
    getTransacoesCategoria
}