// import {user} from './user.js'
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const form = document.querySelector('#formLogin');
const btnSubmit = document.querySelector('#btnSubmit');
const URL = 'http://localhost:3000/user';
let user = '';
let me = '';

window.onload = () =>{
    // console.log('login-load');
    fetch(URL)
        .then(res => res.json())
        .then(res => {
            user = res
        })
        // .then(res => console.log(user))
}   

form.onsubmit = (e) => {
    e.preventDefault()
    if( email.value.length == 0 || password.value.length == 0){
        alert('Os campos precisam ser preenchidos');
        return false;
    }

    let validate = validateUserLogin({email: email.value, password: password.value})
    
    if(validate.success){
        localStorage.setItem('token', Math.floor(Math.random() * Date.now()))
        console.log(me);
        debugger;
        localStorage.setItem('me', JSON.stringify(me))
        window.location.href = 'home.html'
    } else if (validate.error){
        alert('E-mail ou Senha inválidos')
    } else {
        newUser()
    }
        
};

const validateUserLogin = ({email, password}) => {
    let login = {};

    let validateEmail = user.find( elem => {
        console.log(elem);
        me = {
            id: elem.id,
            nome: elem.nome,
            email: elem.email
        }
        return elem.email == email
    })

    if(!validateEmail){
        return login = {
            notFound: true
        }
    }

    let validatePassword = validateEmail.senha == password ? true : false
    
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