const request = require('request')

const forecast =(lat, lon, callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=e49cc7e5996c72143d2a2889d2ac49f3&query=${lat},${lon}&historical_date%20=%202015-21-01`
    request({ url : url , json : true},( err, response )=>{
        if(err){
            callback('Unable to connect location service!')
        }else{
            // console.log(response.body)
            const detailsObj = {
                currTemperatur :response.body.current.temperature,
                feelsLike : response.body.current.feelslike,
                weatherIcon : response.body.current.weather_icons[0]
            }
            callback(JSON.stringify(detailsObj))
        }
    })

}

module.exports = forecast