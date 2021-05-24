const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const taskRouter = require('./routes/task');
const listRouter = require('./routes/list');

require('dotenv').config();

const app = express()
app.use(cors());
app.use(express.json({extended: false}));


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', ()=> {
    console.log("MongoDB database connection establised successfully");
})

app.use('/tasks', taskRouter);
app.use('/lists', listRouter);
const PORT = process.env.PORT || 5001;
app.listen(PORT,()=> {
    console.log(`Server running on port: ${PORT}`)
})

