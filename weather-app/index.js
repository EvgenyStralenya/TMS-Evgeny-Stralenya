const form = document.querySelector('#form');
const input = document.querySelector('#input');
const tbody = document.querySelector('#tbody');

let collection = new Map();

function getWeather(city) {
	return fetch(`http://api.weatherstack.com/current?access_key=8cfa0fcd28443b057420b8588a76643d&query=${city}`)
		.then(response => response.json())
		.catch(error => console.log('Error: ', error))
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

form.onsubmit = function(event){
	event.preventDefault();
	getWeather(input.value).then(data => {
        const { 
            location: { name, country },
            current: { temperature }
        } = data;
        collection.set(name, [name, country, temperature]);
        renderTbody();
	})
}


