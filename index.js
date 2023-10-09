// fetch elements from the server
function getAllCars(){
    fetch('http://localhost:3000/cars')
    .then(response => response.json())
    .then(cars => cars.forEach(car =>  renderCar(car)))
}
getAllCars()
// DOM Render function
function renderCar(car){
    // build car container
    let card = document.createElement('div')
    card.className = "car"
    card.innerHTML = `
    <img src="${car.image}">
	<p class="title">${car.title}</p>
	<p class="year">${car.start_production}</p>
	<p class="class">
	    <span>${car.class}</span>
	</p>
    `
    // Add the car to the DOM
    document.querySelector('.cars').appendChild(card)
}