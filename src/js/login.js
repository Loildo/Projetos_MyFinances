// import {user} from './user.js'
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const form = document.querySelector('#formLogin');
const btnSubmit = document.querySelector('#btnSubmit');

window.onload = () =>{
    console.log('login-load');
    let user = JSON.parse(localStorage.getItem('users'))
    if(!user)
        localStorage.setItem('users', JSON.stringify([{ nome: 'loildo', email: 'loildo@loildo.com', password: '123'},]))
    
}

form.onsubmit = (e) => {
    e.preventDefault()
    if( email.value.length == 0 || password.value.length == 0){
        alert('Os campos precisam ser preenchidos');
        return false;
    }
    
    let validate = validateUserLogin({email: email.value, password: password.value})
    
    if(validate.success){
        window.location.href = 'home.html'
    } else if (validate.error){
        alert('E-mail ou Senha inválidos')
    } else {
        newUser()
    }
        
};

const validateUserLogin = ({email, password}) => {
    const user = JSON.parse(localStorage.getItem('users'))
    let login = {};

    let validateEmail = user.find( elem => {
        return elem.email == email
    })

    if(!validateEmail){
        return login = {
            notFound: true
        }
    }

    let validatePassword = validateEmail.password == password ? true : false
    
    if(validatePassword){
        return login = {
            success: true
        };

    } else {
        return login = {
            error: true
        }
    }
}   

const newUser = () =>{
    let result = window.confirm('Você ainda não possui cadastro, quer se cadastrar?');
    
    if(result){
        window.location.href = 'cadastro.html';
    }

    email.value = '';
    password.value = '';
}