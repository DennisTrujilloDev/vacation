const env = require('dotenv').config()
const path = require('path')
const { log } = require('console')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://djt:d12345678@cluster0.8ydmb5x.mongodb.net/vacay?retryWrites=true&w=majority'
express.static('public')
let randomNum = Math.random()*10
const fetch = require('node-fetch')
const { read } = require('fs')

MongoClient.connect(connectionString, {
    useUnifiedTopology: true
}).catch(err => console.log(err))
.then(client=>{
    console.log("connected to DB");
    const db= client.db('vacay')
    const vacayCollection = db.collection('vacay')
    app.set('views', path.join(__dirname, 'public'))
    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(bodyParser.json())
    app.use(express.static('public'))
    app.listen(process.env.PORT || 3000, function(){
        console.log("listening on 3000");
    })
    app.get('/', function (req, res){
        vacayCollection.find().toArray()
        .then(data=>{
            res.render('index.ejs', {imgData: data})
        })
    })
    
    app.post('/grabImage', async function (req, res){
        try{
            let searchTerm = req.body.destination + " " + req.body.location
            const url = `https://api.unsplash.com/search/photos/?client_id=${process.env.accessKey}&query=${searchTerm}&limit=5`
            let response = await fetch(url)
            let responseText = await response.json()
            await vacayCollection.insert({
                dest: req.body.destination.trim(), 
                loc: req.body.location.trim(), 
                responseText
            })
            res.redirect('/')
        }catch(err){
            console.log(err);
        }
        })
    app.delete('/remove', async function (req, res){
            try{
                await vacayCollection.deleteOne(
                {dest: req.body.destinationName}, 
            )                
            res.redirect('/')
        }catch(err){
            console.log(err);
        }
    })
    app.put('/editText', async function (req, res){
        console.log("editText", req.body);
        try{
            const result = await vacayCollection.findOneAndUpdate( 
                {loc: req.body.oldLocationName}, 
                {
                    $set:{
                        loc: req.body.newLocationName, 
                        dest: req.body.newDestinationName,                     }
                }
            )
                console.log("RESULT:", result)
                res.redirect('/')
        }catch(err){
            console.log("err:", err);
        }
    })
        
    app.put('/newImage', async function (req, res){
        try{
            let searchTerm = req.body.newDestinationName + " " + req.body.newLocationName
            const url = `https://api.unsplash.com/search/photos/?client_id=${process.env.accessKey}&query=${searchTerm}&limit=5`
            let response = await fetch(url)
            let newResponseText = await response.json()
            await vacayCollection.findOneAndUpdate(
                {loc: req.body.newLocationName}, 
                {
                    $set:{
                        responseText: newResponseText
                    }
                } 
            )
            res.redirect('/')
        }catch(err){
            console.log(err);
        }

        
        })
})


