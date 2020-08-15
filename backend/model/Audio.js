const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const audioSchema = new mongoose.Schema({
  originalname: String,
  mimetype: String,
  filename: String,
  path: String,
});

const Audio = mongoose.model('Audio', audioSchema);

exports.Audio = Audio