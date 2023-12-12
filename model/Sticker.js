const mongoose = require('mongoose');

const stickerSchema = new mongoose.Schema({
  content: { type: String, required: true },
  creator: { type: String, required: true },
});

const Sticker = mongoose.model('Sticker', stickerSchema);

module.exports = Sticker;
