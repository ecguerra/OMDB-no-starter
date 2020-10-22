require('dotenv').config()
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const axios = require('axios')
const fs = require('fs')
const omdbQuery = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=`

app.set('view engine','ejs')
app.use(ejsLayouts)

//body-parser middleware
app.use(express.urlencoded({extended: false}))

// HOME Route
app.get('/',(req,res)=>{
    res.render('index.ejs')
})

// Results Route
app.get('/results',(req,res)=>{
    let titleFilter = req.query.titleFilter
        axios.get(`${omdbQuery}${titleFilter}`)
        .then(response =>{
            // let movieTitle = response.data.Title // when it's t=
            res.render('results', {movies: response.data.Search})
            // res.send(response.data.Search[2].Title) // when it's s=
        })
        .catch(err => {
            console.log(err)
        })
    // res.render('results.ejs')
})

// Favorites Route
app.get('/favorites',(req,res)=>{
    res.render('favorites.ejs')
})

// Detail Route
app.get('/:idx', (req,res)=>{
    res.render('show.ejs')
})

app.use(express.static('public'))

app.listen(process.env.PORT, ()=>{
    console.log('Port 3000')
})