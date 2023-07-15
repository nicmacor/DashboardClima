let plot = (data) => {

    const ctx = document.getElementById('myCha');

    const dataset = {
        labels: data.daily.time, /* ETIQUETA DE DATOS */
        datasets: [{
            label: 'Temperatura diaria', /* ETIQUETA DEL GRÁFICO */
            data: data.daily.temperature_2m_max, /* ARREGLO DE DATOS */
            fill: false,
            borderColor: 'rgb(75, 57, 192)',
            tension: 0.1  
           
        }]
      };
      
      const config = {
          type: 'bar',
          data: dataset,
      };
    
    const chart = new Chart(ctx, config)
}

let plut = (data) => {

    const ctx = document.getElementById('myChar');

    const dataset = {
        labels: data.daily.time, /* ETIQUETA DE DATOS */
        datasets: [{
            label: 'UV Index Diario', /* ETIQUETA DEL GRÁFICO */
            data: data.daily.uv_index_max, /* ARREGLO DE DATOS */
            fill: false,
            borderColor: 'rgb(75, 57, 192)',
            tension: 0.1  
           
        }]
      };
      
      const config = {
          type: 'line',
          data: dataset,
      };
    
    const chart = new Chart(ctx, config)
}

let load = (data) => {
    let timezone=data["timezone"]
    let timezoneHTML=document.getElementById("timezone")
    timezoneHTML.textContent=timezone;
    plot(data);
    plut(data);
}

let loadInocar = () => {
    let URL_proxy= "https://cors-anywhere.herokuapp.com/"
    let URL = URL_proxy +'https://www.inocar.mil.ec/mareas/consultan.php';

    fetch(URL)
        .then(response => response.text())
        .then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "text/html");

        let contenedorMareas = xml.getElementsByTagName('div')[0];

        let contenedorHTML = document.getElementById('table-container');
        //console.log(xml);
        
        contenedorHTML.innerHTML=contenedorMareas.innerHTML;
  })
  .catch(console.error);

}


(
    function () {

        let meteo1 = localStorage.getItem('meteo');
        if (meteo1==null){
        let URL = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,precipitation_probability&daily=temperature_2m_max,sunrise,uv_index_max&timezone=auto';
        fetch( URL )
            .then(response => response.json())
            .then(data => {
                load(data);
                /* GUARDAR DATA EN MEMORIA*/
                localStorage.setItem("meteo1", JSON.stringify(data))
            })
            .catch(console.error);
        }else{
            /* CARGAR DATA EN MEMORIA*/
            load(JSON.parse(meteo1))
        }

        loadInocar();
    }
)();