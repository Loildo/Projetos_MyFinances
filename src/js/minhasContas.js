import { bancos } from "./dados.js";
const form = document.querySelector('#formMinhasContas');
const saldo = document.querySelector('#inputSaldo');
const banco = document.querySelector('#banco');
const btnSubmit = document.querySelector('.add-nova-conta')
const btnRemove = document.querySelector('.remove-conta')
const title = document.querySelector('#title-add-conta')
let idBanco = '';

window.onload = () =>{
    console.log('load-minhas-contas');
    saldo.setAttribute('placeholder', '0,00');
    let result = localStorage.getItem('bancos')
    if(!result)
        localStorage.setItem("bancos", JSON.stringify(bancos))

    listAllBank()
}


const addBanco = () => {
    let validate = validateValues({saldo: saldo.value, banco: banco.value})
    if(!validate){
        alert('Todos os campos precisam ser preenchidos!')
        return false;
    }

    const getAllAccounts = JSON.parse(localStorage.getItem('bancos'))
    const addNewBanco = getAllAccounts ? [
            ...getAllAccounts, 
            {
                id: Math.floor(Date.now() * Math.random()).toString(36), 
                descricao: banco.value,
                valor: saldo.value
            }
        ] 
        : [{
            id: Math.floor(Date.now() * Math.random()).toString(36),
            descricao: banco.value,
            valor: saldo.value
        }]

    localStorage.setItem("bancos", JSON.stringify(addNewBanco))
    
    banco.value = ''
    saldo.value = ''
    listAllBank()

}


const validateValues = ({saldo, banco}) => {
    if(!saldo || !banco){
        return false;
    }

    return true;
}


const fillForm = (elem) => {
    const contas = JSON.parse(localStorage.getItem('bancos'))

    let conta = contas.find(value => (value.id == elem.id))
    idBanco = elem.id

    banco.value = conta.descricao
    saldo.value = conta.valor

}  


const edit = (e) => {
    let validate = validateValues({saldo: saldo.value, banco:banco.value})
    if(!validate){
        alert('Todos os campos precisam ser preenchidos!')
        return false;
    }

    const contas = JSON.parse(localStorage.getItem('bancos'))
    let updateBanco = {...contas.find(value => (value.id == idBanco)), descricao: banco.value, valor: saldo.value }

    let updateListBancos = contas.filter( value => (value.id != idBanco))

    banco.value = ''
    saldo.value = ''

    localStorage.removeItem("bancos")
    localStorage.setItem("bancos", JSON.stringify([...updateListBancos, updateBanco]))

    btnRemove.style.display = 'none';

    listAllBank()
}


const remove = () => {
    let result = confirm('Tem certeza que quer remover essa conta?');

    if(result){
        const bancos = JSON.parse(localStorage.getItem('bancos'));
        let updateBanco = bancos.filter( value => (value.id != idBanco));

        localStorage.removeItem('bancos')
        localStorage.setItem('bancos', JSON.stringify(updateBanco))
        
        listAllBank()
    }

    banco.value = ''
    saldo.value = ''
    btnRemove.style.display = 'none' 
}


btnSubmit.addEventListener('click', () => {    
    let result = btnSubmit.getAttribute('data')
    
    if(result){
        edit()
    } else {
        addBanco()
    }
    
    btnSubmit.removeAttribute('data')

})


btnRemove.addEventListener('click', remove)



const listAllBank = () => {
    const divConta = document.querySelector('.contas')
    divConta.innerHTML = ''
    btnSubmit.innerHTML = 'Adicionar'
    title.innerHTML = 'Adicionar Conta'
    btnRemove.style.display = 'none'

    const contas = JSON.parse(localStorage.getItem("bancos"))

    contas.map( value => {
        const div1 = document.createElement('div')
        div1.setAttribute('class', 'row align-items-center mb-4')
        div1.setAttribute('id', `${value.id}`)
    
        const div2 = document.createElement('div')
        div2.setAttribute('class', 'col-3 text-center')
        
        const div3 = document.createElement('div')
        div3.setAttribute('class', 'col-6 text-center')
        
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
        span1.setAttribute('class', 'green')
        span1.innerHTML = 'R$ '
        
        const span2 = document.createElement('span')
        span2.innerHTML = `${parseFloat(+value.valor).toFixed(2)}`
        
        div2.appendChild(img)
        div3.appendChild(h2)
        parag.appendChild(span1)
        parag.appendChild(span2)
        div4.appendChild(parag)
    
        div1.appendChild(div2)
        div1.appendChild(div3)
        div1.appendChild(div4)
    
        divConta.appendChild(div1)  
        
        div1.addEventListener('click', (e) => {
            btnSubmit.innerHTML = 'Editar'
            title.innerHTML = 'Editar Conta'
            btnSubmit.setAttribute('data', 'editar')
            btnRemove.style.display = 'flex'
            fillForm(e.currentTarget)

        })
        
    })

}
