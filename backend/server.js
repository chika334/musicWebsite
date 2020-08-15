const mongoose = require("mongoose")
const cors = require("cors")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const express = require("express")
const app = express()
const cookieParser = require('cookie-parser');
require('dotenv').config()

// routes
const user = require("./routes/user");
const audio = require('./routes/audio');
// const audioMultiple = require('./routes/audioMultiple')

// middlewares
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser());
// cors
if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true})
  .then(() => console.log("Connected to Database"))
  .catch(err => {
    console.log(err, "err connecting to database")
  })


app.use(express.json())
app.use('/api/users', user);
app.use('/api', audio);
// app.use('/api/multiple', audioMultiple);

// app.use('/profilepics', express.static('profilepics'));
app.use('/uploads', express.static('uploads'));

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})