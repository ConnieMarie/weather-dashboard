//declare veriables

searchBtn = document.querySelector(".searchBtn");
var searchInputEl = document.querySelector("#cityname");
var searchedCities =  [];
if(JSON.parse(localStorage.getItem("searchedCities"))){
    searchedCities = JSON.parse(localStorage.getItem("searchedCities"))
}


for (let i = 0; i < searchedCities.length; i++) {
    var btn = document.createElement("button")
    btn.innerHTML = searchedCities[i]
    $(".list-group").append(btn)
    btn.addEventListener("click", function(){
      searchInputEl.value = this.innerHTML
    })
}
//current weather 
  $(".searchBtn").on("click", function(event) {
    event.preventDefault()

    //   get current date
var currentDate = moment().format("l");

// set up forcast dates
for (let i = 0; i <= 5; i++) {
    var date = moment().add(i, "days").format("l")
    $("#date" + i).text(date)
    
}
var searched = false
      searchInputEl = document.querySelector("#cityname");
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
    var apiKey = "1328e320f0873474cb3629f61e585f13"
    var getUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInputEl.value + "&appid=" + apiKey +"&units=imperial"

  fetch(getUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    $(".city-name").text( data.name + " " + $(".city-name").text())
                //  change http => https for deployed page
    $("#icon0").attr("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png" )
    
    $("#temp0").text("Temp: " + data.main.temp)
    $("#wind0").text("Wind: " + data.wind.speed)
    $("#hum0").text("Humidity: " + data.main.humidity)


    // UV only fetch
    fetch("https://api.openweathermap.org/data/2.5/uvi?lat="+data.coord.lat+"&lon="+data.coord.lon+"&appid="+apiKey + "&units=imperial")
    .then((response1) => response1.json())
    .then((data1) => {
      console.log(data1);
        $("#uv").text("UV Index: " + data1.value)
    })  

//  change http => https for deployed page
    fetch("https://api.openweathermap.org/data/2.5/forecast?lat="+data.coord.lat+"&lon="+data.coord.lon+"&appid="+apiKey + "&units=imperial")
    .then((response2) => response2.json())
    .then((data2) => {
      console.log(data2);
    
    $("#icon1").attr("src", "http://openweathermap.org/img/wn/" + data2.list[6].weather[0].icon + "@2x.png" )
        
      $("#temp1").text("Temp: " + data2.list[5].main.temp)
      $("#wind1").text("Wind: " + data2.list[5].wind.speed)
      $("#hum1").text("Humidity: " + data2.list[5].main.humidity)
    })  
});
  })



  
//search function
//$(".searchBtn").on("click", function() {
  //  fetch(getUrl).then(function(response){

    //    if (response.ok) {
      //      console.log(response);
        //    response.json()
    //}).then()
    //};


    // https:api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API