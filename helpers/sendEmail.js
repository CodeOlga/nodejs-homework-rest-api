// // ------Nodemailer-------------

// const nodemailer = require("nodemailer");
// require('dotenv').config(); // - прописано в app.js для всього проекту, тому тут непотрібно
// const { META_EMAIL, META_PASSWORD } = process.env;

// const nodemailerConfig = {
//   host: "smtp.meta.ua",
//   port: 465, // 465-захищений, 25, 2525 - незахищені
//   secure: true,
//   auth: {
//     user: META_EMAIL,
//     pass: META_PASSWORD
//   }
// }

// // transport - об'єкт, який буде займатися доставкою пошти
// const transport = nodemailer.createTransport(nodemailerConfig);


// // Універсальна функці sendEmail - отримує об'єкт data (email одержувача, тема листа та вміст), дописує відправника та відправляє email
// const sendEmail = async(data) => {
//     const email = {...data, from: META_EMAIL};
//     return transport.sendMail(email);
// }

// module.exports = sendEmail;



// ------SendGrid-------------

// const sgMail = require('@sendgrid/mail');

// const { SENDGRID_API_KEY } = process.env;

// sgMail.setApiKey{ SENDGRID_API_KEY };

// const sendEmail = async (data) => {
//   const email = { ...data, from: "olga.krv@gmail.com" };
//   await sgMail.send(email);
//   return true;
// }
// module.exports = sendEmail;


// -------ElasticEmail--------------

const ElasticEmail = require('@elasticemail/elasticemail-client');

const { ELASTIC_API_KEY, META_EMAIL } = process.env;

const defaultClient = ElasticEmail.ApiClient.instance;

const { apikey } = defaultClient.authentications;
apikey.apiKey = ELASTIC_API_KEY;

const api = new ElasticEmail.EmailsApi();

const sendEmailWrapper = ({to:email, subject}) => {
    const sendEmail = ElasticEmail.EmailMessageData.constructFromObject({
      Recipients: [
        new ElasticEmail.EmailRecipient(email)
      ],
      Content: {
        Body: [
          ElasticEmail.BodyPart.constructFromObject({
            ContentType: "HTML",
            Content: "<strong>Test email</strong>"
          })
        ],
        Subject: subject ?? "Test email",
        From: META_EMAIL
      }
    });
  
    const callback = function(error, data, response) {
      if (error) {
        console.error(error.message);
      } else {
        console.log('API called successfully');
      }
    };
    
  api.emailsPost(sendEmail, callback);
}

module.exports = sendEmailWrapper;



