export const user = [
    { nome: 'loildo', email: 'loildo@loildo.com', password: '123'},
    { nome: 'isabella', email: 'isabella@isabella.com', password: '123'},
    { nome: 'luan', email: 'luan@luan.com', password: '123'},
];


export const cat = [
    { id: Math.floor(Date.now() * Math.random()).toString(36), descricao: 'Alimentação' },
    { id: Math.floor(Date.now() * Math.random()).toString(36), descricao: 'Compras' },
    { id: Math.floor(Date.now() * Math.random()).toString(36), descricao: 'Educação' },
    { id: Math.floor(Date.now() * Math.random()).toString(36), descricao: 'Outros' },
    { id: Math.floor(Date.now() * Math.random()).toString(36), descricao: 'Presente' },
    { id: Math.floor(Date.now() * Math.random()).toString(36), descricao: 'Saúde' }
];

export const bancos = [
    { id: Math.floor(Date.now() * Math.random()).toString(36), descricao: 'Poupança', valor: 0 },
    { id: Math.floor(Date.now() * Math.random()).toString(36), descricao: 'Nubank', valor: 0 },
    { id: Math.floor(Date.now() * Math.random()).toString(36), descricao: 'Caixa', valor: 0 },
];

