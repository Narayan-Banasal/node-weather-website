const request = require('request')

const forecast = (latitude, longitude, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=92ebf0d86971dc3c6984806d492e1697&query=' + latitude + ',' + longitude;

    request({url, json : true}, (error, {body} = {}) => {
        if (error){
            callback('Unable to connect to server!', undefined);
        }
        else if (body.error){
            callback('Unable to provide the location. Search for the anoter location.', undefined);
        }
        else {
            const currentData = body.current;
            callback(undefined, {
                temperature: currentData.temperature,
                forecast: currentData.weather_descriptions[0],
            })
        }
    })
}

module.exports = forecast;



