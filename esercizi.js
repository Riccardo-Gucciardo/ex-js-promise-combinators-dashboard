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
    

        return result;
        
    }catch (error) {
        console.error('Errore durante il recupero dei dati della dashboard:', error.message);
        throw error;
    }
}


getDashboardData('london')
    .then(data => {
        console.log('Dasboard data:', data);
        console.log(
            `${data.city} is in ${data.country}.\n` +
            `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`+
            `The main airport is ${data.airport}.\n`
        );
    })
    .catch(error => console.error(error));