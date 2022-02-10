const container = document.querySelector(".container");
const inpPart = document.querySelector(".input-part");
const infoTxt = document.querySelector(".text-info")
const inputField = document.querySelector("input");
const btn = document.querySelector("button");
const Img = document.querySelector(".weather-part img");
const arrow = document.querySelector("header i")
const apiKey = "569c597b4b16b0d51095e3ba3c9dd42d";
let api;


inputField.addEventListener("keyup", e =>{
    if(e.key =="Enter" && inputField.value != "")
        requestApi(inputField.value)
})

btn.addEventListener("click", () => {
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(onSuccess , onError)
    }
    else{
        alert("Your Browser not Supported that");
    }
})
function onSuccess(position) {
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
    fetchData()
}
function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

function requestApi (city){
    const apiKey = "569c597b4b16b0d51095e3ba3c9dd42d";
     api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetchData()
}

function fetchData(){
    const apiKey = "569c597b4b16b0d51095e3ba3c9dd42d";
    infoTxt.innerText = "Getting Weather Details ...";
    infoTxt.classList.add("pending");
    fetch(api)
    .then(response => response.json())
    .then(result => weatherDetails(result))
}

function weatherDetails(info){
    
    if(info.cod == "404"){
        infoTxt.classList.replace("pending" , "err");
        infoTxt.innerText = `${inputField.value} is not a CITY`;
        
    }
    else{
        const city = info.name;
        const country = info.sys.country;
        const {description , id} = info.weather[0];
        const {feels_like , humidity , temp} = info.main;
        
        if(id == 800){
            Img.src = "clear.svg"
        }else if(id >= 200 && id <= 232){
            Img.src = "storm.svg"
        }else if(id >= 600 && id<= 622){
            Img.src = "snow.svg"
        }else if(id >= 701 && id<= 781){
            Img.src = "haze.svg"
        }else if(id >= 801 && id <= 804){
            Img.src = "cloud.svg"
        }else if(id >= 300 && id <= 321){
            Img.src = "rain"
        } 


        container.querySelector(".temp .numb").innerText = Math.floor(temp);
        container.querySelector(".weather").innerText = description;
        container.querySelector(".location span").innerText = `${city} ${country}`;
        container.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        container.querySelector(".humidity span").innerText = humidity+"%";



        infoTxt.classList.remove("pending" , "error");
        container.classList.add("active")
    }
}

arrow.addEventListener("click", () =>{
    container.classList.toggle("active");
    inputField.value= ""
})