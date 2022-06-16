const bntSair = document.querySelector('.hover-sair')
const form = document.querySelector('#formRedefinir');
const nomeUsuario = document.querySelector('#nome-usuario')
const URL = 'http://localhost:3000/user';
let idConta = '';

window.onload = () => {
    console.log('window-redefinir');
    
    if(!localStorage.getItem('token')){
        window.location.href = 'index.html';
    }

    let me = JSON.parse(localStorage.getItem('me'))

    nomeUsuario.innerHTML = `${me.nome}`

}

const confirmPassword = (newPass, confPass) =>{
    if(newPass != confPass){
        return false;
    }
    return true;
}

const validateValues = (atualPass, newPass, confPass) => {
    if(!atualPass || !newPass || !confPass){
        return false;
    }
    return true;
}

const edit = async (e, atualPass, newPass) => {
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem('me'));

    const findUser = await fetch(`${URL}/${user.id}`)
        .then(res => res.json())

    if(!findUser){
        alert('Houve algum problema!');
        return false;
    }

    if(atualPass != findUser.senha){
        alert('A senha atual esta incorreta');
        return false;
    }

    const data = {...user, senha: newPass}
    
    const a = await fetch(`${URL}/${user.id}`,{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body:  JSON.stringify(data) 
    })
    .then( res => {
        res.json()
        if(res.status == 200){
            return true
        }
    })

    if(a){
        alert('Senha alterado com sucesso!');
    }
}

form.onsubmit = (e) => {
    e.preventDefault();

    let result = validateValues(form.atualPass.value, form.newPass.value, form.confPass.value);
    if(!result){
        alert('Os campos precisam ser preenchidos!');
        return false;
    }

    result = confirmPassword(form.newPass.value, form.confPass.value);
    if(!result){
        alert('As senhas são diferentes.');
        return false
    }

    edit(e, form.atualPass.value, form.newPass.value);
}

bntSair.addEventListener('click', () => {
    localStorage.removeItem('token')
    localStorage.removeItem('me')
    window.location.href = 'index.html'
})
