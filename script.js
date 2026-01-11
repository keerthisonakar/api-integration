function getWeather() {
    let city = document.getElementById("city").value;

    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
        .then(response => response.json())
        .then(location => {
            if (!location.results) {
                document.getElementById("result").innerHTML = "City not found";
                return;
            }

            let lat = location.results[0].latitude;
            let lon = location.results[0].longitude;

            return fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
            );
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("result").innerHTML =
                "Temperature: " + data.current_weather.temperature + "°C";
        })
        .catch(() => {
            document.getElementById("result").innerHTML = "Error fetching data";
        });
}
