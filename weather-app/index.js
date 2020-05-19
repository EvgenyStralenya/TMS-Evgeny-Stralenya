    const form = document.querySelector('#form');
    const input = document.querySelector('#input');
    const clearButton = document.querySelector('#clear');
    const tbody = document.querySelector('#tbody');
    const cityMap = document.querySelector('#map');
    const myWeatherButton = document.querySelector('#myWeather');

    let map;
    let collection = new Map();
    let arrayCitiesBeforeSaving = [];

    function getWeather(cityInfo) {
        return fetch(`http://api.weatherstack.com/current?access_key=8cfa0fcd28443b057420b8588a76643d&query=${cityInfo}`)
            .then(response => response.json())
    }

    function renderTbody(){
        tbody.innerHTML = '';
        collection.forEach(value => {
            const [city, country, temperature] = value;
            const row = `<tr>
                <td>${city}</td>
                <td>${country}</td>
                <td>${temperature}</td>
                <td>${(temperature * 1.8 + 32).toFixed(2)}</td>
            </tr>`;
            tbody.innerHTML += row;
        })
    }

    function renderMap(data){
        const lat = data.location.lat;
        const lon = data.location.lon;

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
    }

    function renderInfo(cityData){
        getWeather(cityData).then(data => {
            const { 
                location: { name, country, lat, lon },
                current: { temperature }
            } = data;
            collection.set(name, [name, country, temperature, lat, lon]);
            renderTbody();
            renderMap(data);

            input.value = '';
            arrayCitiesBeforeSaving.push(`${lat},${lon}`);
        })
        .catch(error => console.log('Error: ', error))
    }

    clearButton.addEventListener('click', () => {
        tbody.innerHTML = '';
        collection.clear();
        cityMap.style.display = 'none';
        localStorage.removeItem('Cities');
        arrayCitiesBeforeSaving = null;
    })

    myWeatherButton.addEventListener('click', () => {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const coordinates = `${position.coords.latitude},${position.coords.longitude}`;

                renderInfo(coordinates);
            }
        );
    })

    form.onsubmit = function(event){
        event.preventDefault();
        renderInfo(input.value);
    }

    window.onbeforeunload = function() {
        localStorage.setItem('Cities', JSON.stringify(arrayCitiesBeforeSaving))
    };
    
    if (localStorage.getItem('Cities')){
        const arrayCitiesAfterSaving = JSON.parse(localStorage.getItem('Cities'));
        arrayCitiesAfterSaving.forEach(city => {
            renderInfo(city);
        })
    }