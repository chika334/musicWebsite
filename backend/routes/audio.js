const {Audio} = require('../model/Audio')
const express = require("express")
const router = express.Router();
const multer = require('multer')

let Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg') {
      return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
    }
    cb(null, true)
  }
})

const uploads = multer({ storage: Storage }).single('file');

// router.get("/upload/audio", async (req, res) => {
//   Audio.find()
//     // .populate()
//     .exec((err, audio) => {
//       if (err) return res.status(400).send(err);
//       res.status(200).send(audio)
//     })
// })

router.get('/upload/audio', async (req, res) => {
  try {
    const audio = await Audio.find();
    if (!audio) throw Error('No items');

    res.status(200).json(audio);
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.post("/audio", (req, res) => {
  uploads(req, res, err => {
    if (err) {
      return res.json({ success: false, err })
    }

    let audio = new Audio();
      audio.originalname = req.file.originalname,
      audio.mimetype = req.file.mimetype,
      audio.filename = req.file.filename,
      audio.path = req.file.path

      audio.save();
    return res.json({ success: true, audio });
    // return res.json({ success: true, url: res.req.file.path });
  })
})


module.exports = router;