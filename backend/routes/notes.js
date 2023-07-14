const express = require('express');
const User = require('../models/User');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note')
const {body,validationResult} = require('express-validator');
const { createCheckSchema } = require('express-validator/src/middlewares/schema');

//Route 1:Get All the notes using :Get "/api/auth/getus" login required



router.get('/fetchallnotes',fetchuser, async (req,res)=>{
    try{
    const notes = await Note.find({user:req.user.id})
    res.json(notes)
    //res.json(obj)
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");

    }

});
//Route 2:add a new Note using Post "/api/auth/addnote" ,addnote
router.post('/addnote',fetchuser,[
    body('title','Enter a valid title').isLength({min:3}),
    body('description','Descritpion must be atleast 5 character').isLength({min:3})
],async (req,res)=>{
    try {
        const{title,description,tag}=req.body;
        //if there ar errors,return bad request and the errors
        const errors = validationResult(req);
        if(!errors.isEmpty()){
                return res.status(400).json({errors:errors.array()})
        }
        const note = new Note({
            title,description,tag,user:req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
        
    }
})
//update title description and tag in the route of api/notes/updatenotes
router.put('/updatenotes/:id',fetchuser,async (req,res)=>{
const {title,description,tag}=req.body;
    newnotes={}
    if(title){newnotes.title=title}
    if(description){newnotes.description=description}
    if(tag){newnotes.tag=tag}

    //find the note to be updated and update it .
    let note = Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not found")}
    if(note.user !== req.user.id.parseInt){
        return res.status(401).send("Not Alowed");
    }
    note = await Note.findByIdAndUpdate(req.params.id,{$set:newnotes},{new:true})
    res.json({note});



})
//delete notes fro m the database
router.put('/deletenotes/:id',fetchuser,async (req,res)=>{
    const {title,description,tag}=req.body;
        newnotes={}
        if(title){newnotes.title=title}
        if(description){newnotes.description=description}
        if(tag){newnotes.tag=tag}
    
        //find the note to be updated and update it .
        let note = Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not found")}
        if(note.user !== req.user.id.parseInt){
            return res.status(401).send("Not Alowed");
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Success":"delete note successfully"});
    
    
    
    })
module.exports = router