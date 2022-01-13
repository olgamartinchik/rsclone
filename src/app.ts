const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const app = express();

const PORT = config.get("port") || 5000;
//////
// app.get('/', (req, res) => {
//   res.send('The sedulous hyena ate the antelope!');
// });
//////
async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(5000, () => console.log(`App has been started on port ${PORT}...`));
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}

start();

