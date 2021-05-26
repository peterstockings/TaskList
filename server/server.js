const express = require("express");
const cors = require("cors");
const logger = require('./libs/Logger');
const mongoose = require("mongoose");
const taskRouter = require("./routes/task");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json({ extended: false }));

// Add Logging Middleware
app.use(require('./MiddleWare/LoggingMiddleWare'));

//Set routes
app.use("/api/tasks", taskRouter);

// 404 route handling
app.get('*', function(req, res, next) {
  res.status(404).json(`Route not found`)
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
  useUnifiedTopology: true 
});

const connection = mongoose.connection;

connection.once("open", () => {
  logger.info("MongoDB database connection established successfully");

  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    logger.info(`API running on port: ${PORT}`);
  });
});

connection.on('error', e => logger.error('Error: ',e))

