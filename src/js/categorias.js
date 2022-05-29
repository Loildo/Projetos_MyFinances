import {cat as allCategorias}  from './dados.js'
const inputCategoria = document.querySelector('#input-categoria');
const form = document.querySelector('#formCategoria');
const LE = document.querySelector('.ladoEsquerdo');
const bntSair = document.querySelector('.hover-sair')
const URL = 'http://localhost:3000/categorias'

window.onload = () =>{
    // console.log('onload-categorias');
    
    if(!localStorage.getItem('token')){
        window.location.href = 'index.html'
    }
    LE.innerHTML = ''
    
    listAllCategorys();
}


form.onsubmit = (e) =>{
    e.preventDefault();

    const categoria = JSON.stringify({id: Math.floor(Date.now() * Math.random()).toString(36) ,descricao: inputCategoria.value});

    inputCategoria.value = '';
    fetch(`${URL}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: categoria
    })
        then(res => res.json())
        then(() => {
            location.reload();
        })
}


function listAllCategorys () {
    LE.innerHTML = ''
    fetch(URL)
        .then(res => res.json())
        .then(categorias => 
    categorias.map( value => {
        const div1 = document.createElement('div')
        div1.setAttribute('class', 'row mb-4 justify-content-center align-items-center container-category')
        const div2 = document.createElement('div')
        div2.setAttribute('id', 'cat')
        const parag = document.createElement('p')
        parag.setAttribute('id', 'paragCategoria')
        parag.setAttribute('value', `${value.id}`)
        const span = document.createElement('span')
        span.setAttribute('value', `${value.id}`)
        span.innerHTML = 'x';
        span.style.marginLeft = '10px'
        span.style.color = '#dd0100'
        span.style.cursor = 'pointer'
        const txt = document.createTextNode(`${value.descricao}`)
        
        parag.appendChild(txt)
        div2.appendChild(parag)
        div1.appendChild(div2)
        div1.appendChild(span)
        LE.appendChild(div1)
        
        span.addEventListener('click' , (e) => {
            removeCategory(e.currentTarget)
        })
    }))

}

const removeCategory = (elem) =>{
    const id = elem.getAttribute('value');
    
    let result = confirm('Tem certeza que quer remover essa categoria?');
    
    if(result){
        fetch(`${URL}/${id}`,{
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(() => {
                location.reload();
            })
    }
    
}

bntSair.addEventListener('click', () => {
    localStorage.removeItem('token')
    window.location.href = 'index.html'
})