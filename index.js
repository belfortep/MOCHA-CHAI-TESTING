const express = require('express');
const app = express();


app.use(express.json());

const test = ['hello', 'im', 'testing', 'this', 'endpoint'];

app.get('/', async (req,res)=>{
    
   
    try{

        return res.status(200).json(test)

    }catch(err){
        return res.status(500).json({message : err.message});
    }
})

app.get('/:id', async (req,res)=>{
   
    try{

        return res.status(200).json(test[req.params.id]);

    }catch(err){
        return res.status(500).json({message : err.message});
    }
})

app.post('/', async (req,res)=>{
   
    try{
        const {text} = req.body;
        if(!text){
            return res.status(500).json({message : err.message});
        }
        test.push(text);

        return res.status(201).json(test)

    }catch(err){
        return res.status(500).json({message : err.message});
    }
})

app.delete('/:id', async (req,res)=>{
  
    try{
        test.pop()

        return res.status(200).json(test)

    }catch(err){
        return res.status(500).json({message : err.message});
    }
})

app.put('/:id', async (req,res)=>{

    try{

        test[req.params.id] = req.body.text;

        return res.status(200).json(test)

    }catch(err){
        return res.status(500).json({message : err.message});
    }
})



app.listen(4000, ()=>{
    console.log('Server on port 4000');
})

module.exports = app;