const btn = document.querySelector('#btn-hori-vert')
const segundoCanvas = document.querySelector('#segundo-canvas')
const primeiroCanvas = document.querySelector('#primeiro-canvas')
const button = document.createElement('input')
const nomeUsuario = document.querySelector('#nome-usuario')
// const URL = 'http://localhost:3000';
const URL = 'http://localhost:8080';
let transacoes = '';
let categorias = '';
let contas = '';
let dados = '';

 /* https://www.chartjs.org/docs/latest/general/data-structures.html */
window.onload = async () => {    
    segundoCanvas.style.display = 'none'
    let me = JSON.parse(localStorage.getItem('me'))

    nomeUsuario.innerHTML = `${me.nome}`


    transacoes = await fetch(`${URL}/transacoes/${me.id}`)
        .then(res => res.json());

    categorias = await fetch(`${URL}/categorias`)
        .then(res => res.json());
    
    contas = await fetch(`${URL}/conta`)
    .then(res => res.json());

    const data = {   
        transacoes,
        categorias,
        contas
    };

    dados = data;
    saldo(data);
    graficoVertical(data)
    graficoHorizontal(data)
    graficoVerticalContas(data)
    
}

button.setAttribute('class', 'btn btn-primary')
button.setAttribute('type', 'button')
button.setAttribute('value', 'horizontal')
btn.appendChild(button)

button.addEventListener('click', () => {

    if(button.value == 'horizontal'){
        button.removeAttribute('value')
        button.setAttribute('value', 'vertical')
        primeiroCanvas.style.display = 'none'
        segundoCanvas.style.display = 'block'
    } 

    else {
        button.removeAttribute('value')
        button.setAttribute('value', 'horizontal')
        primeiroCanvas.style.display = 'block'
        segundoCanvas.style.display = 'none'
        
    }

})

saldo = (data) => {
    let despesas = null;
    let receitas = null;

    data.transacoes.forEach(value => {
        switch (value.tipo) {
            case 1:
                despesas += +value.valor
                break;
            case 2:
                receitas += +value.valor
                break;
        }
    });

    const doughnut = {
        type: 'doughnut',
        data: {
            labels: [
                'Receitas',
                'Despesas',
            ],
            datasets: [{
                data: [receitas, despesas],
                backgroundColor: [
                    'rgb(54, 162, 235)',
                    '#ef1c1c',
                ],
                hoverOffset: 4
            }]
        }
    };

    const myDoughnut = new Chart(
        document.getElementById('doughnut'),
        doughnut
    );
}

graficoVertical = (dados) =>{
    let obj = null;
    let data = [];
    dados.categorias.map( value => {
        obj = {id: value.nome, valor: 0, id_categoria: value.id};

        dados.transacoes.forEach( desc => {
            obj = {...obj, valor: desc.categoria_id == value.id ? obj.valor + desc.valor : obj.valor + 0}
        });
        data.push(obj);
        obj = null;
    })

 
    const config = {
        type: 'bar',
        data: {
            datasets: [{
                label: 'Categorias',
                data: data,
                backgroundColor: ['rgba(153, 102, 255, 0.2)'],
                borderColor: ['rgb(153, 102, 255)'],
                borderWidth: 1,
                maxBarThickness: 50,
            }],
        },
        options: {
            parsing: {
                xAxisKey: 'id',
                yAxisKey: 'valor'
            },
            scales: {
                y: {
                    grace: '20%',
                }
            },
            plugins: {
                legend: {
                    display: false,
                    labels: {
                        // color: 'rgb(255, 99, 132)',
                        font:{
                            size: 20
                        }
                    }
                }
            }
        }
    };
    
    
    // grafico na horizontal

    const myChart = new Chart(
        document.getElementById('primeiro-canvas'),
        config  
    );

}

graficoHorizontal = (dados) =>{
    let obj = null;
    let data = [];
    dados.categorias.map( value => {
        obj = {id: value.nome, valor: 0};

        dados.transacoes.forEach( desc => {
            obj = {...obj, valor: desc.categoria_id == value.id ? obj.valor + desc.valor : obj.valor + 0}
        });

        data.push(obj);
        obj = null;
    })
    

    const config = {
        type: 'bar',
        data: {
            datasets: [{
                axis: 'y',
                label: 'Categorias',
                data: data,
                backgroundColor: ['rgba(153, 102, 255, 0.2)'],
                borderColor: ['rgb(153, 102, 255)'],
                borderWidth: 1,
                maxBarThickness: 50,

            }],
        },
        options: {
            indexAxis: 'y',
            parsing: {
                xAxisKey: 'valor',
                yAxisKey: 'id'
            },
            scales: {
                // y: {
                //     grace: '20%',
                // }
                x: {
                    stacked: true
                },
                y: {
                    stacked: true
                }
            }
        }
    };

    const myChart = new Chart(
        document.getElementById('segundo-canvas'),
        config  
    );

}

graficoVerticalContas = (dados) =>{
    let obj = null;
    let data = [];
    dados.contas.map( value => {
        obj = {id: value.nome, valor: 0};

        dados.transacoes.forEach( desc => {
            obj = {...obj, valor: desc.conta_id == value.id ? obj.valor + desc.valor : obj.valor + 0}
        });
        data.push(obj);
        obj = null;
    })

    const config = {
        type: 'bar',
        data: {
            datasets: [{
                data: data,
                backgroundColor: ['rgba(75, 192, 192, 0.2)'],
                borderColor: ['rgb(75, 192, 192)'],
                borderWidth: 1,
                maxBarThickness: 50,
            }],
        },
        options: {
            parsing: {
                xAxisKey: 'id',
                yAxisKey: 'valor'
            },
            scales: {
                y: {
                    grace: '20%',
                }
            },
            plugins: {
                legend: {
                    display: false,
                }
            }
        }
    };

    const myChart = new Chart(
        document.getElementById('contas-canvas'),
        config  
    );

}