import app from "./app.js";
import logger from './configs/logger.config.js';


//env variables
const PORT = process.env.PORT || 8000;

console.log(process.env.NODE_ENV);

let server;
server = app.listen(PORT, ()=> {
    logger.info(`server is listening at ${PORT}.....`);
    // throw new Error("error in server. ");
});

//handle server errors

const exitHandler=()=> {
    if(server) {
        logger.info("Server closed. ");
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
process.on("uncaughtRejection", unexpectedErrorHandler);


//SIGTERM
process.on("SIGTERM", () => {
    if(server) {
        logger.info("Server closed. ");
        process.exit(1);
    } 
}); 