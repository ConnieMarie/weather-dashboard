searchBtn = document.querySelector(".searchBtn");
var searchInputEl = document.querySelector("#cityname");
var searchedCities = [];
var uviSpan = document.getElementById("color-code");

//label buttons with previously searched cities from local storage
if (JSON.parse(localStorage.getItem("searchedCities"))) {
  searchedCities = JSON.parse(localStorage.getItem("searchedCities"));
}

//append buttons for previously searched cities to ul in html on load
for (let i = 0; i < searchedCities.length; i++) {
  var btn = document.createElement("button");
  btn.setAttribute("class", "btn searchBtn btn-secondary m-1");
  btn.innerHTML = searchedCities[i];
  $(".list-group").append(btn);
  btn.addEventListener("click", function () {
    searchInputEl.value = this.innerHTML;
  });
}

//search button onclick function
$(".searchBtn").on("click", function (event) {
  event.preventDefault();
  //prevent empty buttons
  if (searchInputEl.value === "") {
    alert("Please enter a city.");
    return;
  } else {
    //get current date
    var currentDate = moment().format("l");

    // set up forcast dates
    for (let i = 0; i <= 5; i++) {
      var date = moment().add(i, "days").format("l");
      $("#date" + i).text(date);
    }

    var searched = false;
    searchInputEl = document.querySelector("#cityname");
    //loop through local storage to prevent duplicate buttons
    for (let i = 0; i < searchedCities.length; i++) {
      if (searchInputEl.value == searchedCities[i]) searched = true;
    }

    if (!searched) {
      searchedCities.push(searchInputEl.value);
      localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
      var btn = document.createElement("button");
      btn.setAttribute("class", "btn btn-secondary searchBtn m-3");
      btn.innerHTML = searchInputEl.value;
      btn.addEventListener("click", function () {
        searchInputEl.value = btn.innerHTML;
      });
      $(".list-group").append(btn);
    }
  }

  //declare api variables
  var apiKey = "1328e320f0873474cb3629f61e585f13";
  var getUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    searchInputEl.value +
    "&appid=" +
    apiKey +
    "&units=imperial";

  //current weather fetch
  fetch(getUrl)
    .then((response) => response.json())
    .then((data) => {
      //display city, date, and current weather conditions
      $(".city-name").text(data.name + " " + $(".city-name").text());
      $("#icon0").attr(
        "src",
        "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
      );
      $("#temp0").text("Temp: " + data.main.temp + "\u00B0");
      $("#wind0").text("Wind: " + data.wind.speed + " " + "MPH");
      $("#hum0").text("Humidity: " + data.main.humidity + "%");

      // UV only fetch
      fetch(
        "https://api.openweathermap.org/data/2.5/uvi?lat=" +
          data.coord.lat +
          "&lon=" +
          data.coord.lon +
          "&appid=" +
          apiKey +
          "&units=imperial"
      )
        .then((response1) => response1.json())
        .then((data1) => {
          //display uv index
          var uvIndexValue = data1.value;

          var uvIndexValueEl = $("#color-code")
            .text(uvIndexValue)
            .css("background-color", uvColorCode(uvIndexValue));
          uvIndexEl.append(uvIndexValueEl);

          function uvColorCode(uvIndex) {
            var uvIndexValue = parseFloat(uvIndex);
            var colorCode = "";
            if (uvIndexValue <= 2) {
              colorcode = "#008000";
            } else if (uvIndexValue > 2 && uvIndexValue <= 5) {
              colorCode = "#FFFF00";
            } else if (uvIndexValue > 5 && uvIndexValue <= 7) {
              colorCode = "#FFA500";
            } else if (uvIndexValue > 7 && uvIndexValue <= 10) {
              colorCode = "#FF4500";
            } else if (uvIndexValue > 10) {
              colorCode = "#FF0000";
            }
            return colorCode;
          }
        });

      //forecast fetch
      fetch(
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
          data.coord.lat +
          "&lon=" +
          data.coord.lon +
          "&appid=" +
          apiKey +
          "&units=imperial"
      )
        .then((response2) => response2.json())
        .then((data2) => {
          console.log(data2);

          //display forecast weather conditions for five consecutive days
          $("#icon1").attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              data2.list[6].weather[0].icon +
              "@2x.png"
          );
          $("#temp1").text("Temp: " + data2.list[6].main.temp + "\u00B0");
          $("#wind1").text("Wind: " + data2.list[6].wind.speed + " " + "MPH");
          $("#hum1").text("Humidity: " + data2.list[6].main.humidity + "%");

          $("#icon2").attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              data2.list[15].weather[0].icon +
              "@2x.png"
          );
          $("#temp2").text("Temp: " + data2.list[15].main.temp + "\u00B0");
          $("#wind2").text("Wind: " + data2.list[15].wind.speed + " " + "MPH");
          $("#hum2").text("Humidity: " + data2.list[15].main.humidity + "%");

          $("#icon3").attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              data2.list[23].weather[0].icon +
              "@2x.png"
          );
          $("#temp3").text("Temp: " + data2.list[23].main.temp + "\u00B0");
          $("#wind3").text("Wind: " + data2.list[23].wind.speed + " " + "MPH");
          $("#hum3").text("Humidity: " + data2.list[23].main.humidity + "%");

          $("#icon4").attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              data2.list[31].weather[0].icon +
              "@2x.png"
          );
          $("#temp4").text("Temp: " + data2.list[31].main.temp + "\u00B0");
          $("#wind4").text("Wind: " + data2.list[31].wind.speed + " " + "MPH");
          $("#hum4").text("Humidity: " + data2.list[31].main.humidity + "%");

          $("#icon5").attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              data2.list[39].weather[0].icon +
              "@2x.png"
          );
          $("#temp5").text("Temp: " + data2.list[39].main.temp + "\u00B0");
          $("#wind5").text("Wind: " + data2.list[39].wind.speed + " " + "MPH");
          $("#hum5").text("Humidity: " + data2.list[39].main.humidity + "%");
        });
    });
});
