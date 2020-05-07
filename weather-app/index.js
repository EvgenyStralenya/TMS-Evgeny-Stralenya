const form = document.querySelector('#form');
const input = document.querySelector('#input');
const clearButton = document.querySelector('#clear');
const tbody = document.querySelector('#tbody');
const cityMap = document.querySelector('#map');

let map;
let collection = new Map();

function getWeather(city) {
    return fetch(`http://api.weatherstack.com/current?access_key=8cfa0fcd28443b057420b8588a76643d&query=${city}`)
        .then(response => response.json())
        .catch(error => console.log('Error: ', error))
}

function renderTbody(){
    tbody.innerHTML = '';
    collection.forEach(value => {
        const [city, country, temperature] = value
        const row = `<tr>
            <td>${city}</td>
            <td>${country}</td>
            <td>${temperature}</td>
            <td>${(temperature * 1.8 + 32).toFixed(2)}</td>
        </tr>`
        tbody.innerHTML += row;
    })
}

function renderMap(){
    collection.forEach(value => {
        const [,,, lat, lon] = value

        if(map){
            map.remove()
        }

        cityMap.style.display = 'block';

        let streets = L.tileLayer.Unwired({key: '150ac7e30c3cef', scheme: "streets"});
        map = L.map('map', {
            center: [lat, lon], 
            zoom: 11,
            scrollWheelZoom: false,
            layers: [streets] 
        });

        L.control.scale().addTo(map);

        L.control.layers({
            "Streets": streets
        }).addTo(map);
        L.marker([lat, lon]).addTo(map);
    })
}

clearButton.addEventListener('click', () => {
    tbody.innerHTML = '';
    collection.clear();
    cityMap.style.display = 'none';
})

form.onsubmit = function(event){
    event.preventDefault()
    getWeather(input.value).then(data => {
        const { 
            location: { name, country, lat, lon },
            current: { temperature }
        } = data
        collection.set(name, [name, country, temperature, lat, lon]);
        renderTbody();
        renderMap();
    })
}


