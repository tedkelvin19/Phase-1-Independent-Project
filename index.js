
// fetch elements from the server
function getAllCars(){
    fetch('http://localhost:3000/cars')
    .then(response => response.json())
    .then(cars => cars.forEach(car => renderCar(car)))
}

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

    // buy cay
    card.querySelector('#btn').addEventListener('click', () => {
        card.remove()
        buyCar(car.id)
    })
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
// function to request a car
let form = document.querySelector('#request-car')
form.addEventListener('submit', requestNewCar)
function requestNewCar(e){
    e.preventDefault()
    let carobj= {
        image:e.target.image.value,
        title:e.target.name.value,
        start_production:e.target.year.value,
        class:e.target.class.value,
        price:e.target.price.value
    }
    renderCar(carobj)
    handlePostCar(carobj)
    
    // reset form
    form.reset() 
}
function handlePostCar(carobj){
    fetch('http://localhost:3000/cars', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(carobj)
    })
}

// buy car function 
function buyCar(id){
    fetch(`http://localhost:3000/cars/${id}`,{
        method: 'DELETE',
        headers:{
            'Content-Type':'application/json'
        }
    })
}
getAllCars()
// comments and rate section
const commentsList = document.querySelector("#comments-list")
function renderComments(){
    // grab form from html
let commentForm = document.querySelector("#comment-form") 
// add an event listener to add a new comment
commentForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    let newComment = document.getElementById('comment').value
    let li = document.createElement('li')
// create a delete button
    let btn  = document.createElement("button")
    btn.textContent = "X"
    li.textContent = `${newComment}  `
    li.appendChild(btn)
    commentsList.appendChild(li)
 // bonus: add an event to listen for click and call the callback   
    btn.addEventListener('click',removeComment)
})
}
/// function of removing one comment
function removeComment(e){
    e.target.parentNode.remove()
 }
 renderComments()