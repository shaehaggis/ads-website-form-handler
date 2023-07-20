const bodyParser = require("body-parser")
const express = require("express")
const nodemailer = require("nodemailer")
require('dotenv').config();
const cors = require('cors');

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());

const contactAddress = "shae.haggis@gmail.com"

const mailer = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSWORD,
  },
})

app.post("/handleForm", function (req, res) {

  mailer.sendMail(
    {
      from: req.body.userEmail,
      to: [contactAddress],
      subject: req.body.subject || "[No subject]",
      html: req.body.message || "[No message]",
    },
    function (err, info) {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      res.json({ success: true })
    }
  )
})

app.listen(process.env.PORT || 3000)