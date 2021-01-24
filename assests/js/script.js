function myWeather() {

    var searchCity = document.querySelector("#searchCity").value; 

        // Fetch with API key

    var webUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchCity + '&appid=ceb254cf1b7a1d7b09e3ec4d653200a4';
    console.log(webUrl);
    fetch(webUrl)
    .then(function(response) {
        // request was successful
    return response.json();
      })


    //   var displayRepos = document.querySelector("#displayRepos").value;
        .then(function(data) {
            console.log(data)
           // THIS IS WHERE THE MAGIC HAPPENS 
           // Elements: Temp Humidity Wind Speed & UV Index
           var tempEl = document.createElement("p")
           tempEl.textContent = data.main.temp
           var reposContainer = document.querySelector("#repos-container");
           reposContainer.appendChild(tempEl)

           var humidityEl = document.createElement("p")
           humidityEl.textContent = data.main.humidity
           var reposContainer = document.querySelector("#repos-container");
           reposContainer.appendChild(humidityEl)

           var windSpeedEl = document.createElement("p")
           windSpeedEl.textContent = data.wind.speed
           var reposContainer = document.querySelector("#repos-container");
           reposContainer.appendChild(windSpeedEl) 

           cityUVindex(data.coord.lat, data.coord.lon)

           // Weather icons
            var icon = document.createElement('img')
            icon.setAttribute("src",  "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png")
            //resize your img tag in your css
                })

        function cityUVindex(lat, lon) {
            // CHANGE color of UV Index based on favorable, moderate or severe
            // var cityUVindex = function(data)

            var UVindexUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=ceb254cf1b7a1d7b09e3ec4d653200a4";
            console.log(UVindexUrl);
            fetch(UVindexUrl)
            .then(function(response) {
            return response.json();

            })
            .then(function(data) {
                var UVindex = document.createElement("p")
                UVindex.textContent = data.value
                console.log(data);

                var uvContainer = document.querySelector("#UV-container");
                uvContainer.appendChild(UVindex)
            })
        }

        // Save city searches to localStorage
        function saveCity() {
            var saveCity = { City: "" };
            localStorage.setItem("saveCity", JSON.stringify(saveCity));

            var retrieveCity = localStorage.getItem("saveCity");
            console.log("retrieveCity", JSON.parse(retrieveCity))
        }

        // Five Day forcast for city with date and weather icon showing coditions, temp and humidity
        
        function fiveDayWeather() {
        var fiveDayUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + searchCity + '&appid=ceb254cf1b7a1d7b09e3ec4d653200a4';
        console.log(fiveDayUrl);
        fetch(fiveDayUrl)
        .then(function(response) {
        // request was successful
        return response.json();
        })
        .then(function(data) {
        console.log(data) 
        })

    }

    };
