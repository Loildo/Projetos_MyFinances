const bntSair = document.querySelector('.hover-sair')
import { bancos } from "./dados.js";
const URL = 'http://localhost:3000/contas';
let idConta = '';

window.onload = () => {
    if(!localStorage.getItem('token')){
        window.location.href = 'index.html'
    }

    listBank()
    listRegistry()
}

const listBank = () => {
    const divConta = document.querySelector('.contas')
    divConta.innerHTML = ''
    let saldoTotal = 0;
    fetch(URL)
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

                div3.addEventListener('click', (e) => {
                    edit(e.currentTarget);
                })
                
            })

            const saldoGeral = document.querySelector('#saldo-geral')
            // console.log(saldoGeral);
            saldoGeral.innerHTML = saldoTotal
            
        })

        

}

const listRegistry = () => {

}

bntSair.addEventListener('click', () => {
    localStorage.removeItem('token')
    window.location.href = 'index.html'
})