const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();

// Define paths for the express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location 
app.set('view engine', 'hbs');

app.set('views', viewPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title : 'Home',
        name : 'Noni',
        age: 20
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help',
        name : 'Noni',
        addressing : 'You can call to this .... number to get the help'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About',
        name : 'Noni'
    })
})

app.get('/weather', (req, res) => {
    const query = req.query;
    if (!query.address){
        return res.send({
            error: 'You must provide the search for the address where you want to find the weather'
        })
    }
    const place = query.address;
    geocode(place, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({
                error,
            })
        }
        else {
            forecast(latitude, longitude, (error, data) => {
                if (error){
                    return res.send({
                        error,
                    })
                }
                else {
                    res.send({
                        forecast: `It is ${data.forecast}`,
                        temperature: data.temperature,
                        location,
                    })
                }
            });
        }
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'Noni',
        title: '404 Error',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        name: 'Noni',
        title: '404 Error',
        errorMessage: 'Page not found'
    })
})

app.listen('3000', () => {
    console.log('The sever is up now');
})

