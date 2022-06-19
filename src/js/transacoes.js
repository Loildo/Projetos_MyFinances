const bntSair = document.querySelector('.hover-sair')
const bntTipo = document.querySelectorAll('button.button-esqu')
const label = document.querySelector('.green')
const form = document.querySelector('#formTransacao')
const selectContas = document.querySelector('#select-contas')
const selectCategorias = document.querySelector('#select-categorias')
const nomeUsuario = document.querySelector('#nome-usuario')
// const data = document.querySelector('#trans-input-date')
// const btnLancamento = querySelector('input[type="radio"]:checked')


const URL = 'http://localhost:8080'
let contas = '';
let categorias = '';
let tipo = '';
let limite = '';

window.onload = () => {
    if(!localStorage.getItem('token')){
        window.location.href = 'index.html'
    }

    let me = JSON.parse(localStorage.getItem('me'))

    nomeUsuario.innerHTML = `${me.nome}`

    fetch(`${URL}/transacoes/${me.id}`)
        .then(res => res.json())
        .then(res => {
            // console.log(res);
        })

    // buscas as contas cadastras
    fetch(`${URL}/conta`)
        .then(res => res.json())
        .then(res => {
            contas = res
            listContas()
        })
    // busca as categorias
    fetch(`${URL}/categorias`)
        .then(res => res.json())
        .then(res => {
            categorias = res
            listCategorias()
        })
    // fetch(`${URL}/limites?ativo=1`)
    //     .then(resp => resp.json())
    //     .then(res => {
    //         limite = res
    //     })
    

}

bntTipo.forEach( (value, key) => {
    value.setAttribute('id', key+1)
    value.addEventListener('click', (e) => {
        
        switch (key+1) {
            case 1:
                label.style.color = 'red'
                tipo = 1
                break;

            case 2:
                label.style.color = 'green'
                tipo = 2
                break;
        }
    })
})

const listContas = () => {
    const option = document.createElement('option')
    selectContas.appendChild(option)
    contas.map( value => {
        const option = document.createElement('option')
        option.setAttribute('value', value.id)
        option.innerText= value.nome

        selectContas.appendChild(option)
    })
}

const listCategorias = () => {
    const option = document.createElement('option')
    selectCategorias.appendChild(option)
    categorias.map( value => {
        const option = document.createElement('option')
        option.setAttribute('value', value.id)
        option.innerText= value.nome

        selectCategorias.appendChild(option)
    })
}

// valida se os campos estão preenchidos
const validateValues = ({ valor, descricao, data, conta_id, categoria_id }) => {
    if(!tipo || !valor || !descricao || !data || !conta_id || !categoria_id ){
        return false

    }

    return true;
}

form.onsubmit = async(e) => {
    e.preventDefault()
    // if(form.valor.value > limite[0].valor){
    //     alert('O valor é maior que o limite de R$'+limite[0].valor+' adicionado!')
    //     return false
    // }

    const valor = form.valor.value
    const descricao = form.descricao.value
    const data = form.data.value
    // const recorrencia = +form.reco.value

    let obj = {
        tipo: +tipo,
        valor: tipo == 1 ? valor * -1 : +valor,
        descricao,
        data,
        // recorrencia,
        conta_id: +selectContas.value,
        categoria_id: +selectCategorias.value,
        usuarios_id: JSON.parse(localStorage.getItem('me')).id
    }

    let validate = validateValues(obj)

    if(!validate) {
        alert("Todos os campos precisam ser preenchidos!")
        return false
    }

    await atualizarSaldoConta(obj)

}

const atualizarSaldoConta = async(obj) => {
    
    let conta = null;
    await fetch(`${URL}/conta/${obj.conta_id}`)
        .then( res => res.json())
        .then(res => conta = res)

    let novoValor = parseFloat(conta.valor) + obj.valor

    await fetch(`${URL}/conta_valor/${obj.conta_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({valor: novoValor})
    })
        .then( res => res.json())


    criarRegistro(obj)

}

const criarRegistro = async(obj) => {
    await fetch(`${URL}/transacoes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
        .then(res => res.json())
        .then( () => alert('Transação adicionada com sucesso!'))
}

bntSair.addEventListener('click', () => {
    localStorage.removeItem('token')
    localStorage.removeItem('me')
    window.location.href = 'index.html'
})