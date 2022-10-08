// console.log("This is Script.js")
const currTemp = document.querySelector('#currTemp')
const feelLike = document.querySelector('#feelLike')
const locationName = document.querySelector('#locationName')
const searchedlocation = document.querySelector('#searchedlocation')
const imgIcon = document.querySelector('#weather-icon')


const formInput = document.querySelector('.form-container')
const inputTxt = document.querySelector('.input-txt')


let apiData = {}



if (navigator.geolocation) {
    // navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction)
} 

// Get the latitude and the longitude;
function successFunction(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;

     console.log(lat,lng)
     const address = lat+","+lng
     fetch(`http://localhost:5000/weather?address=${address}`)
.then((resp)=>{
    resp.json().
    then((res)=>{
         console.log(res)
         apiData= res
         currTemp.innerHTML=apiData.temperature
         feelLike.innerHTML = apiData.feelsLike
         locationName.innerHTML= apiData.location
         searchedlocation.innerHTML = apiData.address
         
})
})
.catch((err)=>{
    console.log(err)
})



}

function errorFunction(){
    alert("Location Not Found Or Another Issue !!");
}


formInput.addEventListener('submit',(e)=>{
    e.preventDefault()
    const address =  inputTxt.value
    // const address = 'kolkata'

fetch(`http://localhost:5000/weather?address=${address}`)
.then((resp)=>{
    resp.json().
    then((res)=>{
         console.log(res)
         apiData= res
         currTemp.innerHTML=apiData.temperature
         feelLike.innerHTML = apiData.feelsLike
         locationName.innerHTML= apiData.location
         searchedlocation.innerHTML = apiData.address
         imgIcon.innerHTML=`<img class="weatherimg" src=${apiData.weatherIcon}></img>`
})
})
.catch((err)=>{
    console.log(err)
})
})

