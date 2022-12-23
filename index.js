const express = require("express");
// Initialize Express
const app = express();
// body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// import nodemailer
const nodemailer = require("nodemailer");
// Create GET request
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});
const port = 3001;
app.listen(port, function () {
  console.log("Node app is running on port " + port);
});

app.post("/send/email", (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "radhia.rahmani@sesame.com.tn",
      pass: "RADHIASESAME2016",
      clientId:
        "5865254077-lok9krraq0dfpi9t4870jhn9pq4po5pl.apps.googleusercontent.com",
      clientSecret: "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",
      refreshToken:
        "1//04LssBdtlhiViCgYIARAAGAQSNwF-L9Ir-GE1IeNyQ9L2pkaNmG4hhSunH8Xh5EPOyGmJc-q3SV_oR8nPxL676Bid3o2ID4Zbkww",
    },
  });
  transporter.verify((err, success) => {
    err
      ? console.log(err)
      : console.log(`=== Server is ready to take messages: ${success} ===`);
  });

  var mailOptions = {
    from: "radhia.rahmani@sesame.com.tn", // sender address
    to: req.body.email, // list of receivers
    code: req.body.code, // Subject line
    url: req.body.url,
    html: `
        <div style="padding:10px;border-style: ridge">
        <p>You have a new contact request.</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Email: ${req.body.email}</li>
            <li>code: ${req.body.code}</li>
            <li>url: ${req.body.url}</li>
        </ul>
        `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.json({ status: false, respMesg: "Email not sended Successfully" });
    } else {
      res.json({ status: true, respMesg: "Email Sent Successfully" });
    }
  });
});
