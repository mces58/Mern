const nodeMailer = require('nodemailer');
const mailConfig = require('@src/configs');
const logger = require('./logger.util');

const sendMail = async (email, resetUrl) => {
  try {
    const transporter = nodeMailer.createTransport(mailConfig);

    const mailOptions = {
      from: `Admin <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: 'Password Recovery',
      html: `
          <h1>Reset Password</h1>
          <p>Please click the link below to reset your password</p>
          <a href=${resetUrl} clicktracking=off>${'Click here!'}</a>
        `,
    };

    const info = await transporter.sendMail(mailOptions);

    logger.log('info', `Message sent: ${info.messageId}`);
  } catch (error) {
    logger.log('error', error);
  }
};

module.exports = sendMail;
