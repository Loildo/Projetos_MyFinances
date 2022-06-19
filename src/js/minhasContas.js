const form = document.querySelector('#formMinhasContas');
const saldo = document.querySelector('#inputSaldo');
const banco = document.querySelector('#banco');
const btnSubmit = document.querySelector('.add-nova-conta')
const btnRemove = document.querySelector('.remove-conta')
const title = document.querySelector('#title-add-conta')
const bntSair = document.querySelector('.hover-sair')
const nomeUsuario = document.querySelector('#nome-usuario')
let idConta = '';

// const URL = 'http://localhost:3000/contas';
const URL = 'http://localhost:8080/conta';

window.onload = () =>{
    // console.log('load-minhas-contas');
    
    if(!localStorage.getItem('token')){
        window.location.href = 'index.html'
    }
    let me = JSON.parse(localStorage.getItem('me'))

    nomeUsuario.innerHTML = `${me.nome}`
    
    saldo.setAttribute('placeholder', '0,00');
    


    listAllBank()
}

form.onsubmit = (e) =>{
    e.preventDefault()

    if(idConta){
        let validate = validateValues(saldo.value,banco.value)
        if(!validate){
            alert("Todos os campos precisam ser preenchidos!")
            return false
        }

        const conta = JSON.stringify({
            nome: banco.value, valor: saldo.value
        })

        fetch(`${URL}/${idConta}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: conta
        })
            .then(res => res.json())
            .then(() => location.reload())
    
    } else {
        let validate = validateValues(saldo.value,banco.value)
        if(!validate){
            alert("Todos os campos precisam ser preenchidos!")
            return false
        }

        const conta = JSON.stringify({
            nome: banco.value, valor: saldo.value
        })

        fetch(`${URL}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: conta
        })
            .then(res => res.json())
            .then(() => location.reload())
    }
}


const validateValues = (saldo, banco) => {
    // console.log(banco);
    if(!saldo || !banco){
        return false;
    }

    return true;
} 


const edit = (elem) => {
    btnSubmit.innerHTML = 'Editar'
    title.innerHTML = 'Editar Conta'
    
    const id = elem.getAttribute('value')
    fetch(`${URL}/${id}`)
        .then(res => res.json())
        .then(res => {
            // console.log(res)
            banco.value = res[0].nome
            saldo.value = res[0].valor
            idConta = id
            // console.log(idConta);
        })
    
}


const remove = async(elem) => {
    let result = confirm('Tem certeza que quer remover essa conta?');

    if(result){
        idConta = elem.getAttribute('value')
        let transacoes = await fetch(`http://localhost:8080/transacoes_contas/${idConta}`).then(res => res.json())
        console.log(transacoes);
        if(transacoes.length > 0){
            alert('Você possui transações para essa conta, não é possível remove-la!')
            return false
        } else {
            fetch(`${URL}/${idConta}`,{
                method: 'DELETE'
            })
                .then(res => res.json)
                .then(() => location.reload())    
        }
    }

}


// btnSubmit.addEventListener('click', () => {    
//     let result = btnSubmit.getAttribute('data')
    
//     if(result){
//         edit()
//     } else {
//         addBanco()
//     }
    
//     btnSubmit.removeAttribute('data')

// })


btnRemove.addEventListener('click', remove)

const listAllBank = () => {
    const divConta = document.querySelector('.contas')
    divConta.innerHTML = ''
    btnSubmit.innerHTML = 'Adicionar'
    title.innerHTML = 'Adicionar Conta'
    btnRemove.style.display = 'none'

    fetch(URL)
        .then(res => res.json())
        .then(contas =>    
            contas.map( value => {
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
                h2.innerHTML = `${value.nome}`
            
                const parag = document.createElement('p')
                const span1 = document.createElement('span')
                span1.setAttribute('class', 'green')
                span1.innerHTML = 'R$ '
                
                const span2 = document.createElement('span')
                span2.innerHTML = `${parseFloat(+value.valor).toFixed(2)}`
                
                const spanRemove = document.createElement('span')
                spanRemove.setAttribute('value', `${value.id}`)
                spanRemove.innerHTML = 'x';
                spanRemove.style.marginLeft = '10px'
                spanRemove.style.color = '#dd0100'
                spanRemove.style.cursor = 'pointer'

                div2.appendChild(img)
                div3.appendChild(h2)
                parag.appendChild(span1)
                parag.appendChild(span2)
                parag.appendChild(spanRemove)
                div4.appendChild(parag)
            
                div1.appendChild(div2)
                div1.appendChild(div3)
                div1.appendChild(div4)
            
                divConta.appendChild(div1)  
                
                // div1.addEventListener('click', (e) => {
                //     btnSubmit.innerHTML = 'Editar'
                //     title.innerHTML = 'Editar Conta'
                //     btnSubmit.setAttribute('data', 'editar')
                //     btnRemove.style.display = 'flex'
                //     fillForm(e.currentTarget)

                // })

                div3.addEventListener('click', (e) => {
                    edit(e.currentTarget);
                })

                spanRemove.addEventListener('click', (e) => {
                    // console.log(e.currentTarget);
                    remove(e.currentTarget)
                })
                
            })
        )

}

bntSair.addEventListener('click', () => {
    localStorage.removeItem('token')
    localStorage.removeItem('me')
    window.location.href = 'index.html'
})
