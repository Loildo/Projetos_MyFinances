const bntSair = document.querySelector('.hover-sair');
const nomeUsuario = document.querySelector('#nome-usuario');
const listaLancamentos = document.querySelector('#lista-lancamentos');
// const listaLancamentos = document.querySelector('#teste');
const URL = 'http://localhost:8080';

window.onload = async () => {
    if(!localStorage.getItem('token')){
        window.location.href = 'index.html'
    }
    let me = JSON.parse(localStorage.getItem('me'))

    nomeUsuario.innerHTML = `${me.nome}`

    let transacoes = null;
    let categorias = null;
    let contas = null;

    transacoes = await fetch(`${URL}/transacoes/${me.id}`)
    .then(res => res.json());

    categorias = await fetch(`${URL}/categorias`)
        .then(res => res.json());

    contas = await fetch(`${URL}/conta`)
    .then(res => res.json());

    const dados = {   
        transacoes,
        categorias,
        contas
    };

    let obj = null;
    let data = [];

    await dados.contas.map( value => {
        obj = {id: value.descricao, valor: 0};

        dados.transacoes.forEach( desc => {
            obj = {...obj, valor: desc.conta == value.id ? obj.valor + desc.valor : obj.valor + 0}
        });
        data.push(obj);
        obj = null;
    }) 
    
    listRegistry(dados)
}


const listRegistry = (dados) => {
    listaLancamentos.innerHTML = '';
    dados.transacoes.map( (value, index) => {
        if(index <= 4){
            const div1 = document.createElement('div')
            div1.setAttribute('class', 'row')
            div1.style.color = `${value.valor >= 0 ? 'green' : 'red'}`

            const divData = document.createElement('div')
            divData.setAttribute('class', 'col-3')
            divData.innerHTML = value.data

            const divDesc = document.createElement('div')
            divDesc.setAttribute('class', 'col-6')
            divDesc.innerHTML = value.descricao
            divDesc.style.wordBreak = "break-all";

            const divValor = document.createElement('div')
            divValor.setAttribute('class', 'col-3')
            divValor.innerHTML = `R$ ${value.valor.toFixed(2)}`

            div1.appendChild(divData);
            div1.appendChild(divDesc);
            div1.appendChild(divValor);

            listaLancamentos.appendChild(div1);
        }  
    })
}

bntSair.addEventListener('click', () => {
    localStorage.removeItem('token')
    window.location.href = 'index.html'
})
