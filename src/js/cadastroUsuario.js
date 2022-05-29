// import {user} from './user.js';
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassoword = document.querySelector('#confirmPassword');
const form = document.querySelector('#formLogin');
const btnSubmit = document.querySelector('#btnSubmit');
const URL = 'http://localhost:3000/user';
let user = '';

window.onload = () =>{
    // console.log('onload-Cadastro')
    fetch(URL)
        .then(res => res.json())
        .then(res => {
            user = res
        })
        // .then(res => console.log(user))

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

const addUser = async (newUser) => {  

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })  
        .then((resp) => resp.json())
        .then(function(data) {
            // console.log(data);
        })

}


form.onsubmit = (e) => {
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

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
    .then(res => alert('Cadastro realizado com sucesso.'))
        
}