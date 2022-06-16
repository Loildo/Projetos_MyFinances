const bntSair = document.querySelector('.hover-sair')
const nomeUsuario = document.querySelector('#nome-usuario')

window.onload = () => {
    if(!localStorage.getItem('token')){
        window.location.href = 'index.html'
    }
    let me = JSON.parse(localStorage.getItem('me'))

    nomeUsuario.innerHTML = `${me.nome}`
}


bntSair.addEventListener('click', () => {
    localStorage.removeItem('token')
    localStorage.removeItem('me')
    window.location.href = 'index.html'
})