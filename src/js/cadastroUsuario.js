// import {user} from './user.js';
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassoword = document.querySelector('#confirmPassword');
const form = document.querySelector('#formLogin');
const btnSubmit = document.querySelector('#btnSubmit');

window.onload = () =>{
    let user = JSON.parse(localStorage.getItem('users'))
    if(!user)
        localStorage.setItem('users', JSON.stringify([{ nome: 'loildo', email: 'loildo@loildo.com', password: '123'},]))
    console.log('onload-Cadastro')

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
        password: password.value
    }

    let confirmAddUser = addUser(newUser);
    if (confirmAddUser) {
        alert('Cadastro realizado com sucesso!');
        setTimeout(() => {
            window.location.href = 'index.html';
        },2000);
        
    } else {
        alert('Erro ao cadastrar usuário, tente novamente.');
        name.value = '';
        email.value = '';
        password.value = '';
        confirmPassoword.value = '';
    }
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

const validateEmail = ({email}) => {
    let user = JSON.parse(localStorage.getItem('users'));
    let findEmail = user.find( elem => {
        return elem.email == email.value;
    })

    console.log(findEmail);
    return findEmail;
}

const addUser = (value) => { 

    let getAllUsers = JSON.parse(localStorage.getItem('users'));

    const addNewUser = getAllUsers ? [...getAllUsers, value] : [value];

    localStorage.setItem('users', JSON.stringify(addNewUser));

    let allUsers = JSON.parse(localStorage.getItem('users'));
    
    let confirm = allUsers.find( elem => {
        return elem.email == value.email && elem.password == value.password
    })

    return confirm;
}
