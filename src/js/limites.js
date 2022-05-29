const bntSair = document.querySelector('.hover-sair')
const divContainer = document.querySelector('#container-btn-valor')
const form = document.querySelector('#formLimites')
const inputValor = document.querySelector('#input-valor')

const URL = 'http://localhost:3000'
let limites = '';

window.onload = () => {
    console.log('onload-limite');
    if(!localStorage.getItem('token')){
        window.location.href = 'index.html'
    }
    fetch(`${URL}/limites`)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            limites = res
            if(limites[4].ativo == 1)
                inputValor.value = limites[4].valor

            listLimites()
        })

}

const listLimites = () => {
    limites.map( value => {
        if(value.id == 5)
            return false
        const div = document.createElement('div')
        div.setAttribute('class', 'col-sm-3 col-md-3 text-center mb-3')
        
        const button = document.createElement('button')
        button.setAttribute('class', `${value.ativo ? 'btn ativo' : 'btn'}`)
        button.setAttribute('value', value.id)
        button.innerText = `R$ ${value.valor}`

        div.appendChild(button)
        divContainer.appendChild(div)

        button.addEventListener('click', (e) => {
            let result = confirm("Tem certeza que deseja ativar o esse limite?")
            if(result){
                ativarLimite(e)
            }
            
        })
    })
    
}   

const desativarLimite = (value) => {
    fetch(`${URL}/limites/${value.id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...value, ativo: null})
    })
        .then(res => res.json())
}

const ativarLimite = (e) => {
    let id = e.currentTarget.value;
    
    limites.forEach( value => {
        setTimeout( () => {

        },1500)
        if(value.id == id){
            fetch(`${URL}/limites/${value.id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...value, ativo: 1})
            })
                .then(res => res.json())
        } else{
            desativarLimite(value)
            
        }
    });
    
}



bntSair.addEventListener('click', () => {
    localStorage.removeItem('token')
    window.location.href = 'index.html'
})

form.onsubmit = (e) =>{
    e.preventDefault()
    const valor = form.valor.value

    console.log(form.valor);
    if(!valor || valor <= 0){
        alert('O valor não pode ser menor ou igual 0!')
        return false
    }

    let obj = {
        valor: +valor,
        data: null,
        ativo: 1,
    }

    fetch(`${URL}/limites/${5}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })

    limites.map((value) => {
        setTimeout(() => {

        },1500)
        
        if(value.id != 5){
            desativarLimite(value)
        }
    })
}