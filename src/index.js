import app from "./app.js";
import mongoose from "mongoose";
import logger from "./configs/logger.config.js";



//env variables
const DATABASE_URL = process.env.DATABASE_URL; 
const PORT = process.env.PORT;

// console.log('DATABASE_URL:', DATABASE_URL);
// console.log('PORT:', PORT);

//exit on mongodb error
mongoose.connection.on('error',(err)=>  {
    logger.error(`Mongodb connection error : ${err}`);
    process.exit(1);
})

//mongodb debug mode
if(process.env.NODE_ENV !== "production") {
    // console.log("here");
    mongoose.set("debug",true);
}


//exit on mognodb error
mongoose.connection.on("error", (err) => {
  logger.error(`Mongodb connection error : ${err}`);
  process.exit(1);
});

//mongodb debug mode
if (process.env.NODE_ENV !== "production") {
  mongoose.set("debug", true);
}

//mongodb connection
mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    logger.info('Connected to Mongodb');
}).catch((error) => {
    logger.error('Error connecting to Mongodb:', error);
});
let server;

server = app.listen(PORT, () => {
  logger.info(`Server is listening at ${PORT}.`);
});

//handle server errors

const exitHandler = () => {
  if (server) {
    logger.info("Server closed.");
    process.exit(1);
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

//SIGTERM
process.on("SIGTERM", () => {
  if (server) {
    logger.info("Server closed.");
    process.exit(1);
  }
});