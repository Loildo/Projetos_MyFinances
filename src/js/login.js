// import {user} from './user.js'
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const form = document.querySelector('#formLogin');
const btnSubmit = document.querySelector('#btnSubmit');
const URL = 'http://localhost:8080/usuarios';
const URL2 = 'http://localhost:3000/user';
let user = '';
let me = '';

window.onload = async() =>{
    // console.log('login-load');
    // await fetch(URL2)
    //     .then(res => res.json())
    //     .then(res => {
    //         user = res
    //     })
    await fetch(URL)
        .then(res => res.json())
        .then(res => user = res)
        // .then(res => console.log(user))

}   

form.onsubmit = async (e) => {
    e.preventDefault()
    // if( email.value.length == 0 || password.value.length == 0){
    //     alert('Os campos precisam ser preenchidos');
    //     return false;
    // }

    let validate = await validateUserLogin({email: email.value, password: password.value})
    
    if(validate.success){
        localStorage.setItem('token', Math.floor(Math.random() * Date.now()))
        localStorage.setItem('me', JSON.stringify(me))
        window.location.href = 'home.html'
    } else if (validate.error){
        alert('E-mail ou Senha inválidos')
    } else {
        newUser()
    }
        
};

const validateUserLogin = async ({email, password}) => {
    let login = {};

    let validateEmail = user.find( value => {
        me = {
            id: value.id,
            nome: value.nome,
            email: value.email
        }

        return value.email == email
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