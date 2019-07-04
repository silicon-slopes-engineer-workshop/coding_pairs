const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressJwt = require("express-jwt");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();
  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../client/build')));
  
  app.use(morgan("dev"));
  app.use(bodyParser.json());
  app.use("/api", expressJwt({ secret: process.env.SECRET }));
  app.use(cors());
  
  //connect to db
  const connectDb = process.env.MONGODB_URI || "mongodb://localhost:27017/codewithme"
  mongoose.set("useCreateIndex", true);
  mongoose.connect(
    connectDb,
    { useNewUrlParser: true },
    err => {
      if (err) throw err;
      console.log("Connected to the database");
    }
  );

  app.use("/auth", require("./routes/auth"));
  app.use("/api/task", require("./routes/task"));
  app.use("/api/admin", require("./routes/admin"));
  app.use("/api/user", require("./routes/user"));
  app.use("/api/preferences", require("./routes/preferences"));
    // Answer API requests. mayeb use below
    // app.get('/api', function (req, res) {
    //   res.set('Content-Type', 'application/json');
    //   res.send('{"message":"Hello from the custom server!"}');
    // });
  app.use((err, req, res, next) => {
    console.error(JSON.stringify(err));
    if (err.name === "UnauthorizedError") {
      res.status(err.status);
    }
    return res.send({ message: err.message });
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
  });
}
