const bntSair = document.querySelector('.hover-sair')
const divContainer = document.querySelector('#container-btn-valor')
const form = document.querySelector('#formLimites')
const inputValor = document.querySelector('#input-valor')
const nomeUsuario = document.querySelector('#nome-usuario')
const btnLimite = document.querySelector("#btn-limite")
// const URL = 'http://localhost:3000'
const URL = 'http://localhost:8080/limites'
let limites = '';

window.onload = () => {
    // console.log('onload-limite');
    if(!localStorage.getItem('token')){
        window.location.href = 'index.html'
    }
    let me = JSON.parse(localStorage.getItem('me'))

    nomeUsuario.innerHTML = `${me.nome}`

    fetch(`${URL}`)
        .then(res => res.json())
        .then(res => {
            // console.log(res);
            limites = res
            if(limites[4] != null){
                inputValor.value = limites[4].valor
                btnLimite.style.background = '#8afd9d'
            }
            listLimites()
        })

}

const listLimites = () => {
    limites.map( value => {
        if(value.id > 4)
            return false
        const div = document.createElement('div')
        div.setAttribute('class', 'col-sm-3 col-md-3 text-center mb-3')
        
        const button = document.createElement('button')
        button.setAttribute('class', `${value.ativo == 1 ? 'btn ativo' : 'btn'}`)
        button.setAttribute('value', value.id)
        button.innerText = `R$ ${value.valor}`

        div.appendChild(button)
        divContainer.appendChild(div)

        button.addEventListener('click', (e) => {
            let result = confirm("Tem certeza que quer ativar esse limite?")
            if(result){
                ativarLimite(e)
            }
            
        })
    })
    
}   

const ativarLimite = (e) => {
    let id = e.currentTarget.value;
    
    fetch(`http://localhost:8080/ativar_limite/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .then(res => console.log(res))
        .then(() => location.reload())
    
}

bntSair.addEventListener('click', () => {
    localStorage.removeItem('token')
    localStorage.removeItem('me')
    window.location.href = 'index.html'
})

form.onsubmit = (e) =>{
    e.preventDefault()
    if(e.submitter.name == 'remover'){
        let result = confirm('Tem certeza que quer remover o limite?')
        if(result){
            fetch('http://localhost:8080/desativa_limites', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(res => console.log(res))
                .then(() => location.reload())
        }
        return
    }
        
    const valor = form.valor.value

    // console.log(form.valor);
    if(!valor || valor <= 0){
        alert('O valor não pode ser menor ou igual 0!')
        return false
    }

    let obj = {
        valor: +valor,
        usuarios_id: JSON.parse(localStorage.getItem('me')).id,
        ativo: 1,
    }

    fetch(`${URL}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })  
        .then(() => alert('Novo limite adicionado!'))
        .then(() => location.reload())

}