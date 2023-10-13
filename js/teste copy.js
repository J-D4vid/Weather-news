//captura do DOM
const thermal_sensation = document.querySelector('#data-sens-termica')
const temperature = document.querySelector('#data-temp')
const humidity = document.querySelector('#data-umidade')
const wind_speed = document.querySelector('#data-vel-vento')
const button_search = document.querySelector('#button_search')
const city_input = document.querySelector('#search_filter')
const flag_img = document.querySelector('#flag_img')
const condition_img = document.querySelector('#condition_img')
const imgs = document.querySelector("#visual")
const body = document.querySelector("#body")
const world = document.querySelector("#world")
const label = document.querySelector('.temp')
const país = document.querySelector('#p-name')
const estado = document.querySelector('#e-name')

//criação do DOM


//funções
const country_flags_path = 'countrys.json'
const api_key = 'ead1a2bfa75047ac824184305231110'
const api_country = 'https://flagsapi.com/BE/shiny/'
const getWeatherData = async (city) => {
    const apiWeather = await fetch(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}&aqi=yes`)
    .then(response => response.json())
    .catch(e => console.log(e))
    return apiWeather
    
}


const showWeatherData = async(city) => {
    const data = await getWeatherData(city)
    const condition = data.current.condition.text.toLowerCase()

    label.textContent = `Temperatura em ${data.location.name.charAt(0).toUpperCase() + data.location.name.slice(1).toLowerCase()}`
    estado.textContent = data.location.region
    país.textContent = data.location.country
    thermal_sensation.textContent = data.current.feelslike_c + `°C` + `/  ${data.current.feelslike_f}°F`
    wind_speed.textContent = data.current.wind_kph + `km/h` 
    temperature.textContent = data.current.temp_c + `°C` + `/   ${data.current.temp_f}°F`
    humidity.textContent = data.current.humidity + `%`
    showFlags(data.location.country)


    if (condition.includes('rain')) {
        condition_img.src = "./assets/cloudy(1).png"
        console.log('Clima de chuva')
    }    

    else if (condition.includes('sunny')) {
        condition_img.src = "./assets/cloudy.png"
        console.log('Clima ensolarado')
    }

    else if (condition.includes('cloudy') || condition === 'overcast') {
        condition_img.src = "./assets/cloud.png"
        console.log('Clima nublado')
    }
    
    else if (condition.includes('snowy')) {
        condition_img.src = "./assets/temperature.png"
        console.log('Clima Nevado')
    }

    else if(condition.includes('clear')) {
        condition_img.src = "./assets/clear.png"
        console.log('Clima limpo')
    }
    console.log(data)
    

    
}

const showFlags = async(country) => {
    try {
        const country_data = await fetch('assets/json/dados.json')
        if (!country_data.ok) {
            throw new Error('Erro ao carregar o arquivo JSON');
          }
        const flag_data = await country_data.json()
        const find_country = flag_data.find(state => state.nome_pais_int === country)
        flag_img.setAttribute('src', `https://flagsapi.com/${find_country.sigla}/shiny/64.png`)

    }
    catch(e) {
        console.log(`Error: ${e}`)
    }
    
}

//eventos

button_search.addEventListener('click', function(e) {
    e.preventDefault()
    const city = city_input.value
    showWeatherData(city)
    body.style = "display:flex; position:absolute; top:10%; left:25%; transition:10s;"
    imgs.style = "display:flex;"
    world.classList.add("vanish")
    body.classList.add("show")
    city_input.value = ""
}

)

// theme definition
const bt = document.querySelectorAll(".theme")
const stl = document.getElementById('theme-select')


function setThemePreference(theme){
    localStorage.setItem('themePreference', theme)
}

function getThemePreference(theme){
    return localStorage.getItem('themePreference')
}

document.addEventListener('DOMContentLoaded', function(){
    const themePreference = getThemePreference()
    if(themePreference == "theme"){
        stl.href = './css/theme.css'
    }else{
            stl.href = './css/style.css'
        }
        
})

bt[0].addEventListener('click', ()=>{ 
        stl.href = "./css/style.css"
        setThemePreference('light')
})
bt[1].addEventListener('click', ()=>{
    stl.href = "./css/theme.css"
    setThemePreference('theme')
})

