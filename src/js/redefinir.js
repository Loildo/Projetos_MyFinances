const bntSair = document.querySelector('.hover-sair')
const form = document.querySelector('#formRedefinir');
const nomeUsuario = document.querySelector('#nome-usuario')
const passAtual = document.querySelector('#atualPass')
const passNew = document.querySelector('#newPass')
const confiPass = document.querySelector('#confPass')

const URL = 'http://localhost:8080';
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

    const findUser = await fetch(`${URL}/usuarios/${user.id}`)
        .then(res => res.json())

    console.log(findUser[0]);

    if(!findUser){
        alert('Houve algum problema!');
        return false;
    }

    if(atualPass != findUser[0].senha){
        alert('A senha atual esta incorreta');
        passNew.value = '';
        confiPass.value = '';
        return false;
    }

    const data = { senha: newPass}
    
    const result = await fetch(`${URL}/redefinir/${user.id}`,{
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

    if(result){
        alert('Senha alterado com sucesso!');
        location.reload();
    }
}

form.onsubmit = (e) => {
    e.preventDefault()

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
