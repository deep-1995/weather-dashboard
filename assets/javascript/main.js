
// store the value of the input
let city = $("#searchTerm").val();
// store api key
const apiKey = "&appid=591274d14ce3cdcc04a587e24eb6542c";

let date = new Date();

$("#searchTerm").keypress(function (event) {

    if (event.keyCode === 13) {
        event.preventDefault();
        $("#searchBtn").click();
    }
});

$("#searchBtn").on("click", function () {

    $('#forecastH5').addClass('show');

    // get the value of the input from user
    city = $("#searchTerm").val();

    // clear input box
    $("#searchTerm").val("");

    // full url to call api
    const queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

    $.ajax({
        url: queryUrl,
        method: "GET"
    })
        .then(function (response) {

            console.log(response)

            console.log(response.name)
            console.log(response.weather[0].icon)

            let tempF = (response.main.temp - 273.15) * 1.80 + 32;
            console.log(Math.floor(tempF))

            console.log(response.main.humidity)

            console.log(response.wind.speed)

            getCurrentConditions(response);
            getCurrentForecast(response);
            makeList();
            background(response);

        })
});
function background(response) {
    var condition = response.weather[0].icon
    switch (condition) {
        case "01d":
            $("body").css("background-image", "url('assets/image/clear.png')");
            break;
        case "01n":
            $("body").css("background-image", "url('assets/image/clearnight.png')");
            break;
        case "02d":
            $("body").css("background-image", "url('assets/image/fewcloud.png')");
            break;
        case "02n":
            $("body").css("background-image", "url('assets/image/fewcloudnight.png')");
            break;
        case "03d":
            $("body").css("background-image", "url('assets/image/scatteredclouds.png')");
            break;
        case "03n":
            $("body").css("background-image", "url('assets/image/scatteredcloudsnight.png')");
            break;
        case "04d":
            $("body").css("background-image", "url('assets/image/broken.png')");
            break;
        case "04n":
            $("body").css("background-image", "url('assets/image/brokennught.png')");
            break;
        case "09d":
            $("body").css("background-image", "url('assets/image/shower.png')");
            break;
        case "09n":
            $("body").css("background-image", "url('assets/image/showernight.png')");
            break;
        case "10d":
            $("body").css("background-image", "url('assets/image/shower.png')");
            break;
        case "10n":
            $("body").css("background-image", "url('assets/image/showernight.png')");
            break;
        case "11d":
            $("body").css("background-image", "url('assets/image/thunderstorm.png')");
            break;
        case "11n":
            $("body").css("background-image", "url('assets/image/thunderstormnight.png')");
            break;
        case "13d":
            $("body").css("background-image", "url('assets/image/snow.png')");
            break;
        case "13n":
            $("body").css("background-image", "url('assets/image/snownight.jpeg')");
            break;
        case "50d":
            $("body").css("background-image", "url('assets/image/mist.jpg')");
            break;
        case "50n":
            $("body").css("background-image", "url('assets/image/mist.jpeg')");
            break;




    }

};

function makeList() {
    let listItem = $("<li>").addClass("list-group-item").text(city);
    $(".list").append(listItem);
}

function getCurrentConditions(response) {

    // get the temperature and convert to fahrenheit 
    let tempF = (response.main.temp - 273.15) * 1.80 + 32;
    tempF = Math.floor(tempF);

    $('#currentCity').empty();

    // get and set the content 
    const card = $("<div>").addClass("card");
    const cardBody = $("<div>").addClass("card-body");
    const city = $("<h4>").addClass("card-title").text(response.name);
    const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
    const temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
    const humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
    const wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
    const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

    // add to page
    city.append(cityDate, image)
    cardBody.append(city, temperature, humidity, wind);
    card.append(cardBody);
    $("#currentCity").append(card)

}

function getCurrentForecast() {

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey,
        method: "GET"
    }).then(function (response) {

        console.log(response)
        console.log(response.dt)
        $('#forecast').empty();

        // variable to hold response.list
        let results = response.list;
        console.log(results)

        //declare start date to check against
        // startDate = 20
        //have end date, endDate = startDate + 5

        for (let i = 0; i < results.length; i++) {

            let day = Number(results[i].dt_txt.split('-')[2].split(' ')[0]);
            let hour = results[i].dt_txt.split('-')[2].split(' ')[1];
            console.log(day);
            console.log(hour);

            if (results[i].dt_txt.indexOf("12:00:00") !== -1) {

                // get the temperature and convert to fahrenheit 
                let temp = (results[i].main.temp - 273.15) * 1.80 + 32;
                let tempF = Math.floor(temp);

                const card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
                const cardBody = $("<div>").addClass("card-body p-3 forecastBody")
                const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
                const temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF + " °F");
                const humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + results[i].main.humidity + "%");

                const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png")

                cardBody.append(cityDate, image, temperature, humidity);
                card.append(cardBody);
                $("#forecast").append(card);

            }
        }
    });

}