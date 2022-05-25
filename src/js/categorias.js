import {cat as allCategorias}  from './dados.js'
const inputCategoria = document.querySelector('#input-categoria');
const form = document.querySelector('#formCategoria');
const LE = document.querySelector('.ladoEsquerdo');

window.onload = () =>{

    console.log('onload-categorias');
    let cat = JSON.parse(localStorage.getItem("categorias"))
    
    if(!cat){
        localStorage.setItem("categorias", JSON.stringify(allCategorias))
    }
    LE.innerHTML = ''
    
    listAllCategorys();
}


form.onsubmit = (e) =>{
    e.preventDefault();
    if(!inputCategoria.value){
        return false;
    }
    
    
    let getAllCategorys = JSON.parse(localStorage.getItem("categorias"))

    const addNewCategory = getAllCategorys ? [...getAllCategorys, {id: Math.floor(Date.now() * Math.random()).toString(36) ,descricao: inputCategoria.value}] : [{id: Math.floor(Date.now() * Math.random()).toString(36) ,descricao: inputCategoria.value}]

    localStorage.setItem("categorias", JSON.stringify(addNewCategory))
    
    inputCategoria.value = ''
    listAllCategorys()

    
}


function listAllCategorys () {
    LE.innerHTML = ''
    const categorias = JSON.parse(localStorage.getItem("categorias"))
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
            console.log(e.target);
            removeCategory(e.target)
        })
    })

}

const removeCategory = (elem) =>{
    const element = elem.nodeName 
    let idCategory = ''

    console.log(elem.getAttribute('value'));
    switch (element) {
        case 'DIV':
            idCategory = elem.firstChild.getAttribute('value') 
            break;

        case 'P':
            idCategory = elem.getAttribute('value');
            break;
        
        default:
            break;
    } 

    idCategory = elem.getAttribute('value')
    const allCategorias = JSON.parse(localStorage.getItem("categorias"))
    

    let updateCategory = allCategorias.filter( value => {return value.id != idCategory}) 
    console.log(updateCategory);
    localStorage.removeItem("categorias")
    localStorage.setItem("categorias", JSON.stringify(updateCategory))
    listAllCategorys()
}
