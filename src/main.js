const URL = 'http://localhost:3000/produtos';

fetch(URL)
    .then(res => res.json())
    .then(produtos => {
        console.log(produtos);
    })