function myWeather(cityName) {
    console.log('myWeather has fired');
    var searchCity;
    if (cityName != undefined) {
        console.log('cityname not undefined')
        searchCity = cityName;
    } else {
        console.log('cityname from input')
        searchCity = document.querySelector("#searchCity").value; 
        saveCity (searchCity)
    }


    // Display current Date
    var currentDate = moment().format("dddd, MMMM Do YYYY");
    var displayDate = document.querySelector(".city-date");
    displayDate.textContent = currentDate;
    

     // Five Day forcast for city with date and weather icon showing coditions, temp and humidity
        
      
        var fiveDayUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + searchCity + '&appid=ceb254cf1b7a1d7b09e3ec4d653200a4&units=imperial';

        console.log(fiveDayUrl);
        var fiveDayForcast = fetch(fiveDayUrl)
        .then(function(response) {
        // request was successful
        return response.json();
        })
        .then(function(data) {
        console.log(data);
        console.log(data.list[0]);
        
        // Was shown how to use Template Literals to get/show 5-day weather, date and temp. Do not fully understand Template Literals, but see how they are very useful 
        
        for (let  i=0; i<5; i++) {
            var day = document.querySelector(["#day"+i]);
        day.innerHTML = `<img src="http://openweathermap.org/img/w/${data.list[i*8].weather[0].icon}.png" alt="weather icon"/>
        <h2>
            ${moment(data.list[i*8].dt_txt).format("MMM Do YYYY")}
        </h2>
        <h3>
            ${data.list[i*8].main.temp}&#8457
        </h3>`;
        }

        return data;
        })
        console.log(fiveDayForcast);

        // Fetch with API key

    var webUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchCity + '&units=imperial&appid=ceb254cf1b7a1d7b09e3ec4d653200a4';
    console.log(webUrl);
    var currentWeather = fetch(webUrl)
    .then(function(response) {
    return response.json();
      })

        .then(function(data) {
            console.log(data)

           // Elements: Temp Humidity Wind Speed & UV Index
           var reposContainer = document.querySelector("#repos-container");
           reposContainer.innerHTML = ""

           // Weather icons
           var iconEl = document.createElement('img')
           iconEl.setAttribute("src",  "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png")
           iconEl.setAttribute("alt", "weather icon")
           iconEl.setAttribute("id", "weatherIcon")
           reposContainer.appendChild(iconEl)
       

           var tempEl = document.createElement("p")
           tempEl.textContent = "Temperature: " + data.main.temp + " °F"
        //    `<span>${data.main.temp}&#8457</span>`
           
           reposContainer.appendChild(tempEl)

           var humidityEl = document.createElement("p")
           humidityEl.textContent = "Humidty: " + data.main.humidity + " %"
           reposContainer.appendChild(humidityEl)

           var windSpeedEl = document.createElement("p")
           windSpeedEl.textContent = "Windspeed: " + data.wind.speed + " MPH"
           reposContainer.appendChild(windSpeedEl) 

           cityUVindex(data.coord.lat, data.coord.lon)

           
                })

        function cityUVindex(lat, lon) {
            // CHANGE color of UV Index based on favorable, moderate or severe

            var UVindexUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=ceb254cf1b7a1d7b09e3ec4d653200a4";
            console.log(UVindexUrl);
            fetch(UVindexUrl)
            .then(function(response) {
            return response.json();

            })
            .then(function(data) {
                var UVindex = document.createElement("p")
                UVindex.textContent = data.value
                console.log(UVindex);

                var uvContainer = document.querySelector("#UV-container");
                uvContainer.innerHTML = "UV Index: "
                uvContainer.appendChild(UVindex)

                if ( data.value <= 2) {
                    document.getElementById("UV-container").style.backgroundColor = "green";
                  } else if (data.value >= 2.1) {
                    document.getElementById("UV-container").style.backgroundColor = "yellow";
                  } else if (data.value > 5.9) {
                    document.getElementById("UV-container").style.backgroundColor = "red";
                    
                  }

            })

            
        }

        // Save city searches to localStorage
        function saveCity(newCity) {
            if (newCity === "") {

            } else {
                var cityArray = JSON.parse(localStorage.getItem("saveCity")) || [] ;
                if ( cityArray.includes(newCity)) {
                    //do nothing
                } else {
                    //not in the array yet
                    cityArray.push (newCity)
                }
                localStorage.setItem("saveCity", JSON.stringify(cityArray));
            }

        }


    };

    function displayBtn() {
        var cityArray = JSON.parse(localStorage.getItem("saveCity")) || [] ;
        cityArray.forEach(element => {
            console.log(element)
            var btnEl = document.querySelector(".display-btn")
            var newBtn = document.createElement("button")
            newBtn.classList.add("btn", "btn-primary", "m-1")
            newBtn.textContent = element
            btnEl.appendChild(newBtn)
            

            newBtn.addEventListener("click", function() {
                console.log("the button was clicked")
                myWeather(element)
            });
        });


    }

    displayBtn()
    
