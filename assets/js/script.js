//declare veriables
searchedCities = [];
searchInputEl = document.querySelector("#cityName");
searchBtn = document.querySelector(".searchBtn");

//current weather 
var apiKey = "1328e320f0873474cb3629f61e585f13"
var getUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInputEl + "&appid=" + apiKey

//search function
$(".searchBtn").on("click", function() {
    if (searchInputEl === "") {
        alert("Please enter a city.")
    } else {
        fetch(getUrl)
        .then(function(response) {
    if (response.ok) {
        console.log(response);
        response.json()
    };
});
    }
});



