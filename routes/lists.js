const router = require('express').Router();
const List = require('../models/List');
const verify = require('../verifyToken')

//Create
router.post("/", verify, async (request,response) => {
    if(request.user?.isAdmin){
        const newList = new List(request.body);
        try{
            const savedList = await newList.save();
            response.json(savedList);
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
            await List.findByIdAndDelete(request.params.id);
            response.json({message: "List is deleted"});
        } catch(err) {
            response.status(500).json(err);
        }
    } else {
        response.status(403).json({message: 'You are not authorised for this action'})
    }
})

//Get 10 random lists
router.get("/random", verify, async (request,response) => {
    const typeQuery = request.query.type;
    const genreQuery = request.query.genre;
    let list = [];
    try{
        if(typeQuery){
            if(genreQuery){
                list = await List.aggregate([
                    {$sample: {size: 10}},
                    {$match: {type: typeQuery, genre: genreQuery}}
                ])
            } else {
                list = await List.aggregate([
                    {$sample: {size: 10}},
                    {$match: {type: typeQuery}}
                ])
            }
        } else {
            list = await List.aggregate([
                {$sample: {size: 6}}
            ])
        }
        response.json(list);
    } catch(err) {
        response.status(500).json(err);
    }
})

//Get all lists
router.get("/", verify, async (request,response) => {
    let list = [];
    try{
        list = await List.find();
        response.json(list);
    } catch(err) {
        response.status(500).json(err);
    }
})

module.exports = router;