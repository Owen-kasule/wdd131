document.addEventListener('DOMContentLoaded', () => {
    // Update current year and last modified date
    document.getElementById('currentyear').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;

    // WeatherAPI key and endpoint for Kampala, Uganda
    const apiKey = '9dfb5278a16149a489a143449241111';
    const city = 'Kampala';
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    // Fetch weather data
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const temperature = data.current.temp_c;
            const conditions = data.current.condition.text;
            const windSpeed = data.current.wind_kph;

            // Display temperature, conditions, and wind speed
            document.getElementById('temp').textContent = `${temperature}°C`;
            document.getElementById('conditions').textContent = conditions;
            document.getElementById('wind-speed').textContent = `${windSpeed} km/h`;

            // Calculate and display wind chill
            const windChill = calculateWindChill(temperature, windSpeed);
            document.getElementById('wind-chill').textContent = windChill;
        })
        .catch(error => console.error('Error fetching weather data:', error));

    // Wind chill calculation
    function calculateWindChill(temp, speed) {
        // Convert wind speed from km/h to m/s for accurate calculation
        const speedInMps = speed / 3.6;
        if (temp <= 10 && speedInMps > 1.34) { // Equivalent to 4.8 km/h
            return (13.12 + 0.6215 * temp - 11.37 * Math.pow(speedInMps, 0.16) + 0.3965 * temp * Math.pow(speedInMps, 0.16)).toFixed(1) + '°C';
        } else {
            return 'N/A';
        }
    }
});
