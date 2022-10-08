const request = require('request')

const geocode =( address, callback)=>{
    const url = `http://api.positionstack.com/v1/forward?access_key=14f39ac84c0d5a8b5474670c331e91b9&query=${address}`

    request({ url: url, json: true},(err, response )=>{
        if(err){
            callback('Unable to connect location service!')
        }else{
            // console.log(response.body.data[0])
           callback(undefined, {
            latitude : response.body.data[0].latitude,
            longitude : response.body.data[0].longitude,
            location : response.body.data[0].label
           })
        }
    })
}

// geocode('INDIA',( err, data )=>{
//     console.log('Error',err)
//     console.log('Data',data)
// })

module.exports = geocode