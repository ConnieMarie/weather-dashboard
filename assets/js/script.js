
searchBtn = document.querySelector(".searchBtn");
var searchInputEl = document.querySelector("#cityname");
var searchedCities =  [];

//label buttons with previously searched cities from local storage
if(JSON.parse(localStorage.getItem("searchedCities"))){
    searchedCities = JSON.parse(localStorage.getItem("searchedCities"))
}

//append buttons for searched cities to ul in html
for (let i = 0; i < searchedCities.length; i++) {
    var btn = document.createElement("button")
    btn.innerHTML = searchedCities[i]
    $(".list-group").append(btn)
    btn.addEventListener("click", function(){
    searchInputEl.value = this.innerHTML
    })

}
//search button onclick function
  $(".searchBtn").on("click", function(event) {
    event.preventDefault()
    
    if (searchInputEl.value === "") {
        alert("Please enter a city.")
        return;
    } else {

    //get current date
var currentDate = moment().format("l");

// set up forcast dates
for (let i = 0; i <= 5; i++) {
    var date = moment().add(i, "days").format("l")
    $("#date" + i).text(date)
    
}
var searched = false
      searchInputEl = document.querySelector("#cityname");
      //loop through local storage/add buttons for searched cities without duplicates
      for (let i = 0; i < searchedCities.length; i++) {
        
        if (searchInputEl.value == searchedCities[i])
        searched = true
      } 
      if (!searched){
          searchedCities.push(searchInputEl.value)
          localStorage.setItem("searchedCities", JSON.stringify(searchedCities))
          var btn = document.createElement("button")
          btn.innerHTML = searchInputEl.value
          btn.addEventListener("click", function(){
            searchInputEl.value = btn.innerHTML
          })
          $(".list-group").append(btn)
      }
    }
    var apiKey = "1328e320f0873474cb3629f61e585f13"
    var getUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInputEl.value + "&appid=" + apiKey + "&units=imperial"

      //current weather fetch
  fetch(getUrl)
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    //display city, date, and current weather conditions
    $(".city-name").text( data.name + " " + $(".city-name").text())
                //  change http => https for deployed page
    $("#icon0").attr("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png" )
    $("#temp0").text("Temp: " + data.main.temp)
    $("#wind0").text("Wind: " + data.wind.speed)
    $("#hum0").text("Humidity: " + data.main.humidity)


    // UV only fetch
    fetch("https://api.openweathermap.org/data/2.5/uvi?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=" + apiKey + "&units=imperial")
    .then((response1) => response1.json())
    .then((data1) => {
    //   console.log(data1);
        $("#uv").text("UV Index: " + data1.value)
    })  

//  change http => https for deployed page
    //forecast fetch
    fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=" + apiKey + "&units=imperial")
    .then((response2) => response2.json())
    .then((data2) => {
    //   console.log(data2);
        //display forecast weather conditions for five consecutive days
      $("#icon1").attr("src", "http://openweathermap.org/img/wn/" + data2.list[6].weather[0].icon + "@2x.png" )  
      $("#temp1").text("Temp: " + data2.list[6].main.temp)
      $("#wind1").text("Wind: " + data2.list[6].wind.speed)
      $("#hum1").text("Humidity: " + data2.list[6].main.humidity)
      
      $("#icon2").attr("src", "http://openweathermap.org/img/wn/" + data2.list[15].weather[0].icon + "@2x.png" )  
      $("#temp2").text("Temp: " + data2.list[15].main.temp)
      $("#wind2").text("Wind: " + data2.list[15].wind.speed)
      $("#hum2").text("Humidity: " + data2.list[15].main.humidity)
      
      $("#icon3").attr("src", "http://openweathermap.org/img/wn/" + data2.list[23].weather[0].icon + "@2x.png" )  
      $("#temp3").text("Temp: " + data2.list[23].main.temp)
      $("#wind3").text("Wind: " + data2.list[23].wind.speed)
      $("#hum3").text("Humidity: " + data2.list[23].main.humidity)
    
      $("#icon4").attr("src", "http://openweathermap.org/img/wn/" + data2.list[31].weather[0].icon + "@2x.png" )  
      $("#temp4").text("Temp: " + data2.list[31].main.temp)
      $("#wind4").text("Wind: " + data2.list[31].wind.speed)
      $("#hum4").text("Humidity: " + data2.list[31].main.humidity)
      
      $("#icon5").attr("src", "http://openweathermap.org/img/wn/" + data2.list[39].weather[0].icon + "@2x.png" )  
      $("#temp5").text("Temp: " + data2.list[39].main.temp)
      $("#wind5").text("Wind: " + data2.list[39].wind.speed)
      $("#hum5").text("Humidity: " + data2.list[39].main.humidity)

      
    })  
});
  })