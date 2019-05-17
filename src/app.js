
const path = require('path')
const express = require('express')
const forecast = require('./Utils/forecast')
const hbs = require('hbs')

const app = express()

//Define paths for express config
const PublicDirectory = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Set up static directory to serve
app.use(express.static(PublicDirectory))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Vignesh'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About',
        name: 'Vignesh'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        name: 'Vignesh'
    })
})

app.get('/weather',(req,res) => {

    if(!req.query.search){
        return res.send({
            error:"Please provide the location"
        })
    }

    forecast(req.query.search,(error,{outdata,place} = {}) => {
        if(error){
            res.send({
                error: error
            })
        }else{
            res.send({
                info: outdata,
                location: place
            })
        }        
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        error: 'Help document not found',
        name: 'Vignesh'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        error: '404 page not found',
        name: 'Vignesh'
    })
})

app.listen(3000,() => {
    console.log('Server is up on port 3000 :)')
})