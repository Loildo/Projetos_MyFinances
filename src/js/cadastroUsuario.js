// import {user} from './user.js';
// import { insertCustomer } from './db.js'
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassoword = document.querySelector('#confirmPassword');
const form = document.querySelector('#formLogin');
const btnSubmit = document.querySelector('#btnSubmit');
// const URL = 'http://localhost:3000/user';
const URL = 'http://localhost:8080';
let user = '';

window.onload = async() =>{
    console.log('onload-Cadastro')
    await fetch(`${URL}/usuarios`)
        .then(res => res.json())
        .then(res => user = res)
        
}



// valida se os campos estão preenchidos
const validateValues = ({name,email,password,confirmPassoword}) =>{
    if(name.value.length == 0 || email.value.length == 0 || password.value.length == 0 || confirmPassoword.value.length == 0){
        return false;
    }

    return true;
}

// valida se as senhas são iguais
const validatePassword = ({password, confirmPassoword}) =>{
    if(password.value != confirmPassoword.value){
        return false;
    } 
    
    return true;
   
}

// valida se o email ja esta cadastrado
const validateEmail = ({email}) => {
    let findEmail = user.find( elem => {
        return elem.email == email.value;
    })

    return findEmail;
}

// const addUser = async (newUser) => {  

//     fetch(URL, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(newUser)
//     })  
//         .then((resp) => resp.json())
//         .then(function(data) {
//             // console.log(data);
//         })

// }


form.onsubmit = async (e) => {
    e.preventDefault();

    let handleValues = validateValues({name,email,password,confirmPassoword})

    if(!handleValues){
        alert('Todos os campos precisam ser preenchidos!');
        return;
    }

    let validatePass = validatePassword({password, confirmPassoword});

    if(!validatePass){
        alert('As senhas são diferentes!');
        return;
    }

    let finEmail = validateEmail({email})
    if(finEmail){
        alert('Email já cadastrado!')
        return;
    }
   
    let newUser = {
        nome: name.value, 
        email: email.value, 
        senha: password.value
    }

    fetch (`${URL}/novo_usuario`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
        .then(resp => {
            if(resp.ok){
                return resp.json()
            } 
            throw new Error();
        })
        .then(resp => {
            alert('Cadastro realizado com sucesso!');
            window.location.href = 'index.html'
        })
        .catch( err => {
            alert('Erro ao cadastrar usuário, tente novamente')
        })

        
}