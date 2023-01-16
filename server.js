/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Aditya Rahman Student ID: 046207130 Date: Jan 15, 2023
*  Cyclic Link: https://eager-rose-sparrow.cyclic.app
*
********************************************************************************/ 

const HTTP_PORT = process.env.PORT || 8080;
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();
const app = express();

app.use(cors());
app.use(express.json());

//Initialize
db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
    app.listen(HTTP_PORT, ()=>{
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});

//GET /
app.get("/", (req, res) => {
    res.json({message: "API Listening"});
});

//POST /api/movies
app.post("/api/movies", (req, res) => {
    db.addNewMovie(req.body)
        .then(() => {res.status(201).json(data)})
        .catch((err) => {res.status(500).json({error: err})})

});

//GET /api/movies by page
app.get("/api/movies", (req, res) => {
    db.getAllMovies(req.query.page, req.query.perPage, req.query.title)
        .then((data) => {
            if(Date.length === 0){
                res.status(204).json({message: "No movies were found"});

            }
            else{
                res.status(201).json(data);

            }
        })
        .catch((err) => {res.status(500).json({error: err})})

});

//GET /api/movies/:_id
app.get("/api/movies/:_id", (req, res) => {
    db.getMovieById(req.params._id)
        .then((data) => {res.status(201).json(data)})
        .catch((err) => {res.status(500).json({error: err})})

});

//PUT /api/movies/:_id
app.put("/api/movies/:_id", (req, res) => {
    db.updateMovieById(req.body, req.params._id)
        .then(() => {res.status(201).json({message: "Movie updated successfully"})})
        .catch((err) => {res.status(500).json({error: err})})

});

//DELETE /api/movies
app.delete("/api/movies/:_id", (req, res) => {
    db.deleteMovieById(req.params._id)
        .then(() => {res.status(201).json({message: "Movie deleted successfully"})})
        .catch((err) => {res.status(500).json({error: err})})

});
