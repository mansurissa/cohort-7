import express from "express";
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import todosModel from './schema.js'

dotenv.config()
mongoose.connect(process.env.MONGO_URL).then(console.log("Connected to the DB 🔥"))

const app = express()
const PORT = 4000

app.use(express.json())

// CREATE TODO
app.post('/createTodo',async(req, res) => {
    try {
        const result = await todosModel.create({
            title:req.body.title,
            priority:req.body.priority,
            time:Date.now()
        })
        res.status(201).json({
            message:"Todo item created successfully",
            data:result
        })
    } catch (error) {
        console.log(error)

    }

  })

//   GET ALL TODOS
app.get('/getAllTodos',async(req,res)=>{
    try {
        const todos =await todosModel.find({}).sort({ time: -1 })
        res.status(200).json({
            message:"Todo item fetched successfully",
            data:todos
        })
    } catch (error) {
        console.log(error)
    }
})

// GET ONE TODO
app.get('/getOneTodo/:id',async (req,res)=>{
    const id = req.params.id
    try {
        const todo =await todosModel.findById(id)
        res.status(200).json({
            message:"Todo item fetched successfully",
            data:todo
        })
    } catch (error) {
        console.log(error)
    }
})

const foodPrice={
   potatoes:400,
   beans:500
}

const foodPrice2 ={
    ...foodPrice,
    rice:900
}

// UPDATE
app.patch('/update/:id',async (req,res)=>{
    const id = req.params.id
    try {
        const todo =await todosModel.findByIdAndUpdate(id,{
            ...req.body
        })
        res.status(200).json({
            message:"Todo item update successfully",

        })
    } catch (error) {
        console.log(error)
    }
})

// DELETE
app.delete('/delete/:id',async (req,res)=>{
    const id = req.params.id
    try {
        const todo =await todosModel.findByIdAndDelete(id,{
            ...req.body
        })
        res.status(200).json({
            message:"Todo item deleted successfully",

        })
    } catch (error) {
        console.log(error)
    }
})


app.listen(PORT, () => {
    console.log(`Our app is listening on port ${PORT}`)
  })