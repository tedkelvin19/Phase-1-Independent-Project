// fetch elements from the server
function getAllCars(){
    fetch('http://localhost:3000/cars')
    .then(response => response.json())
    .then(cars => cars.forEach(car => {
        renderCar(car)
    }))
}
getAllCars()
// DOM Render function
function renderCar(car){
    // build car container
    let card = document.createElement('div')
    card.className = "car"
    card.innerHTML = `
    <img src="${car.image}">
	<h1 class="title">${car.title}</h1>
	<p><span class="class">Year:</span> ${car.start_production}</p>
	<p>
	    <span class="class">Class:</span>
        ${car.class}
	</p>
    <p>
	    <span class="class">Price:</span>
        ${car.price}M
	</p>
    <button id="btn">Buy Car<button>
    `
    // Add the car to the DOM
    document.querySelector('.cars').appendChild(card)
}
// requst car function
let requestCar = false
document.addEventListener('DOMContentLoaded',()=> {
    const requestBtn = document.querySelector('#new-car-btn')
    const carFormComtainer = document.querySelector('.container')
    requestBtn.addEventListener('click', () => {
        // hide and show the form
        requestCar = !requestCar
        if(requestCar){
            carFormComtainer.style.display = "block"
        } else {
            carFormComtainer.style.display = "none"
        }
    })
})

// function to filter cars on keyup
function search (){
    const searchBox = document.getElementById('search-car').value.toUpperCase()
    const storeCar = document.getElementById('cars-list')
    const car = document.querySelectorAll('.car')
    const carName = storeCar.getElementsByTagName('h1')

    for(var i=0; i<carName.length; i++){
        let match = car[i].getElementsByTagName('h1')[0]

        if(match){
            let textValue = match.textContent || match.innerHTML

            if(textValue.toUpperCase().indexOf(searchBox)> -1){
                car[i].style.display = ""
            } else {
                car[i].style.display = "none"
            }
        }
    }
}