/*error handler file should be imported last in the server file*/
let path = require("path");
const ErrorHandler = (err, req, res, next) => {
  console.log("Middleware Error Handling");
  const statusCode = err.statusCode || 500;
  const message = err.message || "something went wrong";
  res.status(statusCode).json({
    success: false,
    message: message,
    statusCode: statusCode,
  });
  res.sendFile(path.join(__dirname + "./../views/error.html"));
  /*__dirname will give the base folder
    path keyword provide methods like join ,basename etc.*/
};
module.exports = ErrorHandler;
