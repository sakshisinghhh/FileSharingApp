// index.js
const express = require('express');
require("./database/db");
const { Config } = require("./config");
const app = express();
const cors = require("cors");
const port = Config.PORT;
const fileUpload = require('express-fileupload');
const UploadRoute = require('./routes/upload');
const path = require('path');
const connectDB = require('./database/db');
const ViewFile = require('./routes/viewfile');
//const DLFile = require('./routes/dl_file');
connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Hello, world!' });
});

app.use('/api/upload', UploadRoute); 
app.use('/api/view/:id',ViewFile ); // Corrected this line to use UploadRoute as middleware

app.use((req, res, next) => {
  res.status(404).send({ message: 'Route not found' });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send({ message: 'Internal Server Error' });
});

//app.use("/api/file/:id", DLFile);




app.listen(port, () => {
  console.log(`Server is running on http://localhost:5000/api/upload`);
  console.log(`Connected to db and listening on ${port}`)
});
