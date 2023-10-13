// ------nodemailer-------------

const nodemailer = require("nodemailer");
// require('dotenv').config(); - прописано в app.js для всього проекту, тому тут непотрібно
const { META_EMAIL, META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465, // 465-захищений, 25, 2525 - незахищені
  secure: true,
  auth: {
    user: META_EMAIL,
    pass: META_PASSWORD
  }
}

// transport - об'єкт, який буде займатися доставкою пошти
const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async(data) => {
    const email = {...data, from: META_EMAIL};
    return transport.sendMail(email);
}

module.exports = sendEmail;



// ------sendgrid-------------

// const sgMail = require('@sendgrid/mail');
// require('dotenv').config();

// const { SENDGRID_API_KEY } = process.env;

// sgMail.setApiKey{ SENDGRID_API_KEY };

// const sendEmail = async (data) => {
//   const email = { ...data, from: "olga.krv@gmail.com" };
//   await sgMail.send(email);
//   return true;
// }
// module.exports = sendEmail;
