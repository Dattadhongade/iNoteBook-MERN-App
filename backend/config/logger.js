// Winston is a professional logging tool for Node.js
// Used instead of console.log()
//Imports the Winston logging library
const winston = require("winston");

// Creates a new logger object
const logger = winston.createLogger({
  //  Set Logging Level
  level: "info",

  // Define Log Format
  format: winston.format.combine(  
    winston.format.timestamp(),
    winston.format.json()
  ),
  // Define Transport (Where Logs Go)
  transports: [new winston.transports.Console()],
});
module.exports = logger;
