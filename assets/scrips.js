const boton = document.getElementById('btn');
const apidata = document.getElementById('apidata');
const cambio = document.getElementById('cambio');
const resultado = document.getElementById('resultado');
const seleccion = document.getElementById('seleccion');
const pesosInput = document.getElementById('pesos');

const llamarApi = () => {
    const moneda = seleccion.value; 
    
    fetch(`https://mindicador.cl/api/${moneda}`)
        .then(responder => responder.json())
        .then(data => {
           
            const valor = data.serie[0].valor;
            const pesos = parseFloat(pesosInput.value);
            
            if (!isNaN(pesos)) { 

                const resultadoConversion = (pesos / valor).toFixed(2);
               cambio.innerText = `Precio ${moneda.toUpperCase()}: ${valor} CLP`;
                resultado.innerText = `Resultado: ${resultadoConversion} ${moneda.toUpperCase()}`;

            } else {
                resultado.innerText = 'Por favor, ingresa un valor válido en pesos chilenos.';
            }
        })
        .catch(e => console.error(new Error(e)));
}

boton.addEventListener('click', llamarApi);


function graficoLineal(){
   const ctx = document.getElementById('radar').getContext('2d');
   const line = new Chart (ctx,{
      type: 'line',
      data: {
         labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
         datasets: [{
            label: 'ventas',
            data: [12, 19, 15, 17, 17, 12, 2],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba (75, 192, 192, 0.2)',
            fill: true,
         }]
      },
      options: {
         responsive: true,
         scales : {
            y: {
               beginAtZero : true
            }
         }
      }
   });


}

graficoLineal();