const currentDate = new Date();

const currentYear = currentDate.getFullYear();

function Car(name, model, year, color, maxSpeed, fuelCapacity = 60, fuelConsumption = 10){
	this.name = name;
	this.model = model;
	this.year = year;
	this.color = color;
	this.maxSpeed = maxSpeed;
	this.fuelCapacity = fuelCapacity;
	this.fuelConsumption = fuelConsumption;
}

Car.prototype.getFullName = function(){
	return `Your car: ${this.name} ${this.model}`;
}

Car.prototype.getAge = function(){
	return `Your car age: ${currentYear - this.year}`;
}

Car.prototype.changeColor = function(color){
	if ((typeof(color) === 'string') && (isNaN(color))) {
		if (color.toLowerCase() === this.color.toLowerCase()){
			return 'The car is already painted in this color';
		}

		this.color = color.toLowerCase();
		return `Color has been changed to ${this.color}`;
	}

	return 'Incorrect color value';
}

Car.prototype.calculateWay = function(kilometers, fuel){
	if ((fuel > this.fuelCapacity) || (fuel < 0) || (typeof(fuel) !== 'number')) {
		return 'Incorrect value fuel';
	}

	if ((kilometers < 0) || (typeof(kilometers) !== 'number'))  {
		return 'Incorrect value kilometers';
	}

	if (fuel < 10){
		console.log('Low level fuel, please refuel');
	}

	if ((fuel / kilometers) < (this.fuelConsumption / 100))	{
		const neededFuel = kilometers * (this.fuelConsumption / 100);
		let i = 0;
		while (neededFuel > fuel){
			i++;
			fuel += this.fuelCapacity;
		}
		console.log(`Not enough fuel to ride, need to refuel ${i} times`);
	}

	const travelTime = ((kilometers / this.maxSpeed) * 60).toFixed(3);

	const timeInHours = Math.floor(travelTime / 60);

	const timeInMinutes = Math.round(travelTime - timeInHours * 60);

	return `Travel time: ${timeInHours} hours and ${timeInMinutes} minutes`;
}

function extend(Child, Parent) {
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
}

function Nissan(name, model, year, color, maxSpeed, fuelCapacity = 60, fuelConsumption = 10, interiorColor){
	Car.apply(this, arguments);
	this.interiorColor = interiorColor;
}

extend(Nissan, Car);

Nissan.prototype.changeInteriorColor = function(color){

	if ((typeof(color) === 'string') && (isNaN(color))) {
		if (color.toLowerCase() === this.interiorColor.toLowerCase()){
			return 'Car interior is already painted in this color';
		}

		this.interiorColor = color;
		return `Interior color has been changed to ${this.interiorColor}`;
	}

	return 'Incorrect interior color value';
}

function Volvo(name, model, year, color, maxSpeed, fuelCapacity = 60, fuelConsumption = 10, safetyRating){
	Car.apply(this, arguments);

	this.safetyRating = safetyRating;
}

extend(Volvo, Car);

Volvo.prototype.getRating = function(highMark, lowMark){

	if ((highMark > 10) || (highMark < 1) || (typeof(highMark) !== 'number') || (this.safetyRating > highMark)) {
		return 'Incorrect value high mark';
	}

	if ((lowMark > 1) || (lowMark < 0) || (typeof(lowMark) !== 'number') || (this.safetyRating < lowMark))  {
		return 'Incorrect value low mark';
	}

	if (lowMark === highMark) {
		return 'Highest mark should not equal lower mark';
	}

	const averageRating = (highMark + lowMark) / 2;
	if (this.safetyRating > averageRating){
		return `The car has high safety`;
	} else if (this.safetyRating < averageRating){
		return `The car has low safety`;
	} else return `The car has medium safety`;
}

function BMW(name, model, year, color, maxSpeed, fuelCapacity = 60, fuelConsumption = 10, electricMotorSpeed){
	Car.apply(this, arguments);

	this.electricMotorSpeed = electricMotorSpeed;
}

extend(BMW, Car);

BMW.prototype.showMaxSpeedCar = function(){
	if (this.electricMotorSpeed >= this.maxSpeed){
		return `The highest speed in a car with an electric motor: ${this.electricMotorSpeed}`;
	} 
	return `The highest speed in a car with an internal combustion engine: ${this.maxSpeed}`;
}

const opel = new Car('Opel', 'Vectra C', 2007, 'gray', 115, 61, 10.5);
const nissan = new Nissan('Nissan', 'Skyline R34', 1999, 'blue', 125, 65, 12, 'black');
const volvo = new Volvo('Volvo', 's80', 2004, 'black', 110, 80, 11.5, 4.7);
const bmw = new BMW('BMW', '540i E60', 2003, 'black', 100, 72, 13.5, 145);

console.log(opel.getFullName());
console.log(opel.getAge());
console.log(opel.changeColor('gRey'));
console.log(opel.calculateWay(3000, 9));

console.log('');

console.log(nissan.getFullName());
console.log(nissan.getAge());
console.log(nissan.changeColor('gray'));
console.log(nissan.calculateWay(3000, 28));
console.log(nissan.changeInteriorColor('blue'));

console.log('');

console.log(volvo.getFullName());
console.log(volvo.getAge());
console.log(volvo.changeColor('black'));
console.log(volvo.calculateWay(3000, 75));
console.log(volvo.getRating(5, 1));

console.log('');

console.log(bmw.getFullName());
console.log(bmw.getAge());
console.log(bmw.changeColor('gray'));
console.log(bmw.calculateWay(3000, 62));
console.log(bmw.showMaxSpeedCar());
