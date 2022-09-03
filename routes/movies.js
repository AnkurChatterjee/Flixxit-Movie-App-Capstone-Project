const router = require('express').Router();
const Movie = require('../models/Movie');
const verify = require('../verifyToken')

//Create
router.post("/", verify, async (request,response) => {
    if(request.user?.isAdmin){
        const newMovie = new Movie(request.body);
        try{
            const savedMovie = await newMovie.save();
            response.json(savedMovie);
        } catch(err) {
            response.status(500).json(err);
        }
    } else {
        response.status(403).json({message: 'You are not authorised for this action'})
    }
})

//Update
router.put("/:id", verify, async (request,response) => {
    if(request.user?.isAdmin){
        try{
            const updatedMovie = await Movie.findByIdAndDelete(request.params.id, {$set: request.body}, {new: true});
            response.json(updatedMovie);
        } catch(err) {
            response.status(500).json(err);
        }
    } else {
        response.status(403).json({message: 'You are not authorised for this action'})
    }
})

//Delete
router.delete("/:id", verify, async (request,response) => {
    if(request.user?.isAdmin){
        try{
            await Movie.findByIdAndDelete(request.params.id);
            response.json({message: "Movie has been deleted"});
        } catch(err) {
            response.status(500).json(err);
        }
    } else {
        response.status(403).json({message: 'You are not authorised for this action'})
    }
})

//Get
router.get("/find/:id", verify, async (request,response) => {
    try{
        const movie = await Movie.findById(request.params.id);
        response.json(movie);
    } catch(err) {
        response.status(500).json(err);
    }
})

//Get All
router.get("/", verify, async (request,response) => {
    if(request.user?.isAdmin){
        try{
            const movies = await Movie.find();
            response.json(movies.reverse());
        } catch(err) {
            response.status(500).json(err);
        }
    } else {
        response.status(403).json({message: 'You are not authorised for this action'})
    }
})

//Get Random
router.get("/random", verify, async (request,response) => {
    const type = request.query.type;
    let movie;
    try{
        if(type === 'series'){
            movie = await Movie.aggregate([
                {$match: {isSeries: true}},
                {$sample: {size: 1}}
            ]);
        } else if(type === 'movie'){
            movie = await Movie.aggregate([
                {$match: {isSeries: false}},
                {$sample: {size: 1}}
            ])
        } else {
            movie = await Movie.aggregate([
                {$sample: {size: 1}}
            ]);
        }
        response.json(movie);
    } catch(err) {
        response.status(500).json(err);
    }
})

module.exports = router;