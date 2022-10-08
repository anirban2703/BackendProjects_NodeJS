const express = require('express')
const app = express()
const hbs = require('hbs')
const PORT = process.env.PORT || 5000

// console.log(__dirname)  ==> D:\BackendLearn\New folder\web-server\src
// console.log(__filename) ==> D:\BackendLearn\New folder\web-server\src\app.js

//Path Module

const path = require('path')

// console.log(__dirname)  ==> D:\BackendLearn\New folder\web-server\src
//console.log(path.join(__dirname,'../public')) ==>  D:\BackendLearn\New folder\web-server\public

//geoCode imports
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// Define for express Config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//SetUp Handle Bar Engine

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static Dir to serve

app.use(express.static(publicDirPath))



app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather Forecast',
        name :'Anirban Ghosh'
    })
})


app.get('/about',(req, res)=>{
    res.render('about',{
        title:'Weather Forecast',
        name :'Anirban Ghosh'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpMessage :'This is a help Message'
    })
})

//Query String Example

app.get('/products',(req, res)=>{
    
    if(!req.query.search){
          return res.send({
            error:'You must Provide Search'
          })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })

})

app.get('/weather',(req, res)=>{
    // let location, temperature,error;
    let dataObj ={
        location:null,
        temperature:null,
        error:null,
        feelsLike:null
    }

    if(!req.query.address){
        return res.send({
            error:'You must Provide Search'
          })
    }
    // if(req.query.address)

    if(containsLatLan(req.query.address)){
        const str  =  req.query.address
        // console.log(str)
        const strArr = str.split(',')
        // console.log(strArr)
        const lat = strArr[0]
        const lng = strArr[1]

        forecast(lat,lng,(resData)=>{
            const resdataObj = JSON.parse(resData)
            // dataObj.location= data.location
            
            dataObj = {...dataObj,
                temperature : resdataObj.currTemperatur,
                feelsLike :  resdataObj.feelsLike,
                address:req.query.address  
            }
            // console.log(dataObj)
            res.send(dataObj)       
        })
    }
    else{
    
    geocode(req.query.address, ( err, data )=>{
        // console.log(err)
        // console.log(data)
        dataObj.error = err
        // console.log(data.location)
   forecast(data.latitude,data.longitude,(resData)=>{
                const resdataObj = JSON.parse(resData)
                dataObj.location= data.location
                
                dataObj = {...dataObj,
                    error : err,
                    temperature : resdataObj.currTemperatur,
                    feelsLike :  resdataObj.feelsLike,
                    address:req.query.address,  
                    weatherIcon :resdataObj.weatherIcon,
                }
                // console.log(dataObj)
                res.send(dataObj)       
            })
    }) 
  }
  
    
})


function containsLatLan(str) {
    return /^[0-9,'.',',']+$/.test(str);
  }

//for 404 Error Page 

app.get('/help/*',(req, res )=>{ 
    res.render('404page',{
        helpErrMsg : 'Help Article Not Found'
    })
})

app.get('*',(req,res)=>{
   res.render('404page')
})




app.get('/json',(req, res)=>{
    res.send([{
     name: 'Anirban',
     age : 22
    },
    {
     name: 'Arnab',
     age : 16
    }])
 })



// Routing using Express js

// send a normal text as a res send

// app.get('/',(req, res)=>{
//     res.send("Hello Express!")
// })

//send a html file

// app.get('/about',(req,res)=>{
//     res.send('<h1>This is an About Page</h1>')
// })

// send json as a response










  // for starting The server and sending the port number

  app.listen(PORT,()=>{
    console.log(`Server id Running @ ${PORT}`)
  }) 

  