const express = require("express");
const cors = require("cors");
const logger = require('./libs/Logger');
const mongoose = require("mongoose");
const taskRouter = require("./routes/task");
const http = require('http');
const { Server } = require("socket.io");
let Task = require("./models/task.model");
const GroupTasksBy = require("./common/GroupTasks");

require("dotenv").config();

// Start API and socket.io server
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json({ extended: false }));

// Add Logging Middleware
app.use(require('./MiddleWare/LoggingMiddleWare'));

//Set routes
app.use("/api/tasks", taskRouter);

// 404 route handling
app.get('*', function(req, res, next) {
  let url = req.url;
  if (!url.includes('/socket.io')){
    res.status(404).json(`Route not found`)
  }
});

// Add Error handling Middleware
app.use(require('./MiddleWare/ErrorHandlingMiddleWare'));

const uri = process.env.ATLAS_URI;
if(!uri) {
  logger.error(`No MongoDB connection string supplied in env!`)
  process.exit(1)
}

mongoose.connect(uri, { 
  useNewUrlParser: true, 
  useCreateIndex: true, 
  useUnifiedTopology: true,
  useFindAndModify: false
});

const connection = mongoose.connection;

connection.once("open", () => {
  logger.info("MongoDB database connection established successfully");

  Task.watch().on('change',(change)=>{
    logger.info('Change detected: ', change.fullDocument)

    Task.find()
      .then(tasks => {
        io.emit('tasks', GroupTasksBy(tasks, 'collection_id'))
      })
      .catch(err => logger.error('Fetch all tasks error', err))
    
    //io.emit('tasks',change.fullDocument)
  })

  io.on('connection', (socket) => {
    logger.info("User connected");

    socket.on('disconnect', () => {
      logger.info("User disconnected");
    });

  });

  const PORT = process.env.PORT || 5001;
  server.listen(PORT, () => {
    logger.info(`API running on port: ${PORT}`);
  });
});

connection.on('error', e => logger.error('Error: ',e))

