/* sample of how to initialize and sent email. run this file n check your email. beloqw is the boilerplate all taken from the site */

const sgMail = require("@sendgrid/mail");

// e) your api key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  const msg = {
    to: email, // Change to your recipient
    from: "norulshahlam@gmail.com", // Change to your verified sender
    subject: "Thanks for joining",
    text: `Welcome to the app, ${name}. Let me know what your need`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};
const sendCancelledEmail = (email, name) => {
  const msg = {
    to: email, // Change to your recipient
    from: "norulshahlam@gmail.com", // Change to your verified sender
    subject: "Let us know why you 1 2 cancel?",
    text: `Dear ${name}, plese provide feedback as why you cancel your account`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelledEmail,
};
