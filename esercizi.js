async function getDashboardData(city) {
    try{
        const baseUrl= 'http://localhost:5000'

        const [destinationRis,weatherRis,airportRis] = await Promise.all([
            fetch(`${baseUrl}/destinations?search=${city}`),
            fetch(`${baseUrl}/weathers?search=${city}`),
            fetch(`${baseUrl}/airports?search=${city}`)
        ])

        if (!destinationRis) {
            throw new Error(`Errore api /destinations`);
            
        }
        if (!weatherRis) {
            throw new Error(`Errore api /weathers`);
            
        }
        if (!airportRis) {
            throw new Error(`Errore api /airports`);
            
        }

        const [destinationData,weatherData,airportData] =await Promise.all([
            destinationRis.json(),
            weatherRis.json(),
            airportRis.json()
        ])
        
        const destination = destinationData[0];
        const weather = weatherData[0];
        const airport = airportData[0];


        const result = {
            city: destination.name,
            country: destination.country,
            temperature: weather.temperature,
            weather: weather.weather_description,
            airport: airport.name
        };
        
    }
}