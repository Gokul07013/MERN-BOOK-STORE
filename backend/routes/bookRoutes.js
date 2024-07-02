import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

//save a book 
router.post('/', async (req,res) => {
    
    try {
        if(!req.body.title || !req.body.author || !req.body.publishedYear){
            return res.status(400).send('Provide required details : title , author , publishedYear')
        }
        
    const newBook = {
        title : req.body.title,
        author : req.body.author,
        publishedYear : req.body.publishedYear,
    }

    //actual creation process POST
    const book = await Book.create(newBook);

    return res.status(201).send({book});

    } 
    
    catch (error) {
        console.log(error.message);
        res.status(500).send({message : error.message});
    }


})

//to get all books
router.get('/', async(req,res) => {

    try {

      const booksCollection =  await Book.find(); 
      return res.status(200).json({count : booksCollection.length , data : booksCollection});  
    
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message : error.message});
    }
})

//to get a book by id
router.get('/:id', async(req,res) => {

    try {

      const {id} = req.params;
      const book =  await Book.findById(id); 
      return res.status(200).json({book});  
    
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message : error.message});
    }
})


router.put('/:id', async (req,res) => {
    
    try {

        if(!req.body.title || !req.body.author || !req.body.publishedYear){
            return res.status(400).send('Provide required details : title , author , publishedYear')
        }

        const {id} = req.params;
        const book =  await Book.findByIdAndUpdate(id,req.body); 

        if(!book){
            return res.status(404).json({ message : 'Book not found'}); 
        }
        return res.status(200).json({message : 'Modified successfully'});  
      
      } catch (error) {
          console.log(error.message);
          res.status(500).send({message : error.message});
      }
})

router.delete('/:id', async (req,res) => {
    
    try {

        const {id} = req.params;
        const book =  await Book.findByIdAndDelete(id); 

        if(!book){
            return res.status(404).json({ message : 'Book not found'}); 
        }
        return res.status(200).json({message : 'Deleted successfully'});  
      
      } catch (error) {
          console.log(error.message);
          res.status(500).send({message : error.message});
      }
})

export default router;