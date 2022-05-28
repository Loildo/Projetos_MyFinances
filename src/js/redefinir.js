const bntSair = document.querySelector('.hover-sair')
window.onload = () => {
    if(!localStorage.getItem('token')){
        window.location.href = 'index.html'
    }
}


bntSair.addEventListener('click', () => {
    localStorage.removeItem('token')
    window.location.href = 'index.html'
})