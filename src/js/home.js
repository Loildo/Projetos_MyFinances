const bntSair = document.querySelector('.hover-sair')
const btnOlho = document.querySelector('#img-olho')
const saldoGeral = document.querySelector('#saldo-geral')
const nomeUsuario = document.querySelector('#nome-usuario')
const listaLancamentos = document.querySelector('#lista-lancamentos')
const URL = 'http://localhost:3000';
let idConta = '';
let Saldo = null;

window.onload = () => {
    if(!localStorage.getItem('token')){
        window.location.href = 'index.html'
    }
    let me = JSON.parse(localStorage.getItem('me'))

    nomeUsuario.innerHTML = `${me.nome}`

    calcSaldoGeral()
    
    listRegistry()
}

const calcSaldoGeral = async() => {

    let transacoes = null;
    let categorias = null;
    let contas = null;

    transacoes = await fetch(`${URL}/transacoes`)
    .then(res => res.json());

    categorias = await fetch(`${URL}/categorias`)
        .then(res => res.json());

    contas = await fetch(`${URL}/contas`)
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


    // data.forEach( value => Saldo += value.valor)
    saldoGeral.innerHTML = Saldo
    // console.log(data);
    
    listBank(data)
    listRegistry(dados)
}

const listBank = (data) => {
    const divConta = document.querySelector('.contas')
    divConta.innerHTML = ''
    let saldoTotal = 0;
    fetch(`${URL}/contas`)
        .then(res => res.json())
        .then(contas => {   
            contas.map( value => {
                saldoTotal += +value.valor
                const div1 = document.createElement('div')
                div1.setAttribute('class', 'row align-items-center mb-4')
                div1.setAttribute('id', `${value.id}`)
            
                const div2 = document.createElement('div')
                div2.setAttribute('class', 'col-3 text-center')
                
                const div3 = document.createElement('div')
                div3.setAttribute('class', 'col-6 text-center')
                div3.setAttribute('value', `${value.id}`)
                
                const div4 = document.createElement('div')
                div4.setAttribute('class', 'col-3')
            
                const img = document.createElement('img')
                img.setAttribute('src', '../docs/img/banco.png')
                img.setAttribute('width','64px')
                img.setAttribute('height','64px')
            
                const h2 = document.createElement('h2')
                h2.style.margin = '0'
                h2.innerHTML = `${value.descricao}`
            
                const parag = document.createElement('p')
                const span1 = document.createElement('span')
                // span1.setAttribute('class', 'green')
                
                span1.innerHTML = 'R$ '
                
                const span2 = document.createElement('span')
                // let valor = data.map( desc =>  desc.id == value.descricao ? `${desc.valor}`.replace(',', '.').replace(',','') : null)
                // let stringValor = +`${valor}`.replace(',','').replace(',','')
                // span2.innerHTML =  stringValor.toFixed(2)
                span2.innerHTML =  value.valor
                span1.style.color = `${value.valor >= 0 ? 'green' : 'red'}`
                span2.style.color = `${value.valor >= 0 ? 'green' : 'red'}`
                
                div2.appendChild(img)
                div3.appendChild(h2)
                parag.appendChild(span1)
                parag.appendChild(span2)
                div4.appendChild(parag)
            
                div1.appendChild(div2)
                div1.appendChild(div3)
                div1.appendChild(div4)
            
                divConta.appendChild(div1)  

                div3.addEventListener('click', (e) => {
                    // edit(e.currentTarget);
                })
                
            })

            const saldoGeral = document.querySelector('#saldo-geral')
            saldoGeral.innerHTML = saldoTotal.toFixed(2)
            Saldo = saldoTotal.toFixed(2)
        })

        

}


btnOlho.addEventListener('click', () => {
    let toggleEyes = btnOlho.getAttribute('data-close');

    if(toggleEyes == 'true'){
        btnOlho.removeAttribute('data-close');
        btnOlho.setAttribute('data-close', 'false');
        saldoGeral.innerHTML = '---';
        btnOlho.removeAttribute('src');
        btnOlho.setAttribute('src', '../docs/img/olho-fechado.png');

    } else {
        btnOlho.removeAttribute('data-close');
        btnOlho.setAttribute('data-close', 'true');
        saldoGeral.innerHTML = Saldo;
        btnOlho.removeAttribute('src');
        btnOlho.setAttribute('src', '../docs/img/olho-aberto.png');
    }
})

const listRegistry = (dados) => {
    listaLancamentos.innerHTML = '';
    console.log(dados.transacoes);
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

            listaLancamentos.appendChild(div1)
        }  
    })
}

bntSair.addEventListener('click', () => {
    localStorage.removeItem('token')
    window.location.href = 'index.html'
})
