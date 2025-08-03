// //custom logger middleware
// // This middleware logs the request method and URL along with the current date and time
// // It can be used to track incoming requests for debugging or monitoring purposes, 
// // later we will also implement using winston

// const logger = (req, res, next) => {
//     console.log(`[${new Date().toISOString()}] Request Method: ${req.method}, Request URL: ${req.url}`);
//     next();
// };

// module.exports = logger;

// --> Implementing logger using Winston
const winston = require('winston');

const loggerInstance = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({timestamp, level, message}) => {
            return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(), //Outputs logs to console
        new winston.transports.File({filename: 'logs/server.log'}), //Outputs logs to a file
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), //Outputs error logs to a separate file
    ]
});

const logger = (req, res, next) => {
    loggerInstance.info(`Request Method: ${req.method}, Request URL: ${req.url}`);
    next();
};

module.exports = logger;

