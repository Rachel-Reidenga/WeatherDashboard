function myWeather() {

    var searchCity = document.querySelector("#searchCity").value; {

        // Fetch with API key

    var webUrl = 'https://openweathermap.org/search?api_key=ceb254cf1b7a1d7b09e3ec4d653200a4' + searchCity;
    console.log(webUrl);
    fectch(webUrl)
        // .then(function(response) {
        //     return response.json();
        // })
        // .then(function(response) {
        //     console.log(response.data[0]);
        //     var responseContainer = document.querySelector("#response-container");
        //     responseContainer.innerHTML = "";
        //     var weatherImg = documnet.createElement("img");
        //     weatherImg.setAttribute("src", response.data[0].images.fixed_height.url);
        //     responseContainerEl.appendChild(weatherImg);
        // });

        // Return fetch with searched city weather

    };

        // transform response to JSON

        // parse out temp, humidity, wind speen and UV Index info

        // change color of UV Index based on favorable, moderate or severe

        // display 5-day forcast with date and weather icon showing coditions, temp and humidity

        // save city searches to localStorage

}