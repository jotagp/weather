const key = 'd1da72835b32086985ac85152224e16d';

// função para obter a localização atual do dispositivo
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        document.getElementById("location").innerHTML = "Geolocation is not supported by this browser.";
    }
}

// função para printar a posição atual do dispositivo
// com a longitude e latitude, da pra buscar o nome da cidade na api google maps
function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    document.getElementById("location").innerHTML = "Latitud: " + lat + "<br>Longitud: " + lon;
}

// funcão que envia os dados para o php fazer o curl
async function send() {

    // lendo os inputs
    const city = document.getElementById("city").value;
    const zip = document.getElementById("zip").value;
    let paramter = undefined;
    // console.log("\ncity: " + city);
    // console.log("\nzip: " + zip);
    
    // se foi informado o zip, preciso usar a api via cep para encontrar o nome da cidade
    if (zip && !city) {
        paramter = await searchCityByZip(zip);
    }
    else if (city && !zip) {
        paramter = city
    }
    else if (zip && city) {
        document.getElementById("result").innerHTML = "<br>🟡 Enter only one option";
    }
    else {
        document.getElementById("result").innerHTML = "<br>🔴 Enter a zip code or an city name, please";
    }

    getCurrentWwather(paramter)

}

async function searchCityByZip(zip) {

    let url = "https://viacep.com.br/ws/"+zip+"/json/"

    try {

        const response = await fetch(url);  // Aguarda a resposta da requisição
        if (!response.ok) {
            throw new Error("Erro ao buscar os dados");
        }

        const data = await response.json();  // Aguarda o retorno JSON da API
        return data?.localidade;  // Retorna a localidade

    }
    catch (error) {

        console.error(error);
        return "Erro ao carregar os dados.";

    }
}

async function getCurrentWwather(city) {

    const url = 'https://api.weatherstack.com/current?access_key=' + key + '&query=' + city;
    const options = {
        method: 'GET'
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        let text = '';
        text  = "<br>Location:" + result.location.name + "/" + result.location.region + " ("+ result.location.country + ")";
        text += "<br>Temperature:" + result.current.temperature + "°C";
        text += "<br>Humidity: " + result.current.humidity + "%";
        text += "<br>Feels like: " + result.current.feelslike + "°C";
        text += "<br>Cloud cover: " + result.current.cloudcover + "%";
        document.getElementById("result").innerHTML = text;
        let val = {
            'location': result.location.name + "/" + result.location.region + " ("+ result.location.country + ")",
            'temperature': result.current.temperature + "°C",
            'humidity': result.current.humidity + "%",
            'feelslike': result.current.feelslike + "°C",
            'cloudcover': result.current.cloudcover + "%"
        }
        let stored = JSON.parse(localStorage.getItem("weather"))
        if (!Array.isArray(stored)) {
            stored = [];
        }
        stored.push(val)
        localStorage.setItem("weather", JSON.stringify(stored))
        populateTable();

    } catch (error) {
        console.error(error);
        document.getElementById("result").innerHTML = "<br>🔴" + error;

    }
    
}

// Função para popular a tabela com dados do localStorage
function populateTable() {
    // Recupera os dados do localStorage (dados do clima)
    let storedData = JSON.parse(localStorage.getItem("weather"));

    // Verifica se há dados no localStorage
    if (storedData && Array.isArray(storedData)) {
        // Obtém o corpo da tabela (onde as linhas serão inseridas)
        const tbody = document.querySelector("#weatherTable tbody");

        // Limpa qualquer conteúdo anterior (se houver)
        tbody.innerHTML = "";

        // Para cada item no array storedData, cria uma nova linha na tabela
        storedData.forEach(item => {
            // Cria uma nova linha (<tr>)
            let row = document.createElement("tr");

            // Para cada propriedade em item, cria uma célula (<td>)
            Object.values(item).forEach(value => {
                let cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell); // Adiciona a célula à linha
            });

            // Adiciona a linha no corpo da tabela
            tbody.appendChild(row);
        });
    } else {
        console.log("Nenhum dado encontrado no localStorage.");
    }
}

// Chama a função para popular a tabela quando a página for carregada
document.addEventListener("DOMContentLoaded", populateTable);